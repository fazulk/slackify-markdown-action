import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

function cleanString(str) {
  str = str.replaceAll('<samp>', '')
  str = str.replaceAll('</samp>', '')
  return str
}

try {
  const input = getInput('text', { required: true })
  // input = cleanString(input)
  // input = JSON.parse(input)
  const mrkdwn = JSON.stringify(slackifyMarkdown(input))
  const output = mrkdwn.replace(/\r\n|\r|\n/g, '\n')
  setOutput('text', output)
}
catch (error) {
  setFailed(error.message)
}
