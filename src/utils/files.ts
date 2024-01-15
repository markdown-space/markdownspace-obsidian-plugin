import { plugin } from "../../store";
import { get } from "svelte/store";
import { loadClient } from "../api";
import { MarkdownFile } from "@markdownspace/api/dist/types";
import { TFile } from "obsidian";
import { MarkdownSpaceDocument } from "../types";


export async function openFile(file_path: string) {
    const _plugin = get(plugin);
    const workspace = _plugin.app.workspace;
    const vault = _plugin.app.vault;
    const leaf = workspace.getLeaf();
    const abstractFile = vault.getAbstractFileByPath(file_path) as TFile;
    
    if (!abstractFile) throw new Error("File not found");
    
    const fileView = leaf.openFile(abstractFile);
    return fileView;
}

export async function checkForFile(file_path: string) {
    const _plugin = get(plugin);
    const vault = _plugin.app.vault;
    const exists = await vault.adapter.exists(file_path);
    return exists;
}
