<script lang="ts">
	import { SiteFooter } from '@apif/ui';
	import { SALON_URL, routes } from '#lib/routes.js';
</script>

<SiteFooter
	description="Agence de promotion de l'inclusion financière de Côte d'Ivoire. Un écosystème pour connecter les acteurs et accompagner les projets."
	usefulLinks={[
		{ href: routes.annuaire, label: 'Annuaire des acteurs' },
		{ href: routes.ressources, label: 'Ressources et formation' },
		{ href: SALON_URL, label: 'Salon Fintech', external: true }
	]}
	communityLinks={[
		{ href: routes.connexion, label: 'Créer ou retrouver mon compte' },
		{ href: '#top', label: 'Confidentialité' },
		{ href: '#top', label: "Conditions d'utilisation" }
	]}
	legal="Maquette de travail · Visuels et contenus illustratifs · Informations à valider par APIF"
/>
