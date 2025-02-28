# Slackify-markdown-action

GitHub Action to convert markdown into Slack's format. Wrapper of [jsarafajr/slackify-markdown](https://github.com/jsarafajr/slackify-markdown) with a little extra.

* Currently working when you pull release notes from within a action to send to slack

forked from [LoveToKnow](https://github.com/LoveToKnow/slackify-markdown-action) 💚

## Usage

### Inputs

* `text` - The markdown text to convert.
* `url` - URL of release 

### Outputs

* `text` - The markdown text converted to Slack's mrkdwn format.

### Testing

Add your own slackbot token to your repo secret as `SLACK_BOT_TOKEN`
Push to Master --> Triggers Long and Short Test
Currently Using Nuxt release notes as an example
