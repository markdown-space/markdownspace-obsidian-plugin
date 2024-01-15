<script lang="ts">
	import { activeProject, plugin } from "../store";
	import type { MarkdownFile } from "./types";
	import { loadClient } from "./api";

	let output: string = "";
	let loading: boolean = false;

	async function publish() {
		loading = true;
		output = "";
		try {
			const { content, path } = await loadDocuments();
			const project_id = $activeProject.project_id;
			const test_file: MarkdownFile = {
				file_path: path,
				content,
				upload_as_draft: false,
			};

			const client = loadClient();
			const res = await client.publishDocument(test_file);
			output = JSON.stringify(res);
		} catch (e) {
			output = e.message;
		}

		async function loadDocuments() {
			const workspace = $plugin.app.workspace;
			if (!workspace) throw new Error("No workspace");
			const current_file = workspace.getActiveFile();
			if (!current_file) throw new Error("No active file");

			const fileContent = await $plugin.app.vault.read(current_file);
			return {
				content: fileContent,
				path: current_file.path,
			};
		}
		setTimeout(() => {
			output = "";
		}, 5000);
		loading = false;
	}
</script>
<h1>Active Document Manager</h1>
<div>
<p>
    This will automatically publish the currently open document to
    markdownspace.
</p>
{#if loading}
    <p>Loading...</p>
{:else}
    <button on:click={publish}>Publish Current File</button>
    <p>{output}</p>
{/if}
</div>