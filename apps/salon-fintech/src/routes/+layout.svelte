<script lang="ts">
	import './layout.css';
	import favicon from '@apif/ui/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Salon Fintech Côte d'Ivoire — l'innovation financière au service d'une Afrique inclusive. Programme, exposants, Pitch Room, rencontres B2B et inscription."
	/>
</svelte:head>

<div id="top"></div>
{@render children()}
