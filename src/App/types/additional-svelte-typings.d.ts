/*
 * Based on: https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
 *
 * It works if there is a standard tsconfig.ts file in the root, but we need to have two tsconfig.json: 1 x AngularJSGulp, and 1 x Svelte (otherwise they conflict).
 * This means that when we remove AngularJs and his typescript config, we can rename tsconfig.svelte.ts to tsconfig.ts and it will just work.
 *
 * See this open issue: https://github.com/sveltejs/language-tools/issues/1869
*/
declare namespace svelteHTML {
	// enhance elements
	// interface IntrinsicElements {
	// 	'my-custom-element': { someattribute: string; 'on:event': (e: CustomEvent<any>) => void };
	// }

	// enhance attributes
	interface HTMLAttributes<T> {
		// If you want to use on:beforeinstallprompt
		// 'on:beforeinstallprompt'?: (event: any) => any;
		// If you want to use myCustomAttribute={..} (note: all lowercase)
		// mycustomattribute?: any;
		// You can replace any with something more specific if you like
		"vehicle-info"?: boolean;
	}
}
