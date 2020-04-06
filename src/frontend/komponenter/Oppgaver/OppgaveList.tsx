import React from 'react';
import { RessursStatus } from '../../typer/ressurs';
import { useOppgaver } from '../../context/OppgaverContext';

const OppgaveList: React.FunctionComponent = () => {
    const { oppgaver } = useOppgaver();

    return (
        <div>
            {oppgaver &&
                oppgaver.status == RessursStatus.SUKSESS &&
                oppgaver.data.map((oppg, index) => (
                    <p key={index}>
                        {oppg.aktoerid} {oppg.prioritet}
                    </p>
                ))}
        </div>
    );
};

export default OppgaveList;
