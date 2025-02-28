import slackifyMarkdown from 'slackify-markdown'

// Test function
function testEmojiReplacement() {
  // Sample input with emoji
  const input = 'Hello world :heart: :+1: :smile:'
  console.log('Original input:', input)

  // Preserve emojis
  const preservedEmojis = input.replace(/:([\w+-]+):/g, '{{EMOJI_$1}}')
  console.log('After emoji preservation:', preservedEmojis)

  // Process with slackify-markdown
  const mrkdwn = slackifyMarkdown(preservedEmojis)
  console.log('After slackify-markdown:', mrkdwn)

  // Restore emojis
  const restoredEmojis = mrkdwn.replace(/{{EMOJI_([\w+-]+)}}/g, (match, emojiName) => {
    console.log(`Replacing ${match} with :${emojiName}:`)
    return `:${emojiName}:`
  })
  console.log('After emoji restoration:', restoredEmojis)
}

// Run the test
testEmojiReplacement()
