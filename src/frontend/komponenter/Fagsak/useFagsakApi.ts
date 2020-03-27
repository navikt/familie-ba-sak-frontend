import moment from 'moment';
import { useState } from 'react';
import { useHistory } from 'react-router';

import {
    apiOpprettBehandling,
    apiOpprettBeregning,
    apiOpprettEllerOppdaterVedtak,
    IOpprettBehandlingData,
    IOpprettEllerHentFagsakData,
    apiOpprettEllerHentFagsak,
} from '../../api/fagsak';
import { BehandlingResultat, Behandlingstype, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { datoformat } from '../../utils/formatter';
import { actions as fagsakActions, useFagsakDispatch } from '../FagsakProvider';
import { IState as IBereningState } from './Beregning/BeregningProvider';
import { IState as IBehandleVilkårState } from './Vilkår/BehandleVilkårProvider';
import { IPersonBeregning } from '../../typer/behandle';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { IVilkårResultat, Resultat, VilkårType } from '../../typer/vilkår';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const fagsakDispatcher = useFagsakDispatch();

    const opprettEllerHentFagsak = (data: IOpprettEllerHentFagsakData) => {
        settSenderInn(true);
        apiOpprettEllerHentFagsak(data)
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    fagsakDispatcher({
                        payload: response,
                        type: fagsakActions.SETT_FAGSAK,
                    });
                    history.push(`/fagsak/${response.data.id}/saksoversikt`);
                    return;
                } else if (response.status === RessursStatus.FEILET) {
                    settVisFeilmeldinger(true);
                    settFeilmelding(response.melding);
                } else {
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av fagsak feilet');
                }
            })
            .catch(() => {
                settSenderInn(false);
                settVisFeilmeldinger(true);
                settFeilmelding('Opprettelse av fagsak feilet');
            });
    };

    const opprettBehandling = (data: IOpprettBehandlingData) => {
        settSenderInn(true);
        apiOpprettBehandling(data)
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    fagsakDispatcher({
                        payload: response,
                        type: fagsakActions.SETT_FAGSAK,
                    });
                    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(
                        response.data
                    );

                    if (!aktivBehandling) {
                        settVisFeilmeldinger(true);
                        settFeilmelding('Opprettelse av behandling feilet');
                    } else if (aktivBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) {
                        history.push(`/fagsak/${response.data.id}/vilkaarsvurdering`);
                    } else {
                        history.push(`/fagsak/${response.data.id}/registrer-soknad`);
                    }

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
    };

    const opprettEllerOppdaterVedtak = (context: IBehandleVilkårState, fagsak: IFagsak) => {
        if (!context.behandlingResultat) {
            settVisFeilmeldinger(true);
            return;
        }

        if (context.begrunnelse.valideringsstatus !== Valideringsstatus.OK) {
            settVisFeilmeldinger(true);
            return;
        }

        settSenderInn(true);

        const aktivBehandling = fagsak.behandlinger.find(b => b.aktiv);
        const resutat =
            aktivBehandling?.type === Behandlingstype.REVURDERING &&
            context.behandlingResultat === BehandlingResultat.AVSLÅTT
                ? BehandlingResultat.OPPHØRT
                : context.behandlingResultat;

        const mapTilPeriodeResultater = (samletVilkårResultat: IVilkårResultat[]) => {
            /*
            const periodeResultater = samletVilkårResultat.map( resultat =>
            {

            }
            MAPPING FRA:
            export interface IVilkårResultat {
                personIdent: string;
                vilkårType: VilkårType;
                resultat: Resultat;
            }


            MAPPING TIL:
            export interface IRestPeriodeResultat {
                personIdent: string;
                periodeFom: string;
                periodeTom: string;
                vilkårResultater: IRestVilkårResultat[];
            }
            export interface IRestVilkårResultat {
                vilkårType: VilkårType;
                resultat: Resultat;
            }
             */

            return samletVilkårResultat;
        };

        const periodeResultater = mapTilPeriodeResultater(context.samletVilkårResultat);

        apiOpprettEllerOppdaterVedtak(fagsak.id, {
            brevType: resutat,
            periodeResultater: periodeResultater,
            begrunnelse: context.begrunnelse.verdi,
        })
            .then((response: Ressurs<any>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    fagsakDispatcher({
                        payload: response,
                        type: fagsakActions.SETT_FAGSAK,
                    });

                    if (context.behandlingResultat === BehandlingResultat.INNVILGET) {
                        history.push(`/fagsak/${fagsak.id}/beregning`);
                    } else if (context.behandlingResultat === BehandlingResultat.AVSLÅTT) {
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
            context.personBeregninger.find(
                (barnBeregning: IFelt<IPersonBeregning>) =>
                    barnBeregning.valideringsstatus !== Valideringsstatus.OK
            ) === undefined
        ) {
            if (skjemaetHarEndringer) {
                settSenderInn(true);
                apiOpprettBeregning(fagsak, {
                    personBeregninger: context.personBeregninger.map(
                        (personBeregning: IFelt<IPersonBeregning>) => ({
                            personident: personBeregning.verdi.personident,
                            ytelseType: personBeregning.verdi.ytelseType,
                            deltYtelse: personBeregning.verdi.deltYtelse,
                            ingenYtelse: personBeregning.verdi.ingenYtelse,
                            beløp: personBeregning.verdi.beløp,
                            stønadFom: moment(
                                personBeregning.verdi.stønadFom,
                                datoformat.MÅNED,
                                true
                            ).format('YYYY-MM-DD'),
                            stønadTom: moment(
                                personBeregning.verdi.stønadTom,
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
        opprettEllerHentFagsak,
        opprettEllerOppdaterVedtak,
        senderInn,
    };
};

export default useFagsakApi;
