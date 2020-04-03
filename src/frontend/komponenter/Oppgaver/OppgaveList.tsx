import React from 'react';
import { RessursStatus } from '../../typer/ressurs';
import { useOppgaver } from '../../context/OppgaverContext';

const OppgaveList: React.FunctionComponent = () => {
    const { hentetOppgaver } = useOppgaver();

    return (
        <div>
            {hentetOppgaver &&
                hentetOppgaver.status == RessursStatus.SUKSESS &&
                hentetOppgaver.data.map((oppg, index) => <p key={index}>{oppg.aktoerid}</p>)}
        </div>
    );
};

export default OppgaveList;
