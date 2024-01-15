import { activeProject } from "../store";
import { get } from "svelte/store";
import MarkdownspaceClient from "@markdownspace/api";


export function loadClient() {
	const _activeProject = get(activeProject);
	const apikey = _activeProject.api_key;
    const project_id = _activeProject.project_id;
    return new MarkdownspaceClient(apikey, project_id);
}

export default loadClient;