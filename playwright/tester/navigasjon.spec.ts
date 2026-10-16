import { expect, test } from '../fixtures';

test.describe('Navigasjon', () => {
    test('skal vise feilside for ukjent adresse og kunne gå tilbake til forsiden', async ({ page }) => {
        await page.goto('/finnes-ikke');

        await expect(page.getByRole('heading', { name: 'Beklager, vi fant ikke siden' })).toBeVisible();

        await page.getByRole('button', { name: 'Gå til forsiden' }).click();

        await expect(page).toHaveURL(/\/oppgaver$/);
        await expect(page.getByRole('heading', { name: 'Oppgavebenken' })).toBeVisible();
    });

    test('skal kunne navigere mellom sidene i en fagsak', async ({ page }) => {
        await page.goto('/fagsak/1');

        await expect(page).toHaveURL(/\/fagsak\/1\/saksoversikt$/);
        await expect(page.getByRole('heading', { name: 'Saksoversikt' })).toBeVisible();

        await page.getByRole('button', { name: 'Dokumenter' }).click();
        await expect(page).toHaveURL(/\/fagsak\/1\/dokumenter$/);
        await expect(page.getByRole('heading', { name: 'Dokumentoversikt' })).toBeVisible();

        await page.getByRole('button', { name: 'Saksoversikt' }).click();
        await expect(page).toHaveURL(/\/fagsak\/1\/saksoversikt$/);
        await expect(page.getByRole('heading', { name: 'Saksoversikt' })).toBeVisible();
    });
});
