import type { SvelteComponent } from 'svelte';
import Popover from '../components/Popover.svelte';

/**
 * Replace AngularJs uibtooltip/ui.bootstrap.tooltip.
 * Be aware that it could not be compatible with `Svelte Devtools`.
 */
export function uibtooltip(element: HTMLElement, content: string) {
	let tooltipComponent: SvelteComponent & Popover;
	let visible = false;

	function click(_: MouseEvent) {
		if (visible) {
			try {
				// this raise an exception only if you have `Svelte Devtools` enabled:
				// https://github.com/sveltejs/svelte/issues/5290
				tooltipComponent.$destroy();
			} catch (e) {
				// NOP
			}
			visible = false;
			return;
		}

		// //@ts-ignore: unsupported by svelte, see https://github.com/sveltejs/language-tools/issues/1875
		tooltipComponent = new Popover({
			props: {
				content: content,
				anchor: element,
			},
			target: document.body,
		});
		visible = true;
	}

	element.addEventListener('click', click);

	return {
		update: (content: string) => {
			tooltipComponent.content = content;
		},
		destroy() {
			element.removeEventListener('click', click);
		},
	};
}
