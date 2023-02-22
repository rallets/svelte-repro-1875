/*
 * svelte configuration used by JEST unit tests, specified in `jest.config.json`
*/

const sveltePreprocess = require("svelte-preprocess");

module.exports = {
	preprocess: sveltePreprocess({
		tsconfigFile: '/tsconfig.svelte.json'
	}),
};
