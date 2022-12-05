import { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../typer/behandling';
import type {
    IRestTrekkILøpendeUtbetalingIdentifikator,
    ITrekkILøpendeUtbetaling,
} from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import type { IYearMonthPeriode } from '../../../../utils/kalender';
import {
    erFør,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from '../../../../utils/kalender';
import { nyYearMonthPeriode } from '../../../../utils/kalender';

interface IProps {
    trekkILøpendeUtbetaling: ITrekkILøpendeUtbetaling;
    åpenBehandling: IBehandling;
    fjernFraLista: (id: number) => void;
    hentTrekkILøpendeUtbetalinger: () => void;
}

const validerPeriode = (felt: FeltState<IYearMonthPeriode>) => {
    console.log('validerer periode');
    const fom = felt.verdi.fom;

    if (!fom) {
        return feil(felt, 'F.o.m. er påkrevd');
    }

    const tom = felt.verdi.tom;
    const fomKalenderDato = kalenderDatoMedFallback(fom, TIDENES_MORGEN);
    const tomKalenderDato = kalenderDatoMedFallback(tom, TIDENES_ENDE);

    console.log('Datoer: ', fomKalenderDato, tomKalenderDato);

    const fomDatoErFørTomDato = erFør(fomKalenderDato, tomKalenderDato);

    if (fomDatoErFørTomDato) {
        return feil(felt, 'skjønner ikke');
    }

    if (!fomDatoErFørTomDato) {
        return feil(felt, 'F.o.m. må være tidligere enn t.o.m');
    }

    return ok(felt);
};

const validerFeilutbetaltBeløp = (felt: FeltState<number>) => {
    if (!felt.verdi || felt.verdi === 0) {
        return feil(felt, 'Beløp er påkrevd');
    }
    return ok(felt);
};

const [TrekkILøpendeUtbetalingProvider, useTrekkILøpendeUtbetalingProvider] = constate(
    ({
        åpenBehandling,
        trekkILøpendeUtbetaling,
        fjernFraLista,
        hentTrekkILøpendeUtbetalinger,
    }: IProps) => {
        const [erPanelEkspandert, settErPanelEkspandert] = useState(false);
        const { request } = useHttp();

        const {
            hentFeilTilOppsummering,
            kanSendeSkjema,
            settVisfeilmeldinger,
            valideringErOk,
            skjema,
        } = useSkjema<ITrekkILøpendeUtbetaling, IBehandling>({
            felter: {
                id: useFelt<number>({ verdi: trekkILøpendeUtbetaling.id }),
                periode: useFelt<IYearMonthPeriode>({
                    verdi: nyYearMonthPeriode(
                        trekkILøpendeUtbetaling.periode.fom,
                        trekkILøpendeUtbetaling.periode.tom
                    ),
                    valideringsfunksjon: validerPeriode,
                }),
                feilutbetaltBeløp: useFelt<number>({
                    verdi: trekkILøpendeUtbetaling.feilutbetaltBeløp,
                    valideringsfunksjon: validerFeilutbetaltBeløp,
                }),
                behandlingId: useFelt<number>({
                    verdi: trekkILøpendeUtbetaling.behandlingId,
                }),
            },
            skjemanavn: 'Trekk i løpende utbetaling',
        });

        const populerSkjemaFraBackend = () => {
            settVisfeilmeldinger(false);
            skjema.felter.periode.validerOgSettFelt({
                fom: trekkILøpendeUtbetaling.periode.fom,
                tom: trekkILøpendeUtbetaling.periode.tom,
            });
        };

        useEffect(() => {
            populerSkjemaFraBackend();
        }, [trekkILøpendeUtbetaling]);

        const onPanelClose = (visAlert: boolean) => {
            if (
                erPanelEkspandert &&
                visAlert // TODO HER
            ) {
                // alert('Periode har endringer som ikke er lagret!');
            } else {
                settErPanelEkspandert(!erPanelEkspandert);
                populerSkjemaFraBackend();
            }
        };

        const leggTilPeriode = async () => {
            if (kanSendeSkjema()) {
                const respons = await request<ITrekkILøpendeUtbetaling, number>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
                    data: {
                        ...trekkILøpendeUtbetaling,
                        identifikator: {
                            id: trekkILøpendeUtbetaling.id,
                            behandlingId: trekkILøpendeUtbetaling.behandlingId,
                        },
                        periode: {
                            fom: skjema.felter.periode.verdi.fom?.substring(0, 7),
                            tom: skjema.felter.periode.verdi.tom?.substring(0, 7),
                        },
                        feilutbetaltBeløp: skjema.felter.feilutbetaltBeløp.verdi,
                    },
                });
                if (respons.status === RessursStatus.SUKSESS) {
                    skjema.felter.id.validerOgSettFelt(respons.data.valueOf());
                    onPanelClose(false);
                    hentTrekkILøpendeUtbetalinger();
                }
            }
        };

        const oppdaterPeriode = async () => {
            if (kanSendeSkjema()) {
                const respons = await request<ITrekkILøpendeUtbetaling, number>({
                    method: 'PUT',
                    url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
                    data: {
                        ...trekkILøpendeUtbetaling,
                        identifikator: {
                            id: trekkILøpendeUtbetaling.id,
                            behandlingId: trekkILøpendeUtbetaling.behandlingId,
                        },
                        periode: {
                            fom: skjema.felter.periode.verdi.fom?.substring(0, 7),
                            tom: skjema.felter.periode.verdi.tom?.substring(0, 7),
                        },
                        feilutbetaltBeløp: skjema.felter.feilutbetaltBeløp.verdi,
                    },
                });
                if (respons.status === RessursStatus.SUKSESS) {
                    skjema.felter.id.validerOgSettFelt(respons.data.valueOf());
                    onPanelClose(false);
                    hentTrekkILøpendeUtbetalinger();
                }
            }
        };

        const fjern = async (id: number) => {
            if (id !== 0) {
                await request<IRestTrekkILøpendeUtbetalingIdentifikator, void>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
                    data: tilRestIdentifikator(id),
                });
            }
            fjernFraLista(id);
        };

        function tilRestIdentifikator(id: number): IRestTrekkILøpendeUtbetalingIdentifikator {
            return {
                id: id,
                behandlingId: trekkILøpendeUtbetaling.behandlingId,
            };
        }

        return {
            erPanelEkspandert,
            hentFeilTilOppsummering,
            id: trekkILøpendeUtbetaling.id,
            trekkILøpendeUtbetaling: trekkILøpendeUtbetaling,
            onPanelClose,
            skjema,
            åpenBehandling,
            valideringErOk,
            kanSendeSkjema,
            leggTilPeriode,
            oppdaterPeriode,
            fjern,
        };
    }
);

export { TrekkILøpendeUtbetalingProvider, useTrekkILøpendeUtbetalingProvider };
