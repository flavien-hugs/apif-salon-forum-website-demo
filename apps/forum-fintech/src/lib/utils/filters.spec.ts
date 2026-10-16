import { describe, expect, it } from 'vitest';
import { organisations } from '#lib/data/index.js';
import { filterOrganisations } from './filters';

describe('filterOrganisations', () => {
	it("retourne tout l'annuaire sans filtre", () => {
		expect(filterOrganisations(organisations, 'Tous', '')).toHaveLength(organisations.length);
	});
	it('filtre par secteur', () => {
		const r = filterOrganisations(organisations, 'Financement', '');
		expect(r.map((o) => o.initials)).toEqual(['FB', 'FF']);
	});
	it('cherche aussi dans les expertises', () => {
		expect(
			filterOrganisations(organisations, 'Tous', 'agriculture').map((o) => o.initials)
		).toEqual(['FC', 'FF']);
	});
	it('retourne une liste vide quand rien ne correspond', () => {
		expect(filterOrganisations(organisations, 'Assurance', 'zzz')).toEqual([]);
	});
});
