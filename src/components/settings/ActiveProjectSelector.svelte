<script lang="ts">
	import { activeProject, plugin, updates } from "../../../store";

	async function selectProject(evt: Event) {
		const target = evt.target;
		if (!(target instanceof HTMLSelectElement)) return;
		const project_id = target.value;
		const _plugin = $plugin;

		const _project = _plugin.settings.projects.find(
			(project) => project.project_id === project_id,
		);
		if (!_project) return;
		//get the index and then set the plugin settings active project to the index
		const index = _plugin.settings.projects.indexOf(_project);
		_plugin.settings.selectedProjectIndex = index;
		_plugin.saveSettings();
		updates.update((v) => v + 1);
	}
</script>

	<label for="project-id">Active Project</label>
	<select
		id="project-selector"
		on:change={selectProject}
		value={$activeProject.project_id}
	>
		{#each $plugin.settings.projects as project}
			<option value={project.project_id}>
				{project.project_name ||
					`project-${project.project_id}`}</option
			>
		{/each}
	</select>
