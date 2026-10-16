<script lang="ts">
	import Calendar from '@lucide/svelte/icons/calendar';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Check from '@lucide/svelte/icons/check';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import PageHero from '#lib/components/layout/PageHero.svelte';
	import { CheckItem } from '@apif/ui';
	import { routes } from '#lib/routes.js';
	import { DEMO, faqs } from '#lib/data/index.js';

	let open = $state(0);
</script>

<PublicPage title="Informations pratiques">
	<PageHero
		title="Toutes les informations pratiques"
		sub="Les informations définitives seront publiées après validation par APIF."
	/>

	<div class="gap-5 grid md:grid-cols-3">
		<div class="card gap-2.5 flex flex-col">
			<div class="row">
				<span class="icon-box" aria-hidden="true"><Calendar size={20} /></span>
				<h3>Date et horaires</h3>
			</div>
			<strong class="text-lg font-display">{DEMO.event.dateLabel}</strong>
			<span class="badge warning self-start">Date exacte à confirmer</span>
			<p class="small muted">
				Horaires d'ouverture, accueil des participants et plénières seront précisés avec le
				programme définitif.
			</p>
		</div>
		<div class="card gap-2.5 flex flex-col">
			<div class="row">
				<span class="icon-box" aria-hidden="true"><MapPin size={20} /></span>
				<h3>Lieu et accès</h3>
			</div>
			<strong class="text-lg font-display">{DEMO.event.placeLabel}</strong>
			<span class="badge warning self-start">Lieu et adresse à confirmer</span>
			<p class="small muted">
				Modalités d'accès, transports et stationnement seront publiés ici, avec un plan d'accès.
			</p>
			<div
				class="flex h-[120px] items-center justify-center rounded-[10px] border border-dashed border-line-strong bg-brand-green-soft"
			>
				<span class="tiny">Plan d'accès — emplacement réservé</span>
			</div>
		</div>
		<div class="card gap-2.5 flex flex-col">
			<div class="row">
				<span class="icon-box" aria-hidden="true"><Check size={20} /></span>
				<h3>À prévoir</h3>
			</div>
			<CheckItem>Votre confirmation d'inscription</CheckItem>
			<CheckItem>Votre badge (disponible après validation, sur mobile ou imprimé)</CheckItem>
			<CheckItem>Une pièce d'identité pour l'accueil</CheckItem>
			<CheckItem>Vos rendez-vous B2B préparés depuis votre espace</CheckItem>
			<a class="btn btn-secondary btn-sm self-start" href={routes.monEspace}>Ouvrir mon espace</a>
		</div>
	</div>

	<div class="gap-6 grid items-start md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
		<div class="card gap-1 flex flex-col">
			<h3 class="mb-2.5">Questions fréquentes</h3>
			{#each faqs as f, i (f.q)}
				<div class="border-t border-line">
					<button
						type="button"
						class="gap-3 px-0 py-2 font-bold flex min-h-[52px] w-full cursor-pointer items-center justify-between border-0 bg-transparent text-left font-display text-[15px] text-brand-deep"
						aria-expanded={open === i}
						aria-controls="faq-{i}"
						onclick={() => (open = open === i ? -1 : i)}
					>
						<span>{f.q}</span><span aria-hidden="true">{open === i ? '−' : '+'}</span>
					</button>
					{#if open === i}
						<p class="small pb-3.5 text-ink-2" id="faq-{i}">{f.a}</p>
					{/if}
				</div>
			{/each}
		</div>
		<div class="gap-4 flex flex-col">
			<div class="card gap-3 flex flex-col">
				<h3>Contacts et assistance</h3>
				<div class="row">
					<span class="avatar sm">AP</span>
					<div>
						<strong class="small">Équipe du salon — APIF CI</strong><br /><span class="tiny"
							>Inscriptions, badges, programme</span
						>
					</div>
				</div>
				<div class="field">
					<span class="label">E-mail</span><span class="small muted"
						>[adresse de contact à confirmer]</span
					>
				</div>
				<div class="field">
					<span class="label">Téléphone</span><span class="small muted">[numéro à confirmer]</span>
				</div>
				<a class="btn btn-secondary btn-sm self-start" href={routes.connexion}
					>Poser une question à la communauté</a
				>
			</div>
			<div class="card gap-2.5 flex flex-col">
				<h3>Programme pratique</h3>
				<div class="row between">
					<span class="small">Accueil et contrôle des badges</span><span class="tiny"
						>à confirmer</span
					>
				</div>
				<div class="row between">
					<span class="small">Ouverture et plénières</span><span class="tiny">à confirmer</span>
				</div>
				<div class="row between">
					<span class="small">Pitch Room et rencontres B2B</span><span class="tiny"
						>à confirmer</span
					>
				</div>
				<a class="btn btn-tertiary btn-sm self-start" href={routes.programme}
					>Voir le programme détaillé →</a
				>
			</div>
		</div>
	</div>
</PublicPage>
