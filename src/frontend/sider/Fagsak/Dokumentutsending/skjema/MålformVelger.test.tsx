import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/testutils/renderMedSkjema';
import { describe, expect, test } from 'vitest';

import { MålformVelger } from './MålformVelger';

describe('MålformVelger', () => {
    test('viser feilmelding når skjemaet sendes inn uten valgt målform', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<MålformVelger />);

        await sendInnSkjema();

        expect(await screen.findByText('Du må velge målform')).toBeInTheDocument();
    });

    test('valg av bokmål oppdaterer feltet og fjerner feilmeldingen', async () => {
        const { sendInnSkjema, screen, user } = renderMedSkjema(<MålformVelger />);

        await sendInnSkjema();
        expect(await screen.findByText('Du må velge målform')).toBeInTheDocument();

        await user.click(screen.getByRole('radio', { name: 'Bokmål' }));

        expect(screen.getByRole('radio', { name: 'Bokmål' })).toBeChecked();
        expect(screen.queryByText('Du må velge målform')).not.toBeInTheDocument();
    });

    test('valg av nynorsk oppdaterer feltet', async () => {
        const { screen, user } = renderMedSkjema(<MålformVelger />);

        await user.click(screen.getByRole('radio', { name: 'Nynorsk' }));

        expect(screen.getByRole('radio', { name: 'Nynorsk' })).toBeChecked();
    });
});
