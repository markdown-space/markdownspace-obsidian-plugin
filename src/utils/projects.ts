import { get, writable } from 'svelte/store';
import type { MarkdownspaceProject } from '../types';
import { plugin, updates } from '../../store';

export function updateProject(newSettings: MarkdownspaceProject, index: number) {
    const _plugin = get(plugin);
    const settings = _plugin.settings;
    settings.projects[index] = newSettings;
    _plugin.saveSettings();
}

export function addProject(newSettings: MarkdownspaceProject) {
    const _plugin = get(plugin);
    const settings = _plugin.settings;
    settings.projects.push(newSettings);
    updates.update(n => n + 1);

    //make the new project the active project
    const index = settings.projects.length - 1;
    settings.selectedProjectIndex = index;

    _plugin.settings = settings;
    _plugin.saveSettings();
}

export function removeProject(index: number) {
    const _plugin = get(plugin);
    const settings = _plugin.settings;
    settings.projects.splice(index, 1);
    updates.update(n => n + 1);

    //make the new project the active project
    const newIndex = settings.projects.length - 1;
    settings.selectedProjectIndex = newIndex;

    _plugin.settings = settings;
    _plugin.saveSettings();
}