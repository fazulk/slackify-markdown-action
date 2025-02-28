import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })

  console.log(`First 100 chars of input: ${JSON.stringify(input.substring(0, 100))}`)

  // The input appears to be a JSON string, so we need to parse it first
  let markdownContent
  try {
    markdownContent = JSON.parse(input)
    console.log('Successfully parsed input as JSON')
  }
  catch (e) {
    // If parsing fails, use the input as is
    console.log('JSON parsing failed, using raw input')
    markdownContent = input
  }

  const mrkdwn = slackifyMarkdown(markdownContent)
  console.log('mrkdwn:', mrkdwn)

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
