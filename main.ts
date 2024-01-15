import {
	App,
	WorkspaceLeaf,
	ItemView,
	Plugin,
	PluginSettingTab,
	Setting,
	addIcon
} from "obsidian";
import MarkdownspaceApp from "./src/MarkdownspaceApp.svelte";
import SettingsPage from "./src/SettingsPage.svelte";
import { workspace, plugin } from "./store";
import logo from './logo'
import type { MarkdownspaceSettings } from "./src/types";

const DEFAULT_SETTINGS: MarkdownspaceSettings = {
	projects: [
		{
			api_key: "INSERT_API_KEY_HERE",
			project_id: "INSERT_PROJECT_ID_HERE",
			project_url: "INSERT_PROJECT_URL_HERE",
			project_name: "INSERT_PROJECT_NAME_HERE",
		}
	] ,
	selectedProjectIndex: 0,
};

addIcon("MDS", logo);

export const VIEW_TYPE_MARKDOWNSPACE = "markdownspace-view";

export default class MarkdownSpacePlugin extends Plugin {
	settings: MarkdownspaceSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_MARKDOWNSPACE,
			(leaf) => new MainWindowView(leaf, this)
		);

		this.addRibbonIcon("MDS", "Launch the MarkdownSpace Plugin 🚀", () => {
			this.activateView();
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MarkdownspaceSettingsTab(this.app, this));
	}

	onunload() {
		console.log("unloading plugin");
	}

	async activateView() {
		await this.saveSettings();
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_MARKDOWNSPACE);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_MARKDOWNSPACE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_MARKDOWNSPACE)[0]
		);

		workspace.set(this.app.workspace);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class MainWindowView extends ItemView {
	component: MarkdownspaceApp;
	plugin: MarkdownSpacePlugin;

	constructor(leaf: WorkspaceLeaf, plugin: MarkdownSpacePlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return "markdownspace-view";
	}

	getDisplayText() {
		return "Markdownspace view";
	}

	async onOpen() {
		plugin.set(this.plugin);

		this.component = new MarkdownspaceApp({
			target: this.contentEl,
		});
	}

	async onClose() {
		this.component.$destroy();
	}
}

class MarkdownspaceSettingsTab extends PluginSettingTab {
	component: SettingsPage;
	plugin: MarkdownSpacePlugin;

	constructor(app: App, plugin: MarkdownSpacePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		this.component = new SettingsPage({
			target: containerEl,
		});
	}

	async hide(): Promise<void> {
		this.component.$destroy();
	}
}
