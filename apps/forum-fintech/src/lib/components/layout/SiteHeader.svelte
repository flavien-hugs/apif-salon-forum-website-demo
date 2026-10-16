<script lang="ts">
	import { page } from '$app/state';
	import { SiteHeader } from '@apif/ui';
	import { routes } from '#lib/routes.js';

	const links = [
		{ href: routes.accueil, label: 'Accueil' },
		{ href: routes.annuaire, label: 'Annuaire' },
		{ href: routes.communaute, label: 'Communauté' },
		{ href: routes.ressources, label: 'Ressources' },
		{ href: routes.coaching, label: 'Coaching' }
	];
	// L'annuaire reste actif sur les fiches d'organisation.
	const currentPath = $derived(
		page.url.pathname.startsWith(routes.annuaire) ? routes.annuaire : page.url.pathname
	);
</script>

<SiteHeader
	title="Espace collaboratif"
	subtitle="et d'échange"
	homeHref={routes.accueil}
	{links}
	cta={{ href: routes.connexion, label: 'Se connecter' }}
	mobileActions={[{ href: routes.connexion, label: 'Se connecter', variant: 'primary' }]}
	{currentPath}
/>
