export interface Repostory {
	id: string;
	name: string;
	description: string;
	starts: number;
	url: string;
}

export interface Project {
	name: string;
	projects: ProjectDetails[];
}

interface ProjectDetails {
	id: string;
	name: string;
	githubUrl: string;
	projectUrl: string;
	description: string;
}

export interface Metadata {
	title: string;
	publishedOn: Date;
	author: string;
	summary: string;
	published: boolean;
	order: number;
}

export interface Post {
	path: string;
	metadata: Metadata;
}
