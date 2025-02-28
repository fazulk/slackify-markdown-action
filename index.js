import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })
  console.log(`First 100 chars of input: ${JSON.stringify(input.substring(0, 100))}`)

  const mrkdwn = JSON.stringify(slackifyMarkdown(JSON.parse(input)))

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
