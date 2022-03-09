import React, { useState } from 'react';

import { useHistory } from 'react-router';

import NavFrontendSpinner from 'nav-frontend-spinner';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import type { IOppgave } from '../../typer/oppgave';
import { oppgaveTypeFilter, OppgavetypeFilter } from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import FamilieBaseKnapp from '../Felleskomponenter/FamilieBaseKnapp';
import { ToastTyper } from '../Felleskomponenter/Toast/typer';

interface IOppgaveDirektelenke {
    oppgave: IOppgave;
}

const OppgaveDirektelenke: React.FC<IOppgaveDirektelenke> = ({ oppgave }) => {
    const { settToast } = useApp();
    const { hentFagsakForPerson } = useFagsakRessurser();
    const { sjekkTilgang } = useApp();
    const [laster, settLaster] = useState<boolean>(false);
    const history = useHistory();
    const oppgavetype = oppgaveTypeFilter[oppgave.oppgavetype as OppgavetypeFilter]?.id;

    const visTilgangsmodalEllerSendVidere = async (oppgave: IOppgave) => {
        settLaster(true);

        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);
        if (brukerident) {
            if (await sjekkTilgang(brukerident, false)) {
                history.push(`/oppgaver/journalfør/${oppgave.id}`);
            }
        } else {
            history.push(`/oppgaver/journalfør/${oppgave.id}`);
        }
        settLaster(false);
    };

    const sjekkTilgangOgGåTilBehandling = async (oppgave: IOppgave) => {
        settLaster(true);

        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);
        if (brukerident) {
            if (await sjekkTilgang(brukerident, false)) {
                const fagsak = await hentFagsakForPerson(brukerident);
                if (fagsak.status === RessursStatus.SUKSESS && fagsak.data?.id) {
                    history.push(`/fagsak/${fagsak.data.id}/saksoversikt`);
                } else {
                    settToast(ToastTyper.FANT_IKKE_FAGSAK, {
                        alertstripeType: 'advarsel',
                        tekst: 'Fant ikke fagsak',
                    });
                }
            }
        } else {
            settToast(ToastTyper.MANGLER_TILGANG, {
                alertstripeType: 'advarsel',
                tekst: 'Mangler tilgang',
            });
        }
        settLaster(false);
    };

    if (laster) {
        return <NavFrontendSpinner style={{ height: '1rem' }} />;
    } else {
        switch (oppgavetype) {
            case OppgavetypeFilter.JFR:
                return (
                    <FamilieBaseKnapp
                        key={'tiloppg'}
                        onClick={() => {
                            visTilgangsmodalEllerSendVidere(oppgave);
                        }}
                        children={'Gå til oppgave'}
                    />
                );
            case OppgavetypeFilter.BEH_SAK:
            case OppgavetypeFilter.GOD_VED:
            case OppgavetypeFilter.BEH_UND_VED:
            case OppgavetypeFilter.VURD_LIVS:
            case OppgavetypeFilter.FREM:
                return (
                    <FamilieBaseKnapp
                        key={'tilfagsak'}
                        onClick={() => {
                            sjekkTilgangOgGåTilBehandling(oppgave);
                        }}
                        children={'Gå til fagsak'}
                    />
                );
            default:
                return <></>;
        }
    }
};

export default OppgaveDirektelenke;
