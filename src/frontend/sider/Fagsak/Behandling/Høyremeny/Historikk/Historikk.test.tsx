import { describe, expect, test } from 'vitest';

import { Historikk } from './Historikk';
import { lagHistorikkInnslag } from '../../../../../testutils/testdata/historikkinnslagTestdata';
import { render } from '../../../../../testutils/testrender';

describe('Historikk', () => {
    test('skal vise laster tilstand', () => {
        const props = {
            historikkinnslag: undefined,
            laster: true,
            feil: null,
        };

        const { screen } = render(<Historikk {...props} />);

        expect(screen.getByText('Laster historikk...')).toBeInTheDocument();
    });

    test('skal vise feiltilstand hvis feil har en melding', () => {
        const props = {
            historikkinnslag: undefined,
            laster: false,
            feil: new Error('Feilmelding.'),
        };

        const { screen } = render(<Historikk {...props} />);

        expect(screen.getByText('Feilmelding.')).toBeInTheDocument();
    });

    test('skal vise feiltilstand hvis feil ikke har en melding', () => {
        const props = {
            historikkinnslag: undefined,
            laster: false,
            feil: new Error(),
        };

        const { screen } = render(<Historikk {...props} />);

        expect(screen.getByText('En ukjent feil oppstod.')).toBeInTheDocument();
    });

    test('skal håndtere hvis historikkinnslag er undefined', () => {
        const props = {
            historikkinnslag: undefined,
            laster: false,
            feil: null,
        };

        const { screen } = render(<Historikk {...props} />);

        expect(screen.getByText('Behandlingen har ingen historikk.')).toBeInTheDocument();
    });

    test('skal håndtere hvis historikkinnslag er en tom liste', () => {
        const props = {
            historikkinnslag: [],
            laster: false,
            feil: null,
        };

        const { screen } = render(<Historikk {...props} />);

        expect(screen.getByText('Behandlingen har ingen historikk.')).toBeInTheDocument();
    });

    test('skal vise historikkinnslag', () => {
        const props = {
            historikkinnslag: [
                lagHistorikkInnslag({
                    id: '1',
                    dato: '01.01.26 12:00',
                    tittel: 'En tittel 1',
                    utførtAv: 'Sak Saksbehandler',
                    rolle: 'SAKSBEHANDLER',
                    beskrivelse: 'En beskrivende beskrivelse 1.',
                }),
                lagHistorikkInnslag({
                    id: '2',
                    dato: '01.01.26 13:00',
                    tittel: 'En tittel 2',
                    utførtAv: 'Sak Saksbehandler',
                    rolle: 'SAKSBEHANDLER',
                    beskrivelse: 'En beskrivende beskrivelse 2.',
                }),
            ],
            laster: false,
            feil: null,
        };

        const { screen } = render(<Historikk {...props} />);

        expect(screen.getByText('En tittel 1')).toBeInTheDocument();
        expect(screen.getByText('En beskrivende beskrivelse 1.')).toBeInTheDocument();
        expect(screen.getByText('01.01.26 12:00')).toBeInTheDocument();

        expect(screen.getByText('En tittel 2')).toBeInTheDocument();
        expect(screen.getByText('En beskrivende beskrivelse 2.')).toBeInTheDocument();
        expect(screen.getByText('01.01.26 13:00')).toBeInTheDocument();

        expect(screen.getAllByText('Sak Saksbehandler (Saksbehandler)')).toHaveLength(2);
    });
});
