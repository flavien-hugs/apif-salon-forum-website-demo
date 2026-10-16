<script lang="ts">
	import { SiteFooter } from '@apif/ui';
	import { ESPACE_URL, routes } from '#lib/routes.js';
</script>

<SiteFooter
	description="Agence de promotion de l'inclusion financière de Côte d'Ivoire. Un écosystème pour connecter les acteurs et accompagner les projets."
	usefulLinks={[
		{ href: `${ESPACE_URL}/annuaire`, label: 'Annuaire des acteurs', external: true },
		{ href: ESPACE_URL, label: 'Ressources et formation', external: true },
		{ href: routes.programme, label: 'Programme du salon' }
	]}
	communityLinks={[
		{ href: routes.connexion, label: 'Créer ou retrouver mon compte' },
		{ href: '#top', label: 'Confidentialité' },
		{ href: '#top', label: "Conditions d'utilisation" }
	]}
	legal="Maquette de travail · Visuels et contenus illustratifs · Informations du salon à valider par APIF"
/>
