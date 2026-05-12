import { useBehandling } from '@hooks/useBehandling';
import { useHarSaksbehandlerTilgang } from '@hooks/useHarSaksbehandlerTilgang';
import { useLeggTilBarnPåBehandling } from '@hooks/useLeggTilBarnPåBehandling';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { adressebeskyttelsestyper } from '@typer/person';
import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

export enum LeggTilBarnPåBehandlingFelt {
    BARNIDENT = 'barnIdent',
}

export interface LeggTilBarnPåBehandlingFormValues {
    [LeggTilBarnPåBehandlingFelt.BARNIDENT]: string;
}

interface Props {
    lukkModal: () => void;
}

export const useLeggTilBarnPåBehandlingSkjema = ({ lukkModal }: Props) => {
    const behandling = useBehandling();
    const { settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: harSaksbehandlerTilgang } = useHarSaksbehandlerTilgang();
    const { mutateAsync: leggTilBarnPåBehandling } = useLeggTilBarnPåBehandling();

    const form = useForm<LeggTilBarnPåBehandlingFormValues>({
        defaultValues: {
            [LeggTilBarnPåBehandlingFelt.BARNIDENT]: '',
        },
    });

    const { setError } = form;

    const onSubmit = async (values: LeggTilBarnPåBehandlingFormValues) => {
        const { barnIdent } = values;

        try {
            const tilgangRes = await harSaksbehandlerTilgang({
                brukerIdent: barnIdent,
            });

            if (!tilgangRes.saksbehandlerHarTilgang) {
                setError('root', {
                    message: `Barnet kan ikke legges til på grunn av diskresjonskode ${
                        adressebeskyttelsestyper[tilgangRes.adressebeskyttelsegradering] ?? 'ukjent'
                    }`,
                });
                return;
            }

            const behandlingResult = await leggTilBarnPåBehandling({
                barnIdent,
                behandlingId: behandling.behandlingId,
            });

            settÅpenBehandling(byggSuksessRessurs(behandlingResult));
            lukkModal();
        } catch (e: unknown) {
            setError('root', {
                message: e instanceof Error ? e.message : 'Teknisk feil ved forsøk på å legge til barn på behandling.',
            });
        }
    };

    return {
        form,
        onSubmit,
    };
};
