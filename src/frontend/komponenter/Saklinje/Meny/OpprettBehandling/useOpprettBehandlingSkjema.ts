import { useFagsakId } from '@hooks/useFagsakId';
import { HentBarnetrygdbehandlingerQueryKeyFactory } from '@hooks/useHentBarnetrygdbehandlinger';
import { HentFagsakQueryKeyFactory } from '@hooks/useHentFagsak';
import { HentKlagebehandlingerQueryKeyFactory } from '@hooks/useHentKlagebehandlinger';
import { HentTilbakekrevingsbehandlingerQueryKeyFactory } from '@hooks/useHentTilbakekrevingsbehandlinger';
import { useOpprettBehandling } from '@hooks/useOpprettBehandling';
import { useOpprettKlagebehandling } from '@hooks/useOpprettKlagebehandling';
import { useOpprettTilbakekreving } from '@hooks/useOpprettTilbakekreving';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useQueryClient } from '@tanstack/react-query';
import { BehandlingSteg, Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import type { IBehandlingstema } from '@typer/behandlingstema';
import type { OptionType } from '@typer/common';
import { Klagebehandlingstype } from '@typer/klage';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { type IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export enum OpprettBehandlingFelt {
    BEHANDLINGSTYPE = 'behandlingstype',
    BEHANDLINGSÅRSAK = 'behandlingsårsak',
    BEHANDLINGSTEMA = 'behandlingstema',
    MIGRERINGSDATO = 'migreringsdato',
    BEGRUNNELSE = 'begrunnelse',
    SØKNAD_MOTTATT_DATO = 'søknadMottattDato',
    KLAGE_MOTTATT_DATO = 'klageMottattDato',
    VALGTE_BARN = 'valgteBarn',
}

export interface OpprettBehandlingFormValues {
    [OpprettBehandlingFelt.BEHANDLINGSTYPE]:
        | Behandlingstype
        | Tilbakekrevingsbehandlingstype
        | Klagebehandlingstype
        | string;
    [OpprettBehandlingFelt.BEHANDLINGSÅRSAK]: BehandlingÅrsak | string;
    [OpprettBehandlingFelt.BEHANDLINGSTEMA]: IBehandlingstema | undefined; // TODO: fix
    [OpprettBehandlingFelt.MIGRERINGSDATO]: IsoDatoString;
    [OpprettBehandlingFelt.BEGRUNNELSE]: string;
    [OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO]: IsoDatoString;
    [OpprettBehandlingFelt.KLAGE_MOTTATT_DATO]: IsoDatoString;
    [OpprettBehandlingFelt.VALGTE_BARN]: OptionType[]; // TODO: fix
}

interface TransformedOpprettBehandlingFormValues {
    [OpprettBehandlingFelt.BEHANDLINGSTYPE]: Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype;
    [OpprettBehandlingFelt.BEHANDLINGSÅRSAK]: BehandlingÅrsak;
    [OpprettBehandlingFelt.BEHANDLINGSTEMA]: IBehandlingstema; // TODO: fix
    [OpprettBehandlingFelt.MIGRERINGSDATO]: IsoDatoString;
    [OpprettBehandlingFelt.BEGRUNNELSE]: string;
    [OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO]: IsoDatoString;
    [OpprettBehandlingFelt.KLAGE_MOTTATT_DATO]: IsoDatoString;
    [OpprettBehandlingFelt.VALGTE_BARN]: OptionType[]; // TODO: fix
}

interface Props {
    lukkModal: () => void;
    onTilbakekrevingsbehandlingOpprettet: () => void;
}

export function useOpprettBehandlingSkjema({ lukkModal, onTilbakekrevingsbehandlingOpprettet }: Props) {
    const fagsakId = useFagsakId();
    const saksbehandler = useSaksbehandler();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const form = useForm<OpprettBehandlingFormValues, unknown, TransformedOpprettBehandlingFormValues>({
        defaultValues: {
            [OpprettBehandlingFelt.BEHANDLINGSTYPE]: '',
            [OpprettBehandlingFelt.BEHANDLINGSÅRSAK]: '',
            [OpprettBehandlingFelt.BEHANDLINGSTEMA]: undefined, // TODO
            [OpprettBehandlingFelt.MIGRERINGSDATO]: '',
            [OpprettBehandlingFelt.BEGRUNNELSE]: '',
            [OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO]: '',
            [OpprettBehandlingFelt.KLAGE_MOTTATT_DATO]: '',
            [OpprettBehandlingFelt.VALGTE_BARN]: undefined, // TODO
        },
    });

    const { setError } = form;

    const { mutateAsync: opprettBehandling } = useOpprettBehandling();
    const { mutateAsync: opprettKlagebehandling } = useOpprettKlagebehandling();
    const { mutateAsync: opprettTilbakekreving } = useOpprettTilbakekreving();

    async function onSubmit(values: TransformedOpprettBehandlingFormValues) {
        const {
            behandlingstype,
            behandlingsårsak,
            behandlingstema,
            migreringsdato,
            begrunnelse,
            søknadMottattDato,
            klageMottattDato,
            valgteBarn,
        } = values;

        if (behandlingstype === Klagebehandlingstype.KLAGE) {
            try {
                await opprettKlagebehandling({ klageMottattDato, fagsakId });
                await queryClient.invalidateQueries({
                    queryKey: HentKlagebehandlingerQueryKeyFactory.fagsak(fagsakId),
                });
                lukkModal();
            } catch (error) {
                setError('root', {
                    message: error instanceof Error ? error.message : 'Teknisk feil ved oppretting av klagebehandling.',
                });
            }
        } else if (behandlingstype === Tilbakekrevingsbehandlingstype.TILBAKEKREVING) {
            try {
                await opprettTilbakekreving({ fagsakId });
                await queryClient.invalidateQueries({
                    queryKey: HentTilbakekrevingsbehandlingerQueryKeyFactory.fagsak(fagsakId),
                });
                onTilbakekrevingsbehandlingOpprettet();
                lukkModal();
            } catch (error) {
                setError('root', {
                    message: error instanceof Error ? error.message : 'Teknisk feil ved oppretting av tilbakekreving.',
                });
            }
        } else {
            try {
                const erMigreringFraInfoTrygd = behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
                const erHelmanuellMigrering =
                    erMigreringFraInfoTrygd && behandlingsårsak === BehandlingÅrsak.HELMANUELL_MIGRERING;

                const opprettBehandlingParameters = {
                    // TODO: test at alle verdiene kommer frem som forventet, ref bug sist
                    kategori: behandlingstema.kategori || null,
                    underkategori: behandlingstema.underkategori || null,
                    behandlingType: behandlingstype as Behandlingstype,
                    behandlingÅrsak: behandlingsårsak as BehandlingÅrsak,
                    navIdent: saksbehandler.navIdent,
                    nyMigreringsdato: migreringsdato || undefined,
                    søknadMottattDato: søknadMottattDato || undefined,
                    barnasIdenter: erHelmanuellMigrering ? valgteBarn.map(option => option.value) : undefined, // TODO: trenger vi sjekken?
                    fagsakId: fagsakId,
                    begrunnelse: begrunnelse,
                };
                const behandling = await opprettBehandling(opprettBehandlingParameters);
                queryClient.invalidateQueries({
                    queryKey: HentBarnetrygdbehandlingerQueryKeyFactory.fagsak(fagsakId),
                });
                await queryClient.invalidateQueries({ queryKey: HentFagsakQueryKeyFactory.fagsak(fagsakId) });
                lukkModal();

                if (behandling.årsak === BehandlingÅrsak.SØKNAD) {
                    navigate(
                        behandling.steg === BehandlingSteg.REGISTRERE_INSTITUSJON
                            ? `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-mottaker`
                            : `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-soknad`
                    );
                } else {
                    navigate(`/fagsak/${fagsakId}/${behandling?.behandlingId}/vilkaarsvurdering`);
                }
            } catch (error) {
                setError('root', {
                    message: error instanceof Error ? error.message : 'Teknisk feil ved opprettelse av behandling.',
                });
            }
        }
    }

    return {
        form,
        onSubmit,
    };
}
