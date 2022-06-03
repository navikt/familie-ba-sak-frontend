import React from 'react';

import type { OptionType } from '@navikt/familie-form-elements';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type {
    IRestUtenlandskPeriodeBeløp,
    IUtenlandskPeriodeBeløp,
    EøsPeriodeStatus,
    UtenlandskPeriodeBeløpIntervall,
} from '../../typer/eøsPerioder';
import { erBarnGyldig, erEøsPeriodeGyldig, isEmpty } from '../../utils/eøsValidators';
import { nyYearMonthPeriode } from '../../utils/kalender';
import type { IYearMonthPeriode } from '../../utils/kalender';
import { useBehandling } from '../behandlingContext/BehandlingContext';

const erBeløpGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Beløp er påkrevd, men mangler input');
const erValutaGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Valuta er påkrevd, men mangler input');
const erIntervallGyldig = (
    felt: FeltState<UtenlandskPeriodeBeløpIntervall | undefined>
): FeltState<UtenlandskPeriodeBeløpIntervall | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Intervall er påkrevd, men mangler input');

export const utenlandskPeriodeBeløpFeilmeldingId = (
    utenlandskPeriodeBeløp: IRestUtenlandskPeriodeBeløp
): string =>
    `utd_beløp_${utenlandskPeriodeBeløp.barnIdenter.map(barn => `${barn}-`)}_${
        utenlandskPeriodeBeløp.fom
    }`;

interface IProps {
    utenlandskPeriodeBeløp: IRestUtenlandskPeriodeBeløp;
    tilgjengeligeBarn: OptionType[];
}

const useUtenlandskPeriodeBeløpSkjema = ({ tilgjengeligeBarn, utenlandskPeriodeBeløp }: IProps) => {
    const [ekspandertUtenlandskPeriodeBeløp, settEkspandertUtenlandskPeriodeBeløp] =
        React.useState<boolean>(false);
    const { åpenBehandling, settÅpenBehandling } = useBehandling();
    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.behandlingId : null;
    const initelFom = useFelt<string>({ verdi: utenlandskPeriodeBeløp.fom });

    const valgteBarn = utenlandskPeriodeBeløp.barnIdenter.map(barn => {
        const tilBarn = tilgjengeligeBarn.find(opt => {
            return opt.value.match(barn);
        });
        if (tilBarn) {
            return tilBarn;
        } else {
            throw new Error(
                'Skulle ikke være mulig å velge et barn,  som ikke er registrert frå før i utenlandsk beløp'
            );
        }
    });

    const { skjema, valideringErOk, kanSendeSkjema, onSubmit, nullstillSkjema } = useSkjema<
        IUtenlandskPeriodeBeløp,
        IBehandling
    >({
        felter: {
            periodeId: useFelt<string>({
                verdi: utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp),
            }),
            id: useFelt<number>({ verdi: utenlandskPeriodeBeløp.id }),
            status: useFelt<EøsPeriodeStatus>({ verdi: utenlandskPeriodeBeløp.status }),
            initielFom: initelFom,
            barnIdenter: useFelt<OptionType[]>({
                verdi: valgteBarn,
                valideringsfunksjon: erBarnGyldig,
            }),
            periode: useFelt<IYearMonthPeriode>({
                verdi: nyYearMonthPeriode(utenlandskPeriodeBeløp.fom, utenlandskPeriodeBeløp.tom),
                avhengigheter: { initelFom },
                valideringsfunksjon: erEøsPeriodeGyldig,
            }),
            beløp: useFelt<string | undefined>({
                verdi: utenlandskPeriodeBeløp.beløp,
                valideringsfunksjon: erBeløpGyldig,
            }),
            valutakode: useFelt<string | undefined>({
                verdi: utenlandskPeriodeBeløp.valutakode,
                valideringsfunksjon: erValutaGyldig,
            }),
            intervall: useFelt<UtenlandskPeriodeBeløpIntervall | undefined>({
                verdi: utenlandskPeriodeBeløp.intervall,
                valideringsfunksjon: erIntervallGyldig,
            }),
        },
        skjemanavn: utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp),
    });

    const sendInnSkjema = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        id: utenlandskPeriodeBeløp.id,
                        fom: skjema.felter.periode.verdi.fom,
                        tom: skjema.felter.periode.verdi.tom,
                        barnIdenter: skjema.felter.barnIdenter.verdi.map(barn => barn.value),
                        beløp: skjema.felter.beløp?.verdi,
                        valutakode: skjema.felter.valutakode?.verdi,
                        intervall: skjema.felter.intervall?.verdi,
                    },
                    url: `/familie-ba-sak/api/differanseberegning/utenlandskperidebeløp/${behandlingId}`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillSkjema();
                        settEkspandertUtenlandskPeriodeBeløp(false);
                        settÅpenBehandling(response);
                    }
                }
            );
        }
    };

    const slettUtenlandskPeriodeBeløp = () => {
        onSubmit(
            {
                method: 'DELETE',
                url: `/familie-ba-sak/api/differanseberegning/utenlandskperidebeløp/${behandlingId}/${utenlandskPeriodeBeløp.id}`,
            },
            (response: Ressurs<IBehandling>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    nullstillSkjema();
                    settEkspandertUtenlandskPeriodeBeløp(false);
                    settÅpenBehandling(response);
                }
            }
        );
    };

    const erUtenlandskPeriodeBeløpSkjemaEndret = () => {
        const barnFjernetISkjema = utenlandskPeriodeBeløp.barnIdenter.filter(
            barn => skjema.felter.barnIdenter.verdi.findIndex(ident => ident.value === barn) < 0
        );
        return (
            barnFjernetISkjema.length > 0 ||
            skjema.felter.periode?.verdi.fom !== utenlandskPeriodeBeløp.fom ||
            skjema.felter.periode?.verdi.tom !== utenlandskPeriodeBeløp.tom ||
            skjema.felter.beløp?.verdi !== utenlandskPeriodeBeløp.beløp ||
            skjema.felter.valutakode?.verdi !== utenlandskPeriodeBeløp.valutakode ||
            skjema.felter.intervall?.verdi !== utenlandskPeriodeBeløp.intervall
        );
    };

    return {
        ekspandertUtenlandskPeriodeBeløp,
        settEkspandertUtenlandskPeriodeBeløp,
        skjema,
        valideringErOk,
        sendInnSkjema,
        slettUtenlandskPeriodeBeløp,
        nullstillSkjema,
        kanSendeSkjema,
        erUtenlandskPeriodeBeløpSkjemaEndret,
    };
};

export { useUtenlandskPeriodeBeløpSkjema };
