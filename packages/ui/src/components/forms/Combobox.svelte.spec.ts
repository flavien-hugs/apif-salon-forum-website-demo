import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Combobox from './Combobox.svelte';

const options = ['Paiements', 'Financement', 'Assurance', 'Autre'];

describe('Combobox.svelte', () => {
	it('ouvre la liste, filtre à la saisie et sélectionne une option', async () => {
		render(Combobox, { id: 'secteur', label: 'Secteur', options, value: '' });

		const input = page.getByRole('combobox', { name: 'Secteur' });
		await input.click();
		await expect.element(page.getByRole('listbox')).toBeInTheDocument();
		expect(page.getByRole('option').elements()).toHaveLength(4);

		await input.fill('fin');
		expect(page.getByRole('option').elements()).toHaveLength(1);

		await page.getByRole('option', { name: 'Financement' }).click();
		await expect.element(input).toHaveValue('Financement');
		await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
	});

	it('affiche un état vide quand rien ne correspond', async () => {
		render(Combobox, { id: 's2', label: 'Secteur', options, value: '' });
		const input = page.getByRole('combobox', { name: 'Secteur' });
		await input.fill('zzz');
		await expect.element(page.getByText('Aucun résultat')).toBeInTheDocument();
	});
});
