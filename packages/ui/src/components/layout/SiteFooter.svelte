<script lang="ts">
	import type { NavLink } from './types.js';

	let {
		description,
		usefulLinks,
		communityLinks,
		legal
	}: { description: string; usefulLinks: NavLink[]; communityLinks: NavLink[]; legal: string } =
		$props();
</script>

<footer class="site-footer">
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
</footer>
