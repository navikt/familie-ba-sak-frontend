import { Button } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { describe, expect, test, vi } from 'vitest';
import { render } from '../../../testutils/testrender';
import { LeggTilBarnModal } from './LeggTilBarnModal';
import { LeggTilBarnModalContextProvider, useLeggTilBarnModalContext } from './LeggTilBarnModalContext';

function ÅpneModalKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();
    return <Button onClick={åpneModal}>Åpne modal</Button>;
}

function renderModal(onLeggTilBarn: (barn: IBarnMedOpplysninger) => void) {
    return render(
        <LeggTilBarnModalContextProvider barn={[]} onLeggTilBarn={onLeggTilBarn} harBrevmottaker={false}>
            <ÅpneModalKnapp />
            <LeggTilBarnModal />
        </LeggTilBarnModalContextProvider>
    );
}

describe('LeggTilBarnModal', () => {
    test('viser feilmelding når barn som ikke er folkeregistrert legges til uten fødselsdato', async () => {
        const onLeggTilBarn = vi.fn();
        const { screen, user } = renderModal(onLeggTilBarn);

        await user.click(screen.getByRole('button', { name: 'Åpne modal' }));
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.type(screen.getByRole('textbox', { name: 'Barnets navn' }), 'Ukjent');
        await user.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(await screen.findByText('Fødselsdato er påkrevd.')).toBeInTheDocument();
        expect(onLeggTilBarn).not.toHaveBeenCalled();
    });

    test('legger til barn som ikke er folkeregistrert når fødselsdato er fylt ut', async () => {
        const onLeggTilBarn = vi.fn();
        const { screen, user } = renderModal(onLeggTilBarn);

        await user.click(screen.getByRole('button', { name: 'Åpne modal' }));
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.type(screen.getByRole('textbox', { name: 'Fødselsdato' }), '01.01.2020');
        await user.type(screen.getByRole('textbox', { name: 'Barnets navn' }), 'Ukjent');
        await user.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onLeggTilBarn).toHaveBeenCalledWith({
            fødselsdato: '2020-01-01',
            ident: '',
            merket: true,
            manueltRegistrert: true,
            navn: 'Ukjent',
            erFolkeregistrert: false,
        });
    });

    test('krever ikke fødselsdato når barnet er folkeregistrert', async () => {
        const onLeggTilBarn = vi.fn();
        const { screen, user } = renderModal(onLeggTilBarn);

        await user.click(screen.getByRole('button', { name: 'Åpne modal' }));
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.click(screen.getByRole('button', { name: 'Legg til' }));
        expect(await screen.findByText('Fødselsdato er påkrevd.')).toBeInTheDocument();

        await user.click(screen.getByRole('radio', { name: 'Ja' }));
        await user.type(screen.getByRole('textbox', { name: 'Fødselsnummer / D-nummer' }), '01012000010');
        await user.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(onLeggTilBarn).toHaveBeenCalledWith(
            expect.objectContaining({ ident: '01012000010', erFolkeregistrert: true })
        );
    });

    test('nullstiller fødselsdato når man bytter fra ikke folkeregistrert til folkeregistrert og tilbake', async () => {
        const onLeggTilBarn = vi.fn();
        const { screen, user } = renderModal(onLeggTilBarn);

        await user.click(screen.getByRole('button', { name: 'Åpne modal' }));
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.type(screen.getByRole('textbox', { name: 'Fødselsdato' }), '01.01.2020');
        await user.click(screen.getByRole('radio', { name: 'Ja' }));
        await user.click(screen.getByRole('radio', { name: 'Nei' }));

        expect(screen.getByRole('textbox', { name: 'Fødselsdato' })).toHaveValue('');

        await user.type(screen.getByRole('textbox', { name: 'Barnets navn' }), 'Ukjent');
        await user.click(screen.getByRole('button', { name: 'Legg til' }));

        expect(await screen.findByText('Fødselsdato er påkrevd.')).toBeInTheDocument();
        expect(onLeggTilBarn).not.toHaveBeenCalled();
    });
});
