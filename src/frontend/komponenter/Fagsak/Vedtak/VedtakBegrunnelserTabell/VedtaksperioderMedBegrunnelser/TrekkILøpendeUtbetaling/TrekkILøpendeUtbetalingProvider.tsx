import { useEffect, useState } from 'react';

import constate from 'constate';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IRestPutVedtaksperiodeMedFritekster } from '../../../../../../typer/vedtaksperiode';
import type { IFritekstFelt } from '../../../../../../utils/fritekstfelter';
import {
    genererIdBasertPåAndreFritekster,
    lagInitiellFritekst,
} from '../../../../../../utils/fritekstfelter';
import type { IPeriode, IYearMonthPeriode } from '../../../../../../utils/kalender';
import type { ITrekkILøpendeUtbetaling } from './ITrekkILøpendeUtbetaling';

interface IProps {
    trekkILøpendeUtbetaling: ITrekkILøpendeUtbetaling;
    åpenBehandling: IBehandling;
}

const [TrekkILøpendeUtbetalingProvider, useTrekkILøpendeUtbetalingProvider] = constate(
    ({ åpenBehandling, trekkILøpendeUtbetaling }: IProps) => {
        // const { request } = useHttp();
        const { settÅpenBehandling } = useBehandling();
        const [erPanelEkspandert, settErPanelEkspandert] = useState(true);
        const makslengdeFritekst = 220;

        const periode = useFelt<IYearMonthPeriode>({
            verdi: {
                fom: trekkILøpendeUtbetaling.fom,
                tom: trekkILøpendeUtbetaling.tom,
            },
        });

        const fritekster = useFelt<FeltState<IFritekstFelt>[]>({
            verdi: [],
            valideringsfunksjon: (felt: FeltState<FeltState<IFritekstFelt>[]>) => {
                return felt.verdi.some(
                    fritekst =>
                        fritekst.valideringsstatus === Valideringsstatus.FEIL ||
                        fritekst.verdi.tekst.length === 0
                )
                    ? feil(felt, '')
                    : ok(felt);
            },
        });

        const { hentFeilTilOppsummering, kanSendeSkjema, onSubmit, settVisfeilmeldinger, skjema } =
            useSkjema<
                {
                    periode: IPeriode;
                    fritekster: FeltState<IFritekstFelt>[];
                },
                IBehandling
            >({
                felter: {
                    periode,
                    fritekster,
                },
                skjemanavn: 'Begrunnelser for vedtaksperiode',
            });

        const populerSkjemaFraBackend = () => {
            settVisfeilmeldinger(false);
            skjema.felter.periode.validerOgSettFelt({
                fom: trekkILøpendeUtbetaling.fom,
                tom: trekkILøpendeUtbetaling.tom,
            });
        };

        useEffect(() => {
            populerSkjemaFraBackend();
        }, [trekkILøpendeUtbetaling]);
        const leggTilFritekst = () => {
            skjema.felter.fritekster.validerOgSettFelt([
                ...skjema.felter.fritekster.verdi,
                lagInitiellFritekst('', genererIdBasertPåAndreFritekster(skjema.felter.fritekster)),
            ]);
        };

        const onPanelClose = (visAlert: boolean) => {
            if (
                erPanelEkspandert &&
                visAlert // TODO HER
            ) {
                alert('Periode har endringer som ikke er lagret!');
            } else {
                settErPanelEkspandert(!erPanelEkspandert);
                populerSkjemaFraBackend();
            }
        };

        const putVedtaksperiodeMedFritekster = () => {
            if (kanSendeSkjema()) {
                onSubmit<IRestPutVedtaksperiodeMedFritekster>(
                    {
                        method: 'PUT',
                        url: `/familie-ba-sak/api/vedtaksperioder/fritekster/${trekkILøpendeUtbetaling.id}`,
                        data: {
                            fritekster: skjema.felter.fritekster.verdi.map(
                                fritekst => fritekst.verdi.tekst
                            ),
                        },
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
            leggTilFritekst,
            makslengdeFritekst,
            onPanelClose,
            putVedtaksperiodeMedFritekster,
            skjema,
            åpenBehandling,
        };
    }
);

export { TrekkILøpendeUtbetalingProvider, useTrekkILøpendeUtbetalingProvider };
