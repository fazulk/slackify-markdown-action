# slackify-markdown-action

GitHub Action to convert markdown into Slack's markdown.

## Usage

```yaml
- id: convertTextSlackReady
  uses: fazulk/slackify-markdown-action@master
  with:
    text: ${{ needs.changelog.outputs.release_notes }}
    url: ${{ needs.changelog.outputs.release_url }} # Optional
```

## Output

```yaml
${{ steps.convertTextSlackReady.outputs.text }}
```

## Test Change

This is a test change to verify the pre-commit hook works correctly.
