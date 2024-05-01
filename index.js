import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

function cleanString(str) {
  str = str.replaceAll('<samp>', '')
  str = str.replaceAll('</samp>', '')
  return str
}

try {
  let input = getInput('text', { required: true })
  input = cleanString(input)
  input = JSON.parse(input)
  const markdown = JSON.stringify(slackifyMarkdown(input))
  setOutput('text', markdown)
}
catch (error) {
  setFailed(error.message)
}
