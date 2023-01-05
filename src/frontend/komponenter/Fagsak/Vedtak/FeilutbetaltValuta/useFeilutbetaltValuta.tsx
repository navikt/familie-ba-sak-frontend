import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type {
    IFeilutbetaltValutaSkjemaFelter,
    IRestNyFeilutbetaltValutaPeriode,
    IRestFeilutbetaltValuta,
} from '../../../../typer/eøs-feilutbetalt-valuta';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import { erIsoStringGyldig } from '../../../../utils/kalender';
import {
    erFør,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from '../../../../utils/kalender';
import { erPositivtHeltall } from '../../../../utils/validators';

interface IProps {
    behandlingId: number;
    feilutbetaltValuta?: IRestFeilutbetaltValuta;
    settFeilmelding: (feilmelding: string) => void;
}

const validerTom = (felt: FeltState<FamilieIsoDate>, fom: FamilieIsoDate) => {
    const tom = felt.verdi;

    if (!erIsoStringGyldig(tom)) {
        return feil(felt, 'Du må velge t.o.m-dato');
    }
    const fomKalenderDato = kalenderDatoMedFallback(fom, TIDENES_MORGEN);
    const tomKalenderDato = kalenderDatoMedFallback(tom, TIDENES_ENDE);
    const fomDatoErFørTomDato = erFør(fomKalenderDato, tomKalenderDato);

    if (!fomDatoErFørTomDato) {
        return feil(felt, 'T.o.m. må være senere enn f.o.m');
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

const useFeilutbetaltValuta = ({ feilutbetaltValuta, settFeilmelding, behandlingId }: IProps) => {
    const { settÅpenBehandling } = useBehandling();

    const fomFelt = useFelt<FamilieIsoDate>({
        verdi: feilutbetaltValuta?.fom ?? '',
        valideringsfunksjon: felt =>
            erIsoStringGyldig(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge f.o.m-dato'),
    });

    const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema, valideringErOk } = useSkjema<
        IFeilutbetaltValutaSkjemaFelter,
        IBehandling
    >({
        felter: {
            fom: fomFelt,
            tom: useFelt<FamilieIsoDate>({
                verdi: feilutbetaltValuta?.tom ?? '',
                avhengigheter: {
                    fom: fomFelt,
                },
                valideringsfunksjon: (felt, avhengigheter) =>
                    validerTom(felt, avhengigheter?.fom.verdi as FamilieIsoDate),
            }),
            feilutbetaltBeløp: useFelt<string>({
                verdi: feilutbetaltValuta?.feilutbetaltBeløp.toString() ?? '',
                valideringsfunksjon: validerFeilutbetaltBeløp,
            }),
        },
        skjemanavn: 'Feilutbetalt valuta',
    });

    const lagreNyPeriode = (lukkNyPeriode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestNyFeilutbetaltValutaPeriode>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
                    data: {
                        fom: skjema.felter.fom?.verdi,
                        tom: skjema.felter.tom?.verdi,
                        feilutbetaltBeløp: Number(skjema.felter.feilutbetaltBeløp.verdi),
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
        if (kanSendeSkjema() && feilutbetaltValuta) {
            onSubmit<IRestFeilutbetaltValuta>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValuta.id}`,
                    data: {
                        ...feilutbetaltValuta,
                        id: feilutbetaltValuta.id,
                        fom: skjema.felter.fom.verdi,
                        tom: skjema.felter.tom.verdi,
                        feilutbetaltBeløp: Number(skjema.felter.feilutbetaltBeløp.verdi),
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
        if (feilutbetaltValuta) {
            onSubmit(
                {
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValuta.id}`,
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
    };
};

export { useFeilutbetaltValuta };
