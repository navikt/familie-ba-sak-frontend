import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Feilmelding, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import useFagsakApi from '../Fagsak/useFagsakApi';
import FilterSkjema from './FilterSkjema';

const OppgaveHeader: React.FunctionComponent = () => {
    const [personIdent, settPersonIdent] = React.useState('');
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettEllerHentFagsak, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    return (
        <div className={'oppgave-header'}>
            <div>
                <Systemtittel className={'oppgave-header__tittel'}>Oppgavebenken</Systemtittel>

                <FilterSkjema />
            </div>
            <div className={'oppgave-header__opprett-fagsak'}>
                <Input
                    label={'Opprett eller hent fagsak'}
                    value={personIdent}
                    bredde={'XXL'}
                    placeholder={'Skriv inn fnr/dnr 11 siffer'}
                    onChange={event => {
                        settPersonIdent(event.target.value.trim());
                    }}
                />
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        /*sjekkTilgang(personIdent).then((res: ITilgangModal) => {
                            if (res.saksbehandlerHarTilgang) {
                                opprettEllerHentFagsak({
                                    personIdent,
                                    aktørId: null,
                                });
                            } else {
                                settAdressebeskyttelsegradering(res.adressebeskyttelsegradering);
                                settVisTilgangsKontrollModal(true);
                            }
                        });*/
                        opprettEllerHentFagsak({
                            personIdent,
                            aktørId: null,
                        });
                    }}
                    children={'Fortsett'}
                    spinner={senderInn}
                />
                {visFeilmeldinger && <Feilmelding children={opprettelseFeilmelding} />}
            </div>
        </div>
    );
};

export default OppgaveHeader;
