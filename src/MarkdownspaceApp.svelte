<script lang="ts">
	import FileLoader from "./FileLoader.svelte";
	import ProjectFiles from "./ProjectFiles.svelte";
	import Logo from "./assets/Logo.svelte";
	import ProjectSettings from "./ProjectSettings.svelte";
	import { activeProject } from "store";
</script>

<div class="flex-col">
	<div class="logo-wrapper">
		<Logo />
	</div>
	<h1>Markdownspace</h1>
	<a href="https://markdownspace.com" target="_blank">
		<button>Open Markdownspace</button>
	</a>
	{#key $activeProject}
		<ProjectSettings />
		<ProjectFiles />
		<FileLoader />
	{/key}
</div>

<style>
	h1 {
		font-size: 2rem;
		text-align: center;
	}
	.logo-wrapper {
		top: 1rem;
		left: 1rem;
		height: 50px;
		width: 100%;
		max-width: 90%;
		position: relative;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	a {
		margin: auto;
		margin-bottom: 1rem;
	}

	:global(.logo-wrapper svg) {
		width: 100%;
		height: 100%;
	}

	:global(.flex-row) {
		display: flex;
	}

	:global(.flex-col) {
		display: flex;
		flex-direction: column;
	}

	:global(button:disabled) {
		color: gray;
	}

	:global(button:disabled:hover) {
		cursor: not-allowed;
	}

	:global(div) {
		box-sizing: border-box;
	}
	:global(.icon-wrapper) {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0.125rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	:global(.icon-wrapper svg) {
		filter: invert(1);
	}

	:global(.icon) {
		width: 100%;
		height: 100%;
	}
	:global(.list-container) {
		padding: 0.5rem;
		border-radius: 0.5rem;
		max-height: 300px;
		margin-top: 1rem;
		background-color: rgba(0, 0, 0, 0.1);
		overflow: auto;
	}
</style>
