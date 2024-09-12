<script>
	export let tip = '';
	export let top = false;
	export let right = false;
	export let bottom = false;
	export let left = false;
	export let active = false;
	export let color = '#757575';

	let style = `background-color: ${color};`;
</script>

<div class="tooltip-wrapper">
	<span class="tooltip-slot">
		<slot />
	</span>
	<div class="tooltip" class:active class:left class:right class:bottom class:top>
		{#if tip}
			<div class="default-tip" {style}>{tip}</div>
		{:else}
			<slot name="custom-tip" />
		{/if}
	</div>
</div>

<!--<script>-->
<!--	import { fade } from 'svelte/transition';-->

<!--	export let text = '';-->
<!--	export let className = '';-->
<!--	export let position = 'left';-->
<!--	let tooltipVisible = false;-->
<!--	let tooltipElement;-->

<!--	function showTooltip() {-->
<!--		tooltipVisible = true;-->
<!--	}-->

<!--	function hideTooltip() {-->
<!--		tooltipVisible = false;-->
<!--	}-->

<!--	function positionTooltip(event) {-->
<!--		const tooltipRect = tooltipElement.getBoundingClientRect();-->
<!--		let top, left;-->

<!--		if (position === 'left' || position === 'right') {-->
<!--			top = event.clientY - 20;-->

<!--			if (position === 'left') {-->
<!--				left = event.target.getBoundingClientRect().left - 115;-->
<!--				if (event.target.tagName === 'IMG') {-->
<!--					left = event.target.parentNode.parentNode.getBoundingClientRect().left - 115;-->
<!--				}-->
<!--			}-->

<!--			if (position === 'right') {-->
<!--				left = event.target.getBoundingClientRect().right + 15;-->
<!--				if (event.target.tagName === 'IMG') {-->
<!--					left = event.target.parentNode.parentNode.getBoundingClientRect().right + 15;-->
<!--				}-->
<!--			}-->
<!--		}-->

<!--		if (position === 'top' || position === 'bottom') {-->
<!--			left = event.clientX - 50;-->

<!--			if (position === 'top') {-->
<!--				top = event.target.getBoundingClientRect().top - 35;-->

<!--				if (event.target.tagName === 'IMG') {-->
<!--					top = event.target.parentNode.parentNode.getBoundingClientRect().top - 35;-->
<!--				}-->
<!--			}-->

<!--			if (position === 'bottom') {-->
<!--				top = event.target.getBoundingClientRect().top + 45;-->

<!--				if (event.target.tagName === 'IMG') {-->
<!--					top = event.target.parentNode.parentNode.getBoundingClientRect().top + 45;-->
<!--				}-->
<!--			}-->
<!--		}-->

<!--		tooltipElement.style.top = `${top}px`;-->
<!--		tooltipElement.style.left = `${left}px`;-->
<!--	}-->
<!--</script>-->

<!--<div-->
<!--	class={`flex flex-col relative ${className} `}-->
<!--	on:mouseover={showTooltip}-->
<!--	on:mouseleave={hideTooltip}-->
<!--	on:mousemove={positionTooltip}-->
<!--&gt;-->
<!--	<slot />-->
<!--</div>-->

<!--{#if tooltipVisible}-->
<!--	<div bind:this={tooltipElement} class="tooltip visible" transition:fade>-->
<!--		{text}-->
<!--	</div>-->
<!--{/if}-->

<!--<style>-->
<!--	.tooltip {-->
<!--		position: fixed;-->
<!--		padding: 0.5rem 1rem;-->
<!--		border-radius: 0.5rem;-->
<!--		background-color: #111827;-->
<!--		color: white;-->
<!--		text-align: center;-->
<!--		z-index: 10;-->
<!--		visibility: hidden; /* Initially hidden */-->
<!--		/* transition: visibility 0.2s ease-in-out; */-->
<!--	}-->
<!--	.tooltip.visible {-->
<!--		visibility: visible;-->
<!--	}-->

<!--	@keyframes pop {-->
<!--		0% {-->
<!--			opacity: 0;-->
<!--		}-->

<!--		100% {-->
<!--			opacity: 1;-->
<!--		}-->
<!--	}-->
<!--</style>-->

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		font-family: inherit;
		display: inline-block;
		white-space: nowrap;
		color: inherit;
		opacity: 0;
		visibility: hidden;
		transition: opacity 150ms, visibility 150ms;
		z-index: 10000;
	}

	.default-tip {
		display: inline-block;
		padding: 8px 16px;
		border-radius: 6px;
		color: inherit;
	}

	.tooltip.top {
		left: 50%;
		transform: translate(-50%, -100%);
		margin-top: -8px;
	}

	.tooltip.bottom {
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 100%);
		margin-bottom: -8px;
	}

	.tooltip.left {
		left: 0;
		top: 0;
		transform: translateX(-100%);
		margin-left: -8px;
	}

	.tooltip.right {
		right: 0;
		top: 0;
		transform: translateX(100%);
		margin-right: -8px;
	}

	.tooltip.active {
		opacity: 1;
		visibility: initial;
	}

	.tooltip-slot:hover + .tooltip {
		opacity: 1;
		visibility: initial;
	}
</style>
