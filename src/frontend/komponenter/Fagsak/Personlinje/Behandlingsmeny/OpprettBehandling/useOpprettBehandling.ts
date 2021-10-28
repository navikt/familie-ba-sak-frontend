import { useEffect } from 'react';

import { useHistory } from 'react-router';

import { Avhengigheter, feil, FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import {
    Behandlingstype,
    BehandlingÅrsak,
    IBehandling,
    IRestNyBehandling,
} from '../../../../../typer/behandling';
import { IBehandlingstema, isIBehandlingstema } from '../../../../../typer/behandlingstema';
import { IFagsak } from '../../../../../typer/fagsak';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';

const useOpprettBehandling = (
    lukkModal: () => void,
    fagsak: IFagsak,
    onOpprettTilbakekrevingSuccess: () => void
) => {
    const { innloggetSaksbehandler } = useApp();
    const { settFagsak } = useFagsakRessurser();
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

    const behandlingstema = useFelt<IBehandlingstema | ''>({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<IBehandlingstema | ''>) =>
            isIBehandlingstema(felt.verdi) ? ok(felt) : feil(felt, 'Behandlingstema må settes.'),
        avhengigheter: { behandlingstype },
        skalFeltetVises: avhengigheter => {
            const { verdi: behandlingstypeVerdi } = avhengigheter.behandlingstype;
            return behandlingstypeVerdi in Behandlingstype;
        },
    });

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit, settSubmitRessurs } = useSkjema<
        {
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            behandlingstema: IBehandlingstema | '';
        },
        IFagsak
    >({
        felter: {
            behandlingstype,
            behandlingsårsak,
            behandlingstema,
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
        const { behandlingstype, behandlingsårsak, behandlingstema } = skjema.felter;
        if (kanSendeSkjema()) {
            if (
                skjema.felter.behandlingstype.verdi ===
                Tilbakekrevingsbehandlingstype.TILBAKEKREVING
            ) {
                onSubmit(
                    {
                        method: 'GET',
                        url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/opprett-tilbakekreving`,
                    },
                    response => {
                        if (response.status === RessursStatus.SUKSESS) {
                            nullstillSkjemaStatus();
                            onOpprettTilbakekrevingSuccess();
                        }
                    }
                );
            } else if (isIBehandlingstema(behandlingstema.verdi)) {
                const kategori = behandlingstema.verdi.kategori;
                const underkategori = behandlingstema.verdi.underkategori;

                onSubmit<IRestNyBehandling>(
                    {
                        data: {
                            kategori,
                            underkategori,
                            søkersIdent,
                            behandlingType: behandlingstype.verdi as Behandlingstype,
                            behandlingÅrsak: behandlingsårsak.verdi as BehandlingÅrsak,
                            navident: innloggetSaksbehandler?.navIdent,
                        },
                        method: 'POST',
                        url: '/familie-ba-sak/api/behandlinger',
                    },
                    response => {
                        if (response.status === RessursStatus.SUKSESS) {
                            lukkModal();
                            nullstillSkjema();

                            settFagsak(response);
                            const aktivBehandling: IBehandling | undefined =
                                hentAktivBehandlingPåFagsak(response.data);

                            if (
                                aktivBehandling &&
                                aktivBehandling.årsak === BehandlingÅrsak.SØKNAD
                            ) {
                                history.push(
                                    `/fagsak/${response.data.id}/${aktivBehandling?.behandlingId}/registrer-soknad`
                                );
                            } else {
                                history.push(
                                    `/fagsak/${response.data.id}/${aktivBehandling?.behandlingId}/vilkaarsvurdering`
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
