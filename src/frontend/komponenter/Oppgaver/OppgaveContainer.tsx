import * as React from 'react';

import { OppgaveProvider } from '../OppgaveProvider';

const OppgaveContainer: React.FunctionComponent = () => {
    return (
        <OppgaveProvider>
            <div>ajsdklø</div>
        </OppgaveProvider>
    );
};

export default OppgaveContainer;
