import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { render } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { kjønnType } from '@navikt/familie-typer';

import { EndreSøknadstidspunktModal } from './EndreSøknadstidspunktModal';

const barn = {
    type: PersonType.BARN,
    personIdent: '10987654321',
    fødselsdato: '2023-12-31',
    navn: 'Barn 1',
    kjønn: kjønnType.MANN,
    målform: Målform.NB,
    harFalskIdentitet: false,
};

let mockBehandling: IBehandling;

const { mockQuery, mockMutateAsync } = vi.hoisted(() => ({
    mockQuery: {
        data: [] as Array<{ personIdent: string; søknadstidspunkt: string }>,
        isPending: false,
        error: null as Error | null,
    },
    mockMutateAsync: vi.fn(),
}));

vi.mock('@hooks/useHentRegistrertSøknadstidspunktPåPerson', () => ({
    useHentRegistrertSøknadstidspunktPåPerson: () => mockQuery,
}));
vi.mock('@hooks/useEndreSøknadstidspunkt', () => ({
    useEndreSøknadstidspunkt: () => ({ mutateAsync: mockMutateAsync }),
}));
vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext', () => ({
    useBehandlingContext: () => ({ behandling: mockBehandling, settÅpenBehandling: vi.fn() }),
}));
vi.mock('@hooks/useErLesevisning', () => ({ useErLesevisning: () => false }));

beforeEach(() => {
    vi.clearAllMocks();
    // Kun barn det er framstilt krav for har en registrert rad – modalen viser ett felt per rad.
    mockQuery.data = [{ personIdent: barn.personIdent, søknadstidspunkt: '2025-01-15' }];
    mockQuery.isPending = false;
    mockQuery.error = null;
    mockBehandling = lagBehandling({ personer: [barn], søknadMottattDato: undefined });
});

describe('EndreSøknadstidspunktModal', () => {
    test('viser laster-indikator mens søknadstidspunkt hentes, og ikke skjemaet', () => {
        mockQuery.isPending = true;

        const { screen } = render(<EndreSøknadstidspunktModal lukkModal={vi.fn()} />);

        expect(screen.getByTitle('Laster søknadstidspunkt')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Bekreft' })).not.toBeInTheDocument();
    });

    test('viser feilmelding med detalj fra serveren når henting feiler', () => {
        mockQuery.error = new Error('Personen finnes ikke');

        const { screen } = render(<EndreSøknadstidspunktModal lukkModal={vi.fn()} />);

        expect(screen.getByText(/Kunne ikke hente søknadstidspunkt: Personen finnes ikke/)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Bekreft' })).not.toBeInTheDocument();
    });

    test('viser informasjonsmelding og ingen skjema når ingen barn har registrert søknadstidspunkt', () => {
        mockQuery.data = [];

        const { screen } = render(<EndreSøknadstidspunktModal lukkModal={vi.fn()} />);

        expect(
            screen.getByText('Det er ikke registrert søknadstidspunkt for noen barn på denne behandlingen.')
        ).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Bekreft' })).not.toBeInTheDocument();
    });

    test('viser skjema med datofelt per barn når data er hentet, med barnspesifikt tilgjengelig navn', () => {
        const { screen } = render(<EndreSøknadstidspunktModal lukkModal={vi.fn()} />);

        // Hvert datofelt har et unikt tilgjengelig navn med barnets navn (skjermleser-tilgjengelighet).
        expect(screen.getByRole('textbox', { name: 'Søknadstidspunkt for Barn 1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeInTheDocument();
    });

    test('viser inline-feil umiddelbart når dato settes frem i tid', async () => {
        const { screen, user } = render(<EndreSøknadstidspunktModal lukkModal={vi.fn()} />);

        const datofelt = screen.getByRole('textbox', { name: 'Søknadstidspunkt for Barn 1' });
        await user.clear(datofelt);
        await user.type(datofelt, '31.12.2099');

        expect(await screen.findByText('Du kan ikke sette en dato frem i tid.')).toBeInTheDocument();
    });
});
