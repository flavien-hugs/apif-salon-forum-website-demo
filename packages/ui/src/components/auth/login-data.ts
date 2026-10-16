/* Données de démonstration de l'écran de connexion commun aux deux sites. */

export type LoginRole = 'member' | 'participant' | 'admin' | 'operator' | 'none';

export const loginSpaces: Array<{ label: string; role: LoginRole }> = [
	{ label: "Membre — tableau de bord de l'espace collaboratif", role: 'member' },
	{ label: 'Participant — mon espace du salon', role: 'participant' },
	{ label: 'Gestionnaire APIF — administration', role: 'admin' },
	{ label: 'Opérateur accueil — contrôle des badges', role: 'operator' },
	{ label: 'Compte sans droits (accès refusé)', role: 'none' }
];

export const loginRoles: Record<LoginRole, { label: string; target: string }> = {
	member: { label: 'Membre', target: 'mon tableau de bord' },
	participant: { label: 'Participant', target: 'mon espace participant' },
	admin: { label: 'Gestionnaire APIF', target: "l'administration" },
	operator: { label: 'Opérateur accueil', target: "l'accueil des participants" },
	none: { label: 'Aucun droit', target: 'le portail' }
};
