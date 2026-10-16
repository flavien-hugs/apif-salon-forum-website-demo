import { resolve } from '$app/paths';

/** Routes publiques du Salon Fintech (reprises du document de référence),
 *  résolues avec `resolve()` pour tenir compte d'un éventuel préfixe de base. */
export const routes = {
	accueil: resolve('/'),
	programme: resolve('/programme'),
	inscription: resolve('/inscription'),
	exposants: resolve('/exposants'),
	pitchRoom: resolve('/pitch-room'),
	rencontres: resolve('/rencontres'),
	infos: resolve('/informations-pratiques'),
	monEspace: resolve('/mon-espace'),
	connexion: resolve('/auth/connexion')
} as const;

/** Site de l'espace collaboratif (hors périmètre), tel que nommé dans la maquette. */
export const ESPACE_URL = 'https://apif.bedet.ci';
