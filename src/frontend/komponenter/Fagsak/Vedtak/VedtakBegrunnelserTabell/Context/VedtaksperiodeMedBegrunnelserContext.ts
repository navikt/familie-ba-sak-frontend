import { useEffect, useState } from 'react';

import constate from 'constate';
import deepEqual from 'deep-equal';

import { ActionMeta, ISelectOption } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { feil, FeltState, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { Behandlingstype, IBehandling } from '../../../../../typer/behandling';
import { VedtakBegrunnelse } from '../../../../../typer/vedtak';
import {
    IRestPutVedtaksperiodeMedFritekster,
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { IPeriode } from '../../../../../utils/kalender';
import { useVilkårBegrunnelser } from '../Hooks/useVedtaksbegrunnelser';

interface IProps {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

export interface IFritekstFelt {
    tekst: string;
    id: number;
}

const [VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser] = constate(
    ({ åpenBehandling, vedtaksperiodeMedBegrunnelser }: IProps) => {
        const { request } = useHttp();
        const { settÅpenBehandling } = useBehandling();
        const [erPanelEkspandert, settErPanelEkspandert] = useState(
            åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING &&
                vedtaksperiodeMedBegrunnelser.begrunnelser.length === 0 &&
                vedtaksperiodeMedBegrunnelser.fritekster.length === 0
        );
        const [standardBegrunnelserPut, settStandardBegrunnelserPut] = useState(byggTomRessurs());
        const [genererteBrevbegrunnelser, settGenererteBrevbegrunnelser] = useState<
            Ressurs<string[]>
        >(byggTomRessurs());

        const maksAntallKulepunkter =
            vedtaksperiodeMedBegrunnelser.type === Vedtaksperiodetype.FORTSATT_INNVILGET ? 1 : 3;
        const makslengdeFritekst = 220;

        const periode = useFelt<IPeriode>({
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

        const genererIdBasertPåAndreFritekster = () => {
            if (fritekster.verdi.length > 0) {
                return Math.max(...fritekster.verdi.map(fritekst => fritekst.verdi.id, 10)) + 1;
            } else {
                return 1;
            }
        };

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

        const lagInitiellFritekst = (
            initiellVerdi: string,
            id?: number
        ): FeltState<IFritekstFelt> => ({
            feilmelding: initiellVerdi === '' ? 'Fritekstfeltet er tomt.' : '',
            verdi: {
                tekst: initiellVerdi,
                id: id ?? genererIdBasertPåAndreFritekster(),
            },
            valider: (felt: FeltState<IFritekstFelt>) => {
                if (felt.verdi.tekst.length > 220) {
                    return feil(felt, 'Du har nådd maks antall tegn: 220.');
                } else if (felt.verdi.tekst.trim().length === 0) {
                    return feil(
                        felt,
                        'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.'
                    );
                } else {
                    return ok(felt);
                }
            },
            valideringsstatus:
                initiellVerdi === '' ? Valideringsstatus.IKKE_VALIDERT : Valideringsstatus.OK,
        });

        const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
            switch (action.action) {
                case 'select-option':
                    if (action.option) {
                        oppdaterStandardbegrunnelser([
                            ...vedtaksperiodeMedBegrunnelser.begrunnelser.map(
                                begrunnelse => begrunnelse.vedtakBegrunnelseSpesifikasjon
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
                                        persistertBegrunnelse.vedtakBegrunnelseSpesifikasjon !==
                                        (action.removedValue?.value as VedtakBegrunnelse)
                                ),
                            ].map(begrunnelse => begrunnelse.vedtakBegrunnelseSpesifikasjon)
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
            request<{ standardbegrunnelser: VedtakBegrunnelse[] }, IBehandling>({
                method: 'PUT',
                url: `/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/${vedtaksperiodeMedBegrunnelser.id}`,
                data: { standardbegrunnelser },
            }).then((behandling: Ressurs<IBehandling>) => {
                if (behandling.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(behandling);
                    settStandardBegrunnelserPut(byggTomRessurs());
                } else if (behandling.status === RessursStatus.FUNKSJONELL_FEIL) {
                    settStandardBegrunnelserPut(byggFeiletRessurs(behandling.frontendFeilmelding));
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
                            'Klarte ikke generere forhåndsvisning av brevbegrunnelser'
                        )
                    );
                }
            });
        };

        const leggTilFritekst = () => {
            skjema.felter.fritekster.validerOgSettFelt([
                ...skjema.felter.fritekster.verdi,
                lagInitiellFritekst(''),
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
                onSubmit<IRestPutVedtaksperiodeMedFritekster>(
                    {
                        method: 'PUT',
                        url: `/familie-ba-sak/api/vedtaksperioder/fritekster/${vedtaksperiodeMedBegrunnelser.id}`,
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
    }
);

export { VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser };
