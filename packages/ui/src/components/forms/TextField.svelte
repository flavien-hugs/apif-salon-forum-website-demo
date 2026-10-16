<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		label,
		value = $bindable(''),
		type = 'text',
		placeholder = '',
		required = false,
		error = '',
		success = false,
		help = '',
		autocomplete,
		icon,
		action
	}: {
		id: string;
		label: string;
		value?: string;
		type?: 'text' | 'email' | 'tel' | 'password';
		placeholder?: string;
		required?: boolean;
		error?: string;
		success?: boolean;
		help?: string;
		autocomplete?: HTMLInputElement['autocomplete'];
		icon?: Snippet;
		action?: Snippet;
	} = $props();
</script>

<div class="field" class:is-error={!!error} class:is-success={!error && success}>
	<label class="label" for={id}
		>{label}{#if required}<span class="req">*</span>{/if}</label
	>
	<div class="input-wrap">
		{@render icon?.()}
		<input
			class="input"
			class:has-action={!!action}
			{id}
			{type}
			{placeholder}
			{autocomplete}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
		/>
		{@render action?.()}
	</div>
	{#if error}
		<span class="help error" id="{id}-error">{error}</span>
	{:else if help}
		<span class="help" id="{id}-help">{help}</span>
	{/if}
</div>
