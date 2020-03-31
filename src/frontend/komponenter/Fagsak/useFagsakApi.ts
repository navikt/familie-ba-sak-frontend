import moment from 'moment';
import { useState } from 'react';
import { useHistory } from 'react-router';

import {
    IOpprettBehandlingData,
    IOpprettEllerHentFagsakData,
    aktivVedtak,
    IOpprettBeregningData,
} from '../../api/fagsak';
import { BehandlingResultat, Behandlingstype, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import { IState as IBereningState } from './Beregning/BeregningProvider';
import { IState as IBehandleVilkårState } from './Vilkår/BehandleVilkårProvider';
import { IPersonBeregning } from '../../typer/behandle';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { useApp } from '../../context/AppContext';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const { settFagsak } = useFagsakRessurser();
    const { axiosRequest } = useApp();

    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const opprettEllerHentFagsak = (data: IOpprettEllerHentFagsakData) => {
        settSenderInn(true);
        axiosRequest<IFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

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
        axiosRequest<IFagsak>({
            data,
            method: 'POST',
            url: '/familie-ba-sak/api/behandlinger',
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

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

        axiosRequest<IFagsak>({
            data: {
                resultat: resutat,
                samletVilkårResultat: context.samletVilkårResultat,
                begrunnelse: context.begrunnelse.verdi,
            },
            method: 'PUT',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak`,
        })
            .then((response: Ressurs<any>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

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
                const data: IOpprettBeregningData = {
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
                };

                const dataTilKalkulator = data.personBeregninger
                    .filter(personBeregning => !personBeregning.ingenYtelse)
                    .map(beregning => ({
                        personident: beregning.personident,
                        ytelsetype: beregning.ytelseType,
                        halvytelse: beregning.deltYtelse,
                        stønadFom: formaterIsoDato(beregning.stønadFom, datoformat.ISO_MÅNED),
                        stønadTom: formaterIsoDato(beregning.stønadTom, datoformat.ISO_MÅNED),
                    }));
                const dataTilIverksetting = {
                    personBeregninger: data.personBeregninger
                        .filter(personBeregning => !personBeregning.ingenYtelse)
                        .map(beregning => ({
                            ident: beregning.personident,
                            beløp: beregning.beløp,
                            stønadFom: beregning.stønadFom,
                        })),
                };

                const vedtakId = aktivVedtak(fagsak)?.id;
                axiosRequest<IFagsak>({
                    data: dataTilKalkulator,
                    method: 'PUT',
                    url: `/familie-ba-sak/api/kalkulator`,
                });
                return axiosRequest<IFagsak>({
                    data: dataTilIverksetting,
                    method: 'PUT',
                    url: `/familie-ba-sak/api/vedtak/${vedtakId}/beregning`,
                })
                    .then((response: Ressurs<any>) => {
                        settSenderInn(false);
                        if (response.status === RessursStatus.SUKSESS) {
                            settFagsak(response);

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
