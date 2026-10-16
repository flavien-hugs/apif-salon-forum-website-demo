<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		sub,
		eyebrow,
		image,
		children
	}: { title?: string; sub?: string; eyebrow?: string; image: string; children?: Snippet } =
		$props();
</script>

<div class="page-hero">
	<img class="photo" src={image} alt="" aria-hidden="true" />
	{#if eyebrow}<span class="eyebrow text-brand-orange-light">{eyebrow}</span>{/if}
	{#if title}<h1>{title}</h1>{/if}
	{#if sub}<p class="sub">{sub}</p>{/if}
	{@render children?.()}
</div>
