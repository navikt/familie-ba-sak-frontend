import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import deepEqual from 'deep-equal';

import type { ActionMeta, GroupBase } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { FeiloppsummeringFeil, FeltState, ISkjema } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import { Behandlingstype } from '../../../../../../typer/behandling';
import type { OptionType } from '../../../../../../typer/common';
import type { VedtakBegrunnelse } from '../../../../../../typer/vedtak';
import type {
    IRestPutVedtaksperiodeMedFritekster,
    IVedtaksperiodeMedBegrunnelser,
} from '../../../../../../typer/vedtaksperiode';
import type { IIsoDatoPeriode } from '../../../../../../utils/dato';
import type { IFritekstFelt } from '../../../../../../utils/fritekstfelter';
import { genererIdBasertPåAndreFritekstKulepunkter, lagInitiellFritekst } from '../../../../../../utils/fritekstfelter';
import { useVedtakContext } from '../VedtakContext';
import { grupperBegrunnelser } from './utils';
import { HentGenererteBrevbegrunnelserQueryKeyFactory } from '../../../../../../hooks/useHentGenererteBrevbegrunnelser';

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
    hentFeilTilOppsummering: () => FeiloppsummeringFeil[];
    leggTilFritekst: () => void;
    maksAntallKulepunkter: number;
    makslengdeFritekst: number;
    onChangeBegrunnelse: (action: ActionMeta<OptionType>) => void;
    onPanelClose: (visAlert: boolean) => void;
    putVedtaksperiodeMedFritekster: () => void;
    skjema: ISkjema<BegrunnelserSkjema, IVedtaksperiodeMedBegrunnelser[]>;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
    standardBegrunnelserPut: Ressurs<string>;
}

const VedtaksperiodeContext = createContext<VedtaksperiodeContextValue | undefined>(undefined);

export const VedtaksperiodeProvider = ({ åpenBehandling, vedtaksperiodeMedBegrunnelser, children }: IProps) => {
    const { request } = useHttp();
    const queryClient = useQueryClient();
    const { alleBegrunnelserRessurs } = useVedtakContext();
    const { settVedtaksperioderMedBegrunnelserRessurs } = useVedtakContext();

    const [erPanelEkspandert, settErPanelEkspandert] = useState(
        åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
            vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
            vedtaksperiodeMedBegrunnelser.fritekster.length === 0
    );
    const [standardBegrunnelserPut, settStandardBegrunnelserPut] = useState<Ressurs<string>>(byggTomRessurs());

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

    const { hentFeilTilOppsummering, kanSendeSkjema, settVisfeilmeldinger, skjema } = useSkjema<
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
        if (alleBegrunnelserRessurs.status === RessursStatus.SUKSESS) {
            populerSkjemaFraBackend();
        }
    }, [alleBegrunnelserRessurs, vedtaksperiodeMedBegrunnelser]);

    const onChangeBegrunnelse = (action: ActionMeta<OptionType>) => {
        switch (action.action) {
            case 'select-option':
                if (action.option) {
                    oppdaterStandardbegrunnelser([
                        ...vedtaksperiodeMedBegrunnelser.begrunnelser.map(
                            begrunnelse => begrunnelse.standardbegrunnelse
                        ),
                        action.option?.value as VedtakBegrunnelse,
                    ]);
                }
                break;
            case 'pop-value':
            case 'remove-value':
                if (action.removedValue) {
                    oppdaterStandardbegrunnelser(
                        [
                            ...vedtaksperiodeMedBegrunnelser.begrunnelser.filter(
                                persistertBegrunnelse =>
                                    persistertBegrunnelse.standardbegrunnelse !==
                                    (action.removedValue?.value as VedtakBegrunnelse)
                            ),
                        ].map(begrunnelse => begrunnelse.standardbegrunnelse)
                    );
                }

                break;
            case 'clear':
                oppdaterStandardbegrunnelser([]);
                break;
            default:
                throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
        }
    };

    const oppdaterStandardbegrunnelser = (standardbegrunnelser: VedtakBegrunnelse[]) => {
        settStandardBegrunnelserPut(byggHenterRessurs());
        request<{ standardbegrunnelser: VedtakBegrunnelse[] }, IVedtaksperiodeMedBegrunnelser[]>({
            method: 'PUT',
            url: `/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/${vedtaksperiodeMedBegrunnelser.id}`,
            data: { standardbegrunnelser },
        }).then(vedtaksperioderMedBegrunnelserRessurs => {
            if (vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.SUKSESS) {
                settStandardBegrunnelserPut(byggTomRessurs());
                settVedtaksperioderMedBegrunnelserRessurs(vedtaksperioderMedBegrunnelserRessurs);
                queryClient.invalidateQueries({
                    queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(
                        vedtaksperiodeMedBegrunnelser.id
                    ),
                });
            } else if (vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.FUNKSJONELL_FEIL) {
                settStandardBegrunnelserPut(
                    byggFeiletRessurs(vedtaksperioderMedBegrunnelserRessurs.frontendFeilmelding)
                );
            } else {
                settStandardBegrunnelserPut(byggFeiletRessurs('Klarte ikke oppdatere standardbegrunnelser'));
            }
        });
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
            request<IRestPutVedtaksperiodeMedFritekster, IVedtaksperiodeMedBegrunnelser[]>({
                method: 'PUT',
                url: `/familie-ba-sak/api/vedtaksperioder/fritekster/${vedtaksperiodeMedBegrunnelser.id}`,
                data: {
                    fritekster: skjema.felter.fritekster.verdi.map(fritekst => fritekst.verdi.tekst),
                },
            }).then(vedtaksperioderMedBegrunnelserRessurs => {
                if (vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.SUKSESS) {
                    settVedtaksperioderMedBegrunnelserRessurs(vedtaksperioderMedBegrunnelserRessurs);
                    onPanelClose(false);
                    queryClient.invalidateQueries({
                        queryKey: HentGenererteBrevbegrunnelserQueryKeyFactory.vedtaksperiode(
                            vedtaksperiodeMedBegrunnelser.id
                        ),
                    });
                } else if (vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.FUNKSJONELL_FEIL) {
                    settStandardBegrunnelserPut(
                        byggFeiletRessurs(vedtaksperioderMedBegrunnelserRessurs.frontendFeilmelding)
                    );
                } else {
                    settStandardBegrunnelserPut(byggFeiletRessurs('Klarte ikke oppdatere fritekst på vedtaksperiode'));
                }
            });
        }
    };

    return (
        <VedtaksperiodeContext.Provider
            value={{
                erPanelEkspandert,
                grupperteBegrunnelser: grupperBegrunnelser(vedtaksperiodeMedBegrunnelser, alleBegrunnelserRessurs),
                hentFeilTilOppsummering,
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
                standardBegrunnelserPut,
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
