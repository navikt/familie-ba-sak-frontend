import { useState } from 'react';
import { useHistory } from 'react-router';
import { useFagsakDispatch, actions as fagsakActions } from '../FagsakProvider';
import {
    apiOpprettBehandling,
    IOpprettBehandlingData,
    apiOpprettVedtak,
    apiOpprettBeregning,
} from '../../api/fagsak';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { IFagsak, VedtakResultat } from '../../typer/fagsak';
import { IState as IBereningState } from './Beregning/BeregningProvider';
import { IState as IOpprettBehandlingState } from './Opprett/OpprettBehandlingProvider';
import { IState as IBehandleVilkårState } from './Vilkår/BehandleVilkårProvider';
import { Valideringsstatus, IFelt } from '../../typer/felt';
import { IBarnBeregning } from '../../typer/behandle';
import moment = require('moment');
import { datoformat } from '../../utils/formatter';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const fagsakDispatcher = useFagsakDispatch();

    const opprettBehandling = (context: IOpprettBehandlingState, data: IOpprettBehandlingData) => {
        if (
            process.env.NODE_ENV === 'development' ||
            (context.søkersIdent.valideringsstatus === Valideringsstatus.OK &&
                context.barnasIdenter.find(
                    barnIdent => barnIdent.valideringsstatus !== Valideringsstatus.OK
                ) === undefined)
        ) {
            settSenderInn(true);
            apiOpprettBehandling(data)
                .then((response: Ressurs<IFagsak>) => {
                    settSenderInn(false);
                    if (response.status === RessursStatus.SUKSESS) {
                        fagsakDispatcher({
                            payload: response,
                            type: fagsakActions.SETT_FAGSAK,
                        });
                        history.push(`/fagsak/${response.data.id}/vilkår`);
                        return;
                    } else if (response.status === RessursStatus.FEILET) {
                        settVisFeilmeldinger(true);
                        settFeilmelding(response.melding);
                    } else {
                        settVisFeilmeldinger(true);
                        settFeilmelding('Opprettelse av behandling feilet');
                    }
                })
                .catch(() => {
                    settSenderInn(false);
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av behandling feilet');
                });
        } else {
            settVisFeilmeldinger(true);
        }
    };

    const opprettVedtak = (context: IBehandleVilkårState, fagsak: IFagsak) => {
        if (!context.vedtakResultat) {
            settVisFeilmeldinger(true);
            return;
        }

        if (context.begrunnelse.valideringsstatus !== Valideringsstatus.OK) {
            settVisFeilmeldinger(true);
            return;
        }

        settSenderInn(true);
        apiOpprettVedtak(fagsak.id, {
            resultat: context.vedtakResultat,
            samletVilkårResultat: context.samletVilkårResultat,
            begrunnelse: context.begrunnelse.verdi,
        })
            .then((response: Ressurs<any>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    fagsakDispatcher({
                        payload: response,
                        type: fagsakActions.SETT_FAGSAK,
                    });

                    if (context.vedtakResultat === VedtakResultat.INNVILGET) {
                        history.push(`/fagsak/${fagsak.id}/beregning`);
                    } else if (context.vedtakResultat === VedtakResultat.AVSLÅTT) {
                        history.push(`/fagsak/${fagsak.id}/vedtak`);
                    } else {
                        settFeilmelding('Internal error: invalid vedtak result');
                        settVisFeilmeldinger(true);
                    }
                } else if (response.status === RessursStatus.FEILET) {
                    settFeilmelding(response.melding);
                    settVisFeilmeldinger(true);
                } else {
                    settFeilmelding('Opprettelse av vedtak feilet');
                    settVisFeilmeldinger(true);
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding('Opprettelse av vedtak feilet');
            });
    };

    const opprettBeregning = (
        context: IBereningState,
        skjemaetHarEndringer: boolean,
        fagsak: IFagsak
    ) => {
        if (
            context.barnasBeregning.find(
                (barnBeregning: IFelt<IBarnBeregning>) =>
                    barnBeregning.valideringsstatus !== Valideringsstatus.OK
            ) === undefined
        ) {
            if (skjemaetHarEndringer) {
                settSenderInn(true);
                apiOpprettBeregning(fagsak.id, {
                    barnasBeregning: context.barnasBeregning.map(
                        (barnBeregning: IFelt<IBarnBeregning>) => ({
                            beløp: barnBeregning.verdi.beløp,
                            ident: barnBeregning.verdi.barn,
                            stønadFom: moment(
                                barnBeregning.verdi.stønadFom,
                                datoformat.MÅNED,
                                true
                            ).format('YYYY-MM-DD'),
                        })
                    ),
                })
                    .then((response: Ressurs<any>) => {
                        settSenderInn(false);
                        if (response.status === RessursStatus.SUKSESS) {
                            fagsakDispatcher({
                                payload: response,
                                type: fagsakActions.SETT_FAGSAK,
                            });
                            history.push(`/fagsak/${fagsak.id}/vedtak`);
                        } else if (response.status === RessursStatus.FEILET) {
                            settFeilmelding(response.melding);
                            settVisFeilmeldinger(true);
                        } else {
                            settFeilmelding('Opprettelse av vedtak feilet');
                            settVisFeilmeldinger(true);
                        }
                    })
                    .catch(() => {
                        settSenderInn(false);
                        settFeilmelding('Opprettelse av vedtak feilet');
                    });
            } else {
                history.push(`/fagsak/${fagsak.id}/vedtak`);
            }
        } else {
            settVisFeilmeldinger(true);
        }
    };

    return {
        opprettBehandling,
        opprettBeregning,
        opprettVedtak,
        senderInn,
    };
};

export default useFagsakApi;
