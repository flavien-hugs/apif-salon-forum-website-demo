/* Données de démonstration du site public du Salon Fintech.
   Aucun backend n'est disponible : toutes les valeurs ci-dessous sont
   illustratives et marquées comme telles dans l'interface. */

export const DEMO = {
	event: {
		title: 'Salon des Fintech APIF 2026',
		dateLabel: 'Mi-décembre 2026',
		placeLabel: "Côte d'Ivoire",
		dateNote: 'Date et lieu à confirmer par APIF'
	}
};

export type SessionKind = 'Ouverture' | 'Panel' | 'Pitch' | 'B2B' | 'Atelier';
export type SessionDay = 'Jour 1' | 'Jour 2';

export interface Session {
	id: number;
	day: SessionDay;
	time: string;
	kind: SessionKind;
	title: string;
	theme: string;
	place: string;
	desc: string;
}

export const SESSION_DAYS: Array<'Tous' | SessionDay> = ['Tous', 'Jour 1', 'Jour 2'];
export const SESSION_KINDS: Array<'Tous' | SessionKind> = [
	'Tous',
	'Ouverture',
	'Panel',
	'Pitch',
	'B2B',
	'Atelier'
];

export const sessions: Session[] = [
	{
		id: 1,
		day: 'Jour 1',
		time: '09:00',
		kind: 'Ouverture',
		title: 'Ouverture du salon',
		theme: 'Inclusion financière',
		place: 'Plénière',
		desc: "Allocution d'ouverture : vision, ambitions et opportunités pour l'inclusion financière en Côte d'Ivoire."
	},
	{
		id: 2,
		day: 'Jour 1',
		time: '10:00',
		kind: 'Panel',
		title: 'Les nouveaux usages des paiements',
		theme: 'Paiements numériques',
		place: 'Salle Panel',
		desc: 'Interopérabilité, paiements marchands et parcours des utilisateurs non bancarisés.'
	},
	{
		id: 3,
		day: 'Jour 1',
		time: '11:30',
		kind: 'Pitch',
		title: 'Les fintechs présentent leurs solutions',
		theme: 'Entrepreneuriat',
		place: 'Pitch Room',
		desc: "Les projets retenus présentent leur solution devant les acteurs de l'écosystème."
	},
	{
		id: 4,
		day: 'Jour 1',
		time: '14:00',
		kind: 'B2B',
		title: 'Rencontres entre acteurs et partenaires',
		theme: 'Partenariats',
		place: 'Espace B2B',
		desc: "Rendez-vous ciblés planifiés depuis l'espace participant, sans chevauchement de créneaux."
	},
	{
		id: 5,
		day: 'Jour 2',
		time: '09:30',
		kind: 'Panel',
		title: 'Financer les petites entreprises',
		theme: 'Financement',
		place: 'Salle Panel',
		desc: 'Crédit digital, scoring alternatif et accompagnement des TPE.'
	},
	{
		id: 6,
		day: 'Jour 2',
		time: '11:00',
		kind: 'Atelier',
		title: 'Préparer son dossier fintech',
		theme: 'Accompagnement',
		place: 'Salle Atelier',
		desc: "Atelier pratique pour constituer son dossier dans l'espace collaboratif APIF."
	},
	{
		id: 7,
		day: 'Jour 2',
		time: '15:00',
		kind: 'Ouverture',
		title: 'Clôture et annonces',
		theme: 'Inclusion financière',
		place: 'Plénière',
		desc: 'Restitution des échanges et annonce des projets de la Pitch Room.'
	}
];

export interface Exhibitor {
	id: number;
	initials: string;
	name: string;
	sector: string;
	desc: string;
	long: string;
	audiences: [string, string];
}

export const EXHIBITOR_SECTORS = ['Tous', 'Paiements', 'Financement', 'Assurance', 'Gestion'];

export const exhibitors: Exhibitor[] = [
	{
		id: 1,
		initials: 'PA',
		name: 'Solution de paiement A',
		sector: 'Paiements',
		desc: 'Un parcours de paiement pour les commerçants.',
		long: 'Encaissement marchand multi-canal (mobile money, carte, QR) avec rapprochement automatique.',
		audiences: ['Commerçants', 'PME']
	},
	{
		id: 2,
		initials: 'FB',
		name: 'Solution de financement B',
		sector: 'Financement',
		desc: 'Des outils pour accompagner les petites entreprises.',
		long: 'Crédit de trésorerie digital adossé à un scoring alternatif fondé sur les flux de paiement.',
		audiences: ['TPE', 'Institutions financières']
	},
	{
		id: 3,
		initials: 'GC',
		name: 'Solution de gestion C',
		sector: 'Gestion',
		desc: 'Une interface pour suivre les opérations et les partenaires.',
		long: 'Tableau de bord de gestion et facturation pour les entrepreneurs informels en transition.',
		audiences: ['Entrepreneurs', 'Coopératives']
	},
	{
		id: 4,
		initials: 'AD',
		name: 'Assurance digitale D',
		sector: 'Assurance',
		desc: 'Des micro-assurances souscrites depuis le mobile.',
		long: "Produits d'assurance santé et récolte à souscription instantanée, primes fractionnées.",
		audiences: ['Particuliers', 'Agriculteurs']
	},
	{
		id: 5,
		initials: 'TE',
		name: 'Transferts E',
		sector: 'Paiements',
		desc: 'Transferts transfrontaliers à coût réduit.',
		long: "Corridors de transfert Afrique de l'Ouest avec réception sur portefeuille mobile.",
		audiences: ['Diaspora', 'Opérateurs']
	},
	{
		id: 6,
		initials: 'IF',
		name: 'Identité financière F',
		sector: 'Gestion',
		desc: "Vérification d'identité et scoring de confiance.",
		long: 'KYC simplifié et historique de crédit portable pour les personnes non bancarisées.',
		audiences: ['Banques', 'Fintechs']
	}
];

/** Les trois exposants mis en avant sur l'accueil. */
export const featuredExhibitors = [
	{ initials: 'PA', name: 'Solution A', sector: 'Paiements' },
	{ initials: 'FB', name: 'Solution B', sector: 'Financement' },
	{ initials: 'GC', name: 'Solution C', sector: 'Gestion' }
];

export type ProfileId = 'visiteur' | 'fintech' | 'investisseur' | 'partenaire';

export const profiles: Array<{ id: ProfileId; label: string; desc: string }> = [
	{ id: 'visiteur', label: 'Visiteur', desc: 'Découvrir le salon, assister aux sessions.' },
	{
		id: 'fintech',
		label: 'Fintech',
		desc: 'Présenter une solution, candidater à la Pitch Room, rencontrer des partenaires.'
	},
	{
		id: 'investisseur',
		label: 'Investisseur',
		desc: 'Identifier des projets et planifier des rendez-vous B2B.'
	},
	{
		id: 'partenaire',
		label: 'Partenaire',
		desc: 'Institution, régulateur, banque ou opérateur partenaire.'
	}
];

export const sectors = [
	'Paiements',
	'Financement',
	'Assurance',
	'Gestion',
	'Transferts',
	'Identité numérique',
	'Régulation',
	'Autre'
];

export const maturities = ['Idée', 'Prototype', 'Premiers clients', 'Croissance'];

export const demoSlots = ['Pendant le salon', 'Avant le salon (visio)', 'Après le salon', 'Autre'];

export const faqs = [
	{
		q: 'Comment obtenir mon badge ?',
		a: "Le badge devient disponible dans votre espace participant après validation de l'inscription par APIF. Il peut être présenté sur mobile ou imprimé."
	},
	{
		q: 'Puis-je modifier mon inscription ?',
		a: "Oui, depuis Mon espace, tant que l'inscription n'a pas été contrôlée à l'accueil. Une annulation invalide le badge associé."
	},
	{
		q: 'Qui contacter pour une question ?',
		a: "L'équipe du salon répond par e-mail ou téléphone (coordonnées à confirmer). La communauté de l'espace collaboratif reste ouverte aux questions pratiques."
	},
	{
		q: 'Comment planifier des rendez-vous B2B ?',
		a: 'Après validation de votre inscription, les suggestions de rencontres et la proposition de créneaux sont accessibles dans Mon espace › Rencontres B2B.'
	},
	{
		q: 'Le salon est-il accessible aux personnes à mobilité réduite ?',
		a: "Les informations d'accessibilité du lieu seront publiées avec l'adresse définitive."
	}
];
