import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useEndreBehandlingstema } from '../../../../hooks/useEndreBehandlingstema';
import { useOnFormSubmitSuccessful } from '../../../../hooks/useOnFormSubmitSuccessful';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { Behandlingstema } from '../../../../typer/behandlingstema';
import { behandlingstemaer } from '../../../../typer/behandlingstema';

interface Props {
    lukkModal: () => void;
}

export enum EndreBehandlingstemaFelt {
    BEHANDLINGSTEMA = 'behandlingstema',
}

export interface EndreBehandlingstemaFormValues {
    [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: Behandlingstema | null;
}

type TransformedEndreBehandlingstemaFormValues = {
    [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: Behandlingstema;
};

export const useEndreBehandlingstemaSkjema = ({ lukkModal }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: endreBehandlingstema } = useEndreBehandlingstema();

    console.log('in useEndreBehandlingstema - current behandlingstema', behandling.kategori, behandling.underkategori);
    const form = useForm<EndreBehandlingstemaFormValues, unknown, TransformedEndreBehandlingstemaFormValues>({
        values: {
            [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: null, // TODO: set to the current kategori?
        },
    });

    const { control, reset, setError } = form; // TODO: instead of using reset, perhaps use the nullstillSkjema function
    useOnFormSubmitSuccessful(control, () => reset()); // TODO: obv check what this does

    const onSubmit = async (values: TransformedEndreBehandlingstemaFormValues) => {
        const { behandlingstema } = values;
        console.log('in onSubmit - behandlingstema', behandlingstema);

        const endreBehandlingstemaParameters = {
            behandlingUnderkategori: behandlingstemaer[behandlingstema].underkategori,
            behandlingKategori: behandlingstemaer[behandlingstema].kategori,
            behandlingId: behandling.behandlingId,
        };

        console.log('in onsubmit - endreBehandlingstemaParameters', endreBehandlingstemaParameters);

        if (
            // TODO: want to have this check somewhere, just not sure where
            endreBehandlingstemaParameters.behandlingUnderkategori !== null &&
            endreBehandlingstemaParameters.behandlingKategori !== null
        ) {
            return endreBehandlingstema(endreBehandlingstemaParameters)
                .then(behandling => {
                    settÅpenBehandling(byggSuksessRessurs(behandling));
                    lukkModal();
                })
                .catch((e: unknown) =>
                    setError('root', {
                        message: e instanceof Error ? e.message : 'Teknisk feil ved endring av behandlingstema.',
                    })
                );
        }
    };
    /*

    const { skjema } = useSkjema<{ behandlingstema: IBehandlingstema | undefined }, string>({
        felter: {
            behandlingstema: useFelt<IBehandlingstema | undefined>({
                verdi: undefined,
                valideringsfunksjon: (felt: FeltState<IBehandlingstema | undefined>) =>
                    felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
            }),
        },
        skjemanavn: 'Endre behandlingstema',
    });

    useEffect(() => {
        nullstillSkjema();
    }, [behandling]);

    const endreBehandlingstema = (behandlingId: number) => {
        const { behandlingstema } = skjema.felter;
        if (behandlingstema.verdi !== undefined) {
            const { kategori, underkategori } = behandlingstema.verdi;
            settRessurs(byggHenterRessurs());
            request<IRestEndreBehandlingUnderkategori, IBehandling>({
                method: 'PUT',
                data: { behandlingUnderkategori: underkategori, behandlingKategori: kategori },
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
            }).then((oppdatertFagsak: Ressurs<IBehandling>) => {
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(oppdatertFagsak);
                    settRessurs(byggTomRessurs());
                }
                settRessurs(oppdatertFagsak);
            });
        }
        lukkModal();
    };

    const nullstillSkjema = () => {
        skjema.felter.behandlingstema.validerOgSettFelt(
            tilBehandlingstema(behandling.kategori, behandling.underkategori)
        );
    };
     */

    return {
        form,
        onSubmit,
    };
};
