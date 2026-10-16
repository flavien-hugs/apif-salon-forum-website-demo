export interface NavLink {
	href: string;
	label: string;
	/** Lien vers un autre site (ouvre hors de l'application). */
	external?: boolean;
}

export interface NavAction extends NavLink {
	variant: 'primary' | 'secondary';
}
