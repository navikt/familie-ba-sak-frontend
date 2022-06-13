import React from 'react';

import type { OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus, byggTomRessurs } from '@navikt/familie-typer';

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

const isNumeric = (val: string): boolean => {
    if (typeof val != 'string') return false;
    return !isNaN(Number(val.toString()));
};

const erValutakursDatoGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Valutakursdato er påkrevd, men mangler input');
const erValutakursGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> => {
    if (!felt.verdi || isEmpty(felt.verdi))
        return feil(felt, 'Valutakurs er påkrevd, men mangler input');

    const nyKurs = felt.verdi.toString().replace(',', '.');
    if (!nyKurs) return feil(felt, 'Valutakurs er påkrevd, men mangler input');
    if (!isNumeric(nyKurs))
        return feil(felt, `Valutakurs innholder ugyldige verdier, kurs: ${felt.verdi}`);
    return ok(felt);
};

const konverterLagretKursTilSkjemaVisning = (kurs: string | undefined) =>
    kurs ? kurs.toString().replace('.', ',') : undefined;

export const valutakursFeilmeldingId = (valutakurs: IRestValutakurs): string =>
    `valutakurs_${valutakurs.barnIdenter.map(barn => `${barn}-`)}_${valutakurs.fom}`;

interface IProps {
    valutakurs: IRestValutakurs;
    tilgjengeligeBarn: OptionType[];
}

const useValutakursSkjema = ({ tilgjengeligeBarn, valutakurs }: IProps) => {
    const [erValutakursEkspandert, settErValutakursEkspandert] = React.useState<boolean>(false);
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

    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        nullstillSkjema,
        onSubmit,
        settSubmitRessurs,
        settVisfeilmeldinger,
    } = useSkjema<IValutakurs, IBehandling>({
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
                verdi: konverterLagretKursTilSkjemaVisning(valutakurs.kurs),
                valideringsfunksjon: erValutakursGyldig,
            }),
        },
        skjemanavn: valutakursFeilmeldingId(valutakurs),
    });

    const sendInnSkjema = () => {
        if (kanSendeSkjema()) {
            const nyKurs = skjema.felter.kurs?.verdi?.toString().replace(',', '.');
            if (!nyKurs || !isNumeric(nyKurs)) {
                // skal ikke kunne skje. validert annen plass i koden
                alert('Valutakurs er påkrevd, men mangler input');
                return;
            }
            settSubmitRessurs(byggTomRessurs());
            settVisfeilmeldinger(false);
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
                        kurs: nyKurs,
                    },
                    url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillSkjema();
                        settErValutakursEkspandert(false);
                        settÅpenBehandling(response);
                    }
                }
            );
        }
    };

    const slettValutakurs = () => {
        settSubmitRessurs(byggTomRessurs());
        settVisfeilmeldinger(false);
        request<void, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}/${valutakurs.id}`,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                nullstillSkjema();
                settErValutakursEkspandert(false);
                settÅpenBehandling(response);
            } else {
                settSubmitRessurs(response);
                settVisfeilmeldinger(true);
            }
        });
    };

    const erValutakursSkjemaEndret = () => {
        const barnFjernetISkjema = valutakurs.barnIdenter.filter(
            barn => !skjema.felter.barnIdenter.verdi.some(ident => ident.value === barn)
        );
        const erTomEndret =
            !(skjema.felter.periode.verdi.tom === undefined && valutakurs.tom === null) &&
            skjema.felter.periode?.verdi.tom !== valutakurs.tom;
        return (
            barnFjernetISkjema.length > 0 ||
            skjema.felter.periode?.verdi.fom !== valutakurs.fom ||
            erTomEndret ||
            skjema.felter.valutakode?.verdi !== valutakurs.valutakode ||
            skjema.felter.valutakursdato?.verdi !== valutakurs.valutakursdato ||
            skjema.felter.kurs?.verdi !== konverterLagretKursTilSkjemaVisning(valutakurs.kurs)
        );
    };

    return {
        erValutakursEkspandert,
        settErValutakursEkspandert,
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
