<script lang="ts">
	import { LoginPage } from '@apif/ui';
	import { SALON_URL, routes } from '#lib/routes.js';
</script>

<svelte:head>
	<title>Connexion — Compte APIF</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-canvas">
	<LoginPage
		homeHref={routes.accueil}
		salon={{ href: SALON_URL, label: 'Salon Fintech', external: true }}
		espace={{ href: routes.accueil, label: 'Espace collaboratif' }}
		createAccountHref={{
			href: `${SALON_URL}/inscription`,
			label: 'Créer mon compte',
			external: true
		}}
		nextLabels={{
			[routes.communaute]: 'La communauté est réservée aux membres connectés.',
			[routes.ressources]:
				'Les ressources et parcours de formation sont réservés aux membres connectés.',
			[routes.coaching]: 'Le coaching est réservé aux membres connectés.',
			[routes.monEspace]: 'Votre espace membre nécessite une connexion.'
		}}
	/>
</div>
