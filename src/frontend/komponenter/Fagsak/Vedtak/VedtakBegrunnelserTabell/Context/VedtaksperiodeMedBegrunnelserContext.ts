import { useState, useEffect } from 'react';

import constate from 'constate';
import deepEqual from 'deep-equal';

import { ActionMeta, ISelectOption } from '@navikt/familie-form-elements';
import {
    feil,
    FeltState,
    ok,
    useFelt,
    useSkjema,
    Valideringsstatus,
    Avhengigheter,
} from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { Behandlingstype, IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { VedtakBegrunnelse } from '../../../../../typer/vedtak';
import {
    hentUtbetalingsperiodePåBehandlingOgPeriode,
    IRestPutVedtaksbegrunnelse,
    IRestPutVedtaksperiodeMedBegrunnelser,
    IVedtaksperiodeMedBegrunnelser,
    Utbetalingsperiode,
} from '../../../../../typer/vedtaksperiode';
import { IPeriode } from '../../../../../utils/kalender';
import {
    mapBegrunnelserTilSelectOptions,
    useVilkårBegrunnelser,
} from '../Hooks/useVilkårBegrunnelser';

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
            avhengigheter: { begrunnelser },
            valideringsfunksjon: (
                felt: FeltState<FeltState<IFritekstFelt>[]>,
                avhengigheter?: Avhengigheter
            ) => {
                const erFlerKulepunkterEnnTillat = felt.verdi.length > maksAntallKulepunkter;
                const erEtTomtFritekstfelt = felt.verdi.some(
                    fritekst => fritekst.verdi.tekst.length === 0
                );
                const erEtForLangtFritekstfelt = felt.verdi.some(
                    fritekst => fritekst.verdi.tekst.length > makslengdeFritekst
                );
                const erEnFritekstEllerBegrunnelse =
                    avhengigheter?.begrunnelser.verdi.length !== 0 || felt.verdi.length !== 0;
                const erBådeFritekstogBegrunnelse =
                    avhengigheter?.begrunnelser.verdi.length !== 0 && felt.verdi.length !== 0;

                if (erFlerKulepunkterEnnTillat) {
                    return feil(felt, `Kun ${maksAntallKulepunkter} fritekst er tillatt.`);
                } else if (erEtTomtFritekstfelt) {
                    return feil(felt, 'En eller fler av fritekstene er tomme.');
                } else if (erEtForLangtFritekstfelt) {
                    return feil(felt, 'En eller flere av fritekstene er for lange.');
                } else if (!erEnFritekstEllerBegrunnelse) {
                    return feil(felt, 'Du må velge begrunnelse eller skrive en fritekst.');
                } else if (erBådeFritekstogBegrunnelse) {
                    return feil(
                        felt,
                        'Det kan ikke være både fritekst og begrunnelse. Du kan velge maks én.'
                    );
                } else {
                    return ok(felt);
                }
            },
        });

        const genererIdBasertPåAndreFritekster = () => {
            if (fritekster.verdi.length > 0) {
                return Math.max(...fritekster.verdi.map(fritekst => fritekst.verdi.id, 10)) + 1;
            } else {
                return 1;
            }
        };

        const { skjema, onSubmit, hentFeilTilOppsummering, nullstillSkjema } = useSkjema<
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

        const { grupperteBegrunnelser, vilkårBegrunnelser } = useVilkårBegrunnelser({
            åpenBehandling,
            vedtaksperiodeMedBegrunnelser,
            periode: skjema.felter.periode.verdi,
        });

        useEffect(() => {
            skjema.felter.periode.validerOgSettFelt({
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            });
            skjema.felter.fritekster.validerOgSettFelt(
                vedtaksperiodeMedBegrunnelser.fritekster.map((fritekst, id) =>
                    lagInitiellFritekst(fritekst, id)
                )
            );
        }, [vedtaksperiodeMedBegrunnelser]);

        useEffect(() => {
            if (vilkårBegrunnelser.status === RessursStatus.SUKSESS) {
                skjema.felter.begrunnelser.validerOgSettFelt(
                    mapBegrunnelserTilSelectOptions(
                        vedtaksperiodeMedBegrunnelser,
                        vilkårBegrunnelser
                    )
                );
            }
        }, [vilkårBegrunnelser, vedtaksperiodeMedBegrunnelser]);

        const lagInitiellFritekst = (
            initiellVerdi: string,
            id?: number
        ): FeltState<IFritekstFelt> => ({
            feilmelding: '',
            verdi: {
                tekst: initiellVerdi,
                id: id ?? genererIdBasertPåAndreFritekster(),
            },
            valider: (felt: FeltState<IFritekstFelt>) =>
                felt.verdi.tekst.length > 220
                    ? feil(felt, 'Du har nådd maks antall tegn: 220')
                    : ok(felt),
            valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        });

        const utbetalingsperiode:
            | Utbetalingsperiode
            | undefined = hentUtbetalingsperiodePåBehandlingOgPeriode(
            {
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            },
            åpenBehandling
        );

        const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
            nullstillSkjema();
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
                //TODO reinitialiser skjema
            }
        };

        const putVedtaksperiodeMedBegrunnelser = () => {
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
        };

        return {
            erPanelEkspandert,
            grupperteBegrunnelser,
            id: vedtaksperiodeMedBegrunnelser.id,
            leggTilFritekst,
            onChangeBegrunnelse,
            onPanelClose,
            skjema,
            utbetalingsperiode,
            vilkårBegrunnelser,
            putVedtaksperiodeMedBegrunnelser,
            åpenBehandling,
            makslengdeFritekst,
            hentFeilTilOppsummering,
        };
    }
);

export { VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser };
