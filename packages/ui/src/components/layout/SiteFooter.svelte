<script lang="ts">
	import partners from '../../assets/partenaires.webp';
	import type { NavLink } from './types.js';

	let {
		description,
		usefulLinks,
		communityLinks,
		legal
	}: { description: string; usefulLinks: NavLink[]; communityLinks: NavLink[]; legal: string } =
		$props();
</script>

<footer>
	<div class="site-partners">
		<div class="container-site">
			<img
				src={partners}
				alt="Partenaires : Ministère de l'Économie et des Finances, Groupe de la Banque africaine de développement, PACA-CI, APIF CI et BEDET"
				width="2200"
				height="243"
				loading="lazy"
				decoding="async"
			/>
		</div>
	</div>
	<div class="site-footer">
		<div class="container-site cols">
			<div>
				<h4>APIF CI · Inclusion financière</h4>
				<p class="small text-on-dark-2">{description}</p>
			</div>
			<div class="gap-1.5 flex flex-col">
				<h4>Liens utiles</h4>
				{#each usefulLinks as link (link.href + link.label)}
					<a href={link.href} rel={link.external ? 'external' : undefined}>{link.label}</a>
				{/each}
			</div>
			<div class="gap-1.5 flex flex-col">
				<h4>Rejoignez la communauté</h4>
				{#each communityLinks as link (link.href + link.label)}
					<a href={link.href} rel={link.external ? 'external' : undefined}>{link.label}</a>
				{/each}
			</div>
		</div>
		<div class="container-site legal">{legal}</div>
	</div>
</footer>
