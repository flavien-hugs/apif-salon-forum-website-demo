import { describe, expect, it } from 'vitest';
import { exhibitors, sessions } from '#lib/data/index.js';
import { filterExhibitors, filterSessions } from './filters';

describe('filterSessions', () => {
	it('retourne tout le programme sans filtre', () => {
		expect(filterSessions(sessions, 'Tous', 'Tous', '')).toHaveLength(sessions.length);
	});
	it('combine jour, format et recherche', () => {
		const r = filterSessions(sessions, 'Jour 1', 'Panel', 'paiements');
		expect(r.map((s) => s.id)).toEqual([2]);
	});
	it('ignore la casse et les espaces dans la recherche', () => {
		expect(filterSessions(sessions, 'Tous', 'Tous', '  CLÔTURE ')).toHaveLength(1);
	});
});

describe('filterExhibitors', () => {
	it('filtre par secteur', () => {
		const r = filterExhibitors(exhibitors, 'Paiements', '');
		expect(r.every((x) => x.sector === 'Paiements')).toBe(true);
		expect(r).toHaveLength(2);
	});
	it('retourne une liste vide quand rien ne correspond', () => {
		expect(filterExhibitors(exhibitors, 'Assurance', 'zzz')).toEqual([]);
	});
});
