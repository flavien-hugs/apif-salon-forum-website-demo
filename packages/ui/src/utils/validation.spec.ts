import { describe, expect, it } from 'vitest';
import { isEmail } from './validation';

describe('isEmail', () => {
	it('valide une adresse simple', () => {
		expect(isEmail('nom@organisation.ci')).toBe(true);
	});
	it('refuse une adresse incomplète', () => {
		expect(isEmail('nom@organisation')).toBe(false);
		expect(isEmail('')).toBe(false);
	});
});
