import { useEffect, useState } from 'react';

import constate from 'constate';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IYearMonthPeriode } from '../../../../../../utils/kalender';
import { nyYearMonthPeriode } from '../../../../../../utils/kalender';
import type { ITrekkILøpendeUtbetaling } from './ITrekkILøpendeUtbetaling';

interface IProps {
    trekkILøpendeUtbetaling: ITrekkILøpendeUtbetaling;
    åpenBehandling: IBehandling;
}

const validerPeriode = (felt: FeltState<IYearMonthPeriode>) => {
    if (!felt.verdi || !felt.verdi?.fom) {
        return feil(felt, 'F.o.m. er påkrevd');
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
    ({ åpenBehandling, trekkILøpendeUtbetaling }: IProps) => {
        const { settÅpenBehandling } = useBehandling();
        const [erPanelEkspandert, settErPanelEkspandert] = useState(true);
        const makslengdeFritekst = 220;

        const {
            hentFeilTilOppsummering,
            kanSendeSkjema,
            onSubmit,
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
            skjemanavn: 'Begrunnelser for vedtaksperiode',
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

        const putVedtaksperiodeMedFritekster = () => {
            if (kanSendeSkjema()) {
                onSubmit<ITrekkILøpendeUtbetaling>(
                    {
                        method: 'PUT',
                        url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling/${trekkILøpendeUtbetaling.id}`,
                        data: trekkILøpendeUtbetaling,
                    },
                    (behandling: Ressurs<IBehandling>) => {
                        settÅpenBehandling(behandling);
                        onPanelClose(false);
                    }
                );
            }
        };

        return {
            erPanelEkspandert,
            hentFeilTilOppsummering,
            id: trekkILøpendeUtbetaling.id,
            trekkILøpendeUtbetaling: trekkILøpendeUtbetaling,
            makslengdeFritekst,
            onPanelClose,
            putVedtaksperiodeMedFritekster,
            skjema,
            åpenBehandling,
            valideringErOk,
            kanSendeSkjema,
        };
    }
);

export { TrekkILøpendeUtbetalingProvider, useTrekkILøpendeUtbetalingProvider };
