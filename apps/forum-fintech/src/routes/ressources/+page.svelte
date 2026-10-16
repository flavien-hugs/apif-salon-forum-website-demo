<script lang="ts">
	import RedirectToLogin from '#lib/components/RedirectToLogin.svelte';
	import { routes } from '#lib/routes.js';
</script>

<RedirectToLogin
	next={routes.ressources}
	label="Les ressources et parcours de formation sont réservés aux membres connectés."
/>
