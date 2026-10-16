<script lang="ts">
	import type { Snippet } from 'svelte';
	import { PageHero } from '@apif/ui';
	import heroImage from '@apif/ui/assets/hero-salon.jpg';

	let {
		title,
		sub,
		eyebrow,
		children
	}: { title: string; sub?: string; eyebrow?: string; children?: Snippet } = $props();
</script>

<PageHero image={heroImage} {title} {sub} {eyebrow}>
	{@render children?.()}
</PageHero>
