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
		content="Espace collaboratif et d'échange APIF CI — connecter, accompagner et faire grandir l'écosystème fintech ivoirien. Annuaire des acteurs, communauté, ressources et coaching."
	/>
</svelte:head>

<div id="top"></div>
{@render children()}
