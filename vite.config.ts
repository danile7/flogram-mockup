import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import type { Plugin } from 'vite';

function coep_plugin(): Plugin {
	return {
		name: 'cross-origin-plugin',
		configureServer(server) {
			server.middlewares.use((_, res, next) => {
				res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
				res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
				next();
			});
		},
		configurePreviewServer(server) {
			server.middlewares.use((_, res, next) => {
				res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
				res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
				next();
			});
		},
	};
}

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler : 'svelte',
			customCollections: {
				'material-icon-theme': FileSystemIconLoader('./node_modules/material-icon-theme/icons'),
				'r-icons': FileSystemIconLoader('./src/lib/icons/Rinconx64_r-icons'),
				sveltelab: FileSystemIconLoader('./src/lib/icons/sveltelab'),
			},
		}),
		coep_plugin(),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps : {
		include: ['@fireworks-js/svelte'],
	},
	server : {
		host : '127.0.0.1',
		port : 5000
	},
	ssr : {
		noExternal: ['tsparticles', '@tsparticles/slim', '@tsparticles/engine', '@tsparticles/svelte']
	},

});
