<script lang="ts">
	import RedirectToLogin from '#lib/components/RedirectToLogin.svelte';
	import { routes } from '#lib/routes.js';
</script>

<RedirectToLogin next={routes.monEspace} label="Votre espace membre nécessite une connexion." />
