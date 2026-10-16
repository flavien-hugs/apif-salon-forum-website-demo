/* Données de démonstration du site public de l'espace collaboratif.
   Aucun backend n'est disponible : toutes les valeurs ci-dessous sont
   illustratives et marquées comme telles dans l'interface. */

export interface Organisation {
	slug: string;
	initials: string;
	name: string;
	sector: string;
	/** Libellé affiché sur l'accueil (secteur détaillé). */
	sectorLabel: string;
	city: string;
	desc: string;
	skills: string[];
	presentation: string;
	solution: string;
	needs: string;
	validatedOn: string;
}

export const ORG_SECTORS = ['Tous', 'Paiements', 'Financement', 'Assurance', 'Gestion'];

export const organisations: Organisation[] = [
	{
		slug: 'organisation-fintech-a',
		initials: 'FA',
		name: 'Organisation fintech A',
		sector: 'Paiements',
		sectorLabel: 'Paiements numériques',
		city: 'Abidjan',
		desc: 'Des solutions de paiement pour les commerçants.',
		skills: ['Paiements', 'Services aux commerçants', 'Mobile money'],
		presentation:
			'Cette organisation de démonstration propose des services numériques à destination des commerçants : encaissement, suivi des ventes et accès simplifié à des services financiers.',
		solution: 'Un parcours de paiement pour simplifier les transactions du quotidien.',
		needs: "Partenariats, échanges d'expertise et accompagnement.",
		validatedOn: '02/10/2026'
	},
	{
		slug: 'organisation-fintech-b',
		initials: 'FB',
		name: 'Organisation fintech B',
		sector: 'Financement',
		sectorLabel: 'Services de financement',
		city: 'Abidjan',
		desc: 'Des services pour accompagner les petites entreprises.',
		skills: ['Crédit digital', 'Scoring'],
		presentation:
			'Cette organisation de démonstration propose des services de financement digital pour les petites entreprises : crédit de trésorerie, scoring alternatif et suivi des remboursements.',
		solution:
			'Un crédit de trésorerie accessible depuis le mobile, adossé à un scoring alternatif.',
		needs: 'Partenaires bancaires, données de paiement et accompagnement réglementaire.',
		validatedOn: '02/10/2026'
	},
	{
		slug: 'organisation-fintech-c',
		initials: 'FC',
		name: 'Organisation fintech C',
		sector: 'Assurance',
		sectorLabel: 'Assurance numérique',
		city: 'Bouaké',
		desc: "Des services numériques pour élargir l'accès à l'assurance.",
		skills: ['Micro-assurance', 'Agriculture'],
		presentation:
			'Cette organisation de démonstration conçoit des produits de micro-assurance souscrits depuis le mobile, destinés aux agriculteurs et aux travailleurs indépendants.',
		solution: 'Des couvertures santé et récolte à souscription instantanée, primes fractionnées.',
		needs: 'Réseaux de distribution, partenaires assureurs et données agricoles.',
		validatedOn: '02/10/2026'
	},
	{
		slug: 'organisation-fintech-d',
		initials: 'FD',
		name: 'Organisation fintech D',
		sector: 'Paiements',
		sectorLabel: 'Transferts et portefeuilles mobiles',
		city: 'Yamoussoukro',
		desc: "Transferts d'argent et portefeuilles mobiles.",
		skills: ['Transferts', 'Mobile money'],
		presentation:
			"Cette organisation de démonstration opère des corridors de transfert d'argent en Afrique de l'Ouest avec réception sur portefeuille mobile.",
		solution: 'Des transferts transfrontaliers à coût réduit, reçus directement sur mobile.',
		needs: 'Opérateurs partenaires, conformité et interopérabilité.',
		validatedOn: '02/10/2026'
	},
	{
		slug: 'organisation-fintech-e',
		initials: 'FE',
		name: 'Organisation fintech E',
		sector: 'Gestion',
		sectorLabel: 'Gestion et facturation',
		city: 'Abidjan',
		desc: 'Outils de gestion et de facturation pour les TPE.',
		skills: ['Facturation', 'Comptabilité'],
		presentation:
			'Cette organisation de démonstration édite un tableau de bord de gestion et de facturation pour les entrepreneurs informels en transition.',
		solution: 'Un outil simple pour facturer, suivre ses ventes et préparer sa comptabilité.',
		needs: "Partenaires comptables, intégrations de paiement et programmes d'accompagnement.",
		validatedOn: '02/10/2026'
	},
	{
		slug: 'organisation-fintech-f',
		initials: 'FF',
		name: 'Organisation fintech F',
		sector: 'Financement',
		sectorLabel: 'Financement participatif',
		city: 'San-Pédro',
		desc: 'Financement participatif de projets agricoles.',
		skills: ['Crowdfunding', 'Agriculture'],
		presentation:
			'Cette organisation de démonstration met en relation des épargnants et des coopératives agricoles pour financer des campagnes de production.',
		solution: 'Une plateforme de financement participatif dédiée aux projets agricoles.',
		needs: 'Coopératives partenaires, investisseurs et cadre réglementaire.',
		validatedOn: '02/10/2026'
	}
];

/** Les trois organisations mises en avant sur l'accueil. */
export const featuredOrganisations = organisations.slice(0, 3);
