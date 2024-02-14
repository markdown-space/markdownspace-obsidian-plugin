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
			api_key: "",
			project_id: "",
			project_url: "",
			project_name: "",
		}
	] ,
	selectedProjectIndex: 0,
};

addIcon("MDS", logo);

export const VIEW_TYPE_MARKDOWNSPACE = "markdownspace";

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

		//get any active markdownspace views
		const activeMarkdownspaceViews = this.app.workspace
			.getLeavesOfType(VIEW_TYPE_MARKDOWNSPACE)
			.filter((leaf) => leaf.view instanceof MainWindowView);

		//if there are any active markdownspace views, activate the first one
		if (activeMarkdownspaceViews.length > 0) {
			this.app.workspace.revealLeaf(activeMarkdownspaceViews[0]);
			return;
		}


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
		return "markdownspace";
	}

	getDisplayText() {
		return "Markdownspace";
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
