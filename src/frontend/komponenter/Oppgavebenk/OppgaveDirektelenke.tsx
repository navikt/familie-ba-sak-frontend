import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import { IOppgave, oppgaveTypeFilter, OppgavetypeFilter } from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import useFagsakApi from '../Fagsak/useFagsakApi';
import FamilieBaseKnapp from '../Felleskomponenter/FamilieBaseKnapp';

interface IOppgaveDirektelenke {
    oppgave: IOppgave;
}

const OppgaveDirektelenke: React.FC<IOppgaveDirektelenke> = ({ oppgave }) => {
    const { harLøpendeSakIInfotrygd } = useOppgaver();
    const { sjekkTilgang } = useApp();
    const [feilmelding, settFeilmelding] = useState<string>('');
    const history = useHistory();
    const oppgavetype = oppgaveTypeFilter[oppgave.oppgavetype]?.id;

    const { hentFagsakForPerson } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        _ => {
            'Feilmelding';
        }
    );

    const visTilgangsmodalEllerSendVidere = async (oppgave: IOppgave) => {
        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);

        if (brukerident) {
            if (await sjekkTilgang(brukerident)) {
                const løpendeSak = await harLøpendeSakIInfotrygd(brukerident);
                if (løpendeSak.status === RessursStatus.SUKSESS) {
                    if (løpendeSak.data.harLøpendeSak) {
                        history.push('/infotrygd', { bruker: brukerident });
                    } else {
                        history.push(`/oppgaver/journalfør/${oppgave.id}`);
                    }
                }
            }
        } else {
            history.push(`/oppgaver/journalfør/${oppgave.id}`);
        }
    };

    const sjekkTilgangOgGåTilBehandling = async (oppgave: IOppgave) => {
        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);
        if (brukerident) {
            if (await sjekkTilgang(brukerident)) {
                const fagsak = await hentFagsakForPerson(brukerident);
                if (fagsak.status === RessursStatus.SUKSESS && fagsak.data?.id) {
                    history.push(`/fagsak/${fagsak.data.id}/saksoversikt`);
                } else {
                    settFeilmelding('Fant ikke fagsak');
                }
            }
        } else {
            settFeilmelding('Mangler tilgang');
        }
    };

    console.log(oppgave);
    console.log(oppgavetype);

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
        case (OppgavetypeFilter.BEH_SAK,
        OppgavetypeFilter.GOD_VED,
        OppgavetypeFilter.BEH_UND_VED,
        OppgavetypeFilter.FREM):
            return feilmelding === '' ? (
                <FamilieBaseKnapp
                    key={'tilfagsak'}
                    onClick={() => {
                        sjekkTilgangOgGåTilBehandling(oppgave);
                    }}
                    children={'Gå til fagsak'}
                />
            ) : (
                <>{feilmelding}</>
            );
        default:
            return <>-</>;
    }
};

export default OppgaveDirektelenke;
