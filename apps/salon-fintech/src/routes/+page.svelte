<script lang="ts">
	import Calendar from '@lucide/svelte/icons/calendar';
	import Users from '@lucide/svelte/icons/users';
	import Mic from '@lucide/svelte/icons/mic';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import ChartColumn from '@lucide/svelte/icons/chart-column';
	import heroImage from '@apif/ui/assets/hero-salon.jpg';
	import { resolve } from '$app/paths';
	import { routes } from '#lib/routes.js';
	import { DEMO, featuredExhibitors, profiles, type ProfileId } from '#lib/data/index.js';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';

	let profile = $state<ProfileId | null>(null);
	const profileLabel = $derived(profiles.find((p) => p.id === profile)?.label ?? '');

	const formats = [
		{
			kind: 'Plénière',
			icon: Mic,
			tone: 'green',
			title: "Allocution d'ouverture",
			desc: "Vision, ambitions et opportunités pour l'inclusion financière."
		},
		{
			kind: 'Panel',
			icon: MessageSquare,
			tone: 'orange',
			title: 'Panels thématiques',
			desc: 'Paiements, innovation et nouveaux usages.'
		},
		{
			kind: 'Pitch',
			icon: Briefcase,
			tone: 'green',
			title: 'Pitch Room',
			desc: 'Découvrir les projets et leurs solutions.'
		},
		{
			kind: 'Rencontres',
			icon: Users,
			tone: 'orange',
			title: 'Rendez-vous B2B',
			desc: 'Connecter les acteurs et les partenaires.'
		}
	];

	const profileIcons = {
		visiteur: Users,
		fintech: Briefcase,
		investisseur: ChartColumn,
		partenaire: ShieldCheck
	};
</script>

<svelte:head>
	<title>Salon Fintech Côte d'Ivoire — Accueil</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-surface">
	<SiteHeader />

	<section class="hero-public" style="--hero-pos: 68% 38%; --hero-pos-mobile: 62% 30%">
		<img
			class="bg"
			src={heroImage}
			alt="Participants échangeant lors du salon, devant une carte de l'Afrique"
			fetchpriority="high"
		/>
		<div class="veil" aria-hidden="true"></div>
		<div class="container-site inner">
			<div class="text">
				<span
					class="eyebrow text-white sm:text-white max-sm:text-[11px] max-sm:text-brand-orange-light"
					>Afrique · Innovation · Partenariats · Impact</span
				>
				<h1 class="uppercase">
					Salon des<br class="max-sm:hidden" /> Fintech
					<span class="text-brand-orange">APIF 2026</span>
				</h1>
				<p class="lead">L'innovation financière au service d'une Afrique inclusive.</p>
				<div class="gap-0.5 flex flex-col">
					<span class="font-bold max-sm:text-sm text-[15px]"
						>{DEMO.event.dateLabel} · {DEMO.event.placeLabel}</span
					>
					<span class="max-sm:text-xs text-[13px] text-on-dark-2">{DEMO.event.dateNote}</span>
				</div>
				<div class="cta">
					<a class="btn btn-primary btn-lg" href={routes.inscription}>S'inscrire maintenant</a>
					<a class="btn btn-on-dark btn-lg max-sm:btn" href={routes.exposants}>Devenir exposant</a>
				</div>
			</div>
		</div>
		<span class="credit">Visuel illustratif</span>
	</section>

	<div class="container-site -mt-9 max-sm:-mt-6 relative">
		<div class="card marks px-6 py-5 shadow-[0_8px_24px_rgba(23,36,32,.08)] max-sm:hidden">
			<div class="mark">
				<span class="icon-box" aria-hidden="true"><Calendar size={22} /></span>
				<span class="t"
					><strong>Deux journées</strong><span>Plénières, panels et ateliers</span></span
				>
			</div>
			<div class="mark">
				<span class="icon-box" aria-hidden="true"><Users size={22} /></span>
				<span class="t"
					><strong>Rencontres B2B</strong><span>Rendez-vous ciblés préparés en ligne</span></span
				>
			</div>
			<div class="mark">
				<span class="icon-box" aria-hidden="true"><Mic size={22} /></span>
				<span class="t"
					><strong>Pitch Room</strong><span>Les fintechs présentent leurs solutions</span></span
				>
			</div>
			<div class="mark">
				<span class="icon-box" aria-hidden="true"><ShieldCheck size={22} /></span>
				<span class="t"
					><strong>Badge nominatif</strong><span>Inscription validée par APIF</span></span
				>
			</div>
		</div>
		<!-- Variante mobile (maquette 390 px) : repères condensés en 2 × 2 -->
		<div class="card card-sm gap-3 grid grid-cols-2 sm:hidden">
			<div class="gap-2.5 flex items-center">
				<span class="icon-box h-9 w-9" aria-hidden="true"><Calendar size={18} /></span>
				<div class="stat">
					<span class="value text-xl">4</span><span class="lbl text-[11px]">Formats d'échange</span>
				</div>
			</div>
			<div class="gap-2.5 flex items-center">
				<span class="icon-box h-9 w-9" aria-hidden="true"><Users size={18} /></span>
				<div class="stat">
					<span class="value text-xl">B2B</span><span class="lbl text-[11px]"
						>Rencontres ciblées</span
					>
				</div>
			</div>
			<div class="gap-2.5 flex items-center">
				<span class="icon-box h-9 w-9" aria-hidden="true"><Mic size={18} /></span>
				<div class="stat">
					<span class="value text-xl">Pitch</span><span class="lbl text-[11px]"
						>Projets à découvrir</span
					>
				</div>
			</div>
			<div class="gap-2.5 flex items-center">
				<span class="icon-box h-9 w-9" aria-hidden="true"><ShieldCheck size={18} /></span>
				<div class="stat">
					<span class="value text-xl">1</span><span class="lbl text-[11px]">Compte commun</span>
				</div>
			</div>
		</div>
	</div>

	<section class="container-site gap-5 pt-14 max-sm:pt-8 flex flex-col">
		<div class="page-title">
			<div class="gap-1.5 flex flex-col">
				<span class="eyebrow">Au programme</span>
				<h2>Des échanges concrets pour une finance plus inclusive</h2>
				<span class="row gap-2">
					<span class="badge warning">Programme indicatif</span>
					<span class="small muted">Horaires et intervenants à confirmer par APIF</span>
				</span>
			</div>
			<a class="btn btn-tertiary max-sm:hidden" href={routes.programme}>Voir tout le programme →</a>
		</div>
		<div class="gap-5 max-sm:gap-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{#each formats as f (f.kind)}
				<a
					href={routes.programme}
					class="card hover p-0 flex overflow-hidden text-inherit no-underline hover:no-underline"
				>
					<div
						class="w-12 py-3 pb-2.5 text-white max-sm:w-10 flex flex-none flex-col items-center justify-between max-sm:justify-center"
						class:bg-[linear-gradient(180deg,#139F61_0%,#075C38_100%)]={f.tone === 'green'}
						class:bg-[linear-gradient(180deg,#F9A05A_0%,#F57F20_100%)]={f.tone === 'orange'}
					>
						<f.icon size={20} aria-hidden="true" class="max-sm:hidden" />
						<span
							class="font-bold rotate-180 font-display text-[10px] tracking-[.12em] uppercase [writing-mode:vertical-rl] max-sm:text-[11px]"
							>{f.kind}</span
						>
					</div>
					<div class="gap-1.5 max-sm:p-3.5 flex flex-col p-[18px]">
						<span class="tiny sm:hidden">Horaire à confirmer</span>
						<h3 class="text-base">{f.title}</h3>
						<p class="small muted">{f.desc}</p>
						<span class="font-bold mt-auto font-display text-[13px] text-brand-deep"
							>En savoir plus</span
						>
					</div>
				</a>
			{/each}
		</div>
		<a class="btn btn-tertiary sm:hidden" href={routes.programme}>Voir tout le programme →</a>
	</section>

	<section
		class="container-site gap-8 pt-14 max-sm:pt-8 grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
	>
		<div class="gap-5 flex flex-col">
			<div class="page-title">
				<div class="gap-1.5 flex flex-col">
					<span class="eyebrow">Exposants et solutions</span>
					<h2>Les acteurs clés de l'écosystème</h2>
				</div>
				<a class="btn btn-tertiary max-sm:hidden" href={routes.exposants}>Voir tout →</a>
			</div>
			<div class="gap-4 max-sm:gap-2.5 grid grid-cols-3">
				{#each featuredExhibitors as o (o.initials)}
					<a
						href={routes.exposants}
						class="card card-sm hover gap-2.5 max-sm:gap-1.5 max-sm:p-3 flex flex-col text-inherit no-underline hover:no-underline"
					>
						<span class="logo-slot max-sm:hidden" aria-hidden="true"
							><span class="init">{o.initials}</span></span
						>
						<span class="avatar sq h-9 w-9 text-xs sm:hidden" aria-hidden="true">{o.initials}</span>
						<h4 class="max-sm:text-xs">{o.name}</h4>
						<span class="tag self-start max-sm:hidden">{o.sector}</span>
						<span class="tiny sm:hidden">{o.sector}</span>
					</a>
				{/each}
			</div>
			<p class="tiny">Fiches illustratives. Exposants et intervenants à confirmer par APIF.</p>
		</div>
		<div class="card gap-3.5 flex flex-col border-[#BFE6D2]">
			<h3>Rejoignez l'événement</h3>
			<p class="small muted text-xs">
				Sélectionnez votre profil pour préparer votre participation.
			</p>
			<div class="gap-2.5 max-sm:gap-2 grid grid-cols-2">
				{#each profiles as p (p.id)}
					{@const Icon = profileIcons[p.id]}
					<button
						type="button"
						class="btn btn-secondary justify-between"
						class:border-brand-orange={profile === p.id}
						class:bg-brand-orange-soft={profile === p.id}
						aria-pressed={profile === p.id}
						onclick={() => (profile = p.id)}
					>
						<span class="gap-2 inline-flex items-center"
							><Icon size={16} aria-hidden="true" class="max-sm:hidden" />{p.label}</span
						>
						<span aria-hidden="true" class="max-sm:hidden">→</span>
					</button>
				{/each}
			</div>
			{#if profile}
				<div class="alert success" role="status">
					<span
						>Profil <strong>{profileLabel}</strong> sélectionné. Vous pouvez poursuivre l'inscription.</span
					>
				</div>
			{/if}
			<a
				class="btn btn-primary"
				href={profile ? resolve(`/inscription?profil=${profile}`) : routes.inscription}
				>Continuer vers l'inscription</a
			>
		</div>
	</section>

	<section class="container-site pt-14 max-sm:pt-8">
		<div class="card gap-5 flex flex-wrap items-center bg-canvas max-sm:hidden">
			<span class="icon-box orange h-16 w-16 rounded-xl" aria-hidden="true"
				><Users size={28} /></span
			>
			<div class="gap-1 flex min-w-[200px] flex-1 flex-col">
				<span class="eyebrow">Rencontres et mise en relation</span>
				<h3>Des rendez-vous B2B préparés avant le salon</h3>
				<span class="small muted"
					>Suggestions fondées sur votre secteur, proposition de créneaux et agenda sans
					chevauchement, depuis votre espace participant.</span
				>
			</div>
			<a class="btn btn-secondary" href={routes.rencontres}>Découvrir les rencontres B2B</a>
		</div>
		<!-- Variante mobile (maquette 390 px) : bloc vert profond -->
		<div class="gap-2.5 rounded-2xl p-6 text-white flex flex-col bg-brand-deep sm:hidden">
			<span class="eyebrow text-[11px] text-brand-orange-light">Rencontres B2B</span>
			<h2 class="text-white text-[22px]">Des rendez-vous préparés avant le salon</h2>
			<p class="small text-on-dark-2">
				Suggestions, proposition de créneaux et agenda sans chevauchement depuis votre espace
				participant.
			</p>
			<a class="btn btn-primary" href={routes.rencontres}>Découvrir les rencontres</a>
		</div>
	</section>

	<SiteFooter />
</div>
