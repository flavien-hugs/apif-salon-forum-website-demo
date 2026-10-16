<script lang="ts">
	import logo from '../../assets/logo-apif-ci.png';
	import type { NavAction, NavLink } from './types.js';

	let {
		title,
		subtitle,
		homeHref,
		links,
		cta,
		mobileLinks = links.filter((l) => l.href !== homeHref),
		mobileActions = [],
		currentPath = ''
	}: {
		title: string;
		subtitle: string;
		homeHref: string;
		links: NavLink[];
		cta?: NavLink;
		mobileLinks?: NavLink[];
		mobileActions?: NavAction[];
		currentPath?: string;
	} = $props();

	let menuOpen = $state(false);
	const isActive = (href: string) => currentPath === href;

	// Le menu mobile se referme à chaque navigation.
	$effect(() => {
		void currentPath;
		menuOpen = false;
	});
</script>

<header class="site-header">
	<div class="container-site row">
		<a class="site-brand" href={homeHref} aria-label="{title} — accueil">
			<img src={logo} alt="APIF CI" width="73" height="44" />
			<span class="sep"></span>
			<span class="name">{title}<small>{subtitle}</small></span>
		</a>
		<nav class="nav" aria-label="Navigation principale">
			{#each links as link (link.href)}
				<a
					href={link.href}
					rel={link.external ? 'external' : undefined}
					class:is-active={isActive(link.href)}
					aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</a
				>
			{/each}
		</nav>
		{#if cta}
			<a class="btn btn-primary cta-desktop" href={cta.href}>{cta.label}</a>
		{/if}
		{#if mobileLinks.length > 0}
			<button
				type="button"
				class="btn btn-secondary btn-sm menu-btn"
				aria-expanded={menuOpen}
				aria-controls="menu-mobile"
				onclick={() => (menuOpen = !menuOpen)}>{menuOpen ? 'Fermer' : 'Menu'}</button
			>
		{/if}
	</div>
	{#if menuOpen}
		<nav
			id="menu-mobile"
			class="container-site gap-0.5 pt-2 pb-3 flex flex-col"
			aria-label="Navigation mobile"
		>
			{#each mobileLinks as link (link.href)}
				<a
					class="btn btn-tertiary justify-start"
					href={link.href}
					rel={link.external ? 'external' : undefined}>{link.label}</a
				>
			{/each}
			{#each mobileActions as action, i (action.href)}
				<a
					class="btn btn-{action.variant}"
					class:mt-1.5={i === 0}
					class:mt-1={i > 0}
					href={action.href}
					rel={action.external ? 'external' : undefined}>{action.label}</a
				>
			{/each}
		</nav>
	{/if}
</header>
