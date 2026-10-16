<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import PublicPage from './layout/PublicPage.svelte';
	import { routes } from '#lib/routes.js';

	/* Page réservée (hors périmètre public) : on renvoie vers la connexion commune
	   côté client, avec la page d'origine en paramètre `next`. La redirection se
	   fait au montage (et non dans `load`) pour que le pré-rendu n'écrive aucun
	   fichier `connexion?next=…`. */
	let { next, label }: { next: string; label: string } = $props();

	onMount(() => {
		void goto(resolve(`/auth/connexion?next=${next}`), { replaceState: true });
	});
</script>

<PublicPage title="Connexion requise">
	<div class="alert info mx-auto w-full max-w-[860px]" role="status">
		<span>
			<strong>Connexion requise.</strong>
			{label}
			<a href={routes.connexion}>Se connecter</a>
		</span>
	</div>
</PublicPage>
