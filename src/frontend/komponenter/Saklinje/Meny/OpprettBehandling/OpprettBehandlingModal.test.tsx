import { OpprettBehandlingModal } from '@komponenter/Saklinje/Meny/OpprettBehandling/OpprettBehandlingModal';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '@typer/behandling';
import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { describe, expect, test, vi } from 'vitest';

interface WrapperProps {
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
    children: React.ReactNode;
}

function Wrapper({
    fagsak = lagFagsak({ status: FagsakStatus.OPPRETTET, behandlinger: [] }),
    behandling = lagBehandling(),
    children,
}: WrapperProps) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <BrukerProvider bruker={lagPerson()}>
                    <HentOgSettBehandlingProvider>
                        <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                    </HentOgSettBehandlingProvider>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

// Egen wrapper for revurdering, siden vi må ha en eksisterende (ikke-aktiv) behandling for å kunne opprette revurdering
function WrapperRevurdering({ fagsak = lagFagsak(), behandling = lagBehandling(), children }: WrapperProps) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

const lukkModal = vi.fn();
const onTilbakekrevingsbehandlingOpprettet = vi.fn();

describe('OpprettBehandlingModal', () => {
    test('skal rendre modalen som forventet', () => {
        const { screen } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );

        expect(screen.getByRole('dialog', { name: 'Opprett ny behandling' })).toBeInTheDocument();
        expect(screen.getByLabelText('Velg type behandling')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Lukk' })).toBeInTheDocument();
    });

    test('skal rendre riktige felt ved førstegangsbehandling', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.FØRSTEGANGSBEHANDLING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.FØRSTEGANGSBEHANDLING);

        expect(screen.getByLabelText('Velg behandlingstema')).toBeInTheDocument();
        expect(screen.getByLabelText('Søknad mottatt dato')).toBeInTheDocument();
        // Årsaksfeltet skal ikke vises siden årsaken automatisk settes ved førstegangsbehandling
        expect(screen.queryByLabelText('Velg årsak')).not.toBeInTheDocument();
    });

    test('skal rendre 360-dagers-alert ved søknadsdato som er mer enn 360 dager siden', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.FØRSTEGANGSBEHANDLING);

        const søknadMottattDatoFelt = screen.getByLabelText('Søknad mottatt dato');
        await user.type(søknadMottattDatoFelt, '01-01-2000');
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText('Det er mer enn 360 dager siden denne datoen.')).toBeInTheDocument();
    });

    test('skal rendre riktige felter ved revurdering', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: WrapperRevurdering,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.REVURDERING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.REVURDERING);

        const behandlingsårsakFelt = screen.getByRole('combobox', { name: 'Velg behandlingsårsak' });
        await user.selectOptions(behandlingsårsakFelt, BehandlingÅrsak.SØKNAD);

        expect(screen.getByLabelText('Velg behandlingstema')).toBeInTheDocument();
        expect(screen.getByLabelText('Søknad mottatt dato')).toBeInTheDocument();
    });

    test('skal rendre riktige felt ved migrering fra Infotrygd', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.MIGRERING_FRA_INFOTRYGD);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.MIGRERING_FRA_INFOTRYGD);

        const behandlingsårsakFelt = screen.getByRole('combobox', { name: 'Velg behandlingsårsak' });
        await user.selectOptions(behandlingsårsakFelt, BehandlingÅrsak.HELMANUELL_MIGRERING);
        expect(behandlingsårsakFelt).toHaveValue(BehandlingÅrsak.HELMANUELL_MIGRERING);

        expect(screen.getByLabelText('Legg til juridiske barn for migrering')).toBeInTheDocument();
        expect(screen.getByLabelText('Velg behandlingstema')).toBeInTheDocument();
        expect(screen.getByLabelText('Ny migreringsdato')).toBeInTheDocument();
    });

    test('skal vise begrunnelseFelt ved teknisk endring', async () => {
        // TODO: må være spesiell type saksbehandler for å ha tilgang - skal vi teste det da?
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.TEKNISK_ENDRING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.TEKNISK_ENDRING);

        const begrunnelseFelt = screen.getByLabelText('Begrunnelse');
        await user.type(begrunnelseFelt, 'Test begrunnelse');
        expect(begrunnelseFelt).toHaveValue('Test begrunnelse');
    });

    test('skal vise klageMottattDatoFelt ved klagebehandling', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Klagebehandlingstype.KLAGE);
        expect(behandlingstypeFelt).toHaveValue(Klagebehandlingstype.KLAGE);

        const klageMottattDatoFelt = screen.getByLabelText('Klage mottatt dato');
        await user.type(klageMottattDatoFelt, '01-01-2000');
        expect(klageMottattDatoFelt).toHaveValue('01-01-2000');
    });

    test('skal velge Tilbakekreving som type behandling', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );
        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Tilbakekrevingsbehandlingstype.TILBAKEKREVING);
        expect(behandlingstypeFelt).toHaveValue(Tilbakekrevingsbehandlingstype.TILBAKEKREVING);
    });

    test('skal kunne lukke modalen', async () => {
        const { screen, user } = render(
            <OpprettBehandlingModal
                lukkModal={lukkModal}
                onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
            />,
            {
                wrapper: Wrapper,
            }
        );

        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Avbryt' }));
        expect(lukkModal).toHaveBeenCalledOnce();
    });
});
