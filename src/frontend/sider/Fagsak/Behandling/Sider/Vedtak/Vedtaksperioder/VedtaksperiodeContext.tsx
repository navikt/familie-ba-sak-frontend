import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import deepEqual from 'deep-equal';

import type { GroupBase } from '@navikt/familie-form-elements';
import type { FeltState, ISkjema } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';

import { grupperBegrunnelser } from './utils';
import { HentGenererteBrevbegrunnelserQueryKeyFactory } from '../../../../../../hooks/useHentGenererteBrevbegrunnelser';
import { HentVedtaksperioderQueryKeyFactory } from '../../../../../../hooks/useHentVedtaksperioder';
import { useOppdaterStandardbegrunnelser } from '../../../../../../hooks/useOppdaterStandardbegrunnelser';
import { useOppdaterVedtaksperiodeMedFritekster } from '../../../../../../hooks/useOppdaterVedtaksperiodeMedFritekster';
import type { IBehandling } from '../../../../../../typer/behandling';
import { Behandlingstype } from '../../../../../../typer/behandling';
import type { OptionType } from '../../../../../../typer/common';
import type { VedtakBegrunnelse } from '../../../../../../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../typer/vedtaksperiode';
import type { IIsoDatoPeriode } from '../../../../../../utils/dato';
import type { IFritekstFelt } from '../../../../../../utils/fritekstfelter';
import { genererIdBasertPåAndreFritekstKulepunkter, lagInitiellFritekst } from '../../../../../../utils/fritekstfelter';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { useAlleBegrunnelserContext } from '../AlleBegrunnelserContext';

interface IProps extends PropsWithChildren {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

interface BegrunnelserSkjema {
    periode: IIsoDatoPeriode;
    fritekster: FeltState<IFritekstFelt>[];
}

interface VedtaksperiodeContextValue {
    erPanelEkspandert: boolean;
    grupperteBegrunnelser: GroupBase<OptionType>[];
    id: number;
    leggTilFritekst: () => void;
    maksAntallKulepunkter: number;
    makslengdeFritekst: number;
    onChangeBegrunnelse: (option: string, isSelected: boolean) => void;
    onPanelClose: (visAlert: boolean) => void;
    putVedtaksperiodeMedFritekster: () => void;
    skjema: ISkjema<BegrunnelserSkjema, IVedtaksperiodeMedBegrunnelser[]>;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

const VedtaksperiodeContext = createContext<VedtaksperiodeContextValue | undefined>(undefined);

export const VedtaksperiodeProvider = ({ åpenBehandling, vedtaksperiodeMedBegrunnelser, children }: IProps) => {
    const { alleBegrunnelser } = useAlleBegrunnelserContext();
    const queryClient = useQueryClient();

    const behandlingId = useBehandlingContext().behandling.behandlingId;

    const [erPanelEkspandert, settErPanelEkspandert] = useState(
        åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
            vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
            vedtaksperiodeMedBegrunnelser.fritekster.length === 0
    );

    const { mutate: oppdaterStandardbegrunnelser } = useOppdaterStandardbegrunnelser(vedtaksperiodeMedBegrunnelser.id, {
        onSuccess: vedtaksperioderMedBegrunnelser => {
            queryClient.invalidateQueries({
                queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(vedtaksperiodeMedBegrunnelser.id),
            });
            queryClient.setQueryData(
                HentVedtaksperioderQueryKeyFactory.behandling(behandlingId),
                vedtaksperioderMedBegrunnelser
            );
        },
    });

    const { mutate: oppdaterVedtaksperiodeMedFritekster } = useOppdaterVedtaksperiodeMedFritekster(
        vedtaksperiodeMedBegrunnelser.id,
        {
            onSuccess: vedtaksperioderMedBegrunnelser => {
                queryClient.invalidateQueries({
                    queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(
                        vedtaksperiodeMedBegrunnelser.id
                    ),
                });
                queryClient.setQueryData(
                    HentVedtaksperioderQueryKeyFactory.behandling(behandlingId),
                    vedtaksperioderMedBegrunnelser
                );
                onPanelClose(false);
            },
        }
    );

    const maksAntallKulepunkter = 3;
    const makslengdeFritekst = 350;

    const periode = useFelt<IIsoDatoPeriode>({
        verdi: {
            fom: vedtaksperiodeMedBegrunnelser.fom,
            tom: vedtaksperiodeMedBegrunnelser.tom,
        },
    });

    const fritekster = useFelt<FeltState<IFritekstFelt>[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<FeltState<IFritekstFelt>[]>) => {
            return felt.verdi.some(
                fritekst => fritekst.valideringsstatus === Valideringsstatus.FEIL || fritekst.verdi.tekst.length === 0
            )
                ? feil(felt, '')
                : ok(felt);
        },
    });

    const { kanSendeSkjema, settVisfeilmeldinger, skjema } = useSkjema<
        BegrunnelserSkjema,
        IVedtaksperiodeMedBegrunnelser[]
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
            fom: vedtaksperiodeMedBegrunnelser.fom,
            tom: vedtaksperiodeMedBegrunnelser.tom,
        });

        skjema.felter.fritekster.validerOgSettFelt(
            vedtaksperiodeMedBegrunnelser.fritekster.map((fritekst, id) =>
                lagInitiellFritekst(fritekst, id, makslengdeFritekst)
            )
        );
    };

    useEffect(() => {
        populerSkjemaFraBackend();
    }, [vedtaksperiodeMedBegrunnelser]);

    const onChangeBegrunnelse = (option: string, isSelected: boolean) => {
        if (isSelected) {
            oppdaterStandardbegrunnelser({
                standardbegrunnelser: [
                    ...vedtaksperiodeMedBegrunnelser.begrunnelser.map(begrunnelse => begrunnelse.standardbegrunnelse),
                    option as VedtakBegrunnelse,
                ],
            });
        } else {
            oppdaterStandardbegrunnelser({
                standardbegrunnelser: [
                    ...vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
                        persistertBegrunnelse =>
                            persistertBegrunnelse.standardbegrunnelse !== (option as VedtakBegrunnelse)
                    ),
                ].map(begrunnelse => begrunnelse.standardbegrunnelse),
            });
        }
    };

    const leggTilFritekst = () => {
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi,
            lagInitiellFritekst(
                '',
                genererIdBasertPåAndreFritekstKulepunkter(skjema.felter.fritekster),
                makslengdeFritekst
            ),
        ]);
    };

    const onPanelClose = (visAlert: boolean) => {
        if (
            erPanelEkspandert &&
            visAlert &&
            !deepEqual(
                skjema.felter.fritekster.verdi.map(fritekst => fritekst.verdi.tekst),
                vedtaksperiodeMedBegrunnelser.fritekster
            )
        ) {
            alert('Periode har endringer som ikke er lagret!');
        } else {
            settErPanelEkspandert(!erPanelEkspandert);
            populerSkjemaFraBackend();
        }
    };

    const putVedtaksperiodeMedFritekster = () => {
        if (kanSendeSkjema()) {
            oppdaterVedtaksperiodeMedFritekster({
                fritekster: skjema.felter.fritekster.verdi.map(fritekst => fritekst.verdi.tekst),
            });
        }
    };

    return (
        <VedtaksperiodeContext.Provider
            value={{
                erPanelEkspandert,
                grupperteBegrunnelser: grupperBegrunnelser(vedtaksperiodeMedBegrunnelser, alleBegrunnelser),
                id: vedtaksperiodeMedBegrunnelser.id,
                vedtaksperiodeMedBegrunnelser,
                leggTilFritekst,
                maksAntallKulepunkter,
                makslengdeFritekst,
                onChangeBegrunnelse,
                onPanelClose,
                putVedtaksperiodeMedFritekster,
                skjema,
                åpenBehandling,
            }}
        >
            {children}
        </VedtaksperiodeContext.Provider>
    );
};

export const useVedtaksperiodeContext = () => {
    const context = useContext(VedtaksperiodeContext);

    if (context === undefined) {
        throw new Error('useVedtaksperiodeContext må brukes inne i en VedtaksperiodeProvider');
    }
    return context;
};
