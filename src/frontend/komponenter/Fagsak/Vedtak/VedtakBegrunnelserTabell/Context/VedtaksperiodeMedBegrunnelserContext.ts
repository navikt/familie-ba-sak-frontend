import { useState, useEffect } from 'react';

import constate from 'constate';
import deepEqual from 'deep-equal';

import { ActionMeta, ISelectOption } from '@navikt/familie-form-elements';
import { feil, FeltState, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { Behandlingstype, IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { VedtakBegrunnelse } from '../../../../../typer/vedtak';
import {
    IRestPutVedtaksbegrunnelse,
    IRestPutVedtaksperiodeMedBegrunnelser,
    IVedtaksperiodeMedBegrunnelser,
    Utbetalingsperiode,
    hentGjeldendeUtbetalingsperiodePåBehandlingOgPeriode,
} from '../../../../../typer/vedtaksperiode';
import { IPeriode } from '../../../../../utils/kalender';
import {
    mapBegrunnelserTilSelectOptions,
    useVilkårBegrunnelser,
} from '../Hooks/useVedtaksbegrunnelser';

interface IProps {
    fagsak: IFagsak;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

export interface IFritekstFelt {
    tekst: string;
    id: number;
}

const [VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser] = constate(
    ({ åpenBehandling, vedtaksperiodeMedBegrunnelser }: IProps) => {
        const { settFagsak } = useFagsakRessurser();
        const [erPanelEkspandert, settErPanelEkspandert] = useState(
            åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING
        );

        const maksAntallKulepunkter = 1;
        const makslengdeFritekst = 220;

        const periode = useFelt<IPeriode>({
            verdi: {
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            },
        });

        const begrunnelser = useFelt<ISelectOption[]>({
            verdi: [],
            valideringsfunksjon: (felt: FeltState<ISelectOption[]>) => ok(felt),
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

        const {
            hentFeilTilOppsummering,
            kanSendeSkjema,
            onSubmit,
            settVisfeilmeldinger,
            skjema,
        } = useSkjema<
            {
                periode: IPeriode;
                fritekster: FeltState<IFritekstFelt>[];
                begrunnelser: ISelectOption[];
            },
            IFagsak
        >({
            felter: {
                periode,
                fritekster,
                begrunnelser,
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

            skjema.felter.begrunnelser.validerOgSettFelt(
                mapBegrunnelserTilSelectOptions(
                    vedtaksperiodeMedBegrunnelser,
                    vedtaksbegrunnelseTekster
                )
            );
        };

        useEffect(() => {
            if (vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS) {
                populerSkjemaFraBackend();
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

        const utbetalingsperiode:
            | Utbetalingsperiode
            | undefined = hentGjeldendeUtbetalingsperiodePåBehandlingOgPeriode(
            {
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            },
            åpenBehandling
        );

        const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
            switch (action.action) {
                case 'select-option':
                    if (action.option) {
                        skjema.felter.begrunnelser.validerOgSettFelt([
                            ...skjema.felter.begrunnelser.verdi,
                            action.option,
                        ]);
                    }

                    break;
                case 'pop-value':
                case 'remove-value':
                    if (action.removedValue) {
                        skjema.felter.begrunnelser.validerOgSettFelt([
                            ...skjema.felter.begrunnelser.verdi.filter(
                                selectOption => selectOption.value !== action.removedValue?.value
                            ),
                        ]);
                    }

                    break;
                case 'clear':
                    skjema.felter.begrunnelser.validerOgSettFelt([]);

                    break;
                default:
                    throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
            }
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
                (!deepEqual(
                    skjema.felter.fritekster.verdi.map(fritekst => fritekst.verdi.tekst),
                    vedtaksperiodeMedBegrunnelser.fritekster
                ) ||
                    !deepEqual(
                        skjema.felter.begrunnelser.verdi.map(begrunnelse => begrunnelse.value),
                        vedtaksperiodeMedBegrunnelser.begrunnelser.map(
                            begrunnelse => begrunnelse.vedtakBegrunnelseSpesifikasjon
                        )
                    ))
            ) {
                alert('Periode har endringer som ikke er lagret!');
            } else {
                settErPanelEkspandert(!erPanelEkspandert);
                populerSkjemaFraBackend();
            }
        };

        const erFritekstEllerBegrunnelseUtfylt =
            skjema.felter.begrunnelser.verdi.length !== 0 ||
            skjema.felter.fritekster.verdi.length !== 0;
        const erBådeFritekstogBegrunnelse =
            skjema.felter.begrunnelser.verdi.length !== 0 &&
            skjema.felter.fritekster.verdi.length !== 0;

        const putVedtaksperiodeMedBegrunnelser = () => {
            if (
                kanSendeSkjema() &&
                erFritekstEllerBegrunnelseUtfylt &&
                !erBådeFritekstogBegrunnelse
            ) {
                onSubmit<IRestPutVedtaksperiodeMedBegrunnelser>(
                    {
                        method: 'PUT',
                        url: `/familie-ba-sak/api/vedtaksperioder/${vedtaksperiodeMedBegrunnelser.id}`,
                        data: {
                            begrunnelser: skjema.felter.begrunnelser.verdi.map(
                                (begrunnelse): IRestPutVedtaksbegrunnelse => ({
                                    vedtakBegrunnelseSpesifikasjon: begrunnelse.value as VedtakBegrunnelse,
                                    personIdenter:
                                        utbetalingsperiode?.utbetalingsperiodeDetaljer.map(
                                            utbetalingsperiodeDetalj =>
                                                utbetalingsperiodeDetalj.person.personIdent
                                        ) ?? [],
                                })
                            ),
                            fritekster: skjema.felter.fritekster.verdi.map(
                                fritekst => fritekst.verdi.tekst
                            ),
                        },
                    },
                    (fagsak: Ressurs<IFagsak>) => {
                        settFagsak(fagsak);
                    }
                );
            }
        };

        const skjemaFeilmelding = () => {
            if (!erFritekstEllerBegrunnelseUtfylt) {
                return 'Du må velge minst én begrunnelse, eller fritekst.';
            } else if (erBådeFritekstogBegrunnelse) {
                return 'Du kan kun ha begrunnelse eller fritekst, og ikke en kombinasjon. Fjern en av tekstene.';
            } else {
                return '';
            }
        };

        return {
            erPanelEkspandert,
            grupperteBegrunnelser,
            hentFeilTilOppsummering,
            id: vedtaksperiodeMedBegrunnelser.id,
            leggTilFritekst,
            maksAntallKulepunkter,
            makslengdeFritekst,
            onChangeBegrunnelse,
            onPanelClose,
            putVedtaksperiodeMedBegrunnelser,
            skjema,
            skjemaFeilmelding,
            utbetalingsperiode,
            åpenBehandling,
        };
    }
);

export { VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser };
