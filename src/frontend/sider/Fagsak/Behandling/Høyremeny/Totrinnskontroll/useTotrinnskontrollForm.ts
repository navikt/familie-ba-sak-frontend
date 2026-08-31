import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { HentVedtaksperioderQueryKeyFactory } from '@hooks/useHentVedtaksperioder';
import { useIverksettVedtak } from '@hooks/useIverksettVedtak';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { Tab, useTabContext } from '@sider/Fagsak/Behandling/Høyremeny/TabContextProvider';
import { useTotrinnskontrollModalContext } from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { useKontrollsiderContext } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { KontrollertStatus } from '@sider/Fagsak/Behandling/Sider/sider';
import { useQueryClient } from '@tanstack/react-query';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';
import { useForm } from 'react-hook-form';

export enum TotrinnskontrollFormField {
    BESLUTNING = 'beslutning',
    BEGRUNNELSE = 'begrunnelse',
}

export interface TotrinnskontrollFormValues {
    [TotrinnskontrollFormField.BESLUTNING]: TotrinnskontrollBeslutning;
    [TotrinnskontrollFormField.BEGRUNNELSE]: string;
}

export function useTotrinnskontrollForm() {
    const saksbehandler = useSaksbehandler();
    const queryClient = useQueryClient();

    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { settTab } = useTabContext();
    const { åpneModal } = useTotrinnskontrollModalContext();
    const { kontrollsider, settIkkeKontrollerteSiderTilManglerKontroll } = useKontrollsiderContext();

    const { mutateAsync: iverksettVedtak } = useIverksettVedtak();

    const form = useForm<TotrinnskontrollFormValues>({
        defaultValues: {
            [TotrinnskontrollFormField.BESLUTNING]: TotrinnskontrollBeslutning.IKKE_VURDERT,
            [TotrinnskontrollFormField.BEGRUNNELSE]: '',
        },
    });

    const {
        control,
        formState: { isDirty },
        setError,
        reset,
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    async function onSubmit(values: TotrinnskontrollFormValues): Promise<void> {
        try {
            const egetVedtak = behandling.totrinnskontroll?.saksbehandlerId === saksbehandler.navIdent;

            const harSideSomIkkeErKontrollert = kontrollsider.some(
                side => side.kontrollertStatus !== KontrollertStatus.KONTROLLERT
            );

            if (!egetVedtak && harSideSomIkkeErKontrollert) {
                settIkkeKontrollerteSiderTilManglerKontroll();
                setError('root', { message: 'Du må kontrollere alle steg i løsningen.' });
                return;
            }

            const { beslutning, begrunnelse } = values;

            const oppdatertBehandling = await iverksettVedtak({
                behandlingId: behandling.behandlingId,
                beslutning: beslutning,
                begrunnelse: beslutning === TotrinnskontrollBeslutning.UNDERKJENT ? begrunnelse : '',
                kontrollerteSider: kontrollsider.map(side => side.navn),
            });

            await queryClient.invalidateQueries({
                queryKey: HentVedtaksperioderQueryKeyFactory.behandling(behandling.behandlingId),
            });

            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));

            åpneModal(beslutning);

            settTab(Tab.Historikk);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    }

    return {
        form,
        onSubmit,
    };
}
