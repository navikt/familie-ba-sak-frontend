import { useSettPåVent } from '@hooks/useSettPåVent';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import type { SettPåVentÅrsak } from '@typer/behandling';
import { dagensDato, dateTilIsoDatoString, type IsoDatoString } from '@utils/dato';
import { addDays } from 'date-fns';
import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

const STANDARD_ANTALL_DAGER_FRIST = 3 * 7;

export const SETT_PÅ_VENT_FORM_ID = 'sett_på_vent_form_id';

export enum SettPåVentFelt {
    FRIST = 'frist',
    ÅRSAK = 'årsak',
}

export interface SettPåVentFormValues {
    [SettPåVentFelt.FRIST]: IsoDatoString | null;
    [SettPåVentFelt.ÅRSAK]: SettPåVentÅrsak | '';
}

type TransformedSettPåVentFormValues = {
    [SettPåVentFelt.FRIST]: IsoDatoString;
    [SettPåVentFelt.ÅRSAK]: SettPåVentÅrsak;
};

interface Props {
    lukkModal: () => void;
}

export function useSettPåVentSkjema({ lukkModal }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const aktivSettPåVent = behandling.aktivSettPåVent;
    const erBehandlingAlleredePåVent = !!aktivSettPåVent;

    const standardfrist = dateTilIsoDatoString(addDays(dagensDato, STANDARD_ANTALL_DAGER_FRIST));

    const { mutateAsync: settPåVent } = useSettPåVent();

    const form = useForm<SettPåVentFormValues, unknown, TransformedSettPåVentFormValues>({
        values: {
            [SettPåVentFelt.FRIST]: aktivSettPåVent?.frist ?? standardfrist,
            [SettPåVentFelt.ÅRSAK]: aktivSettPåVent?.årsak ?? '',
        },
    });

    const { setError } = form;

    async function onSubmit(values: TransformedSettPåVentFormValues) {
        try {
            const oppdatertBehandling = await settPåVent({
                frist: values.frist,
                årsak: values.årsak,
                behandlingId: behandling.behandlingId,
                erBehandlingAlleredePåVent,
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkModal();
        } catch (error) {
            const message = error instanceof Error ? error.message : '';
            setError('root', { message: message || 'Teknisk feil ved lagring av sett på vent.' });
        }
    }

    return { form, onSubmit, erBehandlingAlleredePåVent };
}
