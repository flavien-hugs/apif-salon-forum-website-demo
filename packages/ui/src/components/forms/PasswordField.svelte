<script lang="ts">
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import Lock from '@lucide/svelte/icons/lock';

	let {
		id,
		label,
		value = $bindable(''),
		placeholder = '',
		required = false,
		error = ''
	}: {
		id: string;
		label: string;
		value?: string;
		placeholder?: string;
		required?: boolean;
		error?: string;
	} = $props();

	let visible = $state(false);
	const eyeLabel = $derived(visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
</script>

<div class="field" class:is-error={!!error}>
	<label class="label" for={id}
		>{label}{#if required}<span class="req">*</span>{/if}</label
	>
	<div class="input-wrap">
		<Lock size={18} aria-hidden="true" />
		{#if visible}
			<input
				class="input has-action"
				{id}
				type="text"
				{placeholder}
				bind:value
				autocomplete="current-password"
			/>
		{:else}
			<input
				class="input has-action"
				{id}
				type="password"
				{placeholder}
				bind:value
				autocomplete="current-password"
			/>
		{/if}
		<button
			type="button"
			class="eye"
			aria-label={eyeLabel}
			aria-pressed={visible}
			title={eyeLabel}
			onclick={() => (visible = !visible)}
		>
			{#if visible}<EyeOff size={18} />{:else}<Eye size={18} />{/if}
		</button>
	</div>
	{#if error}<span class="help error">{error}</span>{/if}
</div>
