import { error } from '@sveltejs/kit';
import { organisations } from '#lib/data/index.js';
import type { EntryGenerator, PageLoad } from './$types';

// Une fiche pré-rendue par organisation de démonstration.
export const entries: EntryGenerator = () => organisations.map((o) => ({ slug: o.slug }));

export const load: PageLoad = ({ params }) => {
	const organisation = organisations.find((o) => o.slug === params.slug);
	if (!organisation) error(404, 'Organisation introuvable');
	return { organisation };
};
