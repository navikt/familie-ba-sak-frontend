import { Systemtittel, Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useFagsakApi from '../Fagsak/useFagsakApi';

const OppgaveHeader: React.FunctionComponent = props => {
    const [personIdent, settPersonIdent] = React.useState('');
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettEllerHentFagsak, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    return (
        <div>
            <div className={'oppgaveHeader'}>
                <Systemtittel className={'oppgaveHeader__tittel'}>Oppgavebenken</Systemtittel>
                <Input
                    label={'Opprett eller hent fagsak'}
                    value={personIdent}
                    placeholder={'Skriv inn fnr/dnr 11 siffer'}
                    onChange={event => {
                        settPersonIdent(event.target.value);
                    }}
                    className={'oppgaveHeader__fnrInput'}
                />
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        opprettEllerHentFagsak({
                            personIdent,
                        });
                    }}
                    children={'Fortsett'}
                    className={'oppgaveHeader__opprettFagsakKnapp'}
                    spinner={senderInn}
                />
            </div>
            {visFeilmeldinger && (
                <Feilmelding children={opprettelseFeilmelding} className={'feilmelding'} />
            )}
        </div>
    );
};

export default OppgaveHeader;
