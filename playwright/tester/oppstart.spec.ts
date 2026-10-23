import { expect, test } from '../fixtures';

test.describe('Oppstart', () => {
    test('skal sende saksbehandler til oppgavebenken og vise innlogget saksbehandler', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveURL(/\/oppgaver$/);
        await expect(page.getByRole('heading', { name: 'Oppgavebenken' })).toBeVisible();
        await expect(page.getByRole('button', { name: /^Sak Behandler/ })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Systemet laster' })).toBeHidden();
    });
});
