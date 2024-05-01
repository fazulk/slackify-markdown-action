const core = require('@actions/core');
// const fs = require('node:fs')
const slackifyMarkdown = require('slackify-markdown');


try {
    // const input = core.getInput('text', { required: true });
    const sample = "### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes\n\n- Prob not &nbsp;-&nbsp; by @fazulk [<samp>(4d1ff)</samp>](https://github.com/fazulk/bp/commit/4d1ff57)\n\n##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/fazulk/bp/compare/v0.1.38...v0.1.39)"
    const markdown = slackifyMarkdown(sample);
    core.setOutput("text",  `"${markdown}"`);
    // fs.writeFile('output.txt', mrkdwn, (err) => {
    //   if (err)
    //     throw err
    // })
  
} catch (error) {
    core.setFailed(error.message);
}
