<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import { PageHero } from '@apif/ui';
	import heroImage from '@apif/ui/assets/hero-connexion.jpg';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import { ficheRoute } from '#lib/routes.js';
	import { ORG_SECTORS, organisations } from '#lib/data/index.js';
	import { filterOrganisations } from '#lib/utils/filters.js';

	let query = $state('');
	let sector = $state('Tous');
	let loading = $state(false);

	const items = $derived(filterOrganisations(organisations, sector, query));
	const sectorSuffix = $derived(sector === 'Tous' ? '' : ` dans le secteur ${sector}`);

	function reset() {
		query = '';
		sector = 'Tous';
		loading = false;
	}
	function simulateLoading() {
		loading = true;
		setTimeout(() => (loading = false), 1400);
	}
</script>

<PublicPage title="Annuaire des fintechs">
	<PageHero
		image={heroImage}
		title="Les acteurs de l'écosystème"
		sub="Consultez les fiches publiques des organisations validées par APIF et identifiez les expertises utiles à vos projets."
	/>

	<div class="gap-3 flex flex-wrap items-center">
		<label class="search max-w-[520px] flex-[1_1_280px]">
			<Search size={18} aria-hidden="true" />
			<input
				placeholder="Nom, expertise, secteur…"
				bind:value={query}
				aria-label="Rechercher une organisation"
			/>
		</label>
		<div class="row" role="group" aria-label="Secteur">
			{#each ORG_SECTORS as k (k)}
				<button
					type="button"
					class="chip"
					class:is-active={sector === k}
					aria-pressed={sector === k}
					onclick={() => (sector = k)}>{k}</button
				>
			{/each}
		</div>
		<button type="button" class="btn btn-tertiary btn-sm" onclick={reset}>Réinitialiser</button>
		<button type="button" class="btn btn-tertiary btn-sm ml-auto" onclick={simulateLoading}
			>Simuler un chargement</button
		>
		<span class="tiny">{items.length} organisation(s) validée(s)</span>
	</div>

	{#if loading}
		<div
			class="gap-5 grid sm:grid-cols-2 md:grid-cols-3"
			aria-busy="true"
			aria-label="Chargement de l'annuaire"
		>
			{#each [1, 2, 3] as i (i)}
				<div class="card gap-3 flex flex-col">
					<span class="skeleton h-11 w-11 rounded-full"></span>
					<span class="skeleton w-[70%]"></span>
					<span class="skeleton w-[95%]"></span>
					<span class="skeleton w-[60%]"></span>
				</div>
			{/each}
		</div>
	{:else}
		<div class="gap-5 grid sm:grid-cols-2 md:grid-cols-3">
			{#each items as o (o.slug)}
				<div class="card hover gap-3 flex flex-col">
					<div class="row">
						<span class="logo-slot sm" aria-hidden="true"
							><span class="init">{o.initials}</span></span
						>
						<span class="tag">{o.sector}</span>
						<span class="tiny ml-auto">{o.city}</span>
					</div>
					<h3 class="text-[17px]">{o.name}</h3>
					<p class="small muted">{o.desc}</p>
					<div class="row">
						{#each o.skills.slice(0, 2) as sk (sk)}<span class="tag grey">{sk}</span>{/each}
					</div>
					<div class="row between mt-auto">
						<span class="badge success">Fiche publique validée</span>
						<a class="btn btn-secondary btn-sm" href={ficheRoute(o.slug)}>Consulter la fiche</a>
					</div>
				</div>
			{/each}
		</div>
		{#if items.length === 0}
			<div class="empty">
				<h4>Aucune organisation ne correspond</h4>
				<span class="small"
					>Aucune fiche validée ne correspond à « {query} »{sectorSuffix}. Essayez un autre terme ou
					retirez le filtre.</span
				>
				<button type="button" class="btn btn-secondary btn-sm" onclick={reset}
					>Réinitialiser les filtres</button
				>
			</div>
		{/if}
	{/if}

	<p class="tiny">
		Les pièces justificatives et les dossiers non publiés ne figurent pas dans l'annuaire. Seules
		les informations publiques des organisations validées sont affichées.
	</p>
</PublicPage>
