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
	// Retrieve the abstract file from the vault
	const abstractFile = vault.getAbstractFileByPath(file_path);

	// Check if abstractFile is an instance of TFile
	if (abstractFile instanceof TFile) {
		const fileView = leaf.openFile(abstractFile);
		return fileView;
	} else {
		if (!abstractFile) throw new Error("File not found");
	}
}

export async function checkForFile(file_path: string) {
	const _plugin = get(plugin);
	const vault = _plugin.app.vault;
	const exists = await vault.adapter.exists(file_path);
	return exists;
}
