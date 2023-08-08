import { useEffect } from 'react';

import type { ISODateString } from '@navikt/familie-datovelger';
import { feil, useFelt, useSkjema, ok } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../typer/behandling';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import { erFør, erIsoStringGyldig, kalenderDato } from '../../../../utils/kalender';
import { iDag, KalenderEnhet, leggTil, serializeIso8601String } from '../../../../utils/kalender';

const STANDARD_ANTALL_DAGER_FRIST = 3 * 7;

export const useOppdaterEndringstidspunktSkjema = (
    endringstidspunkt: ISODateString | undefined,
    modalVises: boolean
) => {
    const standardfrist = serializeIso8601String(
        leggTil(iDag(), STANDARD_ANTALL_DAGER_FRIST, KalenderEnhet.DAG)
    );

    const oppdaterEndringstidspunktSkjema = useSkjema<
        {
            endringstidspunkt: FamilieIsoDate | undefined;
        },
        IBehandling
    >({
        felter: {
            endringstidspunkt: useFelt<FamilieIsoDate | undefined>({
                verdi: endringstidspunkt ?? standardfrist,
                valideringsfunksjon: validerEndringstidspunkt,
            }),
        },
        skjemanavn: 'Oppdater første endringstidspunkt',
    });

    const fyllInnStandardverdier = () => {
        oppdaterEndringstidspunktSkjema.nullstillSkjema();
        oppdaterEndringstidspunktSkjema.skjema.felter.endringstidspunkt.validerOgSettFelt(
            standardfrist
        );
    };

    useEffect(() => {
        if (modalVises && endringstidspunkt) {
            oppdaterEndringstidspunktSkjema.skjema.felter.endringstidspunkt.validerOgSettFelt(
                endringstidspunkt
            );
        } else {
            fyllInnStandardverdier();
        }
    }, [modalVises]);

    return oppdaterEndringstidspunktSkjema;
};

const validerEndringstidspunkt = (
    felt: FeltState<FamilieIsoDate | undefined>
): FeltState<FamilieIsoDate | undefined> => {
    if (felt.verdi && erIsoStringGyldig(felt.verdi)) {
        return felt.verdi && erFør(kalenderDato(felt.verdi), iDag())
            ? ok(felt)
            : feil(felt, 'Endringstidspunkt kan ikke settes frem i tid.');
    } else {
        return feil(felt, 'Endringstidspunkt er ikke i gyldig dato-format.');
    }
};
