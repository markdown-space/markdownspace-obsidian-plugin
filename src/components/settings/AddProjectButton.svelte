<script>
	import { addProject } from "../../utils/projects";

	const baseProject = () => {
		return {
			project_id: "INSERT-PROJECT-ID-HERE-" + Date.now(),
			project_url: "INSERT-PROJECT-URL-HERE",
			api_key: "INSERT-API-KEY-HERE",
			project_name: "NEW-PROJECT-" + Date.now(),
		};
	};
</script>

<button on:click={() => addProject(baseProject())}>
	Add Project
</button>
