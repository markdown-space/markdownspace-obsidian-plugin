<script lang="ts">
	import { plugin } from "../store";
	import type { MarkdownFile, MarkdownSpaceDocument } from "./types";
	import { loadClient } from "./api";
    import { openFile } from "./utils/files";
	import MarkdownspaceClient from "@markdownspace/api";
	import Upload from "./icons/upload.svelte";
    import Open from "./icons/open.svelte";

	let files: MarkdownFile[] = [];
	let selectedFiles: MarkdownFile[] = [];
	let selectedPath = "";
	let info = "";

	async function handleSelect(path: string) {
		try {
			const _plugin = $plugin;
			const vault = _plugin.app.vault;
			const vaultFiles = vault.getFiles();

			// Filter files that start with the path first to minimize read operations
			const filteredFiles = vaultFiles.filter((file) =>
				file.path.startsWith(path),
			);

			// Read contents of filtered files concurrently
			const readPromises = filteredFiles.map((file) => vault.read(file));
			const fileContents = await Promise.all(readPromises);

			// Combine file paths with their contents
			files = filteredFiles.map((file, index) => ({
				file_path: file.path,
				content: fileContents[index],
				upload_as_draft: false,
			}));
		} catch (e) {
			info = e.message;
		}
	}

	async function publishDocument(file: MarkdownFile) {
		const client = loadClient();
		const existingFiles = await client.listDocuments();
		await handleDocumentPublishing(client, existingFiles, file);
	}

	async function publishSelected() {
		const client = loadClient();
		const existingFiles = await client.listDocuments();
		let promises = [];
		for (const file of selectedFiles) {
			promises.push(
				handleDocumentPublishing(client, existingFiles, file),
			);
		}
		await Promise.all(promises);
	}

	async function handleDocumentPublishing(
		client: MarkdownspaceClient,
		existingFiles: MarkdownSpaceDocument[],
		file: MarkdownFile,
	) {
		const existingFile = existingFiles.find(
			(f) => f.name === file.file_path,
		);
		if (existingFile) {
			info = `Updating existing file ${file.file_path}`;
			return client.updateDocument(existingFile, file);
		} else {
			info = `Creating new file ${file.file_path}`;
			return client.publishDocument(file);
		}
	}

	function toggleSelected(event: Event, file: MarkdownFile) {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (target.checked) {
            selectedFiles = [...selectedFiles, file];
		} else {
			selectedFiles = selectedFiles.filter(
				(doc) => doc.file_path !== file.file_path,
			);
		}
	}

	function toggleAllSelected(event: Event) {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (target.checked) {
			selectedFiles = files;
		} else {
			selectedFiles = [];
		}
	}

	$: {
			handleSelect(selectedPath);
	}
</script>

<div class="flex-col">
	<h1>File selector</h1>
	<p>
		This load documents from Obsidian so that you can publish them to markdownspace. If a document
		already exists with the same name as the file path, the existing
		markdownspace document will be updated instead of creating a new file.
	</p>
	<input placeholder="Start typing the path to the directory you want to retrieve documents from:" type="text" bind:value={selectedPath} />
	<p>{info}</p>
	<div class="flex-row buttons">
		<button class="icon-wrapper" on:click={publishSelected}>
			<Upload />
		</button>
	</div>

	<input id="select-all" type="checkbox" on:change={toggleAllSelected} />
	<div class="list-container">
		{#key selectedFiles}
			<p>{selectedFiles.length} Files selected for publish:</p>
		{/key}
		{#each files as file}
			<div class="file flex-row">
				<input
					type="checkbox"
					checked={selectedFiles.includes(file)}
					on:change={(evt) => toggleSelected(evt, file)}
				/>
				<p>{file.file_path}</p>
				<button
					class="icon-wrapper"
					on:click={() => publishDocument(file)}
					><Upload />
				</button>
                <button
                    class="icon-wrapper"
                    on:click={() => openFile(file.file_path)}
                    ><Open />
                </button>
			</div>
		{/each}
	</div>
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: row-reverse;
	}

	.file {
		width: 100%;
		text-wrap: wrap;
		border-radius: 0.5rem;
		word-wrap: break-word;
		box-sizing: border-box;
		align-items: center;
		gap: 0.5rem;
	}
</style>
