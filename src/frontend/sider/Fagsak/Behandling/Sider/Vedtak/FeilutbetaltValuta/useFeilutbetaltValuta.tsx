import { useState } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type {
    IFeilutbetaltValutaSkjemaFelter,
    IRestFeilutbetaltValuta,
    IRestNyFeilutbetaltValutaPeriode,
} from '../../../../../../typer/eøs-feilutbetalt-valuta';
import { dateTilIsoDatoString, validerGyldigDato } from '../../../../../../utils/dato';
import { erPositivtHeltall } from '../../../../../../utils/validators';
import { useBehandlingContext } from '../../../context/BehandlingContext';

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
    const { settÅpenBehandling } = useBehandlingContext();

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

    const tilbakestillSkjemafelterTilDefault = () => {
        if (feilutbetaltValuta !== undefined) {
            skjema.felter.fom.validerOgSettFelt(new Date(feilutbetaltValuta.fom));
            skjema.felter.tom.validerOgSettFelt(new Date(feilutbetaltValuta.tom));
        }
        skjema.felter.feilutbetaltBeløp.nullstill();
    };

    const [forrigeFeilutbetaltValuta, settForrigeFeilutbetaltValuta] =
        useState<IRestFeilutbetaltValuta>();

    if (forrigeFeilutbetaltValuta !== feilutbetaltValuta) {
        settForrigeFeilutbetaltValuta(feilutbetaltValuta);
        tilbakestillSkjemafelterTilDefault();
    }

    const lagreNyPeriode = (lukkNyPeriode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestNyFeilutbetaltValutaPeriode>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}`,
                    data: {
                        fom: dateTilIsoDatoString(skjema.felter.fom?.verdi),
                        tom: dateTilIsoDatoString(skjema.felter.tom?.verdi),
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

    const oppdaterEksisterendePeriode = async (lukkPeriode: () => void) => {
        if (kanSendeSkjema() && feilutbetaltValuta) {
            onSubmit<IRestFeilutbetaltValuta>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/feilutbetalt-valuta/behandling/${behandlingId}/periode/${feilutbetaltValuta.id}`,
                    data: {
                        ...feilutbetaltValuta,
                        id: feilutbetaltValuta.id,
                        fom: dateTilIsoDatoString(skjema.felter.fom.verdi),
                        tom: dateTilIsoDatoString(skjema.felter.tom.verdi),
                        feilutbetaltBeløp: Number(skjema.felter.feilutbetaltBeløp.verdi),
                    },
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(behandling);
                        lukkPeriode();
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
