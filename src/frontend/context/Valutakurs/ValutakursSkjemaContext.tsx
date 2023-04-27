import React, { useEffect } from 'react';

import type { OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus, byggTomRessurs } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type { EøsPeriodeStatus, IRestValutakurs, IValutakurs } from '../../typer/eøsPerioder';
import {
    erBarnGyldig,
    erEøsPeriodeGyldig,
    erValutakodeGyldig,
    isEmpty,
    isNumeric,
    tellAntallDesimaler,
} from '../../utils/eøsValidators';
import type { IYearMonthPeriode } from '../../utils/kalender';
import { erIsoStringGyldig, sammenlignDatoer } from '../../utils/kalender';
import { nyYearMonthPeriode } from '../../utils/kalender';
import { useBehandling } from '../behandlingContext/BehandlingContext';
import {
    konverterDesimalverdiTilSkjemaVisning,
    konverterSkjemaverdiTilDesimal,
} from '../Eøs/EøsContext';

const erValutakursDatoGyldig = (
    felt: FeltState<string | undefined>
): FeltState<string | undefined> => {
    if (isEmpty(felt.verdi)) {
        return feil(felt, 'Valutakursdato er påkrevd, men mangler input');
    } else if (!erIsoStringGyldig(felt.verdi)) {
        return feil(felt, 'Ugyldig format på valutakursdato');
    }
    return ok(felt);
};
const erValutakursGyldig = (
    felt: FeltState<string | undefined>,
    skalValideres: boolean
): FeltState<string | undefined> => {
    if (skalValideres) {
        if (!felt.verdi || isEmpty(felt.verdi) || typeof felt.verdi != 'string') {
            return feil(felt, 'Valutakurs er påkrevd, men mangler input');
        }
        const nyKurs = konverterSkjemaverdiTilDesimal(felt.verdi);
        if (!nyKurs) {
            return feil(felt, 'Valutakurs er påkrevd, men mangler input');
        }
        if (!isNumeric(nyKurs)) {
            return feil(felt, `Valutakurs innholder ugyldige verdier, kurs: ${felt.verdi}`);
        }
        if (tellAntallDesimaler(nyKurs) === 0) {
            return feil(felt, `Valutakurs må oppgis med desimaler, kurs: ${felt.verdi}`);
        }
        const kurs = Number(nyKurs);
        if (kurs < 0) {
            return feil(felt, `Kan ikke registrere negativt kurs: ${felt.verdi}`);
        }
        return ok(felt);
    }
    return ok(felt);
};

export const valutakursFeilmeldingId = (valutakurs: IRestValutakurs): string =>
    `valutakurs_${valutakurs.barnIdenter.map(barn => `${barn}-`)}_${valutakurs.fom}`;

interface IProps {
    valutakurs: IRestValutakurs;
    barnIValutakurs: OptionType[];
}

const useValutakursSkjema = ({ barnIValutakurs, valutakurs }: IProps) => {
    const [erValutakursEkspandert, settErValutakursEkspandert] = React.useState<boolean>(false);
    const [sletterValutakurs, settSletterValutakurs] = React.useState<boolean>(false);
    const { åpenBehandling, settÅpenBehandling } = useBehandling();
    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.behandlingId : null;
    const initelFom = useFelt<string>({ verdi: valutakurs.fom });
    const { request } = useHttp();

    const valutakode = useFelt<string | undefined>({
        verdi: valutakurs.valutakode,
        valideringsfunksjon: erValutakodeGyldig,
    });

    const valutakursdato = useFelt<string | undefined>({
        verdi: valutakurs.valutakursdato,
        valideringsfunksjon: erValutakursDatoGyldig,
    });

    const erManuellInputAvKurs: boolean =
        valutakode?.verdi === 'ISK' &&
        !!valutakursdato?.verdi &&
        sammenlignDatoer(valutakursdato.verdi, new Date(2018, 1, 1, 0, 0, 0)) < 0;

    const kurs = useFelt<string | undefined>({
        avhengigheter: {
            erManuellInputAvKurs,
        },
        verdi: konverterDesimalverdiTilSkjemaVisning(valutakurs.kurs),
        valideringsfunksjon: (felt, avhengigheter): FeltState<string | undefined> => {
            return erValutakursGyldig(felt, avhengigheter?.erManuellInputAvKurs);
        },
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
                verdi: barnIValutakurs,
                valideringsfunksjon: erBarnGyldig,
            }),
            periode: useFelt<IYearMonthPeriode>({
                verdi: nyYearMonthPeriode(valutakurs.fom, valutakurs.tom),
                avhengigheter: { initelFom },
                valideringsfunksjon: erEøsPeriodeGyldig,
            }),
            valutakode,
            valutakursdato,
            kurs,
        },
        skjemanavn: valutakursFeilmeldingId(valutakurs),
    });

    const sendInnSkjema = () => {
        if (kanSendeSkjema()) {
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
                        kurs: konverterSkjemaverdiTilDesimal(skjema.felter.kurs?.verdi),
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
        settSletterValutakurs(true);
        request<void, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandlingId}/${valutakurs.id}`,
        }).then((response: Ressurs<IBehandling>) => {
            settSletterValutakurs(false);
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
            skjema.felter.kurs?.verdi !== konverterDesimalverdiTilSkjemaVisning(valutakurs.kurs)
        );
    };

    useEffect(() => {
        if (valutakursdato.verdi !== valutakurs.valutakursdato) {
            skjema.felter.kurs?.validerOgSettFelt('');
        }
    }, [valutakursdato.verdi]);

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
        sletterValutakurs,
        erManuellInputAvKurs,
    };
};

export { useValutakursSkjema };
