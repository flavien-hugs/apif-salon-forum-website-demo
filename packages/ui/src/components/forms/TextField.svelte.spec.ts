import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TextField from './TextField.svelte';

describe('TextField.svelte', () => {
	it('relie le libellé au champ et signale le caractère obligatoire', async () => {
		render(TextField, { id: 'email', label: 'Adresse e-mail', required: true, type: 'email' });
		const input = page.getByRole('textbox', { name: /Adresse e-mail/ });
		await expect.element(input).toBeInTheDocument();
		await expect.element(input).toHaveAttribute('type', 'email');
	});

	it("affiche le message d'erreur et le relie au champ", async () => {
		render(TextField, { id: 'nom', label: 'Nom', error: 'Le nom est obligatoire.' });
		const input = page.getByRole('textbox', { name: 'Nom' });
		await expect.element(input).toHaveAttribute('aria-invalid', 'true');
		await expect.element(input).toHaveAttribute('aria-describedby', 'nom-error');
		await expect.element(page.getByText('Le nom est obligatoire.')).toBeInTheDocument();
	});
});
