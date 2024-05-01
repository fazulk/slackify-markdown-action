const core = require('@actions/core');
const fs = require('node:fs')
const slackifyMarkdown = require('slackify-markdown');


try {
    const input = JSON.parse(core.getInput('text', { required: true }))
    // const sample = JSON.parse(JSON.stringify("### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes\n\n- Ymls &nbsp;-&nbsp; by @fazulk [<samp>(95e64)</samp>](https://github.com/fazulk/slackify-markdown-action/commit/95e64d6)\n\n##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/fazulk/slackify-markdown-action/compare/v1.0.3...v1.0.4)"))
    const markdown = slackifyMarkdown(input);
    core.setOutput("text",  `"${markdown}"`);
    // fs.writeFile('output.txt', markdown, (err) => {
    //   if (err)
    //     throw err
    // })
  
} catch (error) {
    core.setFailed(error.message);
}
