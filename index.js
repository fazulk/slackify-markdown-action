import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  const input = getInput('text', { required: true })

  // const preservedEmojis = input.replace(/:([\w+-]+):/g, '{{EMOJI_$1}}')

  const mrkdwn = slackifyMarkdown(input)

  // const restoredEmojis = mrkdwn.replace(/{{EMOJI_([\w+-]+)}}/g, ':$1:')

  const output = mrkdwn.replace(/\r\n|\r|\n/g, '\n')

  setOutput('text', output)
}
catch (error) {
  setFailed(error.message)
}
