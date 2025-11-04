import type { PropsWithChildren } from 'react';
import React from 'react';

import { waitFor, waitForElementToBeRemoved, within } from '@testing-library/dom';
import { delay, http, HttpResponse } from 'msw';
import { describe, expect, test } from 'vitest';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { Behandlinger } from './Behandlinger';
import { server } from '../../../testutils/mocks/node';
import { BehandlingTestdata } from '../../../testutils/testdata/behandlingTestdata';
import { FagsakTestdata } from '../../../testutils/testdata/fagsakTestdata';
import { KlageTestdata } from '../../../testutils/testdata/klageTestdata';
import { TilbakekrevingTestdata } from '../../../testutils/testdata/tilbakekrevingTestdata';
import { render, TestProviders } from '../../../testutils/testrender';
import { BehandlingResultat, BehandlingÅrsak } from '../../../typer/behandling';
import { KlageResultat } from '../../../typer/klage';
import { Behandlingsresultatstype } from '../../../typer/tilbakekrevingsbehandling';
import { FagsakProvider } from '../FagsakContext';

function Wrapper({ children }: PropsWithChildren) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={FagsakTestdata.lagFagsak()}>{children}</FagsakProvider>
        </TestProviders>
    );
}

describe('Behandlinger', () => {
    test('skal vise alle type behandlinger', async () => {
        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        const rader = screen.getAllByRole('row');
        const rad0 = rader[0];
        const rad1 = rader[1];
        const rad2 = rader[2];
        const rad3 = rader[3];

        expect(rader.length).toBe(4);

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        expect(within(rad0).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        // Barnetrygdbehandling
        expect(within(rad1).getByRole('cell', { name: '22.10.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Søknad' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Førstegangsbehandling' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Nasjonal ordinær' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Innvilget' })).toBeInTheDocument();

        // Tilbakekrevingbehandling
        expect(within(rad2).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Klage omgjort av KA' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Revurdering tilbakekreving' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '30.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Delvis tilbakebetaling' })).toBeInTheDocument();

        // Klagebehandling
        expect(within(rad3).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Annet' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Klage' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Ferdigstilt' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: '01.10.2025' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Medhold' })).toBeInTheDocument();
    });

    test('skal vise skeletons hvis kun kontantsøttebehandlinger laster', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        const rad = screen.getByRole('row');
        expect(within(rad).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
    });

    test('skal vise skeletons hvis kun klagebehandlinger laster', async () => {
        server.use(
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        const rad = screen.getByRole('row');
        expect(within(rad).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
    });

    test('skal vise skeletons hvis kun tilbakekrevingsbehandlinger laster', async () => {
        server.use(
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        const rad = screen.getByRole('row');
        expect(within(rad).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
    });

    test('skal vise skeletons hvis alle behandlingene laster', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs([]));
            }),
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs([]));
            }),
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        const rad = screen.getByRole('row');
        expect(within(rad).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
    });

    test('skal vise alerts hvis innlasting av alle behandlingene feiler', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                return new HttpResponse(null, { status: 500 });
            }),
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                return new HttpResponse(null, { status: 500 });
            }),
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitFor(() => {
            expect(
                screen.queryByText('Barnetrygdbehandlinger er ikke tilgjengelig for øyeblikket.')
            ).toBeInTheDocument();
            expect(
                screen.queryByText('Tilbakekrevingsbehandlinger er ikke tilgjengelig for øyeblikket.')
            ).toBeInTheDocument();
            expect(screen.queryByText('Klagebehandlinger er ikke tilgjengelig for øyeblikket.')).toBeInTheDocument();
        });
    });

    test('skal vise alert for kontantsøttebehandlinger hvis kallet feiler men skal vise andre behandlingstyper', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        expect(screen.queryByText('Barnetrygdbehandlinger er ikke tilgjengelig for øyeblikket.')).toBeInTheDocument();

        const rader = screen.getAllByRole('row');
        const rad0 = rader[0];
        const rad1 = rader[1];
        const rad2 = rader[2];

        expect(rader.length).toBe(3);

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        expect(within(rad0).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        // Tilbakekrevingbehandling
        expect(within(rad1).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Klage omgjort av KA' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Revurdering tilbakekreving' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '30.09.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Delvis tilbakebetaling' })).toBeInTheDocument();

        // Klagebehandling
        expect(within(rad2).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Annet' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Klage' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Ferdigstilt' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '01.10.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Medhold' })).toBeInTheDocument();
    });

    test('skal vise alert for klagebehandlinger hvis kallet feiler men skal vise andre behandlingstyper', async () => {
        server.use(
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        expect(screen.queryByText('Klagebehandlinger er ikke tilgjengelig for øyeblikket.')).toBeInTheDocument();

        const rader = screen.getAllByRole('row');
        const rad0 = rader[0];
        const rad1 = rader[1];
        const rad2 = rader[2];

        expect(rader.length).toBe(3);

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        expect(within(rad0).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        // Barnetrygdbehandling
        expect(within(rad1).getByRole('cell', { name: '22.10.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Søknad' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Førstegangsbehandling' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Nasjonal ordinær' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Innvilget' })).toBeInTheDocument();

        // Tilbakekrevingbehandling
        expect(within(rad2).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Klage omgjort av KA' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Revurdering tilbakekreving' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '30.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Delvis tilbakebetaling' })).toBeInTheDocument();
    });

    test('skal vise alert for tilbakekrevingsbehandlinger hvis kallet feiler men skal vise andre behandlingstyper', async () => {
        server.use(
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        expect(
            screen.queryByText('Tilbakekrevingsbehandlinger er ikke tilgjengelig for øyeblikket.')
        ).toBeInTheDocument();

        const rader = screen.getAllByRole('row');
        const rad0 = rader[0];
        const rad1 = rader[1];
        const rad2 = rader[2];

        expect(rader.length).toBe(3);

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        expect(within(rad0).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        // Barnetrygdbehandling
        expect(within(rad1).getByRole('cell', { name: '22.10.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Søknad' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Førstegangsbehandling' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Nasjonal ordinær' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Innvilget' })).toBeInTheDocument();

        // Klagebehandling
        expect(within(rad2).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Annet' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Klage' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Ferdigstilt' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '01.10.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Medhold' })).toBeInTheDocument();
    });

    test('skal kunne trykke på knapp for å vise henlagte behandlinger', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                return HttpResponse.json(
                    byggSuksessRessurs([
                        BehandlingTestdata.lagVisningBehandling({
                            resultat: BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET,
                        }),
                    ])
                );
            }),
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                return HttpResponse.json(
                    byggSuksessRessurs([
                        KlageTestdata.lagKlagebehandling({
                            resultat: KlageResultat.HENLAGT,
                        }),
                    ])
                );
            }),
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                return HttpResponse.json(
                    byggSuksessRessurs([
                        TilbakekrevingTestdata.lagTilbakekrevingbehandling({
                            resultat: Behandlingsresultatstype.HENLAGT,
                        }),
                    ])
                );
            })
        );

        const { screen, user } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        expect(screen.getAllByRole('row')).toHaveLength(1);

        await user.click(screen.getByRole('checkbox', { name: 'Vis henlagte behandlinger' }));

        const rader = screen.getAllByRole('row');
        const rad0 = rader[0];
        const rad1 = rader[1];
        const rad2 = rader[2];
        const rad3 = rader[3];

        expect(rader.length).toBe(4);

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        expect(within(rad0).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        // Barnetrygdbehandling
        expect(within(rad1).getByRole('cell', { name: '22.10.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Søknad' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Førstegangsbehandling' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Nasjonal ordinær' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Henlagt (feilaktig opprettet)' })).toBeInTheDocument();

        // Tilbakekrevingbehandling
        expect(within(rad2).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Klage omgjort av KA' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Revurdering tilbakekreving' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: '30.09.2025' })).toBeInTheDocument();
        expect(within(rad2).getByRole('cell', { name: 'Henlagt' })).toBeInTheDocument();

        // Klagebehandling
        expect(within(rad3).getByRole('cell', { name: '29.09.2025' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Annet' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Klage' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Ferdigstilt' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: '01.10.2025' })).toBeInTheDocument();
        expect(within(rad3).getByRole('cell', { name: 'Henlagt' })).toBeInTheDocument();
    });

    test('skal kunne trykke på knapp for å vise månedlig valutajustering behandlinger', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                return HttpResponse.json(
                    byggSuksessRessurs([
                        BehandlingTestdata.lagVisningBehandling({
                            årsak: BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING,
                        }),
                    ])
                );
            }),
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                return HttpResponse.json(byggSuksessRessurs([]));
            }),
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );

        const { screen, user } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        expect(screen.getAllByRole('row')).toHaveLength(1);

        await user.click(screen.getByRole('checkbox', { name: 'Vis månedlige valutajusteringer' }));

        const rader = screen.getAllByRole('row');
        const rad0 = rader[0];
        const rad1 = rader[1];

        expect(rader.length).toBe(2);

        expect(screen.getByRole('heading', { name: 'Behandlinger' })).toBeInTheDocument();

        expect(within(rad0).getByRole('columnheader', { name: 'Opprettet' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Årsak' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Behandlingstema' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Vedtaksdato' })).toBeInTheDocument();
        expect(within(rad0).getByRole('columnheader', { name: 'Resultat' })).toBeInTheDocument();

        // Barnetrygdbehandling
        expect(within(rad1).getByRole('cell', { name: '22.10.2025' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Månedlig valutajustering' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Førstegangsbehandling' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Nasjonal ordinær' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Avsluttet' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: '-' })).toBeInTheDocument();
        expect(within(rad1).getByRole('cell', { name: 'Innvilget' })).toBeInTheDocument();
    });

    test('skal håndtere at ingen tidligere behandlinger finnes', async () => {
        server.use(
            http.get('/familie-ba-sak/api/behandlinger/fagsak/1', async () => {
                return HttpResponse.json(byggSuksessRessurs([]));
            }),
            http.get('/familie-ba-sak/api/fagsaker/1/hent-klagebehandlinger', async () => {
                return HttpResponse.json(byggSuksessRessurs([]));
            }),
            http.get('/familie-ba-sak/api/tilbakekreving/fagsak/1', async () => {
                return HttpResponse.json(byggSuksessRessurs([]));
            })
        );

        const { screen } = render(<Behandlinger />, { wrapper: Wrapper });

        await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

        expect(screen.queryByRole('row')).not.toBeInTheDocument();
        expect(screen.getByText('Ingen tidligere behandlinger.')).toBeInTheDocument();
    });
});
