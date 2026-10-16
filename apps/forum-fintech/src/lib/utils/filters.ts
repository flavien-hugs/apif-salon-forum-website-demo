import type { Organisation } from '#lib/data/index.js';

/** Filtre l'annuaire par secteur et recherche libre (nom, description, expertises). */
export function filterOrganisations(
	all: Organisation[],
	sector: string,
	query: string
): Organisation[] {
	const q = query.trim().toLowerCase();
	return all.filter(
		(o) =>
			(sector === 'Tous' || o.sector === sector) &&
			(!q || `${o.name} ${o.desc} ${o.sector} ${o.skills.join(' ')}`.toLowerCase().includes(q))
	);
}
