import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useEndreBehandlingstema } from '../../../../hooks/useEndreBehandlingstema';
import { useOnFormSubmitSuccessful } from '../../../../hooks/useOnFormSubmitSuccessful';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { BehandlingKategori, BehandlingUnderkategori } from '../../../../typer/behandlingstema';

interface Props {
    lukkModal: () => void;
}

export enum EndreBehandlingstemaFelt {
    KATEGORI = 'kategori',
    UNDERKATEGORI = 'underkategori',
}

export interface EndreBehandlingstemaFormValues {
    [EndreBehandlingstemaFelt.KATEGORI]: BehandlingKategori | null;
    [EndreBehandlingstemaFelt.UNDERKATEGORI]: BehandlingUnderkategori | null;
}

type TransformedEndreBehandlingstemaFormValues = {
    [EndreBehandlingstemaFelt.KATEGORI]: BehandlingKategori;
    [EndreBehandlingstemaFelt.UNDERKATEGORI]: BehandlingUnderkategori;
};

export const useEndreBehandlingstemaSkjema = ({ lukkModal }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: endreBehandlingstema } = useEndreBehandlingstema();

    const form = useForm<EndreBehandlingstemaFormValues, unknown, TransformedEndreBehandlingstemaFormValues>({
        values: {
            [EndreBehandlingstemaFelt.KATEGORI]: null, // TODO: set to the current kategori?
            [EndreBehandlingstemaFelt.UNDERKATEGORI]: null, // TODO: set to the current underkategori?
        },
    });

    const { control, reset, setError } = form; // TODO: instead of using reset, perhaps use the nullstillSkjema function
    useOnFormSubmitSuccessful(control, () => reset()); // TODO: obv check what this does

    const onSubmit = async (values: TransformedEndreBehandlingstemaFormValues) => {
        const { kategori, underkategori } = values;

        const endreBehandlingstemaParameters = {
            behandlingUnderkategori: underkategori,
            behandlingKategori: kategori,
            behandlingId: behandling.behandlingId,
        };

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
