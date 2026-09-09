import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagGrunnlagPerson, lagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import type { IPersonInfo } from '@typer/person';
import { Adressebeskyttelsegradering, ForelderBarnRelasjonRolle } from '@typer/person';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { BrukerProvider } from '../../../BrukerContext';
import { FagsakProvider } from '../../../FagsakContext';
import { BehandlingProvider } from '../../context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '../../context/HentOgSettBehandlingContext';
import Brevskjema from './Brevskjema';

const OBLIGATORISK_FEILMELDING = 'Dette kulepunktet er obligatorisk. Du må skrive tekst i feltet.';

const behandling = lagBehandling({
    type: Behandlingstype.REVURDERING,
    årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
    personer: [lagGrunnlagPerson()],
});

function lagWrapper(bruker: IPersonInfo) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return (
            <TestProviders>
                <FagsakProvider fagsak={lagFagsak()}>
                    <HentOgSettBehandlingProvider>
                        <BehandlingProvider behandling={behandling}>
                            <BrukerProvider bruker={bruker}>{children}</BrukerProvider>
                        </BehandlingProvider>
                    </HentOgSettBehandlingProvider>
                </FagsakProvider>
            </TestProviders>
        );
    };
}

function Wrapper({ children }: { children: ReactNode }) {
    return lagWrapper(lagPerson())({ children });
}

describe('Brevskjema validering', () => {
    test('skal ikke vise valideringsfeil når brevskjemaet lastes', () => {
        const { screen } = render(<Brevskjema onSubmitSuccess={vi.fn()} bruker={lagPerson()} />, {
            wrapper: Wrapper,
        });

        expect(screen.queryByText('Du må velge en brevmal')).not.toBeInTheDocument();
        expect(screen.queryByText(OBLIGATORISK_FEILMELDING)).not.toBeInTheDocument();
    });

    test('skal ikke vise valideringsfeil når brevmal velges', async () => {
        const { screen, user } = render(<Brevskjema onSubmitSuccess={vi.fn()} bruker={lagPerson()} />, {
            wrapper: Wrapper,
        });

        await user.selectOptions(screen.getByRole('combobox', { name: /Velg brevmal/ }), 'FORLENGET_SVARTIDSBREV');

        expect(screen.getByLabelText('Skriv inn kulepunkt')).toBeInTheDocument();
        expect(screen.queryByText(OBLIGATORISK_FEILMELDING)).not.toBeInTheDocument();
    });

    test('skal skjule valideringsfeil igjen når brevmal endres etter en innsending', async () => {
        const { screen, user } = render(<Brevskjema onSubmitSuccess={vi.fn()} bruker={lagPerson()} />, {
            wrapper: Wrapper,
        });

        const brevmalvelger = screen.getByRole('combobox', { name: /Velg brevmal/ });
        await user.selectOptions(brevmalvelger, 'FORLENGET_SVARTIDSBREV');

        // Innsending med tomt obligatorisk kulepunkt gjør at valideringsfeil vises
        await user.click(screen.getByRole('button', { name: 'Send brev' }));
        expect(await screen.findByText(OBLIGATORISK_FEILMELDING)).toBeInTheDocument();

        // Ved bytte av brevmal skal skjemaet nullstilles slik at feilen ikke lenger vises
        await user.selectOptions(brevmalvelger, 'VARSEL_OM_REVURDERING');
        expect(screen.queryByText(OBLIGATORISK_FEILMELDING)).not.toBeInTheDocument();
    });
});

describe('Brevskjema delt bosted', () => {
    const brukerMedBarn = lagPerson({
        forelderBarnRelasjon: [
            {
                adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
                fødselsdato: '2015-05-05',
                navn: 'Barn Barnesen',
                personIdent: '12345678910',
                relasjonRolle: ForelderBarnRelasjonRolle.BARN,
            },
        ],
    });

    test('skal vise avtalefelt når et barn velges, uten valideringsfeil før innsending', async () => {
        const { screen, user } = render(<Brevskjema onSubmitSuccess={vi.fn()} bruker={brukerMedBarn} />, {
            wrapper: lagWrapper(brukerMedBarn),
        });

        await user.selectOptions(
            screen.getByRole('combobox', { name: /Velg brevmal/ }),
            'VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14'
        );

        const barnCheckbox = screen.getByRole('checkbox', { name: /Barn Barnesen/ });
        expect(barnCheckbox).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Legg til dato for avtale' })).not.toBeInTheDocument();

        // Når barnet velges skal avtale-UI vises via RHF-context uten prop-drilling
        await user.click(barnCheckbox);
        expect(screen.getByRole('button', { name: 'Legg til dato for avtale' })).toBeInTheDocument();

        // Ingen valideringsfeil skal vises før innsending
        expect(screen.queryByText('Du må velge barn')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må fylle inn dato for avtale')).not.toBeInTheDocument();
    });
});
