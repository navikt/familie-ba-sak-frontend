import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type {
    IRefusjonEøsSkjemaFelter,
    IRestNyRefusjonEøs,
    IRestRefusjonEøs,
} from '../../../../typer/refusjon-eøs';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import {
    erIsoStringGyldig,
    kalenderDato,
    sisteDagIInneværendeMåned,
} from '../../../../utils/kalender';
import {
    erFør,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from '../../../../utils/kalender';
import { erPositivtHeltall } from '../../../../utils/validators';

interface IProps {
    behandlingId: number;
    refusjonEøs?: IRestRefusjonEøs;
    settFeilmelding: (feilmelding: string) => void;
}

const datoErFremITid = (dato: FamilieIsoDate): boolean => {
    const nå = sisteDagIInneværendeMåned();

    return erFør(nå, kalenderDato(dato));
};

const validerFom = (felt: FeltState<FamilieIsoDate>) => {
    const fom = felt.verdi;

    if (fom === '') return feil(felt, 'Du må velge en f.o.m-dato');
    if (!erIsoStringGyldig(fom)) {
        return feil(felt, 'Du må velge en gyldig f.o.m-dato');
    }
    if (datoErFremITid(fom)) {
        return feil(felt, 'F.o.m kan ikke være senere enn inneværende måned');
    }
    return ok(felt);
};

const validerTom = (felt: FeltState<FamilieIsoDate>, fom: FamilieIsoDate) => {
    const tom = felt.verdi;

    if (tom === '') return feil(felt, 'Du må velge en t.o.m-dato');
    if (!erIsoStringGyldig(tom)) {
        return feil(felt, 'Du må velge en gyldig t.o.m-dato');
    }
    if (datoErFremITid(tom)) {
        return feil(felt, 'T.o.m. kan ikke være senere enn inneværende måned');
    }

    if (erIsoStringGyldig(fom)) {
        const fomKalenderDato = kalenderDatoMedFallback(fom, TIDENES_MORGEN);
        const tomKalenderDato = kalenderDatoMedFallback(tom, TIDENES_ENDE);
        const fomDatoErFørTomDato = erFør(fomKalenderDato, tomKalenderDato);

        if (!fomDatoErFørTomDato) {
            return feil(felt, 'T.o.m. må være senere enn f.o.m');
        }
    }

    return ok(felt);
};

const validerFeilutbetaltBeløp = (felt: FeltState<string>) => {
    if (felt.verdi === '') {
        return feil(felt, 'Beløp er påkrevd');
    } else if (!erPositivtHeltall(felt.verdi)) {
        return feil(felt, 'Feil format. Skriv inn et gyldig siffer.');
    }
    return ok(felt);
};

const useRefusjonEøs = ({ refusjonEøs, settFeilmelding, behandlingId }: IProps) => {
    const { settÅpenBehandling } = useBehandling();

    const fomFelt = useFelt<FamilieIsoDate>({
        verdi: refusjonEøs?.fom ?? '',
        valideringsfunksjon: validerFom,
    });

    const land = useFelt<string>({
        verdi: refusjonEøs?.land ?? '',
        valideringsfunksjon: felt => (felt.verdi ? ok(felt) : feil(felt, 'Du må velge et land')),
    });

    const refusjonAvklart = useFelt<boolean | undefined>({
        verdi: refusjonEøs?.refusjonAvklart ?? undefined,
        valideringsfunksjon: felt =>
            felt.verdi !== undefined ? ok(felt) : feil(felt, 'Du må oppgi om refusjon er avklart'),
    });

    const {
        skjema,
        kanSendeSkjema,
        onSubmit,
        nullstillSkjema,
        valideringErOk,
        validerAlleSynligeFelter,
    } = useSkjema<IRefusjonEøsSkjemaFelter, IBehandling>({
        felter: {
            fom: fomFelt,
            tom: useFelt<FamilieIsoDate>({
                verdi: refusjonEøs?.tom ?? '',
                avhengigheter: {
                    fom: fomFelt,
                },
                valideringsfunksjon: (felt, avhengigheter) =>
                    validerTom(felt, avhengigheter?.fom.verdi as FamilieIsoDate),
            }),
            refusjonsbeløp: useFelt<string>({
                verdi: refusjonEøs?.refusjonsbeløp.toString() ?? '',
                valideringsfunksjon: validerFeilutbetaltBeløp,
            }),
            land,
            refusjonAvklart,
        },
        skjemanavn: 'Refusjon EØS',
    });

    const lagreNyPeriode = (lukkNyPeriode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestNyRefusjonEøs>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}`,
                    data: {
                        fom: skjema.felter.fom.verdi,
                        tom: skjema.felter.tom.verdi,
                        refusjonsbeløp: Number(skjema.felter.refusjonsbeløp.verdi),
                        land: skjema.felter.land.verdi,
                        refusjonAvklart: !!skjema.felter.refusjonAvklart?.verdi,
                    },
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(behandling);
                        lukkNyPeriode();
                    } else {
                        settFeilmelding('Klarte ikke å lagre ny periode');
                    }
                }
            );
        }
    };

    const oppdaterEksisterendePeriode = async () => {
        if (kanSendeSkjema() && refusjonEøs) {
            onSubmit<IRestRefusjonEøs>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøs.id}`,
                    data: {
                        ...refusjonEøs,
                        id: refusjonEøs.id,
                        fom: skjema.felter.fom.verdi,
                        tom: skjema.felter.tom.verdi,
                        refusjonsbeløp: Number(skjema.felter.refusjonsbeløp.verdi),
                        land: skjema.felter.land.verdi,
                        refusjonAvklart: !!skjema.felter.refusjonAvklart?.verdi,
                    },
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(behandling);
                    } else {
                        settFeilmelding('Klarte ikke å lagre endringer');
                    }
                }
            );
        }
    };

    const fjernPeriode = async () => {
        if (refusjonEøs) {
            onSubmit(
                {
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøs.id}`,
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(behandling);
                    } else {
                        settFeilmelding('Klarte ikke å slette periode');
                    }
                }
            );
        }
    };

    return {
        skjema,
        lagreNyPeriode,
        oppdaterEksisterendePeriode,
        fjernPeriode,
        nullstillSkjema,
        valideringErOk,
        validerAlleSynligeFelter,
    };
};

export { useRefusjonEøs };
