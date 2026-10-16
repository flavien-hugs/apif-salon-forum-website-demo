<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteHeader from './SiteHeader.svelte';
	import SiteFooter from './SiteFooter.svelte';

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
	<title>{title} — Salon Fintech Côte d'Ivoire</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-canvas">
	<SiteHeader />
	<main class="container-site gap-5 pt-6 pb-12 flex w-full flex-1 flex-col">
		{@render children()}
	</main>
	<SiteFooter />
</div>
