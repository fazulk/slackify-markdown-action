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

  const STANDARD_LINK_TEXT = 'View full changelog on GitHub'
  const BIG_RELEASE_LINK_TEXT = 'Big Release! See all changes on GitHub :point_right:'
  const EXTRA_CHARS = 10 // For "<", "|", ">", and newlines
  const MAX_LENGTH = url
    ? 1000 - (Math.max(STANDARD_LINK_TEXT.length, BIG_RELEASE_LINK_TEXT.length) + url.length + EXTRA_CHARS)
    : 1000

  let finalText = cleaned
  const isOverLimit = cleaned.length > MAX_LENGTH

  if (isOverLimit) {
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

    finalText = truncated
  }

  // Always add the link to view full changelog if URL is provided
  if (url) {
    const linkText = isOverLimit ? BIG_RELEASE_LINK_TEXT : STANDARD_LINK_TEXT
    finalText = `${finalText}\n\n\n<${url.replaceAll('"', '')}|${linkText}>`
  }

  setOutput('text', JSON.stringify(finalText))
}
catch (error) {
  console.error('Action failed with error:', error.message)
  setFailed(error.message)
}
