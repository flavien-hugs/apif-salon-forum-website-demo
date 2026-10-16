<script lang="ts">
	import Mic from '@lucide/svelte/icons/mic';
	import Users from '@lucide/svelte/icons/users';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Upload from '@lucide/svelte/icons/upload';
	import PublicPage from '#lib/components/layout/PublicPage.svelte';
	import PageHero from '#lib/components/layout/PageHero.svelte';
	import { TextField } from '@apif/ui';
	import { Combobox } from '@apif/ui';
	import { CheckItem } from '@apif/ui';
	import { routes } from '#lib/routes.js';
	import { maturities, sectors } from '#lib/data/index.js';

	type Stage = 'edit' | 'review' | 'submitted' | 'decided';
	let stage = $state<Stage>('edit');
	let name = $state('');
	let pitch = $state('');
	let maturity = $state('Idée');
	let sector = $state('Paiements');
	let sectorOther = $state('');
	let file = $state(false);
	let tried = $state(false);
	let draftSaved = $state(false);

	const sectorIsOther = $derived(sector === 'Autre');
	const eName = $derived(tried && !name.trim());
	const ePitch = $derived(tried && pitch.trim().length < 40);
	const eSectorOther = $derived(tried && sectorIsOther && !sectorOther.trim());
	const sectorLabel = $derived(sectorIsOther ? `Autre — ${sectorOther.trim() || '—'}` : sector);
	const stageIndex = $derived({ edit: 0, review: 0, submitted: 2, decided: 3 }[stage]);
	const t = (i: number) => (stageIndex > i ? 'is-done' : stageIndex === i ? 'is-current' : '');

	function review() {
		tried = true;
		if (name.trim() && pitch.trim().length >= 40 && (!sectorIsOther || sectorOther.trim()))
			stage = 'review';
	}
	function restart() {
		stage = 'edit';
		name = '';
		pitch = '';
		file = false;
		tried = false;
		draftSaved = false;
	}
</script>

<PublicPage title="Pitch Room">
	<PageHero
		eyebrow="Pitch Room"
		title="Présentez votre solution"
		sub="Décrivez votre projet et partagez les éléments utiles à sa sélection. Les projets retenus pitchent devant les acteurs de l'écosystème pendant le salon."
	/>

	<div class="gap-4 grid sm:grid-cols-3">
		<div class="card card-sm gap-3 flex items-start">
			<span class="icon-box orange" aria-hidden="true"><Mic size={20} /></span>
			<div>
				<strong class="font-display">5 minutes de pitch</strong>
				<p class="small muted">Suivi d'un échange avec le jury. Format à confirmer.</p>
			</div>
		</div>
		<div class="card card-sm gap-3 flex items-start">
			<span class="icon-box" aria-hidden="true"><Users size={20} /></span>
			<div>
				<strong class="font-display">Visibilité</strong>
				<p class="small muted">
					Investisseurs, partenaires et institutions présents dans la salle.
				</p>
			</div>
		</div>
		<div class="card card-sm gap-3 flex items-start">
			<span class="icon-box" aria-hidden="true"><ShieldCheck size={20} /></span>
			<div>
				<strong class="font-display">Confidentialité</strong>
				<p class="small muted">
					Les appréciations du jury restent accessibles aux seules personnes autorisées.
				</p>
			</div>
		</div>
	</div>

	<div class="gap-6 grid items-start md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
		<div class="card flex flex-col gap-[18px]">
			{#if stage === 'edit'}
				<div class="row between">
					<h2 class="text-[22px]">Ma candidature</h2>
					<span class="badge neutral">{draftSaved ? 'Brouillon enregistré' : 'Brouillon'}</span>
				</div>
				<form
					class="contents"
					novalidate
					onsubmit={(e) => {
						e.preventDefault();
						review();
					}}
				>
					<TextField
						id="p1"
						label="Nom de la solution"
						required
						placeholder="Votre solution"
						bind:value={name}
						error={eName ? 'Le nom de la solution est obligatoire.' : ''}
						success={!!name}
					>
						{#snippet icon()}<Lightbulb size={18} aria-hidden="true" />{/snippet}
					</TextField>
					<div
						class="field"
						class:is-error={ePitch}
						class:is-success={!ePitch && pitch.length >= 40}
					>
						<label class="label" for="p2"
							>Problème et proposition de valeur <span class="req">*</span></label
						>
						<div class="input-wrap ta">
							<textarea
								class="textarea"
								id="p2"
								placeholder="Décrivez le besoin et votre réponse"
								maxlength="600"
								value={pitch}
								oninput={(e) => {
									pitch = e.currentTarget.value.slice(0, 600);
									draftSaved = false;
								}}></textarea>
						</div>
						<span class="help">{pitch.length} / 600 caractères</span>
						{#if ePitch}<span class="help error"
								>Décrivez le problème et votre réponse (au moins 40 caractères).</span
							>{/if}
					</div>
					<div class="gap-4 grid sm:grid-cols-2">
						<Combobox id="p3" label="Maturité" options={maturities} bind:value={maturity}>
							{#snippet icon()}<TrendingUp size={18} aria-hidden="true" />{/snippet}
						</Combobox>
						<Combobox
							id="p4"
							label="Secteur"
							options={sectors}
							bind:value={sector}
							placeholder="Rechercher un secteur…"
						>
							{#snippet icon()}<Briefcase size={18} aria-hidden="true" />{/snippet}
						</Combobox>
						{#if sectorIsOther}
							<div class="sm:col-span-2">
								<TextField
									id="p4b"
									label="Précisez votre secteur"
									required
									placeholder="Ex. agrégation de comptes, crypto-actifs…"
									bind:value={sectorOther}
									error={eSectorOther ? 'Indiquez votre secteur.' : ''}
									success={!!sectorOther.trim()}
								>
									{#snippet icon()}<Pencil size={18} aria-hidden="true" />{/snippet}
								</TextField>
							</div>
						{/if}
					</div>
					<div class="field">
						<span class="label">Présentation du projet (PDF, 10 Mo max)</span>
						{#if !file}
							<button type="button" class="upload" onclick={() => (file = true)}>
								<Upload size={26} class="text-brand-deep" aria-hidden="true" />
								<span
									><strong>Glissez votre présentation</strong> ou cliquez pour simuler un dépôt</span
								>
								<span class="tiny">Pièce visible du comité uniquement</span>
							</button>
						{:else}
							<div class="file">
								<span class="nm">presentation-projet.pdf</span>
								<span class="tiny">1,2 Mo</span>
								<span class="badge success">Téléversé</span>
								<button type="button" class="btn btn-tertiary btn-sm" onclick={() => (file = false)}
									>Retirer</button
								>
							</div>
						{/if}
					</div>
					<div class="form-actions">
						<button type="button" class="btn btn-secondary" onclick={() => (draftSaved = true)}
							>Enregistrer mon brouillon</button
						>
						<button type="submit" class="btn btn-primary">Vérifier et soumettre</button>
					</div>
				</form>
				{#if draftSaved}
					<div class="alert success" role="status">
						<span
							>Brouillon enregistré localement (démonstration). Vous pourrez le reprendre depuis Mon
							espace.</span
						>
					</div>
				{/if}
			{:else if stage === 'review'}
				<h2 class="text-[22px]">Récapitulatif de la candidature</h2>
				<table class="table">
					<tbody>
						<tr><td class="muted w-[200px]">Solution</td><td><strong>{name}</strong></td></tr>
						<tr><td class="muted">Proposition de valeur</td><td>{pitch}</td></tr>
						<tr><td class="muted">Maturité</td><td>{maturity}</td></tr>
						<tr><td class="muted">Secteur</td><td>{sectorLabel}</td></tr>
						<tr
							><td class="muted">Présentation</td><td
								>{file ? 'presentation-projet.pdf' : 'Aucune pièce jointe'}</td
							></tr
						>
					</tbody>
				</table>
				<div class="alert warning">
					<span>Après soumission, la candidature n'est plus modifiable sauf demande du comité.</span
					>
				</div>
				<div class="form-actions">
					<button type="button" class="btn btn-tertiary" onclick={() => (stage = 'edit')}
						>Modifier</button
					>
					<button type="button" class="btn btn-primary" onclick={() => (stage = 'submitted')}
						>Soumettre au comité</button
					>
				</div>
			{:else if stage === 'submitted'}
				<div class="alert success" role="status">
					<strong>Candidature soumise (démonstration).</strong>
					<span
						>Le comité examine les dossiers puis confirme les projets retenus. Aucun envoi réel n'a
						été effectué.</span
					>
				</div>
				<div class="card card-sm gap-2.5 flex flex-col bg-canvas">
					<div class="row between">
						<strong class="font-display">{name}</strong><span class="badge info"
							>Soumise — en examen</span
						>
					</div>
					<span class="small muted"
						>{sectorLabel} · {maturity} · Référence de démonstration PR-2026-0042</span
					>
					<div class="timeline">
						<div class="it is-done">Brouillon</div>
						<div class="it is-done">Soumission</div>
						<div class="it is-current">Examen par le comité</div>
						<div class="it">Décision</div>
					</div>
				</div>
				<div class="row">
					<button type="button" class="btn btn-secondary" onclick={() => (stage = 'decided')}
						>Simuler la décision</button
					>
					<a class="btn btn-tertiary" href={routes.monEspace}>Retour à mon espace</a>
				</div>
			{:else}
				<div class="alert success" role="status">
					<strong>Projet retenu (démonstration).</strong>
					<span
						>Votre créneau de pitch et les consignes pratiques seront communiqués dans votre espace
						participant.</span
					>
				</div>
				<div class="card card-sm gap-2.5 flex flex-col bg-canvas">
					<div class="row between">
						<strong class="font-display">{name}</strong><span class="badge success">Retenu</span>
					</div>
					<div class="timeline">
						<div class="it is-done">Brouillon</div>
						<div class="it is-done">Soumission</div>
						<div class="it is-done">Examen par le comité</div>
						<div class="it is-done">Décision</div>
					</div>
					<span class="tiny"
						>Les appréciations du jury ne sont jamais affichées dans l'espace candidat.</span
					>
				</div>
				<div class="row">
					<a class="btn btn-primary" href={routes.programme}>Voir la session Pitch Room</a>
					<button type="button" class="btn btn-tertiary" onclick={restart}
						>Recommencer la démonstration</button
					>
				</div>
			{/if}
		</div>

		<aside class="card gap-3.5 flex flex-col">
			<h3>Le parcours de sélection</h3>
			<CheckItem>Préparer votre dossier</CheckItem>
			<CheckItem>Soumettre votre candidature</CheckItem>
			<p class="small muted">Le comité examine les dossiers puis confirme les projets retenus.</p>
			<div class="timeline">
				<div class="it {t(0)}">Brouillon</div>
				<div class="it {t(1)}">Soumission</div>
				<div class="it {t(2)}">Examen</div>
				<div class="it {t(3)}">Décision</div>
			</div>
			<hr class="divider" />
			<span class="small muted"
				>Les appréciations du jury restent accessibles aux seules personnes autorisées.</span
			>
			<div class="card card-sm gap-1.5 flex flex-col bg-canvas">
				<span class="eyebrow">À valider avec APIF</span>
				<span class="small muted"
					>Critères d'éligibilité, calendrier de sélection, format du pitch et composition du
					comité.</span
				>
			</div>
		</aside>
	</div>
</PublicPage>
