<script lang="ts">
	import { LoginPage } from '@apif/ui';
	import { ESPACE_URL, routes } from '#lib/routes.js';
</script>

<svelte:head>
	<title>Connexion — Compte APIF</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-canvas">
	<LoginPage
		homeHref={routes.accueil}
		salon={{ href: routes.accueil, label: 'Salon Fintech' }}
		espace={{ href: ESPACE_URL, label: 'Espace collaboratif', external: true }}
		createAccountHref={{ href: routes.inscription, label: 'Créer mon compte' }}
		nextLabels={{
			[routes.rencontres]: 'Les rencontres B2B sont réservées aux participants inscrits.',
			[routes.monEspace]: "L'espace participant est réservé aux participants inscrits."
		}}
	/>
</div>
