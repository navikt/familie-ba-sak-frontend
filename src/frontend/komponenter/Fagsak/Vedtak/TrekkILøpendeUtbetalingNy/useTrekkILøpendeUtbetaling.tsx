// import deepEqual from 'deep-equal';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type {
    IRestTrekkILøpendeUtbetaling,
    IRestTrekkILøpendeUtbetalingIdentifikator,
} from '../../../../typer/eøs-trekk-i-løpende-ytelse';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import { tilFørsteDagIMåneden, tilSisteDagIMåneden } from '../../../../utils/kalender';
import { erIsoStringGyldig } from '../../../../utils/kalender';
import { erSamme } from '../../../../utils/kalender';
import {
    erFør,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
    TIDENES_MORGEN,
} from '../../../../utils/kalender';

interface IProps {
    trekkILøpendeUtbetaling: IRestTrekkILøpendeUtbetaling;
    settErNyPeriode: (erNyPeriode: boolean) => void;
}

const validerTom = (
    felt: FeltState<FamilieIsoDate | undefined>,
    fom: FamilieIsoDate | undefined
) => {
    const tom = felt.verdi;
    const fomKalenderDato = kalenderDatoMedFallback(fom, TIDENES_MORGEN);
    const tomKalenderDato = kalenderDatoMedFallback(tom, TIDENES_ENDE);
    const fomDatoErFørTomDato = erFør(fomKalenderDato, tomKalenderDato);
    const fomDatoErLikTomDato = erSamme(fomKalenderDato, tomKalenderDato);

    // Dato kan være lik fordi vi bryr oss kun om måneden, ikke spesifikk dato
    if (!fomDatoErFørTomDato && !fomDatoErLikTomDato) {
        return feil(felt, 'F.o.m. må være tidligere enn t.o.m');
    }

    return ok(felt);
};

const validerFeilutbetaltBeløp = (felt: FeltState<number>) => {
    if (!felt.verdi || felt.verdi === 0) {
        return feil(felt, 'Beløp er påkrevd');
    }
    return ok(felt);
};

const useTrekkILøpendeUtbetaling = ({ settErNyPeriode, trekkILøpendeUtbetaling }: IProps) => {
    const { settÅpenBehandling } = useBehandling();

    const fomFelt = useFelt<FamilieIsoDate | undefined>({
        verdi: trekkILøpendeUtbetaling.periode.fom
            ? tilFørsteDagIMåneden(trekkILøpendeUtbetaling.periode.fom)
            : undefined,
        valideringsfunksjon: felt =>
            erIsoStringGyldig(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge f.o.m-dato'),
    });

    const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema, valideringErOk } = useSkjema<
        {
            fom: FamilieIsoDate | undefined;
            tom: FamilieIsoDate | undefined;
            feilutbetaltBeløp: number;
        },
        IBehandling
    >({
        felter: {
            fom: fomFelt,
            tom: useFelt<FamilieIsoDate | undefined>({
                verdi: trekkILøpendeUtbetaling.periode.tom
                    ? tilSisteDagIMåneden(trekkILøpendeUtbetaling.periode.tom)
                    : undefined,
                avhengigheter: {
                    fom: fomFelt,
                },
                valideringsfunksjon: (felt, avhengigheter) =>
                    validerTom(felt, avhengigheter?.fom.verdi as FamilieIsoDate | undefined),
            }),
            feilutbetaltBeløp: useFelt<number>({
                verdi: trekkILøpendeUtbetaling.feilutbetaltBeløp,
                valideringsfunksjon: validerFeilutbetaltBeløp,
            }),
        },
        skjemanavn: 'Trekk i løpende utbetaling',
    });

    const hentSkjemaData = () => {
        const { fom, tom, feilutbetaltBeløp } = skjema.felter;
        return {
            fom: fom && fom.verdi,
            tom: tom && tom.verdi,
            feilutbetaltBeløp: feilutbetaltBeløp.verdi,
        };
    };

    const lagreNyPeriode = () => {
        if (kanSendeSkjema()) {
            onSubmit<IRestTrekkILøpendeUtbetaling>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
                    data: {
                        ...trekkILøpendeUtbetaling,
                        identifikator: {
                            id: trekkILøpendeUtbetaling.identifikator.id,
                            behandlingId: trekkILøpendeUtbetaling.identifikator.behandlingId,
                        },
                        periode: {
                            fom: skjema.felter.fom?.verdi,
                            tom: skjema.felter.tom?.verdi,
                        },
                        feilutbetaltBeløp: skjema.felter.feilutbetaltBeløp.verdi,
                    },
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(behandling);
                        settErNyPeriode(false);
                    } else {
                        console.log('Noe feilet');
                    }
                }
            );
        }
    };

    const oppdaterEksisterendePeriode = async () => {
        if (kanSendeSkjema()) {
            onSubmit<IRestTrekkILøpendeUtbetaling>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
                    data: {
                        ...trekkILøpendeUtbetaling,
                        identifikator: {
                            id: trekkILøpendeUtbetaling.identifikator.id,
                            behandlingId: trekkILøpendeUtbetaling.identifikator.behandlingId,
                        },
                        periode: {
                            fom: skjema.felter.fom?.verdi,
                            tom: skjema.felter.tom?.verdi,
                        },
                        feilutbetaltBeløp: skjema.felter.feilutbetaltBeløp.verdi,
                    },
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(behandling);
                        settErNyPeriode(false);
                    } else {
                        console.log('Noe feilet');
                    }
                }
            );
        }
    };

    const fjernPeriode = async () => {
        onSubmit<IRestTrekkILøpendeUtbetalingIdentifikator>(
            {
                method: 'DELETE',
                url: `/familie-ba-sak/api/trekk-i-loepende-utbetaling`,
                data: trekkILøpendeUtbetaling.identifikator,
            },
            (behandling: Ressurs<IBehandling>) => {
                if (behandling.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(behandling);
                    settErNyPeriode(false);
                } else {
                    console.log('Noe feilet');
                }
            }
        );
    };

    // const erSkjemaForandret = () =>
    //     !deepEqual(hentSkjemaData(), {
    //         fom: trekkILøpendeUtbetaling.periode.fom,
    //         tom: trekkILøpendeUtbetaling.periode.tom,
    //         feilutbetaltBeløp: trekkILøpendeUtbetaling.feilutbetaltBeløp,
    //     });

    return {
        skjema,
        hentSkjemaData,
        onSubmit,
        kanSendeSkjema,
        lagreNyPeriode,
        oppdaterEksisterendePeriode,
        fjernPeriode,
        nullstillSkjema,
        valideringErOk,
    };
};

export { useTrekkILøpendeUtbetaling };
