<script lang="ts">
	import { onMount } from 'svelte';
	import User from '@lucide/svelte/icons/user';
	import Mail from '@lucide/svelte/icons/mail';
	import Building2 from '@lucide/svelte/icons/building-2';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Phone from '@lucide/svelte/icons/phone';
	import Check from '@lucide/svelte/icons/check';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import PageHero from '#lib/components/layout/PageHero.svelte';
	import { TextField } from '@apif/ui';
	import { Combobox } from '@apif/ui';
	import { CheckItem } from '@apif/ui';
	import { routes } from '#lib/routes.js';
	import { profiles, sectors, type ProfileId } from '#lib/data/index.js';
	import { isEmail } from '@apif/ui';

	let step = $state<1 | 2 | 3 | 4>(1);
	let profile = $state<ProfileId | ''>('');
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let org = $state('');
	let phone = $state('');
	let sector = $state('');
	let sectorOther = $state('');
	let consent = $state(false);
	let visible = $state(false);
	let tried1 = $state(false);
	let tried2 = $state(false);

	// Profil présélectionné depuis l'accueil (?profil=fintech).
	onMount(() => {
		const p = new URLSearchParams(window.location.search).get('profil');
		if (p && profiles.some((x) => x.id === p)) profile = p as ProfileId;
	});

	const sectorIsOther = $derived(sector === 'Autre');
	const emailOk = $derived(isEmail(email));
	const eFirst = $derived(tried2 && !firstName.trim());
	const eLast = $derived(tried2 && !lastName.trim());
	const eMail = $derived(tried2 && !emailOk);
	const eOther = $derived(tried2 && sectorIsOther && !sectorOther.trim());
	const eConsent = $derived(tried2 && !consent);
	const step2Ok = $derived(
		!!firstName.trim() &&
			!!lastName.trim() &&
			emailOk &&
			consent &&
			(!sectorIsOther || !!sectorOther.trim())
	);
	const profileLabel = $derived(profiles.find((p) => p.id === profile)?.label ?? '—');
	const stepClass = (n: number) => (step > n ? 'is-done' : step === n ? 'is-current' : '');

	function next1() {
		tried1 = true;
		if (profile) step = 2;
	}
	function next2() {
		tried2 = true;
		if (step2Ok) step = 3;
	}
</script>

<PublicPage title="Inscription">
	<PageHero
		title="Rejoignez le Salon Fintech"
		sub="Un compte commun avec l'espace collaboratif permet de retrouver votre participation."
	/>

	<ol class="steps p-0 list-none" aria-label="Étapes de l'inscription">
		<li class="step {stepClass(1)}"><span class="n">1</span>Profil</li>
		<li class="step {stepClass(2)}"><span class="n">2</span>Informations</li>
		<li class="step {step >= 4 ? 'is-done' : stepClass(3)}">
			<span class="n">3</span>Récapitulatif et confirmation
		</li>
	</ol>

	<div class="gap-6 grid items-start md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
		<div class="card flex flex-col gap-[18px]">
			{#if step === 1}
				<h2 class="text-[22px]">Votre profil</h2>
				<p class="small muted">
					Le profil détermine les informations demandées et les services accessibles (rencontres
					B2B, Pitch Room, exposition).
				</p>
				<div class="gap-3 grid sm:grid-cols-2">
					{#each profiles as p (p.id)}
						<button
							type="button"
							class="card card-sm gap-1.5 flex cursor-pointer flex-col text-left"
							class:border-brand-deep={profile === p.id}
							class:bg-brand-green-soft={profile === p.id}
							aria-pressed={profile === p.id}
							onclick={() => (profile = p.id)}
						>
							<strong class="font-display">{p.label}</strong>
							<span class="small muted">{p.desc}</span>
						</button>
					{/each}
				</div>
				{#if tried1 && !profile}
					<div class="alert error" role="alert">
						<span>Choisissez un profil pour continuer.</span>
					</div>
				{/if}
				<div class="form-actions justify-end">
					<button type="button" class="btn btn-primary" onclick={next1}>Continuer</button>
				</div>
			{:else if step === 2}
				<h2 class="text-[22px]">Vos informations</h2>
				<form
					class="contents"
					novalidate
					onsubmit={(e) => {
						e.preventDefault();
						next2();
					}}
				>
					<div class="gap-4 grid sm:grid-cols-2">
						<TextField
							id="f1"
							label="Prénom"
							required
							placeholder="Votre prénom"
							bind:value={firstName}
							autocomplete="given-name"
							error={eFirst ? 'Le prénom est obligatoire.' : ''}
							success={!!firstName}
						>
							{#snippet icon()}<User size={18} aria-hidden="true" />{/snippet}
						</TextField>
						<TextField
							id="f2"
							label="Nom"
							required
							placeholder="Votre nom"
							bind:value={lastName}
							autocomplete="family-name"
							error={eLast ? 'Le nom est obligatoire.' : ''}
							success={!!lastName}
						>
							{#snippet icon()}<User size={18} aria-hidden="true" />{/snippet}
						</TextField>
						<TextField
							id="f3"
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
						<TextField
							id="f4"
							label="Organisation"
							placeholder="Votre organisation"
							bind:value={org}
							autocomplete="organization"
						>
							{#snippet icon()}<Building2 size={18} aria-hidden="true" />{/snippet}
						</TextField>
						<Combobox
							id="f5"
							label="Secteur"
							options={sectors}
							bind:value={sector}
							placeholder="Rechercher un secteur…"
							help="Tapez pour filtrer la liste."
						>
							{#snippet icon()}<Briefcase size={18} aria-hidden="true" />{/snippet}
						</Combobox>
						{#if sectorIsOther}
							<div class="sm:col-span-2">
								<TextField
									id="f5b"
									label="Précisez votre secteur"
									required
									placeholder="Ex. agrégation de comptes, crypto-actifs…"
									bind:value={sectorOther}
									error={eOther ? "Indiquez votre secteur d'activité." : ''}
									success={!!sectorOther.trim()}
								>
									{#snippet icon()}<Pencil size={18} aria-hidden="true" />{/snippet}
								</TextField>
							</div>
						{/if}
						<TextField
							id="f6"
							label="Téléphone"
							type="tel"
							placeholder="+225 …"
							bind:value={phone}
							autocomplete="tel"
						>
							{#snippet icon()}<Phone size={18} aria-hidden="true" />{/snippet}
						</TextField>
					</div>
					<hr class="divider" />
					<label class="check" class:is-error={eConsent}>
						<input type="checkbox" bind:checked={consent} />
						<span
							>J'accepte les conditions de participation et la notice de confidentialité. <span
								class="text-error">*</span
							></span
						>
					</label>
					{#if eConsent}<span class="help error"
							>Votre accord est nécessaire pour traiter la demande.</span
						>{/if}
					<label class="check">
						<input type="checkbox" bind:checked={visible} />
						<span>Je souhaite être visible dans les suggestions de rencontres B2B.</span>
					</label>
					<div class="form-actions">
						<button type="button" class="btn btn-tertiary" onclick={() => (step = 1)}>Retour</button
						>
						<button type="submit" class="btn btn-primary">Vérifier ma demande</button>
					</div>
				</form>
			{:else if step === 3}
				<h2 class="text-[22px]">Récapitulatif</h2>
				<table class="table">
					<tbody>
						<tr><td class="muted w-[180px]">Profil</td><td><strong>{profileLabel}</strong></td></tr>
						<tr
							><td class="muted">Nom complet</td><td
								><strong>{`${firstName} ${lastName}`.trim()}</strong></td
							></tr
						>
						<tr><td class="muted">E-mail</td><td>{email}</td></tr>
						<tr><td class="muted">Organisation</td><td>{org || '—'}</td></tr>
						<tr
							><td class="muted">Secteur</td><td
								>{sectorIsOther ? `Autre — ${sectorOther.trim() || '—'}` : sector || '—'}</td
							></tr
						>
						<tr><td class="muted">Visible en B2B</td><td>{visible ? 'Oui' : 'Non'}</td></tr>
					</tbody>
				</table>
				<div class="alert info">
					<span
						>Démonstration : la soumission n'envoie aucun e-mail et n'enregistre rien sur un
						serveur.</span
					>
				</div>
				<div class="form-actions">
					<button type="button" class="btn btn-tertiary" onclick={() => (step = 2)}>Modifier</button
					>
					<button type="button" class="btn btn-primary" onclick={() => (step = 4)}
						>Soumettre ma demande</button
					>
				</div>
			{:else}
				<div class="gap-3 py-3 flex flex-col items-center text-center">
					<span class="icon-box h-16 w-16" aria-hidden="true"
						><Check size={30} strokeWidth={2.5} /></span
					>
					<h2 class="text-[22px]">Demande enregistrée (démonstration)</h2>
					<p class="small muted max-w-[460px]">
						APIF confirme votre éligibilité selon votre profil. Vous serez informé·e par e-mail dès
						qu'une décision est prise ; votre badge devient disponible après validation.
					</p>
				</div>
				<div class="card card-sm gap-2.5 flex flex-col bg-canvas">
					<div class="row between">
						<strong class="font-display">Suivi de votre inscription</strong><span
							class="badge warning">En attente de validation</span
						>
					</div>
					<div class="timeline">
						<div class="it is-done">Demande soumise</div>
						<div class="it is-current">Vérification de l'éligibilité par APIF</div>
						<div class="it">Confirmation et badge disponible</div>
					</div>
					<span class="tiny">Référence de démonstration : SF-2026-000123</span>
				</div>
				<div class="row">
					<a class="btn btn-primary" href={routes.monEspace}>Accéder à mon espace participant</a>
					<a class="btn btn-secondary" href={routes.programme}>Consulter le programme</a>
				</div>
			{/if}
		</div>

		<aside class="gap-4 flex flex-col">
			<div class="card gap-3 flex flex-col">
				<h3>Après votre inscription</h3>
				<CheckItem>Votre demande est enregistrée.</CheckItem>
				<CheckItem>APIF confirme votre éligibilité selon votre profil.</CheckItem>
				<CheckItem>Votre badge devient disponible après validation.</CheckItem>
				<hr class="divider" />
				<span class="small muted">Vous possédez déjà un compte ?</span>
				<a class="btn btn-secondary self-start" href={routes.connexion}>Me connecter</a>
			</div>
		</aside>
	</div>
</PublicPage>
