import React from 'react';
import { Gjelder, Oppgavetype, Enhet, Prioritet } from '../../typer/oppgave';
import { RessursStatus } from '../../typer/ressurs';
import { useOppgaver } from '../../context/OppgaverContext';
import { string } from 'prop-types';

function intDatoTilNorskDato(intDato: string) {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
}

const enheter = new Map<string, string>([
    ['4806', '4806 Drammen'],
    ['4811', '4811 Sandnes'],
    ['4820', '4820 Vadsø'],
    ['4833', '4833 Oslo'],
    ['4842', '4842 Stord'],
    ['4847', '4847 Levanger-Steinkjer'],
]);

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver } = useOppgaver();

    return (
        <div className={'oppgaveliste'}>
            <div className={'row-head'}>
                <div className={'cell-head regdato'}>Reg. dato</div>
                <div className={'cell-head oppgavetype'}>Oppgavetype</div>
                <div className={'cell-head gjelder'}>Gjelder</div>
                <div className={'cell-head frist'}>Frist</div>
                <div className={'cell-head prioritet'}>Prioritet</div>
                <div className={'cell-head beskrivelse'}>Beskrivelse</div>
                <div className={'cell-head bruker'}>Bruker</div>
                <div className={'cell-head enhet'}>Enhet</div>
                <div className={'cell-head saksbehandler'}>Saksbehandler</div>
                <div className={'cell-head handlinger'}>Handlinger</div>
            </div>
            {oppgaver.status == RessursStatus.SUKSESS &&
                oppgaver.data.map((oppg, index) => (
                    <div className={'row'} key={index}>
                        <div className={'cell regdato'}>
                            {intDatoTilNorskDato(oppg.opprettetTidspunkt)}
                        </div>
                        <div className={'cell oppgavetype'}>{Oppgavetype[oppg.oppgavetype]}</div>
                        <div className={'cell gjelder'}>
                            {oppg.behandlingstema ? Gjelder[oppg.behandlingstema] : 'Ikke satt'}
                        </div>
                        <div className={'cell frist'}>
                            {intDatoTilNorskDato(oppg.fristFerdigstillelse)}
                        </div>
                        <div className={'cell prioritet'}>{Prioritet[oppg.prioritet]}</div>
                        <div className={'cell beskrivelse'}>{oppg.beskrivelse}</div>
                        <div className={'cell bruker'}>{oppg.aktoerid}</div>
                        <div className={'cell enhet'}>{enheter.get(oppg.tildeltEnhetsnr)}</div>
                        <div className={'cell saksbehandler'}>
                            {oppg.tilordnetRessurs ? oppg.tilordnetRessurs : 'Ikke tildelt'}
                        </div>
                        <div className={'cell handlinger'}>
                            <a href="">Tildel/plukk</a>
                            <a href="">Gå til oppg</a>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default OppgaveList;
