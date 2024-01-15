<script>
    import { plugin } from "store";
    import { removeProject } from "../../utils/projects";
</script>

<button on:click={() =>removeProject($plugin.settings.selectedProjectIndex)}>
    Delete Project
</button>