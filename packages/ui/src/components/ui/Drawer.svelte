<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		open,
		label,
		onclose,
		children
	}: { open: boolean; label: string; onclose: () => void; children: Snippet } = $props();

	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onclose();
		document.addEventListener('keydown', onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prev;
		};
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
		class="overlay p-0 items-stretch justify-end"
		onclick={(e) => e.target === e.currentTarget && onclose()}
	>
		<div class="drawer" role="dialog" aria-modal="true" aria-label={label}>
			{@render children()}
		</div>
	</div>
{/if}
