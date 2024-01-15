# Markdown Space Plugin for Obsidian

Markdown Space is a plugin for [Obsidian](https://obsidian.md) that allows you to export files to and from your vault and markdownspace. This means that you can edit your files in markdownspace and then export them to your vault, or you can export your vault to markdownspace and edit it there.


Markdownspace is a website that allows you to edit markdown files in your browser. It is a great way to edit your files on the go, or to share them with others. You can find it at [markdown.space](https://markdown.space).

Notably, Markdownspace brings you the power of MDX to markdown. This means that you can use React components in your markdown files. You can find out more about MDX [here](https://mdxjs.com/).

## Features:
- Project-based API Key Management: Securely manage and use API keys that are specific to each Markdown Space project.
- Export files to markdownspace
- Export folders to markdownspace
- Export your whole vault to markdownspace
- Import files from markdownspace
- Import folders from markdownspace
- Import your whole vault from markdownspace
- Sync your vault with markdownspace
- Open markdownspace pages from obsidian


## Installation

Install from Obsidian Community Plugins (Coming Soon)

### Manual Installation

1. Download the `main.js` `styles.css` and `manifest.json` from the [Latest Release](https://github.com/markdown-space/markdownspace-obsidian-plugin/releases/latest), or from any other release version.
2. Place into: `{VaultFolder}/.obsidian/plugins/`
3. Reload obsidian
4. Enable the plugin in the settings
5. Reload obsidian again
6. Click the M# icon in the left sidebar

## Using the Plugin

1. Sign up for an account at [markdown.space](https://markdown.space)
2. Retrieve your project settings from a markdownspace project.
3. Click the M# icon in the left sidebar.
4. Enter your project settings into the leaf that appears.
5. BAM! You're ready to go! You can now export files, folders, or your whole vault to markdownspace.


## FAQ

> Q: Can I run this from the command line?
>
> A: Yes! But you will need to use our [CLI Tool](https://www.npmjs.com/package/@markdownspace/cli) to do so. This plugin is just for obsidian. You can see a demo of the CLI tool [here](https://github.com/markdown-space/demo-auto-publish).

> Q: Can I use this plugin without an account?
>
> A: No. You will need to sign up for an account at [markdown.space](https://markdown.space) to use this plugin.

> Q: Can I use this plugin without an internet connection?
>
> A: No. You will need an internet connection to use this plugin.

> Q: Can I use this plugin with my own server?
>
> A: No. If you wish to use a server, check out our API [here](https://www.npmjs.com/package/@markdownspace/api)