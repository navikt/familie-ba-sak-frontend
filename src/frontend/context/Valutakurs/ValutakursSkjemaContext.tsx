import React, { useState } from 'react';

import { isBefore } from 'date-fns';

import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type { OptionType } from '../../typer/common';
import type { EøsPeriodeStatus, IRestValutakurs, IValutakurs } from '../../typer/eøsPerioder';
import type { IIsoMånedPeriode } from '../../utils/dato';
import {
    dateTilIsoDatoString,
    dateTilIsoDatoStringEllerUndefined,
    nyIsoMånedPeriode,
    validerGyldigDato,
} from '../../utils/dato';
import {
    erBarnGyldig,
    erEøsPeriodeGyldig,
    erValutakodeGyldig,
    isEmpty,
    isNumeric,
    tellAntallDesimaler,
} from '../../utils/eøsValidators';
import { useBehandling } from '../behandlingContext/BehandlingContext';
import {
    konverterDesimalverdiTilSkjemaVisning,
    konverterSkjemaverdiTilDesimal,
} from '../Eøs/EøsContext';

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
    const { behandling, settÅpenBehandling } = useBehandling();
    const initelFom = useFelt<string>({ verdi: valutakurs.fom });
    const { request } = useHttp();

    const valutakode = useFelt<string | undefined>({
        verdi: valutakurs.valutakode,
        valideringsfunksjon: erValutakodeGyldig,
    });

    const valutakursdato = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
    });

    const erManuellInputAvKurs: boolean =
        valutakode?.verdi === 'ISK' &&
        !!valutakursdato?.verdi &&
        isBefore(new Date(valutakursdato.verdi), new Date(2018, 1, 1, 0, 0, 0));

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
            periode: useFelt<IIsoMånedPeriode>({
                verdi: nyIsoMånedPeriode(valutakurs.fom, valutakurs.tom),
                avhengigheter: { initelFom },
                valideringsfunksjon: erEøsPeriodeGyldig,
            }),
            valutakode,
            valutakursdato,
            kurs,
        },
        skjemanavn: valutakursFeilmeldingId(valutakurs),
    });

    const [tidligereValutakurs, settTidligereValutakurs] = useState<IRestValutakurs>();

    const settDatofelterTilDefault = () => {
        if (valutakurs.valutakursdato) {
            skjema.felter.valutakursdato.validerOgSettFelt(new Date(valutakurs.valutakursdato));
        } else {
            skjema.felter.valutakursdato.nullstill();
        }
    };

    const tilbakestillFelterTilDefault = () => {
        skjema.felter.periodeId.nullstill();
        skjema.felter.id.nullstill();
        skjema.felter.status.nullstill();
        skjema.felter.initielFom.nullstill();
        skjema.felter.barnIdenter.nullstill();
        skjema.felter.periode.nullstill();
        skjema.felter.valutakode.nullstill();
        skjema.felter.kurs.nullstill();
        settDatofelterTilDefault();
    };

    if (valutakurs !== tidligereValutakurs) {
        settTidligereValutakurs(valutakurs);
        tilbakestillFelterTilDefault();
    }

    if (dateTilIsoDatoString(skjema.felter.valutakursdato.verdi) !== valutakurs.valutakursdato) {
        skjema.felter.kurs?.validerOgSettFelt('');
    }

    if (valutakurs.valutakode !== skjema.felter.valutakode.verdi) {
        skjema.felter.kurs?.validerOgSettFelt('');
        skjema.felter.valutakursdato?.nullstill();
        skjema.felter.valutakode?.validerOgSettFelt(valutakurs.valutakode);
    }

    const sendInnSkjema = () => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggTomRessurs());
            settVisfeilmeldinger(false);
            onSubmit<Omit<IRestValutakurs, 'status'>>(
                {
                    method: 'PUT',
                    data: {
                        id: valutakurs.id,
                        fom: skjema.felter.periode.verdi.fom ?? '',
                        tom: skjema.felter.periode.verdi.tom,
                        barnIdenter: skjema.felter.barnIdenter.verdi.map(barn => barn.value),
                        valutakode: skjema.felter.valutakode?.verdi,
                        valutakursdato: dateTilIsoDatoStringEllerUndefined(
                            skjema.felter.valutakursdato?.verdi
                        ),
                        kurs: konverterSkjemaverdiTilDesimal(skjema.felter.kurs?.verdi),
                    },
                    url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandling.behandlingId}`,
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
            url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandling.behandlingId}/${valutakurs.id}`,
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

    const erValutakursdatoerLike = () =>
        (!valutakursdato.verdi && !valutakurs.valutakursdato) ||
        dateTilIsoDatoStringEllerUndefined(valutakursdato?.verdi) === valutakurs.valutakursdato;

    const erValutakurserLike = () =>
        (!kurs.verdi && !valutakurs.kurs) ||
        kurs.verdi === konverterDesimalverdiTilSkjemaVisning(valutakurs.kurs);

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
            !erValutakursdatoerLike() ||
            !erValutakurserLike()
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
        tilbakestillFelterTilDefault,
        slettValutakurs,
        sletterValutakurs,
        erManuellInputAvKurs,
    };
};

export { useValutakursSkjema };
