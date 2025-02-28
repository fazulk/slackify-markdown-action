import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

function cleanString(str) {
  str = str.replaceAll('<samp>', '')
  str = str.replaceAll('</samp>', '')
  return str
}

try {
  const input = getInput('text', { required: true })
  const url = getInput('url', { required: false })

  // Debug inputs
  console.log('Received input text:', input)
  console.log('Received URL:', url)

  let markdownContent = cleanString(input)

  try {
    const parsed = JSON.parse(input)
    markdownContent = parsed
  }
  catch (e) {
    console.error('Parsing failed:', e.message)
  }

  const mrkdwn = slackifyMarkdown(markdownContent)
  const cleaned = mrkdwn.replace(/\n\n/g, '\n\n\n')

  const STANDARD_LINK_TEXT = 'View full release notes on GitHub'
  const BIG_RELEASE_LINK_TEXT = 'Big Release! :point_right: See full release notes on GitHub'
  const EXTRA_CHARS = 10 // For "<", "|", ">", and newlines
  const MAX_LENGTH = url
    ? 3000 - (Math.max(STANDARD_LINK_TEXT.length, BIG_RELEASE_LINK_TEXT.length) + url.length + EXTRA_CHARS)
    : 3000

  let finalText = cleaned
  const isOverLimit = cleaned.length > MAX_LENGTH

  if (isOverLimit) {
    // Truncate the text at the last newline before MAX_LENGTH
    let truncated = ''
    if (cleaned.includes('\n')) {
      // Find the last newline before MAX_LENGTH
      const lastNewlineIndex = cleaned.lastIndexOf('\n', MAX_LENGTH)
      if (lastNewlineIndex !== -1) {
        truncated = `${cleaned.substring(0, lastNewlineIndex)}\n\n`
      }
      else {
        // Fallback if no newline found before MAX_LENGTH
        truncated = `${cleaned.substring(0, MAX_LENGTH)}`
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
    const ellipsis = isOverLimit ? '\n\n...' : '\n\n'
    finalText = `${finalText}${ellipsis} <${url.replaceAll('"', '')}|${linkText}>`
  }

  // Debug output
  console.log('Setting output text:', finalText)
  setOutput('text', JSON.stringify(finalText))

  // Also write to GITHUB_OUTPUT file directly as a fallback
  const githubOutput = process.env.GITHUB_OUTPUT
  if (githubOutput) {
    const fs = await import('node:fs')
    fs.appendFileSync(githubOutput, `text=${JSON.stringify(finalText)}` + '\n')
    console.log('Wrote to GITHUB_OUTPUT file')
  }
}
catch (error) {
  console.error('Action failed with error:', error.message)
  setFailed(error.message)
}
