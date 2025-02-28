import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })
  console.log(`First 100 chars of input: ${JSON.stringify(input.substring(0, 100))}`)

  const parsedInput = JSON.parse(input)
  console.log('parsedInput:', parsedInput)

  const mrkdwn = slackifyMarkdown(parsedInput)
  console.log('mrkdwn:', mrkdwn)
  const mrkdwnString = JSON.stringify(mrkdwn)
  console.log('mrkdwnString:', mrkdwnString)

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
