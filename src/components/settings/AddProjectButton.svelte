<script>
	import { addProject } from "../../utils/projects";

	const baseProject = () => {
		return {
			project_id: "",
			project_url: "",
			api_key: "",
			project_name: "NEW-PROJECT-" + Date.now(),
		};
	};
</script>

<button on:click={() => addProject(baseProject())}>
	Add
</button>
