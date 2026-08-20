import { useFagsakId } from '@hooks/useFagsakId';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterTilbakekreving } from '@hooks/useOppdaterTilbakekreving';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useSimuleringContext } from '@sider/Fagsak/Behandling/Sider/Simulering/SimuleringContext';
import type { Tilbakekrevingsvalg } from '@typer/simulering';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { utledTilbakekreving } from './utledTilbakekreving';

export const MAKS_LENGDE_TEKST = 1500;

export enum TilbakekrevingFormField {
    TILBAKEKREVINGSVALG = 'tilbakekrevingsvalg',
    FRITEKST_VARSEL = 'fritekstVarsel',
    BEGRUNNELSE = 'begrunnelse',
}

export interface TilbakekrevingFormValues {
    [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: Tilbakekrevingsvalg | '';
    [TilbakekrevingFormField.FRITEKST_VARSEL]: string;
    [TilbakekrevingFormField.BEGRUNNELSE]: string;
}

export function useTilbakekrevingForm() {
    const navigate = useNavigate();
    const fagsakId = useFagsakId();

    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { erFeilutbetaling } = useSimuleringContext();

    const { mutateAsync: oppdaterTilbakekreving } = useOppdaterTilbakekreving();

    const tilbakekreving = behandling.tilbakekreving;

    const form = useForm<TilbakekrevingFormValues>({
        values: {
            [TilbakekrevingFormField.TILBAKEKREVINGSVALG]: tilbakekreving?.valg ?? '',
            [TilbakekrevingFormField.FRITEKST_VARSEL]: tilbakekreving?.varsel ?? '',
            [TilbakekrevingFormField.BEGRUNNELSE]: tilbakekreving?.begrunnelse ?? '',
        },
        resetOptions: {
            keepErrors: true,
            keepDirtyValues: true,
            keepIsSubmitted: true,
            keepTouched: true,
            keepSubmitCount: true,
        },
    });

    const { control, setError, reset } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    async function onSubmit(values: TilbakekrevingFormValues): Promise<void> {
        try {
            const oppdatertBehandling = await oppdaterTilbakekreving({
                behandlingId: behandling.behandlingId,
                tilbakekreving: utledTilbakekreving(values, behandling.vedtak, erFeilutbetaling),
            });

            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));

            navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/vedtak`);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
