<script lang="ts">
	import { onMount } from "svelte";
	import { loadClient } from "./api";
	import { MarkdownSpaceDocument } from "./types";
	import { plugin, activeProject } from "../store";
	import Sync from "./icons/sync.svelte";
	import Trash from "./icons/trash.svelte";
	import Download from "./icons/download.svelte";
	import WWW from "./icons/www.svelte";
	import Open from "./icons/open.svelte";
	import { openFile, checkForFile } from "./utils/files";

	let existingDocuments: MarkdownSpaceDocument[] = [];
	let selectedDocuments: MarkdownSpaceDocument[] = [];

	async function resync() {
		try {
		existingDocuments = [];
		const client = loadClient();
		existingDocuments = await client.listDocuments();
		} catch (e) {
			console.warn(e);
		}
	}

	async function toggleSelected(
		event: Event,
		document: MarkdownSpaceDocument,
	) {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (target.checked) {
			selectedDocuments.push(document);
		} else {
			selectedDocuments = selectedDocuments.filter(
				(doc) => doc.id !== document.id,
			);
		}
	}

	async function toggleAllSelected(event: Event) {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (target.checked) {
			selectedDocuments = existingDocuments;
		} else {
			selectedDocuments = [];
		}
	}

	async function deleteSelected() {
		const confirm = window.confirm(
			"Are you sure you want to delete these documents?",
		);
		if (!confirm) return;
		const client = loadClient();
		const promises = selectedDocuments.map((doc) =>
			client.deleteDocument(doc),
		);
		await Promise.all(promises);
		resync();
	}

	async function deleteDocument(document: MarkdownSpaceDocument) {
		const client = loadClient();
		await client.deleteDocument(document);
	}

	async function downloadSelected() {
		const confirm = window.confirm(
			"Are you sure you want to download these documents?",
		);
		if (!confirm) return;
		const promises = selectedDocuments.map((doc) => downloadDocument(doc));
		await Promise.all(promises);
	}

	async function downloadDocument(document: MarkdownSpaceDocument) {
		try {
			const _plugin = $plugin;
			const vault = _plugin.app.vault;

			const path = document.name;
			const content = document.draft_body || document.published_body;

			await vault.create(path, content);
		} catch (e) {
			console.warn(e);
		}
	}

	async function openDocument(document: MarkdownSpaceDocument) {
		const slug = $activeProject.project_url;

		const url = `https://${slug}/${document.slug}`;
		window.open(url);
	}

	onMount(resync);
</script>

<h1>MarkdownSpace documents:</h1>
<div class="flex-row">
	<button class="icon-wrapper" on:click={resync}><Sync /></button>
	<button class="icon-wrapper" on:click={deleteSelected}><Trash /></button>
	<button class="icon-wrapper" on:click={downloadSelected}
		><Download /></button
	>
</div>

<div class="list-container">
	<input id="select-all" type="checkbox" on:change={toggleAllSelected} />
	{#each existingDocuments as document}
		<div class="list-item">
			<input
				type="checkbox"
				checked={selectedDocuments.includes(document)}
				on:change={(evt) => toggleSelected(evt, document)}
			/>
			<p>{document.name}</p>
			<button
				class="icon-wrapper"
				on:click={() => openDocument(document)}
			>
				<WWW />
			</button>
			<button
				class="icon-wrapper"
				on:click={() => deleteDocument(document)}><Trash /></button
			>
			<button
				class="icon-wrapper"
				on:click={() => downloadDocument(document)}><Download /></button
			>

			{#await checkForFile(document.name)}
				<div />
			{:then isFile}
				{#if isFile}
					<button
						class="icon-wrapper"
						on:click={() => openFile(document.name)}
						><Open /></button
					>
				{/if}
			{:catch error}
				<p>{error.message}</p>
			{/await}
		</div>
	{/each}
</div>

<style>
	.flex-row {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
		gap: 0.5rem;
	}
</style>
