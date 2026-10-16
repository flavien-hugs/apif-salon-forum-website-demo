<script lang="ts">
	import RedirectToLogin from '#lib/components/RedirectToLogin.svelte';
	import { routes } from '#lib/routes.js';
</script>

<RedirectToLogin
	next={routes.monEspace}
	label="L'espace participant est réservé aux participants inscrits."
/>
