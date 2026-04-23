import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useHarSaksbehandlerTilgang } from '../../../../hooks/useHarSaksbehandlerTilgang';
import { useLeggTilBarnPåBehandling } from '../../../../hooks/useLeggTilBarnPåBehandling';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { adressebeskyttelsestyper } from '../../../../typer/person';

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
    const { settÅpenBehandling, behandling } = useBehandlingContext();
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

        const harSaksbehandlerTilgangParameters = {
            brukerIdent: barnIdent,
        };

        harSaksbehandlerTilgang(harSaksbehandlerTilgangParameters)
            .then(res => {
                if (res.saksbehandlerHarTilgang) {
                    const leggTilBarnPåBehandlingParameters = {
                        barnIdent: barnIdent,
                        behandlingId: behandling.behandlingId,
                    };

                    leggTilBarnPåBehandling(leggTilBarnPåBehandlingParameters)
                        .then(behandling => {
                            settÅpenBehandling(byggSuksessRessurs(behandling));
                            lukkModal();
                            return;
                        })
                        .catch((e: unknown) => {
                            setError('root', {
                                message:
                                    e instanceof Error
                                        ? e.message
                                        : 'Teknisk feil ved forsøk på å legge til barn på behandling.',
                            });
                        });
                } else {
                    setError('root', {
                        message: `Barnet kan ikke legges til på grunn av diskresjonskode ${
                            adressebeskyttelsestyper[res.adressebeskyttelsegradering] ?? 'ukjent'
                        }`,
                    });
                }
            })
            .catch((e: unknown) => {
                setError('root', {
                    message: e instanceof Error ? e.message : 'Teknisk feil ved sjekk av tilgangen til saksbehandler',
                });
            });
        return;
    };

    return {
        form,
        onSubmit,
    };
};
