import * as React from 'react';

import { OppgaveProvider } from '../OppgaveProvider';

const OppgaveContainer: React.FunctionComponent = () => {
    return (
        <OppgaveProvider>
            <div>Oppgaver vises...</div>
        </OppgaveProvider>
    );
};

export default OppgaveContainer;
