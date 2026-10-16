<script lang="ts">
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Users from '@lucide/svelte/icons/users';
	import FileText from '@lucide/svelte/icons/file-text';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import Search from '@lucide/svelte/icons/search';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import heroImage from '@apif/ui/assets/hero-connexion.jpg';
	import { SALON_URL, ficheRoute, routes } from '#lib/routes.js';
	import { featuredOrganisations } from '#lib/data/index.js';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';

	const quickLinks = [
		{ href: routes.annuaire, icon: Briefcase, title: 'Annuaire', sub: 'Acteurs et expertises' },
		{ href: routes.communaute, icon: Users, title: 'Communauté', sub: 'Échanges et entraide' },
		{ href: routes.ressources, icon: FileText, title: 'Ressources', sub: 'Apprentissage' },
		{ href: routes.coaching, icon: GraduationCap, title: 'Coaching', sub: 'Accompagnement' }
	];
	const features = [
		{
			href: routes.annuaire,
			icon: Search,
			orange: false,
			title: 'Annuaire',
			desc: 'Identifier les organisations validées et leurs expertises.',
			link: "Voir l'annuaire"
		},
		{
			href: routes.ressources,
			icon: FileText,
			orange: true,
			title: 'Ressources',
			desc: 'Consulter les guides et suivre les parcours de formation.',
			link: 'Voir les ressources'
		},
		{
			href: routes.communaute,
			icon: MessageSquare,
			orange: false,
			title: 'Communauté',
			desc: "Partager vos questions et vos retours d'expérience par groupes.",
			link: 'Rejoindre les échanges'
		},
		{
			href: routes.coaching,
			icon: GraduationCap,
			orange: true,
			title: 'Coaching',
			desc: 'Être accompagné par un mentor et suivre vos demandes.',
			link: 'Découvrir le coaching'
		}
	];
</script>

<svelte:head>
	<title>Espace collaboratif APIF — Accueil</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-surface">
	<SiteHeader />

	<section class="hero-public is-apif" style="--hero-pos: 60% 30%; --hero-pos-mobile: 55% 25%">
		<img
			class="bg"
			src={heroImage}
			alt="Deux professionnels en discussion devant le front de mer d'Abidjan"
			fetchpriority="high"
		/>
		<div class="veil" aria-hidden="true"></div>
		<div class="container-site inner">
			<div class="text">
				<span class="eyebrow text-white max-sm:text-[11px] max-sm:text-brand-orange-light"
					>APIF CI · Inclusion financière</span
				>
				<h1>
					Connecter, accompagner<br class="max-sm:hidden" /> et faire grandir l'écosystème<br
						class="max-sm:hidden"
					/>
					<span class="text-brand-orange">fintech ivoirien</span>
				</h1>
				<p class="lead max-sm:text-[15px]">
					Un espace pour partager vos expériences, trouver les acteurs et avancer ensemble.
				</p>
				<div class="cta">
					<a class="btn btn-primary btn-lg" href={routes.annuaire}>Découvrir les acteurs</a>
					<a class="btn btn-on-dark btn-lg max-sm:btn" href={routes.connexion}
						>Rejoindre la communauté</a
					>
				</div>
			</div>
		</div>
		<span class="credit">Visuel illustratif</span>
	</section>

	<div class="container-site -mt-9 max-sm:-mt-6 relative">
		<div
			class="card gap-3 px-5 py-4 max-sm:card-sm grid grid-cols-4 shadow-[0_8px_24px_rgba(23,36,32,.08)] max-sm:grid-cols-2"
		>
			{#each quickLinks as q, i (q.href)}
				<a
					href={q.href}
					class="gap-3 p-2 max-sm:gap-2.5 max-sm:p-0 flex items-center rounded-[10px] text-inherit no-underline hover:no-underline"
					class:sm:border-l={i > 0}
					class:sm:border-line={i > 0}
					class:sm:pl-4={i > 0}
				>
					<span class="icon-box max-sm:h-9 max-sm:w-9" aria-hidden="true"
						><q.icon size={22} class="max-sm:hidden" /><q.icon size={18} class="sm:hidden" /></span
					>
					<span
						><strong class="text-base max-sm:text-sm max-sm:font-display">{q.title}</strong><br
						/><span class="tiny">{q.sub}</span></span
					>
				</a>
			{/each}
		</div>
	</div>

	<section class="container-site gap-5 pt-14 max-sm:gap-3 max-sm:pt-8 flex flex-col">
		<div class="gap-1.5 flex flex-col">
			<span class="eyebrow max-sm:text-[11px]">Votre écosystème</span>
			<h2 class="max-sm:text-[22px]">Ce que vous pouvez faire avec APIF</h2>
		</div>
		<div class="gap-5 max-sm:gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as f (f.title)}
				<div
					class="card gap-2.5 max-sm:gap-3 flex flex-col bg-canvas max-sm:flex-row max-sm:items-start"
				>
					<span class="icon-box bg-surface" class:orange={f.orange} aria-hidden="true"
						><f.icon size={20} /></span
					>
					<div class="max-sm:gap-1 contents max-sm:flex max-sm:flex-col">
						<h3 class="max-sm:text-base">{f.title}</h3>
						<p class="small muted">{f.desc}</p>
						<a href={f.href} class="small font-bold max-sm:font-display">{f.link}</a>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="container-site gap-5 pt-14 max-sm:gap-3 max-sm:pt-8 flex flex-col">
		<div class="page-title">
			<div class="gap-1.5 flex flex-col">
				<span class="eyebrow max-sm:text-[11px]">Acteurs et services</span>
				<h2 class="max-sm:text-[22px]">Des solutions qui font avancer l'inclusion financière</h2>
			</div>
			<a class="btn btn-tertiary max-sm:hidden" href={routes.annuaire}>Voir tout →</a>
		</div>
		<div class="gap-5 max-sm:gap-3 grid md:grid-cols-3">
			{#each featuredOrganisations as o (o.slug)}
				<a
					href={ficheRoute(o.slug)}
					class="card hover gap-3.5 max-sm:card-sm max-sm:gap-3 flex text-inherit no-underline hover:no-underline max-sm:items-center"
				>
					<span class="avatar sq">{o.initials}</span>
					<div class="min-w-0 gap-1.5 max-sm:gap-0 flex flex-col max-sm:flex-1">
						<h4 class="max-sm:small max-sm:font-display">{o.name}</h4>
						<span class="small muted max-sm:tiny">{o.sectorLabel}</span>
						<span class="demo self-start max-sm:hidden">Fiche illustrative</span>
						<span class="font-bold text-[13px] text-brand-deep max-sm:hidden"
							>Consulter la fiche</span
						>
					</div>
					<span class="demo self-center sm:hidden">Illustrative</span>
				</a>
			{/each}
		</div>
		<a class="btn btn-tertiary sm:hidden" href={routes.annuaire}>Voir tout l'annuaire →</a>
	</section>

	<section class="container-site pt-14 max-sm:pt-8">
		<div
			class="card gap-5 max-sm:gap-2.5 flex flex-wrap items-center bg-canvas max-sm:flex-col max-sm:items-stretch"
		>
			<div class="row max-sm:contents">
				<div
					class="h-16 w-16 font-bold max-sm:font-extrabold flex flex-col items-center justify-center rounded-xl bg-brand-orange-soft font-display leading-[1.1] text-[#D86A0F] max-sm:h-[52px] max-sm:w-[52px] max-sm:rounded-[10px] max-sm:text-[11px]"
				>
					<span class="tiny text-[#D86A0F] max-sm:text-[11px] max-sm:text-[#D86A0F]">MI</span>DÉC.
				</div>
			</div>
			<div class="gap-1 flex min-w-[200px] flex-1 flex-col">
				<span class="eyebrow max-sm:hidden">Un rendez-vous pour connecter l'écosystème</span>
				<h3 class="max-sm:font-display max-sm:text-[15px]">Salon Fintech Côte d'Ivoire</h3>
				<span class="small muted max-sm:tiny"
					>Programme, inscriptions et rencontres · Date et lieu à confirmer</span
				>
			</div>
			<a class="btn btn-primary" href={SALON_URL} rel="external">Découvrir le salon</a>
		</div>
	</section>

	<SiteFooter />
</div>
