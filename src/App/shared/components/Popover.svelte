<script lang="ts">
	import { onDestroy } from 'svelte';

	export let content = '';
	export let anchor: HTMLElement | undefined = undefined;

	let container: HTMLDivElement;
	let resizeObserver: ResizeObserver;
	const _anchor = {
		bottom: -1,
		right: -1,
		height: 0,
	};

	let popoverTop: number;
	let popoverLeft: number;

	const calcAnchorPosition = () => {
		_anchor.bottom = -1;
		_anchor.right = -1;

		if (anchor) {
			const rect = anchor?.getBoundingClientRect();
			_anchor.bottom = rect.bottom;
			_anchor.right = rect.right;
			_anchor.height = rect.height;
		}

		calcContainerPosition();
	};

	const calcContainerPosition = () => {
		if (!container) {
			return;
		}
		if (_anchor.bottom < 0 || _anchor.right < 0) {
			return;
		}

		popoverTop = _anchor.bottom - _anchor.height / 2 - container.clientHeight / 2;
		popoverLeft = _anchor.right;
	};

	const bindContainer = () => {
		if (!container) {
			return;
		}
		if (resizeObserver) {
			return;
		}

		resizeObserver = new ResizeObserver(function (_) {
			calcContainerPosition();
		});
		resizeObserver.observe(container);
	};

	$: anchor, calcAnchorPosition();
	$: container, bindContainer();

	onDestroy(() => {
		resizeObserver?.disconnect();
	});
</script>

<svelte:window on:resize="{calcAnchorPosition}" />

<div
	bind:this="{container}"
	uib-tooltip-popup
	uib-title
	class="tooltip right fade in"
	tooltip-animation-class="fade"
	uib-tooltip-classes
	style="top: {popoverTop}px; left: {popoverLeft}px">
	<div class="tooltip-arrow"></div>
	<div class="tooltip-inner">
		{#if content}
			{content}
		{:else}
			<slot />
		{/if}
	</div>
</div>
