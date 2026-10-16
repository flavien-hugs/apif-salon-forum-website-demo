<script lang="ts">
	import Globe from '@lucide/svelte/icons/globe';
	import Mail from '@lucide/svelte/icons/mail';
	import { resolve } from '$app/paths';
	import heroImage from '@apif/ui/assets/hero-connexion.jpg';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import { routes } from '#lib/routes.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const o = $derived(data.organisation);
	// La prise de contact est réservée aux membres connectés (maquette) :
	// un visiteur est renvoyé vers la connexion commune.
	const contactHref = $derived(resolve(`/auth/connexion?next=/annuaire/${o.slug}`));
</script>

<PublicPage title={o.name}>
	<nav class="crumbs" aria-label="Fil d'Ariane">
		<a href={routes.accueil}>Accueil</a><span>›</span><a href={routes.annuaire}>Annuaire</a><span
			>›</span
		><span class="cur">{o.name}</span>
	</nav>
	<div class="page-hero min-h-[150px]">
		<img class="photo" src={heroImage} alt="" aria-hidden="true" />
		<div class="row">
			<span class="avatar sq h-16 w-16 text-xl bg-surface text-brand-deep">{o.initials}</span>
			<div>
				<h1 class="text-[30px] max-sm:text-[24px]">{o.name}</h1>
				<span class="text-sm text-on-dark-2"
					>Exemple de fiche publique · {o.sector} · Côte d'Ivoire</span
				>
			</div>
		</div>
	</div>

	<div class="gap-5 grid items-start md:grid-cols-2">
		<div class="card gap-3.5 flex flex-col">
			<h3>Présentation</h3>
			<p class="small">{o.presentation}</p>
			<div class="row">
				<span class="badge success">Fiche publique validée</span><span class="tiny"
					>Validée par APIF — date d'exemple : {o.validatedOn}</span
				>
			</div>
			<div class="gap-2 flex flex-col">
				<span class="label">Expertises</span>
				<div class="row">
					{#each o.skills as sk (sk)}<span class="tag">{sk}</span>{/each}
				</div>
			</div>
			<div class="gap-2 flex flex-col">
				<span class="label">Activité</span>
				<table class="table">
					<tbody>
						<tr><td class="muted w-40">Pays</td><td>Côte d'Ivoire</td></tr>
						<tr><td class="muted">Ville</td><td>{o.city}</td></tr>
						<tr><td class="muted">Secteur</td><td>{o.sector}</td></tr>
						<tr
							><td class="muted">Année de création</td><td>[à renseigner par l'organisation]</td
							></tr
						>
						<tr><td class="muted">Taille</td><td>[à renseigner]</td></tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="gap-5 flex flex-col">
			<div class="card gap-3.5 flex flex-col">
				<h3>Solutions et besoins</h3>
				<div class="gap-1 flex flex-col">
					<span class="label">Solution présentée</span>
					<p class="small muted">{o.solution}</p>
				</div>
				<div class="gap-1 flex flex-col">
					<span class="label">Besoins déclarés</span>
					<p class="small muted">{o.needs}</p>
				</div>
				<a class="btn btn-primary self-start" href={contactHref}>Demander un contact</a>
				<span class="tiny"
					>La prise de contact est soumise aux droits de votre compte et aux règles retenues par
					APIF.</span
				>
			</div>
			<div class="card gap-3 flex flex-col">
				<h3>Coordonnées publiques autorisées</h3>
				<div class="row">
					<span class="icon-box h-9 w-9" aria-hidden="true"><Globe size={16} /></span><span
						class="small">[site web autorisé]</span
					>
				</div>
				<div class="row">
					<span class="icon-box h-9 w-9" aria-hidden="true"><Mail size={16} /></span><span
						class="small">[e-mail de contact autorisé]</span
					>
				</div>
				<span class="tiny"
					>Les coordonnées affichées sont celles que l'organisation a choisi de rendre publiques.</span
				>
			</div>
		</div>
	</div>

	<div class="card gap-3 flex flex-col">
		<h3>Informations publiées</h3>
		<div class="table-wrap">
			<table class="table">
				<thead><tr><th>Champ</th><th>Exemple affiché</th><th>Visibilité</th></tr></thead>
				<tbody>
					<tr
						><td>Pays</td><td>Côte d'Ivoire</td><td><span class="badge brand">Public</span></td></tr
					>
					<tr
						><td>Secteur</td><td>{o.sector}</td><td><span class="badge brand">Public</span></td></tr
					>
					<tr
						><td>Présentation</td><td>Validée avant publication</td><td
							><span class="badge brand">Public</span></td
						></tr
					>
					<tr
						><td>Pièces justificatives</td><td>Non affichées</td><td
							><span class="badge neutral">Privé — gestionnaires APIF</span></td
						></tr
					>
					<tr
						><td>Échanges de validation</td><td>Non affichés</td><td
							><span class="badge neutral">Privé</span></td
						></tr
					>
				</tbody>
			</table>
		</div>
		<span class="tiny"
			>Les pièces privées et les échanges de validation ne sont jamais exposés sur cette fiche.</span
		>
	</div>
</PublicPage>
