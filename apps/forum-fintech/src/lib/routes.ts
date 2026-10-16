import { resolve } from '$app/paths';

/** Routes publiques de l'espace collaboratif (reprises du document de référence). */
export const routes = {
	accueil: resolve('/'),
	annuaire: resolve('/annuaire'),
	communaute: resolve('/communaute'),
	ressources: resolve('/ressources'),
	coaching: resolve('/coaching'),
	monEspace: resolve('/mon-espace'),
	connexion: resolve('/auth/connexion')
} as const;

export const ficheRoute = (slug: string) => resolve('/annuaire/[slug]', { slug });

/** Site du Salon Fintech (application séparée), tel que nommé dans la maquette. */
export const SALON_URL = 'https://salon-fintech.bedet.ci';
