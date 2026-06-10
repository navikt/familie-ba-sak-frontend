import { useEffect } from 'react';

import { HentBarnetrygdbehandlingerQueryKeyFactory } from '@hooks/useHentBarnetrygdbehandlinger';
import { HentFagsakQueryKeyFactory } from '@hooks/useHentFagsak';
import { HentKlagebehandlingerQueryKeyFactory } from '@hooks/useHentKlagebehandlinger';
import { HentTilbakekrevingsbehandlingerQueryKeyFactory } from '@hooks/useHentTilbakekrevingsbehandlinger';
import { useOpprettBehandling } from '@hooks/useOpprettBehandling';
import { useOpprettKlagebehandling } from '@hooks/useOpprettKlagebehandling';
import { useOpprettTilbakekreving } from '@hooks/useOpprettTilbakekreving';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useBrukerContext } from '@sider/Fagsak/BrukerContext';
import { useFagsakContext } from '@sider/Fagsak/FagsakContext';
import { useQueryClient } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import { BehandlingSteg, Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import type { IBehandlingstema } from '@typer/behandlingstema';
import { behandlingstemaer } from '@typer/behandlingstema';
import type { OptionType } from '@typer/common';
import { FagsakType } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { dateTilIsoDatoString, dateTilIsoDatoStringEllerUndefined, validerGyldigDato } from '@utils/dato';
import { useNavigate } from 'react-router';

import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggSuksessRessurs,
    byggTomRessurs,
} from '@navikt/familie-typer';

export interface IOpprettBehandlingSkjemaBase {
    behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | '';
    behandlingsårsak: BehandlingÅrsak | '';
    behandlingstema: IBehandlingstema | undefined;
}

export interface IOpprettBehandlingSkjemaFelter extends IOpprettBehandlingSkjemaBase {
    migreringsdato: Date | undefined;
    søknadMottattDato: Date | undefined;
    klageMottattDato: Date | undefined;
    begrunnelse: string | undefined;
    valgteBarn: OptionType[];
}

interface Props {
    fagsakId: number;
    lukkModal: () => void;
    onTilbakekrevingsbehandlingOpprettet: () => void;
}

export function useOpprettBehandlingSkjema({ fagsakId, lukkModal, onTilbakekrevingsbehandlingOpprettet }: Props) {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();

    const saksbehandler = useSaksbehandler();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const behandlingstype = useFelt<Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | ''>({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg type behandling som skal opprettes fra nedtrekkslisten');
        },
    });

    const behandlingsårsak = useFelt<BehandlingÅrsak | ''>({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg årsak for opprettelse av behandlingen fra nedtrekkslisten');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            const behandlingstypeVerdi = avhengigheter.behandlingstype.verdi;
            return (
                behandlingstypeVerdi === Behandlingstype.REVURDERING ||
                behandlingstypeVerdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD
            );
        },
        avhengigheter: { behandlingstype },
    });

    const behandlingstema = useFelt<IBehandlingstema | undefined>({
        verdi: fagsak.fagsakType === FagsakType.INSTITUSJON ? behandlingstemaer.NASJONAL_INSTITUSJON : undefined,
        valideringsfunksjon: (felt: FeltState<IBehandlingstema | undefined>) =>
            felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
        avhengigheter: { behandlingstype, behandlingsårsak },
        skalFeltetVises: avhengigheter => {
            if (fagsak.fagsakType === FagsakType.INSTITUSJON) return false;

            const { verdi: behandlingstypeVerdi } = avhengigheter.behandlingstype;
            const { verdi: behandlingsårsakVerdi } = avhengigheter.behandlingsårsak;
            const behandlingsårsakerFeltetSkalVisesFor = [
                BehandlingÅrsak.SØKNAD,
                BehandlingÅrsak.ENDRE_MIGRERINGSDATO,
                BehandlingÅrsak.HELMANUELL_MIGRERING,
            ];
            return (
                behandlingstypeVerdi in Behandlingstype &&
                behandlingsårsakerFeltetSkalVisesFor.includes(behandlingsårsakVerdi)
            );
        },
    });

    const migreringsdato = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
        avhengigheter: { behandlingstype, behandlingsårsak },
        skalFeltetVises: avhengigheter => {
            const { verdi: behandlingstypeVerdi } = avhengigheter.behandlingstype;
            const { verdi: behandlingsårsakVerdi } = avhengigheter.behandlingsårsak;
            return (
                behandlingstypeVerdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
                behandlingsårsakVerdi in BehandlingÅrsak
            );
        },
    });

    const søknadMottattDato = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
        avhengigheter: { behandlingstype, behandlingsårsak },
        skalFeltetVises: avhengigheter => {
            const { verdi: behandlingstypeVerdi } = avhengigheter.behandlingstype;
            const { verdi: behandlingsårsakVerdi } = avhengigheter.behandlingsårsak;
            return (
                behandlingstypeVerdi === Behandlingstype.FØRSTEGANGSBEHANDLING ||
                (behandlingstypeVerdi === Behandlingstype.REVURDERING &&
                    behandlingsårsakVerdi === BehandlingÅrsak.SØKNAD)
            );
        },
    });

    const begrunnelse = useFelt<string | undefined>({
        verdi: undefined,
        avhengigheter: { behandlingsårsak, fagsak },
        valideringsfunksjon: felt => {
            return felt.verdi !== '' && felt.verdi !== undefined
                ? ok(felt)
                : feil(felt, 'Vennligst skriv en begrunnelse på hvorfor den tekniske endringen er opprettet.');
        },
        skalFeltetVises: avhengigheter => {
            const { verdi: behandlingsårsakVerdi } = avhengigheter.behandlingsårsak;
            return behandlingsårsakVerdi == BehandlingÅrsak.TEKNISK_ENDRING;
        },
    });

    const klageMottattDato = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
        avhengigheter: { behandlingstype },
        skalFeltetVises: avhengigheter => avhengigheter.behandlingstype.verdi === Klagebehandlingstype.KLAGE,
    });

    const valgteBarn = useFelt({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<OptionType[]>) => ok(felt),
        avhengigheter: { behandlingstype, behandlingsårsak },
        skalFeltetVises: avhengigheter => {
            const { verdi: behandlingstypeVerdi } = avhengigheter.behandlingstype;
            const { verdi: behandlingsårsakVerdi } = avhengigheter.behandlingsårsak;
            return (
                behandlingstypeVerdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
                behandlingsårsakVerdi === BehandlingÅrsak.HELMANUELL_MIGRERING
            );
        },
    });

    const { skjema, nullstillSkjema, kanSendeSkjema, settSubmitRessurs, valideringErOk } = useSkjema<
        IOpprettBehandlingSkjemaFelter,
        IBehandling
    >({
        felter: {
            behandlingstype,
            behandlingsårsak,
            behandlingstema,
            migreringsdato,
            begrunnelse,
            søknadMottattDato,
            klageMottattDato,
            valgteBarn,
        },
        skjemanavn: 'Opprett behandling modal',
    });

    const { mutate: opprettBehandling } = useOpprettBehandling({
        onSuccess: async behandling => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: HentBarnetrygdbehandlingerQueryKeyFactory.fagsak(fagsakId),
                }),
                queryClient.invalidateQueries({ queryKey: HentFagsakQueryKeyFactory.fagsak(fagsakId) }),
            ]);

            lukkModal();
            nullstillSkjema();
            settSubmitRessurs(byggSuksessRessurs(behandling));

            if (behandling && behandling.årsak === BehandlingÅrsak.SØKNAD) {
                navigate(
                    behandling.steg === BehandlingSteg.REGISTRERE_INSTITUSJON
                        ? `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-mottaker`
                        : `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-soknad`
                );
            } else {
                navigate(`/fagsak/${fagsakId}/${behandling?.behandlingId}/vilkaarsvurdering`);
            }
        },
        onError: error => {
            settSubmitRessurs(byggFunksjonellFeilRessurs(error.message));
        },
    });

    const { mutate: opprettKlagebehandling } = useOpprettKlagebehandling({
        onSuccess: async behandling => {
            await queryClient.invalidateQueries({ queryKey: HentKlagebehandlingerQueryKeyFactory.fagsak(fagsakId) });
            lukkModal();
            nullstillSkjema();
            settSubmitRessurs(byggSuksessRessurs(behandling));
        },
        onError: error => {
            settSubmitRessurs(byggFunksjonellFeilRessurs(error.message));
        },
    });

    const { mutate: opprettTilbakekreving } = useOpprettTilbakekreving({
        onSuccess: async behandling => {
            await queryClient.invalidateQueries({
                queryKey: HentTilbakekrevingsbehandlingerQueryKeyFactory.fagsak(fagsakId),
            });
            nullstillSkjemaStatus();
            onTilbakekrevingsbehandlingOpprettet();
            settSubmitRessurs(byggSuksessRessurs(behandling));
        },
        onError: error => {
            settSubmitRessurs(byggFunksjonellFeilRessurs(error.message));
        },
    });

    useEffect(() => {
        if (behandlingstype.verdi === Behandlingstype.TEKNISK_ENDRING) {
            behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.TEKNISK_ENDRING);
        } else if (behandlingstype.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING) {
            behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.SØKNAD);
        }
    }, [behandlingstype.verdi]);

    const onBekreft = () => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggHenterRessurs());
            if (behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING) {
                opprettTilbakekreving({ fagsakId });
            } else if (behandlingstype.verdi === Klagebehandlingstype.KLAGE) {
                opprettKlagebehandling({
                    klageMottattDato: dateTilIsoDatoString(klageMottattDato.verdi),
                    fagsakId,
                });
            } else {
                const erMigreringFraInfoTrygd = behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
                const erHelmanuellMigrering =
                    erMigreringFraInfoTrygd && behandlingsårsak.verdi === BehandlingÅrsak.HELMANUELL_MIGRERING;

                const payload = {
                    kategori: behandlingstema.verdi?.kategori ?? null,
                    underkategori: behandlingstema.verdi?.underkategori ?? null,
                    behandlingType: behandlingstype.verdi as Behandlingstype,
                    behandlingÅrsak: behandlingsårsak.verdi as BehandlingÅrsak,
                    navIdent: saksbehandler.navIdent,
                    nyMigreringsdato: erMigreringFraInfoTrygd
                        ? dateTilIsoDatoStringEllerUndefined(migreringsdato.verdi)
                        : undefined,
                    søknadMottattDato: dateTilIsoDatoStringEllerUndefined(søknadMottattDato.verdi),
                    barnasIdenter: erHelmanuellMigrering ? valgteBarn.verdi.map(option => option.value) : undefined,
                    fagsakId: fagsakId,
                    begrunnelse: begrunnelse.verdi,
                };
                opprettBehandling(payload);
            }
        }
    };

    const nullstillSkjemaStatus = () => {
        settSubmitRessurs(byggTomRessurs());
        nullstillSkjema();
    };

    const MAKSDATO_FOR_MIGRERING = new Date('2023-01-01');

    return {
        onBekreft,
        opprettBehandlingSkjema: skjema,
        nullstillSkjemaStatus,
        bruker,
        maksdatoForMigrering: MAKSDATO_FOR_MIGRERING,
        valideringErOk,
    };
}
