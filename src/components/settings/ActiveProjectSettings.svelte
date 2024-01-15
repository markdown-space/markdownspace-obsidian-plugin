<script lang="ts">
	import { activeProject, plugin } from "../../../store";
    import { updateProject } from "../../utils/projects";

	let project_id = "";
	let project_url = "";
	let api_key = "";
	let project_name = "";

	activeProject.subscribe((project) => {
		project_id = project.project_id;
		project_url = project.project_url;
		api_key = project.api_key;
		project_name = project.project_name || "";
	});

	async function updateSettings() {
		const _project = $activeProject;
		_project.project_id = project_id;
		_project.project_url = project_url;
		_project.api_key = api_key;
		_project.project_name = project_name;
		const project_index = $plugin.settings.projects.findIndex(
			(project) => project.project_id === project_id,
		);
		updateProject(_project, project_index);
	}
</script>

{#if $activeProject}
		<label for="project-id">Project ID</label>
		<input
			id="project-id"
			type="text"
			bind:value={project_id}
			on:change={updateSettings}
		/>

		<label for="project-url">Project URL</label>
		<input
			id="project-url"
			type="text"
			bind:value={project_url}
			on:change={updateSettings}
		/>

		<label for="api-key">API Key</label>
		<input
			id="api-key"
			type="password"
			bind:value={api_key}
			on:change={updateSettings}
		/>

		<label for="project-name">Project Name</label>
		<input
			id="project-name"
			type="text"
			bind:value={project_name}
			on:change={updateSettings}
		/>
{/if}

<style>
	input {
		margin-bottom: 1rem;
	}
</style>
