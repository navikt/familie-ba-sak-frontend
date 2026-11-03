import type { Page } from '@playwright/test';

import { expect } from './fixtures';

/** Sidene beslutter må kontrollere i en førstegangsbehandling på søknad, i rekkefølgen i prosessmenyen. */
export const KONTROLLSIDER = [
    { navn: 'Registrer søknad', overskrift: 'Registrer opplysninger fra søknaden' },
    { navn: 'Vilkårsvurdering', overskrift: 'Vilkårsvurdering' },
    { navn: 'Behandlingsresultat', overskrift: 'Behandlingsresultat' },
    { navn: 'Simulering', overskrift: 'Simulering' },
    { navn: 'Vedtak', overskrift: 'Vedtak' },
];

/** En side regnes som kontrollert når beslutter har vært innom den, så vi går gjennom alle via prosessmenyen. */
export async function kontrollerAlleSider(page: Page) {
    const prosessmeny = page.getByRole('navigation', { name: 'Behandlingssteg' });

    for (const { navn, overskrift } of KONTROLLSIDER) {
        // Lenkenavnet starter med statusikonets tittel, f.eks. «Utført og låst Registrer søknad»
        await prosessmeny.getByRole('link', { name: new RegExp(`${navn}$`) }).click();
        await expect(page.getByRole('heading', { level: 1, name: overskrift, exact: true })).toBeVisible();
    }
}
