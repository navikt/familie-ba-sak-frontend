import * as React from 'react'
import { IFagsak } from "../../../typer/fagsak";
import { useHistory } from 'react-router';
import { useBehandlingVilkårContext, VedtakResultat } from './BehandleVilkårProvider'
import { Systemtittel } from 'nav-frontend-typografi';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema'
import { Knapp } from 'nav-frontend-knapper';
import { axiosRequest } from '../../../api/axios';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { actions as fagsakActions, useFagsakDispatch } from '../../FagsakProvider';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const context = useBehandlingVilkårContext();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [senderInn, settSenderInn] = React.useState(false)
    const fagsakDispatch = useFagsakDispatch();

    return (
        <div className={'vilkår'}>
            <Systemtittel children={'inngangsvilkår'} />

            <br />

            <BehandlingVilkårSkjema
                opprettelseFeilmelding={opprettelseFeilmelding}
                visFeilmeldinger={visFeilmeldinger}
            />

            <div className={'vilkår__navigering'}>
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        history.push(`/fagsak/opprett`);
                    }}
                    children={'Tilbake'}
                />
                <Knapp
                    type={'hoved'}
                    spinner={senderInn}
                    onClick={() => {
                        settSenderInn(true)
                        axiosRequest<IFagsak>({
                            data: {
                                resultat: context.vedtakResultat,
                            },
                            method: 'POST',
                            url: `/familie-ba-sak/api/fagsak/${fagsak.id}/nytt-vedtak`,
                        })
                            .then((response: Ressurs<any>) => {
                                settSenderInn(false)
                                if (response.status === RessursStatus.SUKSESS) {
                                    fagsakDispatch({
                                        payload: response,
                                        type: fagsakActions.SETT_FAGSAK,
                                    });

                                    if (context.vedtakResultat == VedtakResultat.INNVILGET) {
                                        history.push(`/fagsak/${fagsak.id}/behandle`);
                                    } else if (context.vedtakResultat == VedtakResultat.AVSLÅTT) {
                                        history.push(`/fagsak/${fagsak.id}/vedtak`);
                                    } else {
                                        settOpprettelseFeilmelding(
                                            'Internal error: invalid vedtak result'
                                        );
                                        settVisFeilmeldinger(true);
                                    }

                                } else if (response.status === RessursStatus.FEILET) {
                                    settOpprettelseFeilmelding(response.melding);
                                    settVisFeilmeldinger(true);
                                } else {
                                    settOpprettelseFeilmelding(
                                        'Opprettelse av vedtak feilet'
                                    );
                                    settVisFeilmeldinger(true);
                                }
                            })
                            .catch(() => {
                                settSenderInn(false)
                                settOpprettelseFeilmelding('Opprettelse av vedtak feilet');
                            });
                    }}
                    children={'Neste'}
                />
            </div>
        </div>
    );
};

export default BehandleVilkår;
