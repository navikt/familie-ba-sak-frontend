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
                        settPersonIdent(event.target.value.trim());
                    }}
                    className={'oppgave-header__fnrInput'}
                />
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        opprettEllerHentFagsak(
                            {
                                personIdent,
                                aktørId: null,
                            },
                            true
                        );
                    }}
                    children={'Fortsett'}
                    className={'oppgave-header__opprettFagsakKnapp'}
                    spinner={senderInn}
                />
            </div>
            {visFeilmeldinger && (
                <Feilmelding
                    children={opprettelseFeilmelding}
                    className={'oppgave-header__feilmelding'}
                />
            )}
        </div>
    );
};

export default OppgaveHeader;
