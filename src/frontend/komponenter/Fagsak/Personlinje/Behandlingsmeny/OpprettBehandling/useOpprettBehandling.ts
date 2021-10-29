import { useEffect } from 'react';

import { useHistory } from 'react-router';

import { useFelt, feil, ok, Avhengigheter, useSkjema } from '@navikt/familie-skjema';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';

const useOpprettBehandling = (
    lukkModal: () => void,
    onOpprettTilbakekrevingSuccess: () => void
) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { settÅpenBehandling } = useBehandling();
    const { innloggetSaksbehandler } = useApp();
    const history = useHistory();

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
            return behandlingstypeVerdi === Behandlingstype.REVURDERING;
        },
        avhengigheter: { behandlingstype },
    });

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit, settSubmitRessurs } = useSkjema<
        {
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            underkategori: BehandlingUnderkategori | '';
        },
        IBehandling
    >({
        felter: {
            behandlingstype,
            behandlingsårsak,
            underkategori: useFelt<BehandlingUnderkategori | ''>({
                verdi: BehandlingUnderkategori.ORDINÆR,
            }),
        },
        skjemanavn: 'Opprett behandling modal',
    });

    useEffect(() => {
        switch (skjema.felter.behandlingstype.verdi) {
            case Behandlingstype.TEKNISK_OPPHØR:
                skjema.felter.behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.TEKNISK_OPPHØR);
                break;
            case Behandlingstype.FØRSTEGANGSBEHANDLING:
                skjema.felter.behandlingsårsak.validerOgSettFelt(BehandlingÅrsak.SØKNAD);
                break;
        }
    }, [skjema.felter.behandlingstype.verdi]);

    const onBekreft = (søkersIdent: string) => {
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
                onSubmit(
                    {
                        data: {
                            behandlingType: skjema.felter.behandlingstype.verdi as Behandlingstype,
                            behandlingÅrsak: skjema.felter.behandlingsårsak.verdi,
                            kategori: BehandlingKategori.NASJONAL,
                            navIdent: innloggetSaksbehandler?.navIdent,
                            søkersIdent,
                            underkategori: skjema.felter.underkategori.verdi,
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
    };
};

export default useOpprettBehandling;
