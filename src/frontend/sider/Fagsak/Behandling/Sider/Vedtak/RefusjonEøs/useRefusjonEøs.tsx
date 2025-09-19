import { useState } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type {
    IRefusjonEøsSkjemaFelter,
    IRestNyRefusjonEøs,
    IRestRefusjonEøs,
} from '../../../../../../typer/refusjon-eøs';
import { dateTilIsoDatoString, validerGyldigDato } from '../../../../../../utils/dato';
import { erPositivtHeltall } from '../../../../../../utils/validators';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface IProps {
    behandlingId: number;
    refusjonEøs?: IRestRefusjonEøs;
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

const useRefusjonEøs = ({ refusjonEøs, settFeilmelding, behandlingId }: IProps) => {
    const { settÅpenBehandling } = useBehandlingContext();

    const fomFelt = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
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

    const { skjema, kanSendeSkjema, onSubmit, valideringErOk, validerAlleSynligeFelter } = useSkjema<
        IRefusjonEøsSkjemaFelter,
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
            refusjonsbeløp: useFelt<string>({
                verdi: refusjonEøs?.refusjonsbeløp.toString() ?? '',
                valideringsfunksjon: validerFeilutbetaltBeløp,
            }),
            land,
            refusjonAvklart,
        },
        skjemanavn: 'Refusjon EØS',
    });

    const tilbakestillSkjemafelterTilDefault = () => {
        if (refusjonEøs !== undefined) {
            skjema.felter.fom.validerOgSettFelt(new Date(refusjonEøs.fom));
            skjema.felter.tom.validerOgSettFelt(new Date(refusjonEøs.tom));
        }
        skjema.felter.refusjonsbeløp.nullstill();
        skjema.felter.land.nullstill();
        skjema.felter.refusjonAvklart.nullstill();
    };

    const [forrigeRefusjonEøs, settForrigeRefusjonEøs] = useState<IRestRefusjonEøs>();

    if (forrigeRefusjonEøs !== refusjonEøs) {
        settForrigeRefusjonEøs(refusjonEøs);
        tilbakestillSkjemafelterTilDefault();
    }

    const lagreNyPeriode = (lukkNyPeriode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestNyRefusjonEøs>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}`,
                    data: {
                        fom: dateTilIsoDatoString(skjema.felter.fom.verdi),
                        tom: dateTilIsoDatoString(skjema.felter.tom.verdi),
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

    const oppdaterEksisterendePeriode = async (lukkPeriode: () => void) => {
        if (kanSendeSkjema() && refusjonEøs) {
            onSubmit<IRestRefusjonEøs>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/refusjon-eøs/behandlinger/${behandlingId}/perioder/${refusjonEøs.id}`,
                    data: {
                        ...refusjonEøs,
                        id: refusjonEøs.id,
                        fom: dateTilIsoDatoString(skjema.felter.fom.verdi),
                        tom: dateTilIsoDatoString(skjema.felter.tom.verdi),
                        refusjonsbeløp: Number(skjema.felter.refusjonsbeløp.verdi),
                        land: skjema.felter.land.verdi,
                        refusjonAvklart: !!skjema.felter.refusjonAvklart?.verdi,
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
        valideringErOk,
        validerAlleSynligeFelter,
        tilbakestillSkjemafelterTilDefault,
    };
};

export { useRefusjonEøs };
