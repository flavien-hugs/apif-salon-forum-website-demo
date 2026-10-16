<script lang="ts">
	import type { Snippet } from 'svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	let {
		id,
		label,
		options,
		value = $bindable(''),
		placeholder = 'Rechercher…',
		help = '',
		icon
	}: {
		id: string;
		label: string;
		options: string[];
		value?: string;
		placeholder?: string;
		help?: string;
		icon?: Snippet;
	} = $props();

	let open = $state(false);
	let query = $state('');
	let root: HTMLDivElement;

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return options.filter((o) => !q || o.toLowerCase().includes(q));
	});

	function pick(option: string) {
		value = option;
		query = '';
		open = false;
	}

	function onFocusOut(e: FocusEvent) {
		if (!root.contains(e.relatedTarget as Node | null)) {
			open = false;
			query = '';
		}
	}
</script>

<div class="field combo" bind:this={root} onfocusout={onFocusOut}>
	<label class="label" for={id}>{label}</label>
	<div class="input-wrap">
		{@render icon?.()}
		<input
			class="input has-action"
			{id}
			role="combobox"
			aria-expanded={open}
			aria-controls="{id}-list"
			aria-autocomplete="list"
			autocomplete="off"
			{placeholder}
			value={open ? query : value}
			oninput={(e) => {
				query = e.currentTarget.value;
				open = true;
			}}
			onfocus={() => {
				open = true;
				query = '';
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					open = false;
					query = '';
				}
			}}
		/>
		<button
			type="button"
			class="combo-toggle"
			aria-label="Afficher la liste"
			onclick={() => {
				open = !open;
				query = '';
			}}><ChevronDown size={18} /></button
		>
	</div>
	{#if open}
		<div class="list" id="{id}-list" role="listbox">
			{#each filtered as option (option)}
				<button
					type="button"
					class="opt"
					class:is-selected={value === option}
					role="option"
					aria-selected={value === option}
					onclick={() => pick(option)}>{option}</button
				>
			{/each}
			{#if filtered.length === 0}
				<span class="opt cursor-default text-ink-3">Aucun résultat</span>
			{/if}
		</div>
	{/if}
	{#if help}<span class="help">{help}</span>{/if}
</div>
