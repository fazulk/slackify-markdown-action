import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })
  const url = getInput('url', { required: false })

  let markdownContent = input

  try {
    const parsed = JSON.parse(input)
    markdownContent = parsed
  }
  catch (e) {
    console.error('Parsing failed:', e.message)
  }

  const mrkdwn = slackifyMarkdown(markdownContent)
  const cleaned = mrkdwn.replace(/\n\n/g, '\n\n\n')

  const LINK_TEXT = 'View full changelog on GitHub'
  const EXTRA_CHARS = 10 // For "<", "|", ">", and newlines
  const MAX_LENGTH = url
    ? 1000 - (LINK_TEXT.length + url.length + EXTRA_CHARS)
    : 1000

  let finalText = cleaned

  if (cleaned.length > MAX_LENGTH) {
    // Truncate the text at the last newline before MAX_LENGTH
    let truncated = ''
    if (cleaned.includes('\n')) {
      // Find the last newline before MAX_LENGTH
      const lastNewlineIndex = cleaned.lastIndexOf('\n', MAX_LENGTH)
      if (lastNewlineIndex !== -1) {
        truncated = `${cleaned.substring(0, lastNewlineIndex)}\n\n...`
      }
      else {
        // Fallback if no newline found before MAX_LENGTH
        truncated = `${cleaned.substring(0, MAX_LENGTH)}...`
      }
    }
    else {
      // No newlines in the text
      truncated = `${cleaned.substring(0, MAX_LENGTH)}...`
    }

    // Add the link to view full changelog if URL is provided
    if (url)
      finalText = `${truncated}\n\n\n<${url}|${LINK_TEXT}>`
    else
      finalText = truncated
  }

  setOutput('text', JSON.stringify(finalText))
}
catch (error) {
  console.error('Action failed with error:', error.message)
  setFailed(error.message)
}
