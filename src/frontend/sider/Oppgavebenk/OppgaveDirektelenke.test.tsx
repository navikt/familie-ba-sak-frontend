import Toasts from '@komponenter/Toast/Toasts';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { server } from '@testutils/mocks/node';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagOppgave } from '@testutils/testdata/oppgaveTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { FagsakId, FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';
import { IdentGruppe } from '@typer/oppgave';
import { Adressebeskyttelsegradering } from '@typer/person';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { Route, Routes } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { OppgaveDirektelenke } from './OppgaveDirektelenke';

const TILGANG_URL = '/familie-ba-sak/api/tilgang';
const HENT_FAGSAKER_URL = '/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person';

const FNR = '12345678910';
const AKTØRID = '1234567890123';
const FAGSAK_ID = 42;
const SAKSOVERSIKT_TEKST = `Saksoversikt for fagsak ${FAGSAK_ID}`;

function lagOppgaveMedIdenter(oppgavetype: string) {
    return lagOppgave({
        oppgavetype,
        identer: [
            { ident: AKTØRID, gruppe: IdentGruppe.AKTOERID },
            { ident: FNR, gruppe: IdentGruppe.FOLKEREGISTERIDENT },
        ],
    });
}

function mockTilgang(saksbehandlerHarTilgang: boolean) {
    const mottattPayload = vi.fn();
    server.use(
        http.post(TILGANG_URL, async ({ request }) => {
            mottattPayload(await request.json());
            return HttpResponse.json(
                byggSuksessRessurs({
                    saksbehandlerHarTilgang,
                    adressebeskyttelsegradering: saksbehandlerHarTilgang
                        ? Adressebeskyttelsegradering.UGRADERT
                        : Adressebeskyttelsegradering.STRENGT_FORTROLIG,
                })
            );
        })
    );
    return mottattPayload;
}

function mockFagsaker(fagsaker: IMinimalFagsak[]) {
    const mottattPayload = vi.fn();
    server.use(
        http.post(HENT_FAGSAKER_URL, async ({ request }) => {
            mottattPayload(await request.json());
            return HttpResponse.json(byggSuksessRessurs(fagsaker));
        })
    );
    return mottattPayload;
}

function Wrapper({ children }: PropsWithChildren) {
    return (
        <TestProviders>
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <>
                            {children}
                            <Toasts />
                        </>
                    }
                />
                <Route path={'/oppgaver/journalfor/:oppgaveId'} element={<p>Journalføring</p>} />
                <Route path={`/fagsak/${FAGSAK_ID}/saksoversikt`} element={<p>{SAKSOVERSIKT_TEKST}</p>} />
            </Routes>
        </TestProviders>
    );
}

describe('OppgaveDirektelenke', () => {
    beforeEach(() => {
        mockTilgang(true);
    });

    test('skal ikke vise knapp for oppgavetyper uten direktelenke', () => {
        const { screen } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('VUR')} />, {
            wrapper: Wrapper,
        });

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    test.each([
        { oppgavetype: 'JFR', knappetekst: 'Se oppgave', mål: 'Journalføring' },
        { oppgavetype: 'BEH_SED', knappetekst: 'Gå til oppgave', mål: 'Journalføring' },
        { oppgavetype: 'BEH_SAK', knappetekst: 'Gå til fagsak', mål: SAKSOVERSIKT_TEKST },
        { oppgavetype: 'GOD_VED', knappetekst: 'Gå til fagsak', mål: SAKSOVERSIKT_TEKST },
        { oppgavetype: 'BEH_UND_VED', knappetekst: 'Gå til fagsak', mål: SAKSOVERSIKT_TEKST },
        { oppgavetype: 'VURD_LIVS', knappetekst: 'Gå til fagsak', mål: SAKSOVERSIKT_TEKST },
        { oppgavetype: 'FREM', knappetekst: 'Gå til fagsak', mål: SAKSOVERSIKT_TEKST },
    ])('skal navigere til $mål for $oppgavetype-oppgave', async ({ oppgavetype, knappetekst, mål }) => {
        mockFagsaker([lagFagsak({ id: FagsakId.fra(FAGSAK_ID) })]);
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter(oppgavetype)} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: knappetekst }));

        expect(await screen.findByText(mål)).toBeInTheDocument();
    });

    test('skal sjekke tilgang med fødselsnummeret fra oppgaven før navigering til journalføring', async () => {
        const tilgangPayload = mockTilgang(true);
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('JFR')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Se oppgave' }));

        expect(await screen.findByText('Journalføring')).toBeInTheDocument();
        expect(tilgangPayload).toHaveBeenCalledExactlyOnceWith({ brukerIdent: FNR });
    });

    test('skal navigere til journalføring uten tilgangssjekk når oppgaven mangler fødselsnummer', async () => {
        const tilgangHandler = vi.fn(() => HttpResponse.json(byggSuksessRessurs({})));
        server.use(http.post(TILGANG_URL, tilgangHandler));
        const { screen, user } = render(
            <OppgaveDirektelenke oppgave={lagOppgave({ oppgavetype: 'JFR', identer: [] })} />,
            { wrapper: Wrapper }
        );

        await user.click(screen.getByRole('button', { name: 'Se oppgave' }));

        expect(await screen.findByText('Journalføring')).toBeInTheDocument();
        expect(tilgangHandler).not.toHaveBeenCalled();
    });

    test('skal vise mangler tilgang-modal og ikke navigere til journalføring når saksbehandler mangler tilgang', async () => {
        mockTilgang(false);
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('JFR')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Se oppgave' }));

        expect(await screen.findByRole('dialog', { name: 'Mangler tilgang' })).toBeInTheDocument();
        expect(screen.getByText('Ident har diskresjonskode strengt fortrolig.')).toBeInTheDocument();
        expect(screen.queryByText('Journalføring')).not.toBeInTheDocument();
    });

    test('skal vise teknisk feil-modal og ikke navigere til journalføring når tilgangssjekken feiler', async () => {
        server.use(http.post(TILGANG_URL, () => new HttpResponse(null, { status: 500 })));
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('JFR')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Se oppgave' }));

        expect(await screen.findByRole('dialog', { name: 'Teknisk feil' })).toBeInTheDocument();
        expect(screen.queryByText('Journalføring')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Se oppgave', hidden: true })).toBeEnabled();
    });

    test('skal sjekke tilgang og hente fagsaker med fødselsnummeret fra oppgaven', async () => {
        const tilgangPayload = mockTilgang(true);
        const fagsakerPayload = mockFagsaker([lagFagsak({ id: FagsakId.fra(FAGSAK_ID) })]);
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('BEH_SAK')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til fagsak' }));

        expect(await screen.findByText(SAKSOVERSIKT_TEKST)).toBeInTheDocument();
        expect(tilgangPayload).toHaveBeenCalledExactlyOnceWith({ brukerIdent: FNR });
        expect(fagsakerPayload).toHaveBeenCalledExactlyOnceWith({ personIdent: FNR });
    });

    test('skal vise toast og ikke navigere til fagsak når personen ikke har noen fagsak', async () => {
        mockFagsaker([]);
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('BEH_SAK')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til fagsak' }));

        expect(await screen.findByText('Fant ikke fagsak')).toBeInTheDocument();
        expect(screen.queryByText(SAKSOVERSIKT_TEKST)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til fagsak' })).toBeEnabled();
    });

    test('skal vise toast og ikke navigere til fagsak når personen har flere relevante fagsaker', async () => {
        mockFagsaker([
            lagFagsak({ id: FagsakId.fra(FAGSAK_ID), status: FagsakStatus.LØPENDE }),
            lagFagsak({ id: FagsakId.fra(FAGSAK_ID + 1), status: FagsakStatus.LØPENDE }),
        ]);
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('BEH_SAK')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til fagsak' }));

        expect(
            await screen.findByText('Det finnes flere relevante fagsaker på brukeren, du må søke opp fagsaken manuelt.')
        ).toBeInTheDocument();
        expect(screen.queryByText(SAKSOVERSIKT_TEKST)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til fagsak' })).toBeEnabled();
    });

    test('skal vise mangler tilgang-modal uten kall mot backend når fagsakoppgaven mangler fødselsnummer', async () => {
        const tilgangHandler = vi.fn(() => HttpResponse.json(byggSuksessRessurs({})));
        const fagsakerHandler = vi.fn(() => HttpResponse.json(byggSuksessRessurs([])));
        server.use(http.post(TILGANG_URL, tilgangHandler), http.post(HENT_FAGSAKER_URL, fagsakerHandler));
        const { screen, user } = render(
            <OppgaveDirektelenke oppgave={lagOppgave({ oppgavetype: 'BEH_SAK', identer: [] })} />,
            { wrapper: Wrapper }
        );

        await user.click(screen.getByRole('button', { name: 'Gå til fagsak' }));

        expect(await screen.findByRole('dialog', { name: 'Mangler tilgang' })).toBeInTheDocument();
        expect(tilgangHandler).not.toHaveBeenCalled();
        expect(fagsakerHandler).not.toHaveBeenCalled();
    });

    test('skal vise mangler tilgang-modal uten å hente fagsaker når saksbehandler mangler tilgang', async () => {
        mockTilgang(false);
        const fagsakerHandler = vi.fn(() => HttpResponse.json(byggSuksessRessurs([])));
        server.use(http.post(HENT_FAGSAKER_URL, fagsakerHandler));
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('BEH_SAK')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til fagsak' }));

        expect(await screen.findByRole('dialog', { name: 'Mangler tilgang' })).toBeInTheDocument();
        expect(fagsakerHandler).not.toHaveBeenCalled();
    });

    test('skal vise teknisk feil-modal når henting av fagsaker feiler', async () => {
        server.use(http.post(HENT_FAGSAKER_URL, () => new HttpResponse(null, { status: 500 })));
        const { screen, user } = render(<OppgaveDirektelenke oppgave={lagOppgaveMedIdenter('BEH_SAK')} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til fagsak' }));

        expect(await screen.findByRole('dialog', { name: 'Teknisk feil' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til fagsak', hidden: true })).toBeEnabled();
    });
});
