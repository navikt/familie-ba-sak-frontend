import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import type { ISelectOption } from '@navikt/familie-form-elements';
import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useFagsakContext } from '../../../../../context/Fagsak/FagsakContext';
import type { IBehandling, IRestNyBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg, Behandlingstype, BehandlingÅrsak } from '../../../../../typer/behandling';
import type { IBehandlingstema } from '../../../../../typer/behandlingstema';
import { behandlingstemaer } from '../../../../../typer/behandlingstema';
import { FagsakType } from '../../../../../typer/fagsak';
import { Klagebehandlingstype } from '../../../../../typer/klage';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import type { IsoDatoString } from '../../../../../utils/dato';
import {
    dateTilIsoDatoString,
    dateTilIsoDatoStringEllerUndefined,
    validerGyldigDato,
} from '../../../../../utils/dato';

export interface IOpprettBehandlingSkjemaBase {
    behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | '';
    behandlingsårsak: BehandlingÅrsak | '';
    behandlingstema: IBehandlingstema | undefined;
}

export interface IOpprettBehandlingSkjemaFelter extends IOpprettBehandlingSkjemaBase {
    migreringsdato: Date | undefined;
    søknadMottattDato: Date | undefined;
    kravMottattDato: Date | undefined;
    valgteBarn: ISelectOption[];
}

const useOpprettBehandling = (
    fagsakId: number,
    lukkModal: () => void,
    onOpprettTilbakekrevingSuccess: () => void
) => {
    const {
        bruker: brukerRessurs,
        minimalFagsak: minimalFagsakRessurs,
        hentMinimalFagsak,
    } = useFagsakContext();
    const { innloggetSaksbehandler } = useApp();
    const navigate = useNavigate();
    const { oppdaterKlagebehandlingerPåFagsak } = useFagsakContext();

    const bruker = brukerRessurs.status === RessursStatus.SUKSESS ? brukerRessurs.data : undefined;
    const minimalFagsak =
        minimalFagsakRessurs.status === RessursStatus.SUKSESS
            ? minimalFagsakRessurs.data
            : undefined;

    const behandlingstype = useFelt<
        Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype | ''
    >({
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
        verdi:
            minimalFagsak?.fagsakType === FagsakType.INSTITUSJON
                ? behandlingstemaer.NASJONAL_INSTITUSJON
                : undefined,
        valideringsfunksjon: (felt: FeltState<IBehandlingstema | undefined>) =>
            felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
        avhengigheter: { behandlingstype, behandlingsårsak },
        skalFeltetVises: avhengigheter => {
            if (minimalFagsak?.fagsakType === FagsakType.INSTITUSJON) return false;

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

    const kravMottattDato = useFelt<Date | undefined>({
        verdi: undefined,
        valideringsfunksjon: validerGyldigDato,
        avhengigheter: { behandlingstype },
        skalFeltetVises: avhengigheter =>
            avhengigheter.behandlingstype.verdi === Klagebehandlingstype.KLAGE,
    });

    const valgteBarn = useFelt({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<ISelectOption[]>) => ok(felt),
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

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit, settSubmitRessurs, valideringErOk } =
        useSkjema<IOpprettBehandlingSkjemaFelter, IBehandling>({
            felter: {
                behandlingstype,
                behandlingsårsak,
                behandlingstema,
                migreringsdato,
                søknadMottattDato,
                kravMottattDato,
                valgteBarn,
            },
            skjemanavn: 'Opprett behandling modal',
        });

    useEffect(() => {
        if (behandlingstype.verdi === Behandlingstype.TEKNISK_ENDRING) {
            behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.TEKNISK_ENDRING);
        } else if (behandlingstype.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING) {
            behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.SØKNAD);
        }
    }, [behandlingstype.verdi]);

    const opprettTilbakekreving = () => {
        onSubmit<void>(
            {
                method: 'GET',
                url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-tilbakekreving`,
            },
            response => {
                if (response.status === RessursStatus.SUKSESS) {
                    nullstillSkjemaStatus();
                    onOpprettTilbakekrevingSuccess();
                }
            }
        );
    };

    const opprettKlagebehandling = () => {
        onSubmit<{ kravMottattDato: IsoDatoString }>(
            {
                method: 'POST',
                url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-klagebehandling`,
                data: {
                    kravMottattDato: dateTilIsoDatoString(kravMottattDato.verdi),
                },
                påvirkerSystemLaster: true,
            },
            response => {
                if (response.status === RessursStatus.SUKSESS) {
                    oppdaterKlagebehandlingerPåFagsak();
                    lukkModal();
                    nullstillSkjema();
                }
            }
        );
    };

    const opprettBehandling = (søkersIdent: string, fagsakType: FagsakType) => {
        const erMigreringFraInfoTrygd =
            behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
        const erHelmanuellMigrering =
            erMigreringFraInfoTrygd &&
            behandlingsårsak.verdi === BehandlingÅrsak.HELMANUELL_MIGRERING;

        onSubmit<IRestNyBehandling>(
            {
                data: {
                    kategori: behandlingstema.verdi?.kategori ?? null,
                    underkategori: behandlingstema.verdi?.underkategori ?? null,
                    søkersIdent,
                    behandlingType: behandlingstype.verdi as Behandlingstype,
                    behandlingÅrsak: behandlingsårsak.verdi as BehandlingÅrsak,
                    navIdent: innloggetSaksbehandler?.navIdent,
                    nyMigreringsdato: erMigreringFraInfoTrygd
                        ? dateTilIsoDatoStringEllerUndefined(migreringsdato.verdi)
                        : undefined,
                    søknadMottattDato: dateTilIsoDatoStringEllerUndefined(søknadMottattDato.verdi),
                    barnasIdenter: erHelmanuellMigrering
                        ? valgteBarn.verdi.map(option => option.value)
                        : undefined,
                    fagsakType: fagsakType,
                    fagsakId: fagsakId,
                },
                method: 'POST',
                url: '/familie-ba-sak/api/behandlinger',
            },
            response => {
                if (response.status === RessursStatus.SUKSESS) {
                    hentMinimalFagsak(fagsakId, true);

                    lukkModal();
                    nullstillSkjema();

                    const behandling: IBehandling | undefined = hentDataFraRessurs(response);

                    if (behandling && behandling.årsak === BehandlingÅrsak.SØKNAD) {
                        navigate(
                            behandling.steg === BehandlingSteg.REGISTRERE_INSTITUSJON
                                ? `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-mottaker`
                                : `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-soknad`
                        );
                    } else {
                        navigate(
                            `/fagsak/${fagsakId}/${behandling?.behandlingId}/vilkaarsvurdering`
                        );
                    }
                }
            }
        );
    };

    const onBekreft = (søkersIdent: string, fagsakType: FagsakType) => {
        if (kanSendeSkjema()) {
            if (behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING) {
                opprettTilbakekreving();
            } else if (behandlingstype.verdi === Behandlingstype.KLAGE) {
                opprettKlagebehandling();
            } else {
                opprettBehandling(søkersIdent, fagsakType);
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
};

export default useOpprettBehandling;
