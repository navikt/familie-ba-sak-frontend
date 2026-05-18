import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { HentGenererteBrevbegrunnelserQueryKeyFactory } from '@hooks/useHentGenererteBrevbegrunnelser';
import { HentVedtaksperioderQueryKeyFactory } from '@hooks/useHentVedtaksperioder';
import { useOppdaterVedtaksperiodeMedBegrunnelser } from '@hooks/useOppdaterVedtaksperiodeMedBegrunnelser';
import { MAKS_LENGDE_FRITEKST } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/Fritekstbegrunnelser';
import { useQueryClient } from '@tanstack/react-query';
import { Behandlingstype } from '@typer/behandling';
import type { OptionType } from '@typer/common';
import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import type { IIsoDatoPeriode } from '@utils/dato';
import type { IFritekstFelt } from '@utils/fritekstfelter';
import { lagInitiellFritekst } from '@utils/fritekstfelter';
import deepEqual from 'deep-equal';

import type { ActionMeta, GroupBase } from '@navikt/familie-form-elements';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState, ISkjema } from '@navikt/familie-skjema';

import { grupperBegrunnelser } from './utils';
import { useAlleBegrunnelserContext } from '../AlleBegrunnelserContext';

interface Props extends PropsWithChildren {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
}

interface BegrunnelserSkjema {
    periode: IIsoDatoPeriode;
    fritekster: FeltState<IFritekstFelt>[];
}

interface VedtaksperiodeContextValue {
    erPanelEkspandert: boolean;
    grupperteBegrunnelser: GroupBase<OptionType>[];
    onChangeBegrunnelse: (action: ActionMeta<OptionType>) => void;
    onPanelClose: (visAlert: boolean) => void;
    skjema: ISkjema<BegrunnelserSkjema, IVedtaksperiodeMedBegrunnelser[]>;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    kanSendeSkjema: () => boolean;
}

const VedtaksperiodeContext = createContext<VedtaksperiodeContextValue | undefined>(undefined);

export function VedtaksperiodeProvider({ vedtaksperiodeMedBegrunnelser, children }: Props) {
    const { alleBegrunnelser } = useAlleBegrunnelserContext();

    const behandling = useBehandling();
    const queryClient = useQueryClient();

    const [erPanelEkspandert, settErPanelEkspandert] = useState(
        behandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
            vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
            vedtaksperiodeMedBegrunnelser.fritekster.length === 0
    );

    const { mutate: oppdaterVedtaksperiodeMedBegrunnelser } = useOppdaterVedtaksperiodeMedBegrunnelser(
        vedtaksperiodeMedBegrunnelser.id,
        {
            onSuccess: async vedtaksperioderMedBegrunnelser => {
                await queryClient.invalidateQueries({
                    queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(
                        vedtaksperiodeMedBegrunnelser.id
                    ),
                });
                queryClient.setQueryData(
                    HentVedtaksperioderQueryKeyFactory.behandling(behandling.behandlingId),
                    vedtaksperioderMedBegrunnelser
                );
            },
        }
    );

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
                lagInitiellFritekst(fritekst, id, MAKS_LENGDE_FRITEKST)
            )
        );
    };

    useEffect(() => {
        populerSkjemaFraBackend();
    }, [vedtaksperiodeMedBegrunnelser]);

    const onChangeBegrunnelse = (action: ActionMeta<OptionType>) => {
        switch (action.action) {
            case 'select-option':
                if (action.option) {
                    oppdaterVedtaksperiodeMedBegrunnelser({
                        standardbegrunnelser: [
                            ...vedtaksperiodeMedBegrunnelser.begrunnelser.map(
                                begrunnelse => begrunnelse.standardbegrunnelse
                            ),
                            action.option?.value as VedtakBegrunnelse,
                        ],
                    });
                }
                break;
            case 'pop-value':
            case 'remove-value':
                if (action.removedValue) {
                    oppdaterVedtaksperiodeMedBegrunnelser({
                        standardbegrunnelser: [
                            ...vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
                                persistertBegrunnelse =>
                                    persistertBegrunnelse.standardbegrunnelse !==
                                    (action.removedValue?.value as VedtakBegrunnelse)
                            ),
                        ].map(begrunnelse => begrunnelse.standardbegrunnelse),
                    });
                }

                break;
            case 'clear':
                oppdaterVedtaksperiodeMedBegrunnelser({
                    standardbegrunnelser: [],
                });
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
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

    return (
        <VedtaksperiodeContext.Provider
            value={{
                erPanelEkspandert,
                grupperteBegrunnelser: grupperBegrunnelser(vedtaksperiodeMedBegrunnelser, alleBegrunnelser),
                vedtaksperiodeMedBegrunnelser,
                onChangeBegrunnelse,
                onPanelClose,
                skjema,
                kanSendeSkjema,
            }}
        >
            {children}
        </VedtaksperiodeContext.Provider>
    );
}

export function useVedtaksperiodeContext() {
    const context = useContext(VedtaksperiodeContext);
    if (context === undefined) {
        throw new Error('useVedtaksperiodeContext må brukes inne i en VedtaksperiodeProvider');
    }
    return context;
}
