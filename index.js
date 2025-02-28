import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })
  console.log(`First 100 chars of input: ${JSON.stringify(input.substring(0, 100))}`)

  // Try different approaches and see which one works
  let markdownContent = input
  let mrkdwn

  console.log('Approach 1: Using input directly')
  try {
    mrkdwn = slackifyMarkdown(input)
    console.log('Sample output 1:', mrkdwn.substring(0, 100))
  }
  catch (e) {
    console.log('Approach 1 failed:', e.message)
  }

  console.log('Approach 2: Trying to parse as JSON')
  try {
    const parsed = JSON.parse(input)
    mrkdwn = slackifyMarkdown(parsed)
    console.log('Sample output 2:', mrkdwn.substring(0, 100))
    markdownContent = parsed // Use this if it works
  }
  catch (e) {
    console.log('Approach 2 failed:', e.message)
  }

  console.log('Approach 3: Removing outer quotes if present')
  try {
    // If input starts and ends with quotes, remove them
    const unquoted = input.replace(/^"(.*)"$/, '$1')
    mrkdwn = slackifyMarkdown(unquoted)
    console.log('Sample output 3:', mrkdwn.substring(0, 100))
    if (unquoted !== input)
      markdownContent = unquoted // Use this if it's different and works
  }
  catch (e) {
    console.log('Approach 3 failed:', e.message)
  }

  // Use the best approach based on the logs
  mrkdwn = slackifyMarkdown(markdownContent)
  const cleaned = mrkdwn.replace(/\r\n|\r|\n/g, '\n')
  console.log(`Conversion completed, output length: ${cleaned.length}`)
  console.log(`First 100 chars of output: ${JSON.stringify(cleaned.substring(0, 100))}`)

  setOutput('text', cleaned)
}
catch (error) {
  console.error('Action failed with error:', error.message)
  setFailed(error.message)
}

// function cleanString(str) {
//   str = str.replaceAll('<samp>', '')
//   str = str.replaceAll('</samp>', '')
//   return str
// }

// try {
//   let input = getInput('text', { required: true })
//   input = cleanString(input)
//   input = JSON.parse(input)
//   const markdown = JSON.stringify(slackifyMarkdown(input))
//   setOutput('text', markdown)
