import { Input } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';
import * as React from 'react';

import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';

const OpprettFagsak: React.FunctionComponent = () => {
    const [personIdent, settPersonIdent] = React.useState('');

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettFagsak, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    return (
        <div className={'opprettfagsak'}>
            <Skjemasteg
                tittel={'Opprett fagsak'}
                nesteOnClick={() => {
                    opprettFagsak({
                        personIdent,
                    });
                }}
                nesteKnappTittel={'Opprett'}
                senderInn={senderInn}
            >
                <Input
                    bredde={'L'}
                    label={'Ident'}
                    value={personIdent}
                    placeholder={'fnr/dnr'}
                    onChange={event => {
                        settPersonIdent(event.target.value);
                    }}
                />
                {visFeilmeldinger && <Feilmelding children={opprettelseFeilmelding} />}
            </Skjemasteg>
        </div>
    );
};

export default OpprettFagsak;
