<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import User from '@lucide/svelte/icons/user';
	import Mail from '@lucide/svelte/icons/mail';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Pencil from '@lucide/svelte/icons/pencil';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import PageHero from '#lib/components/layout/PageHero.svelte';
	import { Drawer } from '@apif/ui';
	import { Modal } from '@apif/ui';
	import { TextField } from '@apif/ui';
	import { Combobox } from '@apif/ui';
	import { routes } from '#lib/routes.js';
	import { EXHIBITOR_SECTORS, demoSlots, exhibitors, type Exhibitor } from '#lib/data/index.js';
	import { filterExhibitors } from '#lib/utils/filters.js';

	let query = $state('');
	let sector = $state('Tous');
	let drawer = $state<Exhibitor | null>(null);
	let modal = $state<Exhibitor | null>(null);
	let sent = $state(false);
	let dName = $state('');
	let dMail = $state('');
	let slot = $state('Pendant le salon');
	let slotOther = $state('');
	let need = $state('');

	const list = $derived(filterExhibitors(exhibitors, sector, query));

	function reset() {
		query = '';
		sector = 'Tous';
	}
	function openDemo(x: Exhibitor) {
		modal = x;
		sent = false;
	}
	function closeModal() {
		modal = null;
		sent = false;
	}
</script>

<PublicPage title="Exposants et solutions">
	<PageHero
		title="Découvrez les solutions de l'écosystème"
		sub="Fiches de démonstration, à remplacer par les exposants confirmés par APIF."
	/>

	<div class="gap-3 flex flex-wrap items-center">
		<label class="search max-w-[520px] flex-[1_1_280px]">
			<Search size={18} aria-hidden="true" />
			<input
				placeholder="Rechercher une solution ou un secteur…"
				bind:value={query}
				aria-label="Rechercher un exposant"
			/>
		</label>
		<div class="row" role="group" aria-label="Secteur">
			{#each EXHIBITOR_SECTORS as k (k)}
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
		<span class="tiny ml-auto">{list.length} exposant(s) · fiches illustratives</span>
	</div>

	<div class="gap-5 grid sm:grid-cols-2 md:grid-cols-3">
		{#each list as x (x.id)}
			<div class="card hover gap-3 flex flex-col">
				<div class="row between">
					<span class="demo">Fiche illustrative</span><span class="tag">{x.sector}</span>
				</div>
				<div class="row">
					<span class="logo-slot sm" aria-hidden="true"><span class="init">{x.initials}</span></span
					>
					<h3 class="text-[17px]">{x.name}</h3>
				</div>
				<p class="small muted">{x.desc}</p>
				<div class="row mt-auto">
					<button type="button" class="btn btn-secondary btn-sm" onclick={() => (drawer = x)}
						>Voir la fiche</button
					>
					<button type="button" class="btn btn-primary btn-sm" onclick={() => openDemo(x)}
						>Demander une démonstration</button
					>
				</div>
			</div>
		{/each}
	</div>
	{#if list.length === 0}
		<div class="empty">
			<h4>Aucun exposant ne correspond</h4>
			<span class="small">Modifiez la recherche ou le secteur sélectionné.</span>
			<button type="button" class="btn btn-secondary btn-sm" onclick={reset}>Réinitialiser</button>
		</div>
	{/if}

	<div class="card gap-6 flex flex-wrap items-center justify-between">
		<div class="gap-1.5 flex max-w-[640px] flex-col">
			<h3>Vous souhaitez présenter votre organisation ?</h3>
			<p class="small muted">
				La participation est traitée selon les catégories et les règles retenues par APIF. Le
				dossier se constitue depuis l'espace collaboratif.
			</p>
		</div>
		<a class="btn btn-secondary" href={routes.connexion}>Demander à participer</a>
	</div>
</PublicPage>

<Drawer open={!!drawer && !modal} label="Fiche exposant" onclose={() => (drawer = null)}>
	{#if drawer}
		{@const sel = drawer}
		<div class="row between">
			<span class="demo">Fiche illustrative</span>
			<button type="button" class="btn btn-secondary btn-sm" onclick={() => (drawer = null)}
				>Fermer</button
			>
		</div>
		<div class="row">
			<span class="avatar sq h-14 w-14 text-lg">{sel.initials}</span>
			<div>
				<h2 class="text-[22px]">{sel.name}</h2>
				<span class="tag">{sel.sector}</span>
			</div>
		</div>
		<div
			class="p-4 flex h-[140px] items-center justify-center rounded-[10px] bg-brand-green-soft text-center"
		>
			<span class="small muted">Visuel de la solution — à fournir par l'exposant</span>
		</div>
		<div class="gap-1.5 flex flex-col">
			<span class="label">La solution</span>
			<p class="small">{sel.long}</p>
		</div>
		<div class="gap-1.5 flex flex-col">
			<span class="label">Publics visés</span>
			<div class="row">
				<span class="tag grey">{sel.audiences[0]}</span><span class="tag grey"
					>{sel.audiences[1]}</span
				>
			</div>
		</div>
		<div class="gap-1.5 flex flex-col">
			<span class="label">Au salon</span><span class="small muted"
				>Stand et créneaux de démonstration à confirmer.</span
			>
		</div>
		<div class="row mt-auto">
			<button type="button" class="btn btn-primary" onclick={() => openDemo(sel)}
				>Demander une démonstration</button
			>
			<a class="btn btn-tertiary" href={routes.rencontres}>Proposer un rendez-vous B2B</a>
		</div>
	{/if}
</Drawer>

<Modal open={!!modal} labelledby="dm" onclose={closeModal}>
	{#if modal}
		{#if !sent}
			<h3 id="dm">Demander une démonstration — {modal.name}</h3>
			<form
				class="contents"
				novalidate
				onsubmit={(e) => {
					e.preventDefault();
					sent = true;
				}}
			>
				<TextField
					id="d1"
					label="Votre nom"
					required
					placeholder="Prénom Nom"
					bind:value={dName}
					autocomplete="name"
				>
					{#snippet icon()}<User size={18} aria-hidden="true" />{/snippet}
				</TextField>
				<TextField
					id="d2"
					label="Adresse e-mail"
					type="email"
					required
					placeholder="nom@organisation.ci"
					bind:value={dMail}
					autocomplete="email"
				>
					{#snippet icon()}<Mail size={18} aria-hidden="true" />{/snippet}
				</TextField>
				<Combobox id="d3" label="Créneau souhaité" options={demoSlots} bind:value={slot}>
					{#snippet icon()}<Calendar size={18} aria-hidden="true" />{/snippet}
				</Combobox>
				{#if slot === 'Autre'}
					<TextField
						id="d3b"
						label="Précisez le créneau"
						required
						placeholder="Ex. semaine du 8 décembre, le matin"
						bind:value={slotOther}
					>
						{#snippet icon()}<Pencil size={18} aria-hidden="true" />{/snippet}
					</TextField>
				{/if}
				<div class="field">
					<label class="label" for="d4">Votre besoin</label>
					<div class="input-wrap ta">
						<textarea
							class="textarea"
							id="d4"
							placeholder="Ce que vous souhaitez voir"
							bind:value={need}></textarea>
					</div>
				</div>
				<div class="row justify-end">
					<button type="button" class="btn btn-secondary" onclick={closeModal}>Annuler</button>
					<button type="submit" class="btn btn-primary">Envoyer la demande</button>
				</div>
			</form>
		{:else}
			<div class="alert success" role="status">
				<strong>Demande enregistrée (démonstration).</strong>
				<span
					>L'exposant reçoit votre demande et vous propose un créneau. Aucun e-mail réel n'est
					envoyé dans ce prototype.</span
				>
			</div>
			<div class="row justify-end">
				<button type="button" class="btn btn-primary" onclick={closeModal}>Fermer</button>
			</div>
		{/if}
	{/if}
</Modal>
