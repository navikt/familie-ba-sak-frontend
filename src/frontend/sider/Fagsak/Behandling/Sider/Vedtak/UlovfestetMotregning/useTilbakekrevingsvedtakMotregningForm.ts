import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
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
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { mutateAsync: oppdaterTilbakekrevingsvedtakMotregning } = useOppdaterTilbakekrevingsvedtakMotregning();

    const tilbakekrevingsvedtakMotregning = behandling.tilbakekrevingsvedtakMotregning;

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
            const oppdatertBehandling = await oppdaterTilbakekrevingsvedtakMotregning({
                behandlingId: behandling.behandlingId,
                tilbakekrevingsvedtakMotregning: { varselDato, årsakTilFeilutbetaling, vurderingAvSkyld },
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkExpansionCard();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
