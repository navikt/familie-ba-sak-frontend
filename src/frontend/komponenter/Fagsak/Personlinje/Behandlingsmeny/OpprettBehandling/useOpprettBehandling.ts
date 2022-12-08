import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import type { ISelectOption } from '@navikt/familie-form-elements';
import {
    type Avhengigheter,
    feil,
    type FeltState,
    ok,
    useFelt,
    useSkjema,
} from '@navikt/familie-skjema';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../../../context/FagsakContext';
import type { IBehandling, IRestNyBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg, Behandlingstype, BehandlingÅrsak } from '../../../../../typer/behandling';
import { behandlingstemaer, type IBehandlingstema } from '../../../../../typer/behandlingstema';
import { FagsakType } from '../../../../../typer/fagsak';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import type { FamilieIsoDate } from '../../../../../utils/kalender';
import { erIsoStringGyldig } from '../../../../../utils/kalender';

const useOpprettBehandling = (
    fagsakId: number,
    lukkModal: () => void,
    onOpprettTilbakekrevingSuccess: () => void
) => {
    const { settÅpenBehandling } = useBehandling();
    const { bruker: brukerRessurs, minimalFagsak: minimalFagsakRessurs } = useFagsakContext();
    const { innloggetSaksbehandler } = useApp();
    const navigate = useNavigate();

    const bruker = brukerRessurs.status === RessursStatus.SUKSESS ? brukerRessurs.data : undefined;
    const minimalFagsak =
        minimalFagsakRessurs.status === RessursStatus.SUKSESS
            ? minimalFagsakRessurs.data
            : undefined;

    const behandlingstype = useFelt<Behandlingstype | Tilbakekrevingsbehandlingstype | ''>({
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

    const migreringsdato = useFelt<FamilieIsoDate | undefined>({
        verdi: undefined,
        valideringsfunksjon: (felt: FeltState<FamilieIsoDate | undefined>) =>
            felt.verdi && erIsoStringGyldig(felt.verdi) && erDatoFørForrigeMåned(felt.verdi)
                ? ok(felt)
                : feil(felt, 'Du må velge en migreringsdato som er før inneværende eller forrige måned'),
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

    const søknadMottattDato = useFelt<FamilieIsoDate | undefined>({
        verdi: undefined,
        valideringsfunksjon: (felt: FeltState<FamilieIsoDate | undefined>) => {
            const erGyldigIsoString = felt.verdi && erIsoStringGyldig(felt.verdi);
            const erIFremtiden = felt.verdi && erDatoFremITid(felt.verdi);

            if (!erGyldigIsoString) {
                return feil(
                    felt,
                    'Mottatt dato for søknaden må registreres ved manuell opprettelse av behandling'
                );
            }

            if (erIFremtiden) {
                return feil(felt, 'Du kan ikke sette en mottatt dato som er frem i tid.');
            }

            return ok(felt);
        },

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

    const erDatoFremITid = (dato: FamilieIsoDate): boolean => {
        return Date.parse(dato.toString()) > new Date().getTime();
    };

    const erDatoFørForrigeMåned = (dato: FamilieIsoDate): boolean => {
        return Date.parse(dato.toString()) <= dagenførForrigeMånedStartet().getTime();
    };

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
        useSkjema<
            {
                behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
                behandlingsårsak: BehandlingÅrsak | '';
                behandlingstema: IBehandlingstema | undefined;
                migreringsdato: FamilieIsoDate | undefined;
                søknadMottattDato: FamilieIsoDate | undefined;
                valgteBarn: ISelectOption[];
            },
            IBehandling
        >({
            felter: {
                behandlingstype,
                behandlingsårsak,
                behandlingstema,
                migreringsdato,
                søknadMottattDato,
                valgteBarn,
            },
            skjemanavn: 'Opprett behandling modal',
        });

    useEffect(() => {
        switch (skjema.felter.behandlingstype.verdi) {
            case Behandlingstype.TEKNISK_ENDRING:
                skjema.felter.behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.TEKNISK_ENDRING);
                break;
            case Behandlingstype.FØRSTEGANGSBEHANDLING:
                skjema.felter.behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.SØKNAD);
                break;
        }
    }, [skjema.felter.behandlingstype.verdi]);

    const onBekreft = (søkersIdent: string, fagsakType: FagsakType) => {
        const { behandlingstype, behandlingsårsak } = skjema.felter;
        if (kanSendeSkjema()) {
            if (
                skjema.felter.behandlingstype.verdi ===
                Tilbakekrevingsbehandlingstype.TILBAKEKREVING
            ) {
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
            } else {
                const erMigreringFraInfoTrygd =
                    skjema.felter.behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
                const erHelmanuellMigrering =
                    erMigreringFraInfoTrygd &&
                    skjema.felter.behandlingsårsak.verdi === BehandlingÅrsak.HELMANUELL_MIGRERING;

                onSubmit<IRestNyBehandling>(
                    {
                        data: {
                            kategori: skjema.felter.behandlingstema.verdi?.kategori ?? null,
                            underkategori:
                                skjema.felter.behandlingstema.verdi?.underkategori ?? null,
                            søkersIdent,
                            behandlingType: behandlingstype.verdi as Behandlingstype,
                            behandlingÅrsak: behandlingsårsak.verdi as BehandlingÅrsak,
                            navIdent: innloggetSaksbehandler?.navIdent,
                            nyMigreringsdato: erMigreringFraInfoTrygd
                                ? skjema.felter.migreringsdato.verdi
                                : undefined,
                            søknadMottattDato: skjema.felter.søknadMottattDato.verdi ?? undefined,
                            barnasIdenter: erHelmanuellMigrering
                                ? skjema.felter.valgteBarn.verdi.map(option => option.value)
                                : undefined,
                            fagsakType: fagsakType,
                            fagsakId: fagsakId,
                        },
                        method: 'POST',
                        url: '/familie-ba-sak/api/behandlinger',
                    },
                    response => {
                        if (response.status === RessursStatus.SUKSESS) {
                            lukkModal();
                            nullstillSkjema();

                            settÅpenBehandling(response);
                            const behandling: IBehandling | undefined =
                                hentDataFraRessurs(response);

                            if (behandling && behandling.årsak === BehandlingÅrsak.SØKNAD) {
                                navigate(
                                    behandling.steg ===
                                        BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE
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
            }
        }
    };

    const nullstillSkjemaStatus = () => {
        settSubmitRessurs(byggTomRessurs());
        nullstillSkjema();
    };

    const dagenførForrigeMånedStartet = () => {
        const dato = new Date();
        dato.setMonth(dato.getMonth() - 1);
        dato.setDate(0);
        return dato;
    };

    return {
        onBekreft,
        opprettBehandlingSkjema: skjema,
        nullstillSkjemaStatus,
        bruker,
        maksdatoForMigrering: dagenførForrigeMånedStartet,
        valideringErOk,
    };
};

export default useOpprettBehandling;
