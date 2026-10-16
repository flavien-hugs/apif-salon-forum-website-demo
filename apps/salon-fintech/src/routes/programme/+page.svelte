<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import PageHero from '#lib/components/layout/PageHero.svelte';
	import { routes } from '#lib/routes.js';
	import {
		SESSION_DAYS,
		SESSION_KINDS,
		sessions,
		type SessionDay,
		type SessionKind
	} from '#lib/data/index.js';
	import { filterSessions } from '#lib/utils/filters.js';

	let day = $state<'Tous' | SessionDay>('Tous');
	let kind = $state<'Tous' | SessionKind>('Tous');
	let query = $state('');
	let selected = $state<number | null>(2);
	let added = $state<Record<number, boolean>>({});

	const list = $derived(filterSessions(sessions, day, kind, query));
	const detail = $derived(sessions.find((s) => s.id === selected) ?? null);

	function reset() {
		day = 'Tous';
		kind = 'Tous';
		query = '';
	}
</script>

<PublicPage title="Programme">
	<PageHero
		title="Un programme pour échanger et avancer"
		sub="Sélectionnez un format pour préparer votre participation. Programme de démonstration."
	/>

	<div class="card card-sm filter-bar">
		<div class="filter-group" role="group" aria-label="Jour">
			<span class="glbl">Jour</span>
			{#each SESSION_DAYS as d (d)}
				<button
					type="button"
					class="chip"
					class:is-active={day === d}
					aria-pressed={day === d}
					onclick={() => (day = d)}>{d}</button
				>
			{/each}
		</div>
		<div class="filter-group" role="group" aria-label="Format">
			<span class="glbl">Format</span>
			{#each SESSION_KINDS as k (k)}
				<button
					type="button"
					class="chip"
					class:is-active={kind === k}
					aria-pressed={kind === k}
					onclick={() => (kind = k)}>{k}</button
				>
			{/each}
		</div>
		<label class="search min-h-10 ml-auto flex-[1_1_220px]">
			<Search size={18} aria-hidden="true" />
			<input
				placeholder="Thématique, intervenant…"
				bind:value={query}
				aria-label="Rechercher dans le programme"
			/>
		</label>
	</div>
	<div class="row between">
		<span class="small muted"
			>{list.length} session(s) ·
			<span class="badge warning align-middle">Programme indicatif</span></span
		>
		<button type="button" class="btn btn-tertiary btn-sm" onclick={reset}
			>Réinitialiser les filtres</button
		>
	</div>

	<div class="gap-6 grid items-start md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
		<div class="gap-3 flex flex-col">
			{#each list as s (s.id)}
				<div
					class="card hover gap-5 px-5 max-sm:gap-3 flex items-center py-[18px] max-sm:flex-col max-sm:items-stretch"
					class:border-brand-green={s.id === selected}
				>
					<div class="max-sm:gap-2 flex min-w-[72px] flex-col items-center max-sm:flex-row">
						<span class="font-extrabold font-display text-[22px] text-brand-deep">{s.time}</span>
						<span class="tiny">{s.day} · illustratif</span>
					</div>
					<div class="min-w-0 gap-1.5 flex flex-1 flex-col">
						<span class="tag self-start">{s.kind}</span>
						<h3 class="text-[17px]">{s.title}</h3>
						<span class="small muted">{s.theme} · {s.place} · Intervenants à confirmer</span>
					</div>
					<button type="button" class="btn btn-secondary btn-sm" onclick={() => (selected = s.id)}
						>Voir la session</button
					>
				</div>
			{/each}
			{#if list.length === 0}
				<div class="empty">
					<h4>Aucune session ne correspond</h4>
					<span class="small">Essayez un autre jour, un autre format ou effacez la recherche.</span>
					<button type="button" class="btn btn-secondary btn-sm" onclick={reset}
						>Réinitialiser les filtres</button
					>
				</div>
			{/if}
		</div>

		<aside class="card gap-3.5 md:top-4 flex flex-col md:sticky">
			{#if detail}
				<div class="row between">
					<span class="tag">{detail.kind}</span><span class="demo">Démonstration</span>
				</div>
				<h2 class="text-[22px]">{detail.title}</h2>
				<div class="gap-2.5 grid grid-cols-2 text-[13px]">
					<div>
						<span class="tiny">Horaire</span><br /><strong>{detail.day} · {detail.time}</strong>
					</div>
					<div><span class="tiny">Lieu</span><br /><strong>{detail.place}</strong></div>
					<div><span class="tiny">Thématique</span><br /><strong>{detail.theme}</strong></div>
					<div><span class="tiny">Langue</span><br /><strong>Français</strong></div>
				</div>
				<p class="small muted">{detail.desc}</p>
				<div class="gap-2 flex flex-col">
					<span class="label">Intervenants</span>
					{#each ['IA', 'IB'] as initials (initials)}
						<div class="row">
							<span class="avatar sm">{initials}</span>
							<div class="flex flex-col">
								<strong class="small">Intervenant·e à confirmer</strong>
								<span class="tiny">Fonction et organisation à confirmer</span>
							</div>
						</div>
					{/each}
				</div>
				{#if added[detail.id]}
					<div class="alert info" role="status">
						<span>
							<strong>Connexion requise.</strong> L'agenda personnel est réservé aux participants
							inscrits :
							<a href={routes.connexion}>connectez-vous</a> ou
							<a href={routes.inscription}>inscrivez-vous</a> pour enregistrer cette session.
						</span>
					</div>
				{/if}
				<div class="row">
					<button
						type="button"
						class="btn btn-primary"
						title="Connexion requise"
						onclick={() => detail && (added = { ...added, [detail.id]: true })}
						>Ajouter à mon agenda</button
					>
					<a class="btn btn-tertiary" href={routes.inscription}>M'inscrire au salon</a>
				</div>
			{:else}
				<div class="empty px-2 py-6 border-0">
					<h4>Détail d'une session</h4>
					<span class="small"
						>Choisissez une session dans la liste pour afficher son horaire, son lieu, sa
						description et ses intervenants.</span
					>
				</div>
			{/if}
		</aside>
	</div>
</PublicPage>
