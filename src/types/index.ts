interface MarkdownSpaceConfig {
	project_id: string;
	project_slug?: string;
	source: string;
	include: string;
	exclude: string;
	upload_as_draft: boolean;
	force_sync: boolean;
}

interface MarkdownFile {
	id?: string;
	file_path: string;
	content: string;
	upload_as_draft: boolean;
}

interface MarkdownSpaceDocument {
	id?: string;
	name: string;
	slug?: string;
	draft_body: string;
	published_body: string;
}

interface MarkdownspaceProject {
	api_key: string;
	project_id: string;
	project_url: string;
	project_name?: string;
}

interface MarkdownspaceSettings {
	projects: MarkdownspaceProject[];
	selectedProjectIndex: number;
}
export type {
	MarkdownSpaceConfig,
	MarkdownFile,
	MarkdownSpaceDocument,
	MarkdownspaceProject,
	MarkdownspaceSettings,
};
