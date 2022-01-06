import { useEffect } from 'react';

import { useHistory } from 'react-router';

import { ISelectOption } from '@navikt/familie-form-elements';
import { Avhengigheter, feil, FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import {
    Behandlingstype,
    BehandlingÅrsak,
    IBehandling,
    IRestNyBehandling,
} from '../../../../../typer/behandling';
import { IBehandlingstema } from '../../../../../typer/behandlingstema';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { erIsoStringGyldig, FamilieIsoDate } from '../../../../../utils/kalender';

const useOpprettBehandling = (
    lukkModal: () => void,
    onOpprettTilbakekrevingSuccess: () => void
) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { settÅpenBehandling } = useBehandling();
    const { bruker: brukerRessurs } = useFagsakRessurser();
    const { innloggetSaksbehandler } = useApp();
    const history = useHistory();

    const bruker = brukerRessurs.status === RessursStatus.SUKSESS ? brukerRessurs.data : undefined;

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
        verdi: undefined,
        valideringsfunksjon: (felt: FeltState<IBehandlingstema | undefined>) =>
            felt.verdi ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
        avhengigheter: { behandlingstype, behandlingsårsak },
        skalFeltetVises: avhengigheter => {
            const { verdi: behandlingstypeVerdi } = avhengigheter.behandlingstype;
            const { verdi: behandlingsårsakVerdi } = avhengigheter.behandlingsårsak;
            return (
                behandlingstypeVerdi in Behandlingstype &&
                behandlingsårsakVerdi === BehandlingÅrsak.SØKNAD
            );
        },
    });

    const migreringsdato = useFelt<FamilieIsoDate | undefined>({
        verdi: undefined,
        valideringsfunksjon: (felt: FeltState<FamilieIsoDate | undefined>) =>
            felt.verdi && erIsoStringGyldig(felt.verdi)
                ? ok(felt)
                : feil(felt, 'Du må velge en ny migreringsdato'),
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

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit, settSubmitRessurs } = useSkjema<
        {
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            behandlingstema: IBehandlingstema | undefined;
            migreringsdato: FamilieIsoDate | undefined;
            valgteBarn: ISelectOption[];
        },
        IBehandling
    >({
        felter: {
            behandlingstype,
            behandlingsårsak,
            behandlingstema,
            migreringsdato,
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

    const onBekreft = (søkersIdent: string) => {
        const { behandlingstype, behandlingsårsak } = skjema.felter;
        if (kanSendeSkjema()) {
            if (
                skjema.felter.behandlingstype.verdi ===
                Tilbakekrevingsbehandlingstype.TILBAKEKREVING
            ) {
                onSubmit(
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
                            navident: innloggetSaksbehandler?.navIdent,
                            nyMigreringsdato: erMigreringFraInfoTrygd
                                ? skjema.felter.migreringsdato.verdi
                                : undefined,
                            barnasIdenter: erHelmanuellMigrering
                                ? skjema.felter.valgteBarn.verdi.map(option => option.value)
                                : undefined,
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
                                history.push(
                                    `/fagsak/${fagsakId}/${behandling?.behandlingId}/registrer-soknad`
                                );
                            } else {
                                history.push(
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

    return {
        onBekreft,
        opprettBehandlingSkjema: skjema,
        nullstillSkjemaStatus,
        bruker,
    };
};

export default useOpprettBehandling;
