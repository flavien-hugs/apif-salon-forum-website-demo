<script lang="ts">
	import { page } from '$app/state';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import { routes } from '#lib/routes.js';
</script>

<PublicPage title={page.status === 404 ? 'Page introuvable' : 'Erreur'}>
	<div class="empty py-12 mx-auto w-full max-w-[640px]">
		<span class="badge neutral">{page.status}</span>
		<h1 class="text-[28px]">
			{page.status === 404 ? 'Page introuvable' : 'Une erreur est survenue'}
		</h1>
		<span class="small">
			{page.status === 404
				? "L'adresse demandée ne correspond à aucune page de l'espace collaboratif."
				: (page.error?.message ?? 'Réessayez dans un instant.')}
		</span>
		<div class="row justify-center">
			<a class="btn btn-primary" href={routes.accueil}>Retour à l'accueil</a>
			<a class="btn btn-secondary" href={routes.annuaire}>Voir l'annuaire</a>
		</div>
	</div>
</PublicPage>
