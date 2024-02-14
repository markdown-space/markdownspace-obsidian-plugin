<script lang="ts">
    import ActiveProjectSelector from "./components/settings/ActiveProjectSelector.svelte";
    import ActiveProjectSettings from "./components/settings/ActiveProjectSettings.svelte";
    import AddProjectButton from "./components/settings/AddProjectButton.svelte";
    import RemoveProjectButton from "./components/settings/RemoveProjectButton.svelte";
</script>

<div class="flex-col">
    <ActiveProjectSelector />
    <ActiveProjectSettings />
    <div class="buttons">
    <AddProjectButton />
    <RemoveProjectButton />
</div>
</div>

<style>
    .flex-col {
        position: relative;
    }
    .buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 150px;
    }
</style>