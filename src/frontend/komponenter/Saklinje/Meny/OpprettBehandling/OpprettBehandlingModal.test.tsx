import { apiClient } from '@api/client/apiClient';
import { OpprettBehandlingModal } from '@komponenter/Saklinje/Meny/OpprettBehandling/OpprettBehandlingModal';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import type { RenderOptions } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '@typer/behandling';
import { BehandlingKategori, Behandlingstema, BehandlingUnderkategori } from '@typer/behandlingstema';
import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import type { IPersonInfo } from '@typer/person';
import type { Saksbehandler } from '@typer/saksbehandler';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, test, vi } from 'vitest';

afterEach(() => {
    vi.restoreAllMocks();
});

interface WrapperProps {
    fagsak?: IMinimalFagsak;
    bruker?: IPersonInfo;
    behandling?: IBehandling;
    saksbehandler?: Saksbehandler;
    children: React.ReactNode;
}

function Wrapper({
    fagsak = lagFagsak({ status: FagsakStatus.OPPRETTET, behandlinger: [] }),
    bruker = lagPerson(),
    behandling = lagBehandling(),
    saksbehandler = lagSaksbehandler(),
    children,
}: WrapperProps) {
    return (
        <TestProviders saksbehandler={saksbehandler}>
            <FagsakProvider fagsak={fagsak}>
                <BrukerProvider bruker={bruker}>
                    <HentOgSettBehandlingProvider>
                        <BehandlingProvider behandling={behandling}>{children}</BehandlingProvider>
                    </HentOgSettBehandlingProvider>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function renderOpprettBehandlingModal(wrapper: RenderOptions['wrapper'] = Wrapper) {
    const lukkModal = vi.fn();
    const onTilbakekrevingsbehandlingOpprettet = vi.fn();

    const utils = render(
        <OpprettBehandlingModal
            lukkModal={lukkModal}
            onTilbakekrevingsbehandlingOpprettet={onTilbakekrevingsbehandlingOpprettet}
        />,
        { wrapper }
    );

    return { ...utils, lukkModal, onTilbakekrevingsbehandlingOpprettet };
}

describe('OpprettBehandlingModal', () => {
    test('skal rendre modalen som forventet', () => {
        const { screen } = renderOpprettBehandlingModal();

        expect(screen.getByRole('dialog', { name: 'Opprett ny behandling' })).toBeInTheDocument();
        expect(screen.getByLabelText('Velg type behandling')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Lukk' })).toBeInTheDocument();
    });

    test('skal rendre riktige felt ved førstegangsbehandling', async () => {
        const { screen, user } = renderOpprettBehandlingModal();

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.FØRSTEGANGSBEHANDLING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.FØRSTEGANGSBEHANDLING);

        expect(screen.getByLabelText('Velg behandlingstema')).toBeInTheDocument();
        expect(screen.getByLabelText('Søknad mottatt dato')).toBeInTheDocument();
        // Årsaksfeltet skal ikke vises siden årsaken automatisk settes ved førstegangsbehandling
        expect(screen.queryByLabelText('Velg behandlingsårsak')).not.toBeInTheDocument();
    });

    test('skal rendre 360-dagers-alert ved søknadsdato som er mer enn 360 dager siden', async () => {
        const { screen, user } = renderOpprettBehandlingModal();

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.FØRSTEGANGSBEHANDLING);

        const søknadMottattDatoFelt = screen.getByLabelText('Søknad mottatt dato');
        await user.type(søknadMottattDatoFelt, '01.01.2000');
        expect(søknadMottattDatoFelt).toHaveValue('01.01.2000');

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText('Det er mer enn 360 dager siden denne datoen.')).toBeInTheDocument();
    });

    test('skal rendre riktige felter ved revurdering', async () => {
        const { screen, user } = renderOpprettBehandlingModal(props => <Wrapper {...props} fagsak={lagFagsak()} />);

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.REVURDERING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.REVURDERING);

        const behandlingsårsakFelt = screen.getByRole('combobox', { name: 'Velg behandlingsårsak' });
        await user.selectOptions(behandlingsårsakFelt, BehandlingÅrsak.SØKNAD);

        expect(screen.getByLabelText('Velg behandlingstema')).toBeInTheDocument();
        expect(screen.getByLabelText('Søknad mottatt dato')).toBeInTheDocument();
    });

    test('skal rendre riktige felt ved migrering fra Infotrygd', async () => {
        const { screen, user } = renderOpprettBehandlingModal();

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
        const saksbehandler = lagSaksbehandler({
            groups: ['d21e00a4-969d-4b28-8782-dc818abfae65', '314fa714-f13c-4cdc-ac5c-e13ce08e241c'],
        });

        server.use(
            http.get('/user/profile', () => {
                return HttpResponse.json(saksbehandler);
            })
        );

        const { screen, user } = renderOpprettBehandlingModal(props => (
            <Wrapper {...props} fagsak={lagFagsak()} saksbehandler={saksbehandler} />
        ));

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.TEKNISK_ENDRING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.TEKNISK_ENDRING);

        const begrunnelseFelt = screen.getByLabelText('Begrunnelse for opprettelse av teknisk endring');
        await user.type(begrunnelseFelt, 'Test begrunnelse');
        expect(begrunnelseFelt).toHaveValue('Test begrunnelse');
    });

    test('skal vise klageMottattDatoFelt ved klagebehandling', async () => {
        const { screen, user } = renderOpprettBehandlingModal();

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Klagebehandlingstype.KLAGE);
        expect(behandlingstypeFelt).toHaveValue(Klagebehandlingstype.KLAGE);

        const klageMottattDatoFelt = screen.getByLabelText('Klage mottatt dato');
        await user.type(klageMottattDatoFelt, '01.01.2000');
        expect(klageMottattDatoFelt).toHaveValue('01.01.2000');
    });

    test('skal velge Tilbakekreving som type behandling', async () => {
        const { screen, user } = renderOpprettBehandlingModal();

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Tilbakekrevingsbehandlingstype.TILBAKEKREVING);
        expect(behandlingstypeFelt).toHaveValue(Tilbakekrevingsbehandlingstype.TILBAKEKREVING);
    });

    test('skal kunne lukke modalen', async () => {
        const { screen, user, lukkModal } = renderOpprettBehandlingModal();

        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Avbryt' }));
        expect(lukkModal).toHaveBeenCalledOnce();
    });

    test('skal kalle onSubmit når skjemaet sendes inn', async () => {
        const { screen, user, lukkModal } = renderOpprettBehandlingModal();

        vi.spyOn(apiClient, 'post').mockResolvedValue(
            lagBehandling({
                type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                årsak: BehandlingÅrsak.SØKNAD,
                kategori: BehandlingKategori.NASJONAL,
                underkategori: BehandlingUnderkategori.ORDINÆR,
                søknadMottattDato: '01.01.2024',
            })
        );

        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Avbryt' }));
        expect(lukkModal).toHaveBeenCalledOnce();

        const behandlingstypeFelt = screen.getByRole('combobox', { name: 'Velg type behandling' });
        await user.selectOptions(behandlingstypeFelt, Behandlingstype.FØRSTEGANGSBEHANDLING);
        expect(behandlingstypeFelt).toHaveValue(Behandlingstype.FØRSTEGANGSBEHANDLING);

        const behandlingstemaFelt = screen.getByRole('combobox', { name: 'Velg behandlingstema' });
        await user.selectOptions(behandlingstemaFelt, Behandlingstema.NASJONAL_ORDINÆR);
        expect(behandlingstemaFelt).toHaveValue(Behandlingstema.NASJONAL_ORDINÆR);

        const søknadMottattDatoFelt = screen.getByLabelText('Søknad mottatt dato');
        await user.type(søknadMottattDatoFelt, '01.01.2024');
        expect(søknadMottattDatoFelt).toHaveValue('01.01.2024');

        const bekreftKnapp = screen.getByRole('button', { name: 'Bekreft' });
        await user.click(bekreftKnapp);
        expect(apiClient.post).toHaveBeenCalledTimes(1);
    });

    test('skal ikke kunne sende inn skjemaet ved ugyldige felter', async () => {
        const { screen, user } = renderOpprettBehandlingModal();

        vi.spyOn(apiClient, 'post').mockResolvedValue(lagBehandling());

        const bekreftKnapp = screen.getByRole('button', { name: 'Bekreft' });
        await user.click(bekreftKnapp);
        expect(screen.getByText('Velg type behandling som skal opprettes fra nedtrekkslisten.')).toBeInTheDocument();

        expect(apiClient.post).not.toHaveBeenCalled();
    });
});
