import type { Exhibitor, Session, SessionDay, SessionKind } from '#lib/data/index.js';

/** Filtre le programme par jour, format et recherche libre. */
export function filterSessions(
	all: Session[],
	day: 'Tous' | SessionDay,
	kind: 'Tous' | SessionKind,
	query: string
): Session[] {
	const q = query.trim().toLowerCase();
	return all.filter(
		(s) =>
			(day === 'Tous' || s.day === day) &&
			(kind === 'Tous' || s.kind === kind) &&
			(!q || `${s.title} ${s.theme} ${s.kind}`.toLowerCase().includes(q))
	);
}

/** Filtre les exposants par secteur et recherche libre. */
export function filterExhibitors(all: Exhibitor[], sector: string, query: string): Exhibitor[] {
	const q = query.trim().toLowerCase();
	return all.filter(
		(x) =>
			(sector === 'Tous' || x.sector === sector) &&
			(!q || `${x.name} ${x.desc} ${x.sector}`.toLowerCase().includes(q))
	);
}
