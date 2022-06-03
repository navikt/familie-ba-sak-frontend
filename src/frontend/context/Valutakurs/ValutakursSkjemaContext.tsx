import React from 'react';

import type { OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type { EøsPeriodeStatus, IRestValutakurs, IValutakurs } from '../../typer/eøsPerioder';
import {
    erBarnGyldig,
    erEøsPeriodeGyldig,
    erValutakodeGyldig,
    isEmpty,
} from '../../utils/eøsValidators';
import type { IYearMonthPeriode } from '../../utils/kalender';
import { nyYearMonthPeriode } from '../../utils/kalender';
import { useBehandling } from '../behandlingContext/BehandlingContext';

const erValutakursDatoGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Valutakursdato er påkrevd, men mangler input');
const erValutakursGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Valutakurs er påkrevd, men mangler input');

export const valutakursFeilmeldingId = (valutakurs: IRestValutakurs): string =>
    `valutakurs_${valutakurs.barnIdenter.map(barn => `${barn}-`)}_${valutakurs.fom}`;

interface IProps {
    valutakurs: IRestValutakurs;
    tilgjengeligeBarn: OptionType[];
}

const useValutakursSkjema = ({ tilgjengeligeBarn, valutakurs }: IProps) => {
    const [ekspandertValutakurs, settEkspandertValutakurs] = React.useState<boolean>(false);
    const { åpenBehandling, settÅpenBehandling } = useBehandling();
    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.behandlingId : null;
    const initelFom = useFelt<string>({ verdi: valutakurs.fom });
    const { request } = useHttp();

    const valgteBarn = valutakurs.barnIdenter.map(barn => {
        const tilBarn = tilgjengeligeBarn.find(opt => {
            return opt.value.match(barn);
        });
        if (tilBarn) {
            return tilBarn;
        } else {
            throw new Error(
                'Skulle ikke være mulig å velge et barn, som ikke er registrert frå før i valutakurs'
            );
        }
    });

    const { skjema, valideringErOk, kanSendeSkjema, nullstillSkjema, onSubmit } = useSkjema<
        IValutakurs,
        IBehandling
    >({
        felter: {
            periodeId: useFelt<string>({
                verdi: valutakursFeilmeldingId(valutakurs),
            }),
            id: useFelt<number>({ verdi: valutakurs.id }),
            status: useFelt<EøsPeriodeStatus>({ verdi: valutakurs.status }),
            initielFom: initelFom,
            barnIdenter: useFelt<OptionType[]>({
                verdi: valgteBarn,
                valideringsfunksjon: erBarnGyldig,
            }),
            periode: useFelt<IYearMonthPeriode>({
                verdi: nyYearMonthPeriode(valutakurs.fom, valutakurs.tom),
                avhengigheter: { initelFom },
                valideringsfunksjon: erEøsPeriodeGyldig,
            }),
            valutakode: useFelt<string | undefined>({
                verdi: valutakurs.valutakode,
                valideringsfunksjon: erValutakodeGyldig,
            }),
            valutakursdato: useFelt<string | undefined>({
                verdi: valutakurs.valutakursdato,
                valideringsfunksjon: erValutakursDatoGyldig,
            }),
            kurs: useFelt<string | undefined>({
                verdi: valutakurs.kurs,
                valideringsfunksjon: erValutakursGyldig,
            }),
        },
        skjemanavn: valutakursFeilmeldingId(valutakurs),
    });

    const sendInnSkjema = () => {
        if (kanSendeSkjema()) {
            onSubmit(
                {
                    method: 'PUT',
                    data: {
                        id: valutakurs.id,
                        fom: skjema.felter.periode.verdi.fom,
                        tom: skjema.felter.periode.verdi.tom,
                        barnIdenter: skjema.felter.barnIdenter.verdi.map(barn => barn.value),
                        valutakode: skjema.felter.valutakode?.verdi,
                        valutakursdato: skjema.felter.valutakursdato?.verdi,
                        kurs: skjema.felter.kurs?.verdi,
                    },
                    url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillSkjema();
                        settEkspandertValutakurs(false);
                        settÅpenBehandling(response);
                    }
                }
            );
        }
    };

    const slettValutakurs = () => {
        request<void, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}/${valutakurs.id}`,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                nullstillSkjema();
                settEkspandertValutakurs(false);
                settÅpenBehandling(response);
            }
        });
    };

    const erValutakursSkjemaEndret = () => {
        const barnFjernetISkjema = valutakurs.barnIdenter.filter(
            barn => skjema.felter.barnIdenter.verdi.findIndex(ident => ident.value === barn) < 0
        );
        return (
            barnFjernetISkjema.length > 0 ||
            skjema.felter.periode?.verdi.fom !== valutakurs.fom ||
            skjema.felter.periode?.verdi.tom !== valutakurs.tom ||
            skjema.felter.valutakode?.verdi !== valutakurs.valutakode ||
            skjema.felter.valutakursdato?.verdi !== valutakurs.valutakursdato ||
            skjema.felter.kurs?.verdi !== valutakurs.kurs
        );
    };

    return {
        ekspandertValutakurs,
        settEkspandertValutakurs,
        skjema,
        valideringErOk,
        kanSendeSkjema,
        sendInnSkjema,
        erValutakursSkjemaEndret,
        nullstillSkjema,
        slettValutakurs,
    };
};

export { useValutakursSkjema };
