import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })
  console.log(`First 100 chars of input: ${JSON.stringify(input.substring(0, 100))}`)

  // Try different approaches and see which one works
  let markdownContent = input
  let mrkdwn

  try {
    const parsed = JSON.parse(input)
    mrkdwn = slackifyMarkdown(parsed)
    markdownContent = parsed // Use this if it works
  }
  catch (e) {
    console.log('Approach 2 failed:', e.message)
  }

  // Use the best approach based on the logs
  mrkdwn = slackifyMarkdown(markdownContent)
  // const cleaned = mrkdwn.replace(/\r\n|\r|\n/g, '\n')

  setOutput('text', JSON.stringify(mrkdwn))
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
