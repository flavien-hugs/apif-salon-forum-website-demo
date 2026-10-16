export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validation minimale d'une adresse e-mail (formulaires de démonstration). */
export function isEmail(value: string): boolean {
	return EMAIL_RE.test(value);
}
