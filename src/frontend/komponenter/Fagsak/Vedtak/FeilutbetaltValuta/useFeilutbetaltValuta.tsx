import { useEffect } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type {
    IFeilutbetaltValutaSkjemaFelter,
    IRestNyFeilutbetaltValutaPeriode,
    IRestFeilutbetaltValuta,
} from '../../../../typer/eøs-feilutbetalt-valuta';
import { ToggleNavn } from '../../../../typer/toggles';
import { formatterDateTilIsoString, validerGyldigDato } from '../../../../utils/dato';
import { erPositivtHeltall } from '../../../../utils/validators';

interface IProps {
    behandlingId: number;
    feilutbetaltValuta?: IRestFeilutbetaltValuta;
    settFeilmelding: (feilmelding: string) => void;
}

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
    const { toggles } = useApp();

    const fomFelt = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
    });

    const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema, valideringErOk } = useSkjema<
        IFeilutbetaltValutaSkjemaFelter,
        IBehandling
    >({
        felter: {
            fom: fomFelt,
            tom: useFelt<Date | undefined>({
                verdi: undefined,
                avhengigheter: {
                    fom: fomFelt,
                },
                valideringsfunksjon: validerGyldigDato,
            }),
            feilutbetaltBeløp: useFelt<string>({
                verdi: feilutbetaltValuta?.feilutbetaltBeløp.toString() ?? '',
                valideringsfunksjon: validerFeilutbetaltBeløp,
            }),
        },
        skjemanavn: 'Feilutbetalt valuta',
    });

    useEffect(() => {
        tilbakestillSkjemafelterTilDefault();
    }, [feilutbetaltValuta]);

    const tilbakestillSkjemafelterTilDefault = () => {
        if (feilutbetaltValuta !== undefined) {
            skjema.felter.fom.validerOgSettFelt(new Date(feilutbetaltValuta.fom));
            skjema.felter.tom.validerOgSettFelt(new Date(feilutbetaltValuta.tom));
        }
        skjema.felter.feilutbetaltBeløp.nullstill();
    };

    const lagreNyPeriode = (lukkNyPeriode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestNyFeilutbetaltValutaPeriode>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
                    data: {
                        fom: formatterDateTilIsoString(skjema.felter.fom?.verdi),
                        tom: formatterDateTilIsoString(skjema.felter.tom?.verdi),
                        feilutbetaltBeløp: Number(skjema.felter.feilutbetaltBeløp.verdi),
                        erPerMåned: toggles[ToggleNavn.feilutbetaltValutaPerMåned],
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
                        fom: formatterDateTilIsoString(skjema.felter.fom.verdi),
                        tom: formatterDateTilIsoString(skjema.felter.tom.verdi),
                        feilutbetaltBeløp: Number(skjema.felter.feilutbetaltBeløp.verdi),
                        erPerMåned: toggles[ToggleNavn.feilutbetaltValutaPerMåned],
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
        tilbakestillSkjemafelterTilDefault,
    };
};

export { useFeilutbetaltValuta };
