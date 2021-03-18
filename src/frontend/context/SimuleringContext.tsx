import * as React from 'react';
import { useEffect, useState } from 'react';

import constate from 'constate';
import dayjs from 'dayjs';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

import { aktivVedtakPåBehandling } from '../api/fagsak';
import { IBehandling } from '../typer/behandling';
import { TIDENES_ENDE } from '../typer/periode';
import { IVedtakForBehandling } from '../typer/vedtak';
import familieDayjs from '../utils/familieDayjs';
import { formaterBeløp } from '../utils/formatter';

interface IProps {
    åpenBehandling: IBehandling;
}

enum PosteringType {
    YTELSE = 'YTELSE',
    FEILUTBETALING = 'FEILUTBETALING',
}

interface IVedtakSimuleringPostering {
    fom: string;
    tom: string;
    beløp: number;
    posteringType: PosteringType;
}

interface ISimuleringMottaker {
    mottakerNummer?: string;
    vedtak: IVedtakForBehandling;
    vedtakSimuleringPostering: IVedtakSimuleringPostering[];
}

type SimuleringResultat =
    | {
          type: 'suksess';
          simulering: ISimulering;
      }
    | { type: 'feil'; feilmelding: string };

export interface ISimulering {
    periodeDictionary: ISimuleringPerioder;
    totalYtelse: number;
    totalFeilutbetaling: number;
    fom: string;
    tom: string;
    nesteUtbetaling: INesteUtbetaling;
}

interface ISimuleringPerioder {
    [fomDato: string]: IVedtakSimuleringPostering[];
}

type TotalSimulering = {
    totalYtelse: number;
    totalFeilutbetaling: number;
};

interface INesteUtbetaling {
    dato: string;
    beløp?: number;
}

const [SimuleringProvider, useSimulering] = constate(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);
    const [simuleringResultat, settSimuleringResultat] = useState<undefined | SimuleringResultat>(
        undefined
    );

    useEffect(() => {
        request<IBehandling, ISimuleringMottaker[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/simulering/${aktivtVedtak?.id}`,
        }).then(response => {
            if (response.status === RessursStatus.SUKSESS) {
                const simulering = filtrerBortUrelevantePosteringer(response.data);
                const startOgSluttDato = hentStartOgSluttdato(simulering);
                const perioder = hentPosteringPerioder(simulering);
                const { totalYtelse, totalFeilutbetaling } = hentTotalSimulering(simulering);

                settSimuleringResultat({
                    type: 'suksess',
                    simulering: {
                        periodeDictionary: perioder,
                        totalYtelse,
                        totalFeilutbetaling,
                        fom: startOgSluttDato.fom,
                        tom: startOgSluttDato.tom,
                        nesteUtbetaling: hentNesteUtbetaling(perioder),
                    },
                });
            } else if (
                response.status === RessursStatus.FEILET ||
                response.status === RessursStatus.FUNKSJONELL_FEIL ||
                response.status === RessursStatus.IKKE_TILGANG
            ) {
                settSimuleringResultat({ type: 'feil', feilmelding: response.frontendFeilmelding });
            }
        });
    }, [aktivtVedtak]);

    const filtrerBortUrelevantePosteringer = (
        simuleringMottakere: ISimuleringMottaker[]
    ): ISimuleringMottaker[] => {
        const relevandteSimuleringMottakere = filtrerSimuleringMottakerPåPersonerIBehandling(
            simuleringMottakere
        );

        return filrerBortPosteringerIkkeYtelseEllerFeilutbetaling(relevandteSimuleringMottakere);
    };

    const filrerBortPosteringerIkkeYtelseEllerFeilutbetaling = (
        relevandteSimuleringMottakere: ISimuleringMottaker[]
    ) => {
        return relevandteSimuleringMottakere.map((simuleringMottaker: ISimuleringMottaker) => ({
            ...simuleringMottaker,
            vedtakSimuleringPostering: simuleringMottaker.vedtakSimuleringPostering.filter(
                postering =>
                    postering.posteringType === PosteringType.FEILUTBETALING ||
                    postering.posteringType === PosteringType.YTELSE
            ),
        }));
    };

    const hentStartOgSluttdato = (
        simulering: ISimuleringMottaker[]
    ): { fom: string; tom: string } => {
        const førstePostering = simulering[0].vedtakSimuleringPostering[0];
        const startOgSluttDato = { fom: førstePostering.fom, tom: førstePostering.tom };

        simulering.forEach(simuleringMottaker =>
            simuleringMottaker.vedtakSimuleringPostering.forEach(postering => {
                if (familieDayjs(postering.fom).isBefore(familieDayjs(startOgSluttDato.fom))) {
                    startOgSluttDato.fom = postering.fom;
                }
                if (familieDayjs(postering.tom).isAfter(familieDayjs(startOgSluttDato.fom))) {
                    startOgSluttDato.tom = postering.tom;
                }
            })
        );

        return startOgSluttDato;
    };

    const hentTotalSimulering = (simulering: ISimuleringMottaker[]): TotalSimulering => {
        const totalSimulering = {
            FEILUTBETALING: 0,
            YTELSE: 0,
        };

        simulering.forEach(simuleringMottaker =>
            simuleringMottaker.vedtakSimuleringPostering.forEach(
                postering => (totalSimulering[postering.posteringType] += postering.beløp)
            )
        );

        return {
            totalFeilutbetaling: -1 * totalSimulering.FEILUTBETALING,
            totalYtelse: totalSimulering.YTELSE,
        };
    };

    const periodeInneholderYtelse = (periode: IVedtakSimuleringPostering[]) =>
        periode.map(postering => postering.posteringType).includes(PosteringType.YTELSE);

    function hentDatoNesteUtbetaling(perioder: ISimuleringPerioder) {
        const nå = dayjs();
        const perioderStartDatoer = Object.keys(perioder);
        let minsteStartdatoEtterNå = TIDENES_ENDE.format();
        perioderStartDatoer.forEach(fom => {
            if (
                dayjs(fom).isAfter(nå) &&
                dayjs(fom).isBefore(minsteStartdatoEtterNå) &&
                periodeInneholderYtelse(perioder[fom])
            ) {
                minsteStartdatoEtterNå = fom;
            }
        });
        return minsteStartdatoEtterNå;
    }

    function hentBeløpNesteUtbetaling(datoNesteUtbetaling: string, perioder: ISimuleringPerioder) {
        return datoNesteUtbetaling !== TIDENES_ENDE.format()
            ? perioder[datoNesteUtbetaling]
                  .filter(periode => periode.posteringType === PosteringType.YTELSE)
                  .map(periode => periode.beløp)
                  .reduce((acc, val) => acc + val, 0)
            : undefined;
    }

    const hentNesteUtbetaling = (perioder: ISimuleringPerioder): INesteUtbetaling => {
        const datoNesteUtbetaling: string = hentDatoNesteUtbetaling(perioder);
        const beløp = hentBeløpNesteUtbetaling(datoNesteUtbetaling, perioder);

        return { dato: datoNesteUtbetaling, beløp };
    };

    const hentPosteringPerioder = (simulering: ISimuleringMottaker[]): ISimuleringPerioder => {
        let simuleringPerioder: ISimuleringPerioder = {};

        simulering.forEach(
            simuleringMottaker =>
                (simuleringPerioder = posteringerTilSimuleringPerioder(
                    simuleringMottaker.vedtakSimuleringPostering,
                    simuleringPerioder
                ))
        );

        return simuleringPerioder;
    };

    const filtrerSimuleringMottakerPåPersonerIBehandling = (
        simuleringMottakere: ISimuleringMottaker[]
    ): ISimuleringMottaker[] => {
        return simuleringMottakere.filter(
            simulering =>
                simulering.mottakerNummer &&
                åpenBehandling.personer
                    .map(person => person.personIdent)
                    .includes(simulering.mottakerNummer)
        );
    };

    const posteringerTilSimuleringPerioder = (
        posteringer: IVedtakSimuleringPostering[],
        perioder: ISimuleringPerioder = {}
    ): ISimuleringPerioder => {
        posteringer.forEach(postering => {
            if (perioder[postering.fom]) {
                perioder[postering.fom].push(postering);
            } else {
                perioder[postering.fom] = [postering];
            }
        });
        return perioder;
    };

    const formater = (beløp: number) => {
        return <>{beløp === 0 ? '-' : formaterBeløp(beløp)}</>;
    };

    const hentSumPositiveYtelserIPeriode = (periode: IVedtakSimuleringPostering[]) => {
        return periode
            .filter(
                postering => postering.posteringType === PosteringType.YTELSE && postering.beløp > 0
            )
            .map(periode => periode.beløp)
            .reduce((acc, val) => acc + val, 0);
    };

    const hentSumNegativeYtelserIPeriode = (periode: IVedtakSimuleringPostering[]) => {
        return periode
            .filter(
                postering => postering.posteringType === PosteringType.YTELSE && postering.beløp < 0
            )
            .map(periode => periode.beløp)
            .reduce((acc, val) => acc + val, 0);
    };

    const hentSumYtelserIPeriode = (periode: IVedtakSimuleringPostering[]) => {
        return periode
            .filter(postering => postering.posteringType === PosteringType.YTELSE)
            .map(periode => periode.beløp)
            .reduce((acc, val) => acc + val, 0);
    };

    return {
        simuleringResultat,
        formater,
        hentSumPositiveYtelserIPeriode,
        hentSumNegativeYtelserIPeriode,
        hentSumYtelserIPeriode,
    };
});

export { SimuleringProvider, useSimulering };
