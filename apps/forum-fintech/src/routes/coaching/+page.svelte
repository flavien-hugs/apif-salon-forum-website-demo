<script lang="ts">
	import RedirectToLogin from '#lib/components/RedirectToLogin.svelte';
	import { routes } from '#lib/routes.js';
</script>

<RedirectToLogin next={routes.coaching} label="Le coaching est réservé aux membres connectés." />
