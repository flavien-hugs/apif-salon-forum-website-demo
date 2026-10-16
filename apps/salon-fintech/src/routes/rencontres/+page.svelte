<script lang="ts">
	import RedirectToLogin from '#lib/components/RedirectToLogin.svelte';
	import { routes } from '#lib/routes.js';
</script>

<RedirectToLogin
	next={routes.rencontres}
	label="Les rencontres B2B sont réservées aux participants inscrits."
/>
