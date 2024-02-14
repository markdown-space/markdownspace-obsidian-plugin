import { writable, derived, get } from "svelte/store";
import type MarkdownSpacePlugin from "./main";
import type { Workspace } from "obsidian";
import type { MarkdownspaceSettings, MarkdownspaceProject } from "./src/types";
import { addProject } from "src/utils/projects";

export const plugin = writable<MarkdownSpacePlugin>();
export const workspace = writable<Workspace>();
export const updates = writable<number>(1);
export const activeProject = derived<any, MarkdownspaceProject>([plugin, updates], ([$plugin, $updates]) => {
    const settings = $plugin.settings;
    const selectedProjectIndex = settings.selectedProjectIndex;
    const projects = settings.projects;

    let project =  projects[selectedProjectIndex];
    //if the project doesn't exist, we need to find the existing project,
    //or create a new one

    if (!project) {
        //try to find an existing project
        const existing_project = projects[0]

        if (existing_project) return existing_project;
        else {
            //create a new project
            const new_project: MarkdownspaceProject = {
                project_id: "",
                project_url: "",
                api_key: "",
                project_name: "NEW-PROJECT-" + Date.now(),
            }
            addProject(new_project);
            return new_project;
        }
    }
        

    return project;
})





export default { plugin };