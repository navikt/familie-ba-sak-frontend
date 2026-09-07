import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterAnnenVurdering } from '@hooks/useOppdaterAnnenVurdering';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import type { IRestAnnenVurdering } from '@typer/vilkår';
import { Resultat } from '@typer/vilkår';
import { useForm } from 'react-hook-form';

export enum AnnenVurderingFelt {
    RESULTAT = 'resultat',
    BEGRUNNELSE = 'begrunnelse',
}

export interface AnnenVurderingFormValues {
    [AnnenVurderingFelt.RESULTAT]: Resultat;
    [AnnenVurderingFelt.BEGRUNNELSE]: string;
}

interface Props {
    annenVurdering: IRestAnnenVurdering;
    visFeilmeldinger: boolean;
    lukkSkjema: () => void;
}

export function useAnnenVurderingSkjema({ annenVurdering, visFeilmeldinger, lukkSkjema }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: oppdaterAnnenVurdering } = useOppdaterAnnenVurdering();

    const form = useForm<AnnenVurderingFormValues>({
        values: {
            [AnnenVurderingFelt.RESULTAT]: annenVurdering.resultat,
            [AnnenVurderingFelt.BEGRUNNELSE]: annenVurdering.begrunnelse,
        },
        mode: visFeilmeldinger ? 'onChange' : 'onSubmit',
    });

    const {
        control,
        setError,
        reset,
        formState: { isDirty },
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    const onSubmit = async (values: AnnenVurderingFormValues) => {
        try {
            const oppdatertBehandling = await oppdaterAnnenVurdering({
                behandlingId: behandling.behandlingId,
                annenVurdering: {
                    ...annenVurdering,
                    erVurdert: annenVurdering.resultat !== Resultat.IKKE_VURDERT,
                    resultat: values.resultat,
                    begrunnelse: values.begrunnelse,
                },
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkSkjema();
        } catch (error) {
            setError('root', { message: error instanceof Error ? error.message : 'En ukjent feil oppstod.' });
        }
    };

    return { form, onSubmit };
}
