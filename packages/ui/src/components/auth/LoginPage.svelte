<script lang="ts">
	import { onMount } from 'svelte';
	import Mail from '@lucide/svelte/icons/mail';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Lock from '@lucide/svelte/icons/lock';
	import Check from '@lucide/svelte/icons/check';
	import logo from '../../assets/logo-apif-ci.png';
	import heroConnexion from '../../assets/hero-connexion.jpg';
	import PageHero from '../layout/PageHero.svelte';
	import TextField from '../forms/TextField.svelte';
	import PasswordField from '../forms/PasswordField.svelte';
	import Combobox from '../forms/Combobox.svelte';
	import CheckItem from '../ui/CheckItem.svelte';
	import { loginRoles, loginSpaces } from './login-data.js';
	import { isEmail } from '../../utils/validation.js';
	import type { NavLink } from '../layout/types.js';

	/* Écran de connexion commun aux deux sites (4 états de démonstration). */
	let {
		homeHref,
		salon,
		espace,
		createAccountHref,
		nextLabels = {}
	}: {
		/** Accueil du site courant (bouton « Retour au portail », ouverture après connexion). */
		homeHref: string;
		salon: NavLink;
		espace: NavLink;
		/** Lien « Créer mon compte » (inscription au salon). */
		createAccountHref: NavLink;
		/** Message affiché selon le paramètre `?next=` (page réservée à l'origine). */
		nextLabels?: Record<string, string>;
	} = $props();

	type Mode = 'login' | 'forgot' | 'denied' | 'success';
	let mode = $state<Mode>('login');
	let email = $state('');
	let pwd = $state('');
	let space = $state(loginSpaces[0].label);
	let tried = $state(false);
	let loginError = $state(false);
	let forgotSent = $state(false);
	let next = $state<string | null>(null);

	// Page atteinte depuis un espace réservé (?next=/rencontres) : on l'indique.
	onMount(() => {
		const n = new URLSearchParams(window.location.search).get('next');
		next = n && n.startsWith('/') ? n : null;
	});

	const role = $derived(loginSpaces.find((s) => s.label === space)?.role ?? 'member');
	const emailOk = $derived(isEmail(email));
	const eMail = $derived(tried && !emailOk);
	const ePwd = $derived(tried && !pwd);

	const modes: Array<{ id: 'login' | 'error' | 'forgot' | 'denied'; label: string }> = [
		{ id: 'login', label: 'Connexion' },
		{ id: 'error', label: 'Erreur' },
		{ id: 'forgot', label: 'Mot de passe oublié' },
		{ id: 'denied', label: 'Accès refusé' }
	];

	function pickMode(id: (typeof modes)[number]['id']) {
		tried = false;
		forgotSent = false;
		if (id === 'error') {
			mode = 'login';
			loginError = true;
		} else {
			mode = id;
			loginError = false;
		}
	}
	function login() {
		if (!emailOk || !pwd) {
			tried = true;
			return;
		}
		if (pwd === 'erreur') {
			loginError = true;
			return;
		}
		tried = false;
		loginError = false;
		mode = role === 'none' ? 'denied' : 'success';
	}
	function toLogin() {
		mode = 'login';
		tried = false;
		loginError = false;
		forgotSent = false;
	}
	function sendReset() {
		if (!emailOk) {
			tried = true;
			return;
		}
		forgotSent = true;
		tried = false;
	}
</script>

<header class="site-header">
	<div class="container-site row">
		<a class="site-brand" href={homeHref}>
			<img src={logo} alt="APIF CI" width="73" height="44" />
			<span class="sep"></span>
			<span class="name">Compte APIF<small>Salon Fintech · Espace collaboratif</small></span>
		</a>
		<nav class="nav" aria-label="Navigation">
			<a href={salon.href} rel={salon.external ? 'external' : undefined}>{salon.label}</a>
			<a href={espace.href} rel={espace.external ? 'external' : undefined}>{espace.label}</a>
		</nav>
	</div>
</header>

<main class="container-site gap-6 pt-6 pb-12 flex w-full flex-1 flex-col">
	<PageHero
		image={heroConnexion}
		title="Un compte pour vos deux espaces"
		sub="Connectez-vous pour retrouver votre organisation, vos échanges et votre participation au salon. Les rôles et droits encadrent chaque accès."
	/>

	{#if next}
		<div class="alert info mx-auto w-full max-w-[860px]" role="status">
			<span>
				<strong>Connexion requise.</strong>
				{nextLabels[next] ?? 'Cette page est réservée aux comptes connectés.'}
				Connectez-vous ou
				<a href={createAccountHref.href} rel={createAccountHref.external ? 'external' : undefined}
					>créez votre compte</a
				>.
			</span>
		</div>
	{/if}

	<div class="row justify-center">
		<span class="tiny">Démonstration des états :</span>
		{#each modes as m (m.id)}
			<button
				type="button"
				class="chip min-h-8"
				class:is-active={m.id === 'error' ? loginError : mode === m.id && !loginError}
				onclick={() => pickMode(m.id)}>{m.label}</button
			>
		{/each}
	</div>

	<div class="gap-6 mx-auto grid w-full max-w-[860px] items-start md:grid-cols-2">
		<div class="card gap-4 flex flex-col">
			{#if mode === 'login'}
				<h2 class="text-[22px]">Me connecter</h2>
				{#if loginError}
					<div class="alert error" role="alert">
						<strong>Identifiants incorrects.</strong>
						<span
							>Vérifiez votre adresse e-mail et votre mot de passe. Après 5 tentatives, le compte
							est temporairement verrouillé (règle à confirmer).</span
						>
					</div>
				{/if}
				<form
					class="contents"
					novalidate
					onsubmit={(e) => {
						e.preventDefault();
						login();
					}}
				>
					<TextField
						id="l1"
						label="Adresse e-mail"
						type="email"
						required
						placeholder="nom@organisation.ci"
						bind:value={email}
						autocomplete="email"
						error={eMail ? 'Saisissez une adresse e-mail valide.' : ''}
						success={emailOk}
					>
						{#snippet icon()}<Mail size={18} aria-hidden="true" />{/snippet}
					</TextField>
					<PasswordField
						id="l2"
						label="Mot de passe"
						required
						placeholder="Votre mot de passe"
						bind:value={pwd}
						error={ePwd ? 'Le mot de passe est obligatoire.' : ''}
					/>
					<Combobox
						id="l3"
						label="Espace de démonstration après connexion"
						options={loginSpaces.map((s) => s.label)}
						bind:value={space}
						placeholder="Rechercher un rôle…"
						help="Dans l'application réelle, l'espace est déterminé par les rôles du compte, jamais choisi ici."
					>
						{#snippet icon()}<ShieldCheck size={18} aria-hidden="true" />{/snippet}
					</Combobox>
					<div class="row">
						<button type="submit" class="btn btn-primary">Se connecter</button>
						<button type="button" class="btn btn-tertiary" onclick={() => pickMode('forgot')}
							>Mot de passe oublié</button
						>
					</div>
					<label class="check"><input type="checkbox" /> Rester connecté sur cet appareil</label>
				</form>
			{:else if mode === 'forgot'}
				<h2 class="text-[22px]">Récupérer mon mot de passe</h2>
				{#if forgotSent}
					<div class="alert success" role="status">
						<strong>Si un compte existe pour cette adresse,</strong>
						<span
							>un lien de réinitialisation valable 30 minutes vient d'être envoyé (démonstration :
							aucun e-mail réel).</span
						>
					</div>
					<div class="gap-3 pt-2 flex flex-col border-t border-line">
						<span class="label">Étape suivante (depuis le lien reçu) — nouveau mot de passe</span>
						<PasswordField
							id="n1"
							label="Nouveau mot de passe"
							placeholder="12 caractères minimum"
						/>
						<div class="field">
							<label class="label" for="n2">Confirmation</label>
							<div class="input-wrap">
								<Lock size={18} aria-hidden="true" /><input
									class="input"
									id="n2"
									type="password"
									placeholder="Répétez le mot de passe"
									autocomplete="new-password"
								/>
							</div>
						</div>
						<div class="row">
							<button type="button" class="btn btn-primary" onclick={toLogin}
								>Définir le mot de passe</button
							>
						</div>
					</div>
				{:else}
					<p class="small muted">
						Saisissez l'adresse e-mail de votre compte. Vous recevrez un lien pour définir un
						nouveau mot de passe.
					</p>
					<form
						class="contents"
						novalidate
						onsubmit={(e) => {
							e.preventDefault();
							sendReset();
						}}
					>
						<TextField
							id="fp1"
							label="Adresse e-mail"
							type="email"
							required
							placeholder="nom@organisation.ci"
							bind:value={email}
							autocomplete="email"
							error={eMail ? 'Saisissez une adresse e-mail valide.' : ''}
							success={emailOk}
						>
							{#snippet icon()}<Mail size={18} aria-hidden="true" />{/snippet}
						</TextField>
						<div class="row">
							<button type="submit" class="btn btn-primary">Envoyer le lien</button>
							<button type="button" class="btn btn-tertiary" onclick={toLogin}
								>Retour à la connexion</button
							>
						</div>
					</form>
				{/if}
			{:else if mode === 'denied'}
				<div class="gap-2.5 py-2 flex flex-col items-center text-center">
					<span class="icon-box h-16 w-16 bg-error-bg text-error" aria-hidden="true"
						><Lock size={30} /></span
					>
					<h2 class="text-[22px]">Accès refusé</h2>
					<p class="small muted">
						Votre compte <strong>{email || 'compte de démonstration'}</strong> est bien connecté, mais
						il ne dispose pas des droits nécessaires pour cet espace. Les permissions sont attribuées
						par APIF selon votre rôle.
					</p>
				</div>
				<div class="alert warning">
					<span
						>Si vous pensez qu'il s'agit d'une erreur, contactez les gestionnaires APIF ou vérifiez
						l'état de votre dossier.</span
					>
				</div>
				<div class="row justify-center">
					<a class="btn btn-secondary" href={homeHref}>Retour au portail</a>
					<button type="button" class="btn btn-tertiary" onclick={toLogin}>Changer de compte</button
					>
				</div>
			{:else}
				<div class="gap-2.5 py-2 flex flex-col items-center text-center">
					<span class="icon-box h-16 w-16" aria-hidden="true"
						><Check size={30} strokeWidth={2.5} /></span
					>
					<h2 class="text-[22px]">Connexion réussie (démonstration)</h2>
					<p class="small muted">
						Rôle détecté : <strong>{loginRoles[role].label}</strong>. Vous êtes redirigé·e vers
						l'espace autorisé.
					</p>
				</div>
				<a class="btn btn-primary" href={homeHref}>Ouvrir {loginRoles[role].target}</a>
				<button type="button" class="btn btn-tertiary" onclick={toLogin}
					>Revenir à la connexion</button
				>
			{/if}
		</div>

		<div class="card gap-3 flex flex-col">
			<h3>Nouveau dans l'écosystème ?</h3>
			<CheckItem>Un profil et une organisation</CheckItem>
			<CheckItem>Des échanges et des ressources</CheckItem>
			<CheckItem>Votre participation au salon</CheckItem>
			<a
				class="btn btn-secondary self-start"
				href={createAccountHref.href}
				rel={createAccountHref.external ? 'external' : undefined}>Créer mon compte</a
			>
			<hr class="divider" />
			<span class="label">Rôles et redirections</span>
			<table class="table text-[13px]">
				<tbody>
					<tr><td>Participant</td><td>Salon › Mon espace</td></tr>
					<tr><td>Membre</td><td>Espace › Tableau de bord</td></tr>
					<tr><td>Opérateur accueil</td><td>Salon › Accueil des participants</td></tr>
					<tr><td>Gestionnaire APIF</td><td>Espace › Administration</td></tr>
				</tbody>
			</table>
			<span class="tiny"
				>Un même compte peut cumuler plusieurs rôles ; la navigation n'affiche que les espaces
				autorisés.</span
			>
		</div>
	</div>
</main>
