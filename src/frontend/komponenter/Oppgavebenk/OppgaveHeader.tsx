import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Feilmelding, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import useFagsakApi from '../Fagsak/useFagsakApi';
import { useOppgaver } from '../../context/OppgaverContext';
import FilterSkjema from './FilterSkjema';
import TilgangModal from './TilgangModal';
import { ITilgangModal } from '../../typer/oppgave';

const OppgaveHeader: React.FunctionComponent = () => {
    const { sjekkTilgang } = useOppgaver();
    const [personIdent, settPersonIdent] = React.useState('');
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [addressebeskyttelsegradering, settAdressebeskyttelsegradering] = React.useState<string>(
        ''
    );

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
                        sjekkTilgang(personIdent).then((res: ITilgangModal) => {
                            if (res.saksbehandlerHarTilgang) {
                                opprettEllerHentFagsak({
                                    personIdent,
                                    aktørId: null,
                                });
                            } else {
                                settAdressebeskyttelsegradering(res.adressebeskyttelsegradering);
                                settVisModal(true);
                            }
                        });
                    }}
                    children={'Fortsett'}
                    spinner={senderInn}
                />
                {visFeilmeldinger && <Feilmelding children={opprettelseFeilmelding} />}
            </div>
            <TilgangModal
                åpen={visModal}
                onRequestClose={() => settVisModal(false)}
                adressebeskyttelsegradering={addressebeskyttelsegradering}
            ></TilgangModal>
        </div>
    );
};

export default OppgaveHeader;
