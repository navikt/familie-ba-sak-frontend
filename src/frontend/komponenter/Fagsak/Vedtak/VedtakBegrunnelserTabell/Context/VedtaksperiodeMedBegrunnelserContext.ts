import { useEffect, useState } from 'react';

import constate from 'constate';
import deepEqual from 'deep-equal';

import type { ActionMeta, ISelectOption } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useVedtaksperioder } from '../../../../../context/behandlingContext/useVedtaksperioder';
import type { IBehandling } from '../../../../../typer/behandling';
import { Behandlingstype } from '../../../../../typer/behandling';
import type { VedtakBegrunnelse } from '../../../../../typer/vedtak';
import type {
    IRestPutVedtaksperiodeMedFritekster,
    IVedtaksperiodeMedBegrunnelser,
} from '../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import type { IIsoDatoPeriode } from '../../../../../utils/dato';
import type { IFritekstFelt } from '../../../../../utils/fritekstfelter';
import {
    genererIdBasertPåAndreFritekster,
    lagInitiellFritekst,
} from '../../../../../utils/fritekstfelter';
import { useVilkårBegrunnelser } from '../Hooks/useVedtaksbegrunnelser';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

const [VedtaksperiodeMedBegrunnelserPanelProvider, useVedtaksperiodeMedBegrunnelserPanel] =
    constate(({ åpenBehandling, vedtaksperiodeMedBegrunnelser }: IProps) => {
        const { request } = useHttp();
        const [erPanelEkspandert, settErPanelEkspandert] = useState(
            åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
                vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
                vedtaksperiodeMedBegrunnelser.fritekster.length === 0
        );
        const [standardBegrunnelserPut, settStandardBegrunnelserPut] = useState(byggTomRessurs());
        const [genererteBrevbegrunnelser, settGenererteBrevbegrunnelser] =
            useState<Ressurs<string[]>>(byggTomRessurs());
        const { settVedtaksperioderMedBegrunnelserRessurs } = useVedtaksperioder();

        const maksAntallKulepunkter = 3;
        const makslengdeFritekst = 220;

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
                    fritekst =>
                        fritekst.valideringsstatus === Valideringsstatus.FEIL ||
                        fritekst.verdi.tekst.length === 0
                )
                    ? feil(felt, '')
                    : ok(felt);
            },
        });

        const { hentFeilTilOppsummering, kanSendeSkjema, settVisfeilmeldinger, skjema } = useSkjema<
            {
                periode: IIsoDatoPeriode;
                fritekster: FeltState<IFritekstFelt>[];
            },
            IVedtaksperiodeMedBegrunnelser[]
        >({
            felter: {
                periode,
                fritekster,
            },
            skjemanavn: 'Begrunnelser for vedtaksperiode',
        });

        const { grupperteBegrunnelser, vedtaksbegrunnelseTekster } = useVilkårBegrunnelser({
            åpenBehandling,
            vedtaksperiodeMedBegrunnelser,
            periode: skjema.felter.periode.verdi,
        });

        const populerSkjemaFraBackend = () => {
            settVisfeilmeldinger(false);
            skjema.felter.periode.validerOgSettFelt({
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            });

            skjema.felter.fritekster.validerOgSettFelt(
                vedtaksperiodeMedBegrunnelser.fritekster.map((fritekst, id) =>
                    lagInitiellFritekst(fritekst, id)
                )
            );
        };

        useEffect(() => {
            if (vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS) {
                populerSkjemaFraBackend();
                genererOgSettBegrunnelserForForhåndsvisning(vedtaksperiodeMedBegrunnelser.id);
            }
        }, [vedtaksbegrunnelseTekster, vedtaksperiodeMedBegrunnelser]);

        const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
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
            request<
                { standardbegrunnelser: VedtakBegrunnelse[] },
                IVedtaksperiodeMedBegrunnelser[]
            >({
                method: 'PUT',
                url: `/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/${vedtaksperiodeMedBegrunnelser.id}`,
                data: { standardbegrunnelser },
            }).then(vedtaksperioderMedBegrunnelserRessurs => {
                if (vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.SUKSESS) {
                    settStandardBegrunnelserPut(byggTomRessurs());
                    settVedtaksperioderMedBegrunnelserRessurs(
                        vedtaksperioderMedBegrunnelserRessurs
                    );
                } else if (
                    vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.FUNKSJONELL_FEIL
                ) {
                    settStandardBegrunnelserPut(
                        byggFeiletRessurs(vedtaksperioderMedBegrunnelserRessurs.frontendFeilmelding)
                    );
                } else {
                    settStandardBegrunnelserPut(
                        byggFeiletRessurs('Klarte ikke oppdatere standardbegrunnelser')
                    );
                }
            });
        };

        const genererOgSettBegrunnelserForForhåndsvisning = (vedtaksperiodeId: number) => {
            settGenererteBrevbegrunnelser(byggHenterRessurs());
            request<void, string[]>({
                method: 'GET',
                url: `/familie-ba-sak/api/vedtaksperioder/brevbegrunnelser/${vedtaksperiodeId}`,
            }).then((hentedeBegrunnelser: Ressurs<string[]>) => {
                if (hentedeBegrunnelser.status === RessursStatus.SUKSESS) {
                    settGenererteBrevbegrunnelser(hentedeBegrunnelser);
                } else if (hentedeBegrunnelser.status === RessursStatus.FUNKSJONELL_FEIL) {
                    settGenererteBrevbegrunnelser(
                        byggFeiletRessurs(hentedeBegrunnelser.frontendFeilmelding)
                    );
                } else {
                    settGenererteBrevbegrunnelser(
                        byggFeiletRessurs(
                            'Noe gikk galt og vi klarte ikke generere forhåndsvisning av brevbegrunnelser. ' +
                                'Ta kontakt med brukerstøtte hvis problemet vedvarer.'
                        )
                    );
                }
            });
        };

        const leggTilFritekst = () => {
            skjema.felter.fritekster.validerOgSettFelt([
                ...skjema.felter.fritekster.verdi,
                lagInitiellFritekst('', genererIdBasertPåAndreFritekster(skjema.felter.fritekster)),
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
                        fritekster: skjema.felter.fritekster.verdi.map(
                            fritekst => fritekst.verdi.tekst
                        ),
                    },
                }).then(vedtaksperioderMedBegrunnelserRessurs => {
                    if (vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.SUKSESS) {
                        settVedtaksperioderMedBegrunnelserRessurs(
                            vedtaksperioderMedBegrunnelserRessurs
                        );
                        onPanelClose(false);
                    } else if (
                        vedtaksperioderMedBegrunnelserRessurs.status ===
                        RessursStatus.FUNKSJONELL_FEIL
                    ) {
                        settStandardBegrunnelserPut(
                            byggFeiletRessurs(
                                vedtaksperioderMedBegrunnelserRessurs.frontendFeilmelding
                            )
                        );
                    } else {
                        settStandardBegrunnelserPut(
                            byggFeiletRessurs('Klarte ikke oppdatere fritekst på vedtaksperiode')
                        );
                    }
                });
            }
        };

        return {
            erPanelEkspandert,
            grupperteBegrunnelser,
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
            genererteBrevbegrunnelser,
        };
    });

export { VedtaksperiodeMedBegrunnelserPanelProvider, useVedtaksperiodeMedBegrunnelserPanel };
