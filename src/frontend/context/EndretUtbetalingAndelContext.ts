import constate from 'constate';

import { ISODateString, OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { useSkjema, useFelt } from '@navikt/familie-skjema';

import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IRestEndretUtbetalingAndel } from '../typer/vedtak';
import { FamilieIsoDate } from '../utils/kalender';

interface IProps {
    åpenBehandling: IBehandling;
}
const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = constate(
    ({ åpenBehandling }: IProps) => {
        const { request } = useHttp();

        const { skjema } = useSkjema<
            {
                person: OptionType | undefined;
                fom: string | undefined;
                tom: string | undefined;
                periodeSkalUtbetalesTilSøker: boolean;
                årsak: OptionType | undefined;
                begrunnelse: string;
            },
            IFagsak
        >({
            felter: {
                person: useFelt<{ label: string; value: string } | undefined>({
                    verdi: undefined,
                }),
                fom: useFelt<FamilieIsoDate | undefined>({
                    verdi: undefined,
                }),
                tom: useFelt<FamilieIsoDate | undefined>({
                    verdi: undefined,
                }),
                periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                    verdi: false,
                }),
                årsak: useFelt<{ label: string; value: string } | undefined>({
                    verdi: undefined,
                }),
                begrunnelse: useFelt<string>({
                    verdi: '',
                }),
            },
            skjemanavn: 'Endre utbetalingsperiode',
        });

        return {
            skjema,
        };

        const postEndretUtbetalingAndel = (
            behandlingId: number,
            personIdent: string,
            prosent: number,
            fom: ISODateString,
            tom: ISODateString,
            arsak: string,
            begrunnelse: string
        ) => {
            //settVilkårSubmit(VilkårSubmit.DELETE);

            return request<IRestEndretUtbetalingAndel, IFagsak>({
                method: 'POST',
                url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling}`,
                data: {
                    personIdent: personIdent,
                    prosent: prosent,
                    fom: fom,
                    tom: tom,
                    arsak: arsak,
                    begrunnelse: begrunnelse,
                },
            });
        };
    }
);

export { EndretUtbetalingAndelProvider, useEndretUtbetalingAndel };
