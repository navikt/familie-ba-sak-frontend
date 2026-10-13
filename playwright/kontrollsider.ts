import type { Page } from '@playwright/test';

import { expect } from './fixtures';

/** Sidene beslutter må kontrollere i en førstegangsbehandling på søknad, i rekkefølgen i venstremenyen. */
export const KONTROLLSIDER = [
    { navn: 'Registrer søknad', overskrift: 'Registrer opplysninger fra søknaden' },
    { navn: 'Vilkårsvurdering', overskrift: 'Vilkårsvurdering' },
    { navn: 'Behandlingsresultat', overskrift: 'Behandlingsresultat' },
    { navn: 'Simulering', overskrift: 'Simulering' },
    { navn: 'Vedtak', overskrift: 'Vedtak' },
];

/** En side regnes som kontrollert når beslutter har vært innom den, så vi går gjennom alle via venstremenyen. */
export async function kontrollerAlleSider(page: Page) {
    const venstremeny = page.getByRole('navigation');

    for (const [index, { navn, overskrift }] of KONTROLLSIDER.entries()) {
        await venstremeny.getByRole('link', { name: `${index + 1}. ${navn}` }).click();
        await expect(page.getByRole('heading', { level: 1, name: overskrift, exact: true })).toBeVisible();
    }
}
