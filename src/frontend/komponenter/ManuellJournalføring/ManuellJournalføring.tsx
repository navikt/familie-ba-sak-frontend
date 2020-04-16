import React from 'react';
import { useParams } from 'react-router';
import { useOppgaver } from '../../context/OppgaverContext';
import { RessursStatus } from '../../typer/ressurs';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import SystemetLaster from '../Felleskomponenter/SystemetLaster/SystemetLaster';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { IPerson } from '../../typer/person';

const ManuellJournalføring: React.FC = () => {
    const { oppgaveId } = useParams();
    const { hentDataForManuellJournalføring, dataForManuellJournalføring } = useOppgaver();

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
        }
    }, [oppgaveId]);

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.IKKE_HENTET:
        case RessursStatus.HENTER:
            return <SystemetLaster />;
        case RessursStatus.SUKSESS:
            const personData: IPerson = dataForManuellJournalføring.data.person;

            console.log(dataForManuellJournalføring);
            return (
                <div className={'journalføring'}>
                    <Systemtittel children={'Registrere journalpost: Barnetrygd'} />
                    <Normaltekst children={personData.navn} />
                </div>
            );
        default:
            return <AlertStripeFeil children={'Uventet feil ved henting av oppgave'} />;
    }
};

export default ManuellJournalføring;
