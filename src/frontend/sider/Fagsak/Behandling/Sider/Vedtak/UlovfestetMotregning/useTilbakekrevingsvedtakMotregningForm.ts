import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { useTilbakekrevingsvedtakMotregningContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/UlovfestetMotregning/TilbakekrevingsvedtakMotregningContext';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING =
    'Årsaken til feilutbetalingen er [SETT INN HVA SOM SKJEDDE, SKILL MELLOM BRUKERS HANDLINGER KONTRA BRUKERS FORSTÅELSE AV UTBETALINGEN].';
const PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD =
    'Vi vurderer at [VURDER SKYLD, SETT INN KONKRET BEGRUNNELSE, OG SKILL MELLOM MOTTAKERS HANDLINGER KONTRA MOTTAKERS FORSTÅELSE.].';

export type TilbakekrevingsvedtakMotregningSkjemaverdier = {
    årsakTilFeilutbetaling: string;
    vurderingAvSkyld: string;
    varselDato: string;
};

interface Props {
    lukkExpansionCard: () => void;
}

export function useTilbakekrevingsvedtakMotregningForm({ lukkExpansionCard }: Props) {
    const behandlingId = useBehandlingId();
    const queryClient = useQueryClient();

    const { mutateAsync: oppdaterTilbakekrevingsvedtakMotregning } = useOppdaterTilbakekrevingsvedtakMotregning({
        onSuccess: lagretTilbakekrevingsvedtakMotregning => {
            queryClient.setQueryData(
                queryKeys.tilbakekrevingsvedtakMotregning(behandlingId),
                lagretTilbakekrevingsvedtakMotregning
            );
        },
    });

    const { tilbakekrevingsvedtakMotregning } = useTilbakekrevingsvedtakMotregningContext();

    const form = useForm<TilbakekrevingsvedtakMotregningSkjemaverdier>({
        defaultValues: {
            årsakTilFeilutbetaling:
                tilbakekrevingsvedtakMotregning?.årsakTilFeilutbetaling ??
                PREUTFYLT_DEFAULT_TEKST_ÅRSAK_TIL_FEILUTBETALING,
            vurderingAvSkyld:
                tilbakekrevingsvedtakMotregning?.vurderingAvSkyld ?? PREUTFYLT_DEFAULT_TEKST_VURDERING_AV_SKYLD,
            varselDato: tilbakekrevingsvedtakMotregning?.varselDato,
        },
    });

    const { setError } = form;

    async function onSubmit({
        varselDato,
        årsakTilFeilutbetaling,
        vurderingAvSkyld,
    }: TilbakekrevingsvedtakMotregningSkjemaverdier): Promise<void> {
        try {
            await oppdaterTilbakekrevingsvedtakMotregning({
                behandlingId,
                tilbakekrevingsvedtakMotregning: { varselDato, årsakTilFeilutbetaling, vurderingAvSkyld },
            });
            lukkExpansionCard();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
