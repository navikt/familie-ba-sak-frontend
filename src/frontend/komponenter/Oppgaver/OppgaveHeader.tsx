import { Systemtittel, Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useFagsakApi from '../Fagsak/useFagsakApi';

const OppgaveHeader: React.FunctionComponent = () => {
    const [personIdent, settPersonIdent] = React.useState('');
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettEllerHentFagsak, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    return (
        <div>
            <div className={'oppgave-header'}>
                <Systemtittel className={'oppgave-header__tittel'}>Oppgavebenken</Systemtittel>
                <Input
                    label={'Opprett eller hent fagsak'}
                    value={personIdent}
                    placeholder={'Skriv inn fnr/dnr 11 siffer'}
                    onChange={event => {
                        settPersonIdent(event.target.value);
                    }}
                    className={'oppgave-header__fnrInput'}
                />
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        opprettEllerHentFagsak({
                            personIdent,
                        });
                    }}
                    children={'Fortsett'}
                    className={'oppgave-header__opprettFagsakKnapp'}
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
