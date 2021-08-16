import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import NavFrontendSpinner from 'nav-frontend-spinner';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { useOppgaver } from '../../context/OppgaverContext';
import { IOppgave, oppgaveTypeFilter, OppgavetypeFilter } from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';
import FamilieBaseKnapp from '../Felleskomponenter/FamilieBaseKnapp';

interface IOppgaveDirektelenke {
    oppgave: IOppgave;
}

const OppgaveDirektelenke: React.FC<IOppgaveDirektelenke> = ({ oppgave }) => {
    const { harLøpendeSakIInfotrygd, sideindeks } = useOppgaver();
    const { hentFagsakForPerson } = useFagsakRessurser();
    const { sjekkTilgang } = useApp();
    const [feilmelding, settFeilmelding] = useState<string>('');
    const [laster, settLaster] = useState<boolean>(false);
    const history = useHistory();
    const oppgavetype = oppgaveTypeFilter[oppgave.oppgavetype]?.id;

    useEffect(() => {
        settFeilmelding('');
    }, [sideindeks]);

    useEffect(() => {
        settLaster(false);
    }, [feilmelding]);

    const visTilgangsmodalEllerSendVidere = async (oppgave: IOppgave) => {
        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);

        if (brukerident) {
            if (await sjekkTilgang(brukerident, false)) {
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
            if (await sjekkTilgang(brukerident, false)) {
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

    if (laster) {
        return <NavFrontendSpinner style={{ height: '1rem' }} />;
    } else {
        switch (oppgavetype) {
            case OppgavetypeFilter.JFR:
                return (
                    <FamilieBaseKnapp
                        key={'tiloppg'}
                        onClick={() => {
                            settLaster(true);
                            visTilgangsmodalEllerSendVidere(oppgave);
                        }}
                        children={'Gå til oppgave'}
                    />
                );
            case OppgavetypeFilter.BEH_SAK:
            case OppgavetypeFilter.GOD_VED:
            case OppgavetypeFilter.BEH_UND_VED:
            case OppgavetypeFilter.FREM:
                return feilmelding === '' ? (
                    <FamilieBaseKnapp
                        key={'tilfagsak'}
                        onClick={() => {
                            settLaster(true);
                            sjekkTilgangOgGåTilBehandling(oppgave);
                        }}
                        children={'Gå til fagsak'}
                    />
                ) : (
                    <>{feilmelding}</>
                );
            default:
                return <></>;
        }
    }
};

export default OppgaveDirektelenke;
