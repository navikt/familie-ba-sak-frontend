import { useEffect } from 'react';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { IBehandling, ISettPåVent, SettPåVentÅrsak } from '../../../../../typer/behandling';
import { FamilieIsoDate } from '../../../../../utils/kalender';
import { validerLeggPåVentFrist } from './leggPåVentUtils';

export const useSettPåVentSkjema = (settPåVent: ISettPåVent | undefined) => {
    const settPåVentSkjema = useSkjema<
        {
            frist: FamilieIsoDate | undefined;
            årsak: SettPåVentÅrsak | undefined;
        },
        IBehandling
    >({
        felter: {
            frist: useFelt<FamilieIsoDate | undefined>({
                verdi: settPåVent?.frist ?? '',
                valideringsfunksjon: validerLeggPåVentFrist,
            }),
            årsak: useFelt<SettPåVentÅrsak | undefined>({
                verdi: settPåVent?.årsak ?? undefined,
                valideringsfunksjon: felt =>
                    felt.verdi === undefined ? feil(felt, 'Du må velge en årsak') : ok(felt),
            }),
        },
        skjemanavn: 'Sett behandling på vent',
    });

    useEffect(() => {
        settPåVentSkjema.skjema.felter.frist.validerOgSettFelt(settPåVent?.frist);
        settPåVentSkjema.skjema.felter.årsak.validerOgSettFelt(settPåVent?.årsak);
    }, [settPåVent]);

    return settPåVentSkjema;
};
