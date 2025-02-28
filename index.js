import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

function cleanString(str) {
  str = str.replaceAll('<samp>', '')
  str = str.replaceAll('</samp>', '')
  return str
}

try {
  const input = getInput('text', { required: true })

  const preservedEmojis = input.replace(/:([\w+-]+):/g, '{{EMOJI_$1}}')

  const mrkdwn = slackifyMarkdown(preservedEmojis)

  const restoredEmojis = mrkdwn.replace(/{{EMOJI_([\w+-]+)}}/g, ':$1:')

  const output = restoredEmojis.replace(/\r\n|\r|\n/g, '\n')
  setOutput('text', output)
}
catch (error) {
  setFailed(error.message)
}
