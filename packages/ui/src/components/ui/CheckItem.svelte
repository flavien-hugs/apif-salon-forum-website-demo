<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div class="check-item">
	<span class="tick" aria-hidden="true">✓</span>
	<span class="small">{@render children()}</span>
</div>
