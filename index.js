import { getInput, setFailed, setOutput } from '@actions/core'
import slackifyMarkdown from 'slackify-markdown'

try {
  console.log('Action started - slackify-markdown-action')
  const input = getInput('text', { required: true })
  console.log('Input received, length:', input ? input.length : 0)
  console.log('First 100 chars of input:', input ? input.substring(0, 100) : 'empty')

  // const preservedEmojis = input.replace(/:([\w+-]+):/g, '{{EMOJI_$1}}')

  const mrkdwn = slackifyMarkdown(input)
  console.log('Conversion completed, output length:', mrkdwn ? mrkdwn.length : 0)
  console.log('First 100 chars of output:', mrkdwn ? mrkdwn.substring(0, 100) : 'empty')

  // const restoredEmojis = mrkdwn.replace(/{{EMOJI_([\w+-]+)}}/g, ':$1:')

  const output = mrkdwn.replace(/\r\n|\r|\n/g, '\n')

  setOutput('text', output)
  console.log('Action completed successfully')
}
catch (error) {
  console.error('Action failed with error:', error.message)
  setFailed(error.message)
}
