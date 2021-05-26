import constate from 'constate';

import { ActionMeta, ISelectOption } from '@navikt/familie-form-elements';
import { FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { IPeriode } from '../../../../../utils/kalender';
import { useVilkårBegrunnelser } from '../Hooks/useVilkårBegrunnelser';

interface IProps {
    fagsak: IFagsak;
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpenBehandling: IBehandling;
}

const [VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser] = constate(
    ({ åpenBehandling, vedtaksperiodeMedBegrunnelser }: IProps) => {
        const periode = useFelt<IPeriode>({
            verdi: {
                fom: vedtaksperiodeMedBegrunnelser.fom,
                tom: vedtaksperiodeMedBegrunnelser.tom,
            },
        });

        const fritekster = useFelt<string[]>({
            verdi: vedtaksperiodeMedBegrunnelser.fritekster,
            valideringsfunksjon: (felt: FeltState<string[]>) => ok(felt),
        });

        const begrunnelser = useFelt<ISelectOption[]>({
            verdi: [],
            valideringsfunksjon: (felt: FeltState<ISelectOption[]>) => ok(felt),
        });

        const { skjema } = useSkjema<
            {
                periode: IPeriode;
                fritekster: string[];
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
            begrunnelser,
        });

        const onChangeBegrunnelse = (action: ActionMeta<ISelectOption>) => {
            if (action.option)
                switch (action.action) {
                    case 'select-option':
                        if (action.option) {
                            begrunnelser.validerOgSettFelt([
                                ...skjema.felter.begrunnelser.verdi,
                                action.option,
                            ]);
                        }

                        break;
                    /*case 'pop-value':
                case 'remove-value':
                    const vedtakBegrunnelse:
                        | IRestVedtakBegrunnelse
                        | undefined = vedtakBegrunnelserForPeriode.find(
                        (vedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                            vedtakBegrunnelse.begrunnelse === action.removedValue?.value
                    );

                    if (vedtakBegrunnelse) {
                        slettVedtakBegrunnelse(vedtakBegrunnelse);
                    } else {
                        throw new Error(
                            'Finner ikke utbetalingsbegrunnelse id i listen over begrunnelser'
                        );
                    }
                    break;
                case 'clear':
                    const førsteVedtakBegrunnelse: IRestVedtakBegrunnelse | undefined =
                        vedtakBegrunnelserForPeriode[0];

                    if (førsteVedtakBegrunnelse) {
                        slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper(
                            førsteVedtakBegrunnelse.fom,
                            vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype,
                            førsteVedtakBegrunnelse.tom
                        );
                    } else {
                        throw new Error(
                            'Prøver å fjerne alle begrunnelser for en periode, men det er ikke satt noen begrunnelser'
                        );
                    }
                    break;*/
                    default:
                        throw new Error('Ukjent action ved onChange på vedtakbegrunnelser');
                }
        };

        return {
            id: vedtaksperiodeMedBegrunnelser.id,
            skjema,
            onChangeBegrunnelse,
            grupperteBegrunnelser,
            vilkårBegrunnelser,
        };
    }
);

export { VedtaksperiodeMedBegrunnelserProvider, useVedtaksperiodeMedBegrunnelser };
