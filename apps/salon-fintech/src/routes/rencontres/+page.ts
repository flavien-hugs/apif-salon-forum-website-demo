import { redirect } from '@sveltejs/kit';
import { routes } from '#lib/routes.js';

// Espace réservé aux participants (hors périmètre du site public) :
// l'accès passe par la connexion commune.
export function load() {
	redirect(307, `${routes.connexion}?next=${routes.rencontres}`);
}
