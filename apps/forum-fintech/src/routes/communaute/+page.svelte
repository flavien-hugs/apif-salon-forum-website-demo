<script lang="ts">
	import RedirectToLogin from '#lib/components/RedirectToLogin.svelte';
	import { routes } from '#lib/routes.js';
</script>

<RedirectToLogin
	next={routes.communaute}
	label="La communauté est réservée aux membres connectés."
/>
