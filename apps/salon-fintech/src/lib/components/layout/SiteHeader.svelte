<script lang="ts">
	import { page } from '$app/state';
	import { SiteHeader } from '@apif/ui';
	import { routes } from '#lib/routes.js';

	const links = [
		{ href: routes.accueil, label: 'Accueil' },
		{ href: routes.programme, label: 'Programme' },
		{ href: routes.exposants, label: 'Exposants' },
		{ href: routes.pitchRoom, label: 'Pitch Room' },
		{ href: routes.rencontres, label: 'B2B' },
		{ href: routes.infos, label: 'Infos pratiques' }
	];
	const mobileLinks = [
		{ href: routes.programme, label: 'Programme' },
		{ href: routes.exposants, label: 'Exposants' },
		{ href: routes.pitchRoom, label: 'Pitch Room' },
		{ href: routes.rencontres, label: 'Rencontres B2B' },
		{ href: routes.infos, label: 'Infos pratiques' }
	];
</script>

<SiteHeader
	title="Salon Fintech"
	subtitle="Côte d'Ivoire"
	homeHref={routes.accueil}
	{links}
	{mobileLinks}
	cta={{ href: routes.inscription, label: "S'inscrire" }}
	mobileActions={[
		{ href: routes.inscription, label: "S'inscrire", variant: 'primary' },
		{ href: routes.connexion, label: 'Me connecter', variant: 'secondary' }
	]}
	currentPath={page.url.pathname}
/>
