import moment from 'moment';
import { useState } from 'react';
import { useHistory } from 'react-router';

import {
    IOpprettBehandlingData,
    IOpprettEllerHentFagsakData,
    aktivVedtak,
    IOpprettBeregningData,
    IRestVilkårsvurdering,
} from '../../api/fagsak';
import { Behandlingstype, IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import { IState as IBereningState } from './Beregning/BeregningProvider';
import { IPersonBeregning } from '../../typer/behandle';
import { hentAktivBehandlingPåFagsak, erBehandlingenInnvilget } from '../../utils/fagsak';
import { useFagsakRessurser } from '../../context/FagsakContext';
import { useApp } from '../../context/AppContext';
import {
    IPersonResultat,
    vilkårConfig,
    IVilkårConfig,
    IVilkårResultat,
    IRestVilkårResultat,
} from '../../typer/vilkår';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { hentResultat, hentBegrunnelse, hentPeriode } from '../../context/Vilkårsvurdering/utils';

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
        axiosRequest<IFagsak, IOpprettEllerHentFagsakData>({
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
        axiosRequest<IFagsak, IOpprettBehandlingData>({
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

    const opprettEllerOppdaterVilkårsvurdering = (
        vilkårsvurdering: IPersonResultat[],
        fagsak: IFagsak
    ) => {
        // Basic validering av skjemaet
        const feilmeldinger: FeiloppsummeringFeil[] = [];
        vilkårsvurdering.filter((personResultat: IPersonResultat) => {
            Object.values(vilkårConfig)
                .filter((vc: IVilkårConfig) =>
                    vc.parterDetteGjelderFor.includes(personResultat.person.type)
                )
                .forEach((vc: IVilkårConfig) => {
                    if (
                        personResultat.vilkårResultater.find(
                            (vilkårResultat: IFelt<IVilkårResultat>) =>
                                vilkårResultat.verdi.vilkårType === vc.key &&
                                vilkårResultat.verdi.resultat !== undefined
                        ) === undefined
                    ) {
                        feilmeldinger.push({
                            skjemaelementId: `${vc.key}_${personResultat.personIdent}`,
                            feilmelding: `Vilkåret '${vc.key}' er ikke vurdert for ${personResultat.person.navn}`,
                        });
                    }
                });
        });

        settSenderInn(true);
        axiosRequest<IFagsak, IRestVilkårsvurdering>({
            data: {
                personResultater: vilkårsvurdering.map((personResultat: IPersonResultat) => {
                    return {
                        personIdent: personResultat.personIdent,
                        vilkårResultater: personResultat.vilkårResultater.map(
                            (vilkårResultat: IFelt<IVilkårResultat>): IRestVilkårResultat => ({
                                begrunnelse: hentBegrunnelse(vilkårResultat),
                                periodeFom: hentPeriode(vilkårResultat).fom,
                                periodeTom: hentPeriode(vilkårResultat).tom,
                                resultat: hentResultat(vilkårResultat),
                                vilkårType: vilkårResultat.verdi.vilkårType,
                            })
                        ),
                    };
                }),
            },
            method: 'PUT',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak`,
        })
            .then((response: Ressurs<any>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);

                    if (erBehandlingenInnvilget(vilkårsvurdering)) {
                        history.push(`/fagsak/${fagsak.id}/beregning`);
                    } else {
                        history.push(`/fagsak/${fagsak.id}/vedtak`);
                    }
                } else if (response.status === RessursStatus.FEILET) {
                    settFeilmelding(response.melding);
                    settVisFeilmeldinger(true);
                } else {
                    settFeilmelding('Opprettelse av vilkårsvurdering feilet');
                    settVisFeilmeldinger(true);
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding('Opprettelse av vilkårsvurdering feilet');
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
                axiosRequest<IFagsak, any>({
                    data: dataTilKalkulator,
                    method: 'PUT',
                    url: `/familie-ba-sak/api/kalkulator`,
                });
                return axiosRequest<IFagsak, any>({
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
        opprettEllerOppdaterVilkårsvurdering,
        senderInn,
    };
};

export default useFagsakApi;
