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
import {
    BehandlingKategori,
    BehandlingUnderkategori,
    IBehandlingstema,
} from '../../../../../typer/behandlingstema';
import { IFagsak } from '../../../../../typer/fagsak';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';

const useOpprettBehandling = (
    lukkModal: () => void,
    fagsakId: number,
    onOpprettTilbakekrevingSuccess: () => void
) => {
    const { innloggetSaksbehandler } = useApp();
    const { fagsak, settFagsak } = useFagsakRessurser();
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

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit, settSubmitRessurs } = useSkjema<
        {
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            behandlingstema: IBehandlingstema | undefined;
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

    // TODO: logikken for setting av behandlingstema når årsak ikke er søknad burde fikses i backend, slik at kategori og underkategori kan være optional. Deretter kan disse to funksjonene fjernes.
    const utredKategori = () => {
        if (behandlingstema.verdi?.kategori) {
            return behandlingstema.verdi.kategori;
        }
        if (fagsak.status === RessursStatus.SUKSESS) {
            const aktivBehandling = fagsak.data.behandlinger.find(b => b.aktiv);
            if (aktivBehandling) {
                return aktivBehandling.kategori;
            }
        }
        return BehandlingKategori.NASJONAL;
    };

    const utredUnderkategori = () => {
        if (behandlingstema.verdi?.underkategori) {
            return behandlingstema.verdi?.underkategori;
        }
        if (fagsak.status === RessursStatus.SUKSESS) {
            const aktivBehandling = fagsak.data.behandlinger.find(b => b.aktiv);
            if (aktivBehandling) {
                return aktivBehandling.underkategori;
            }
        }
        return BehandlingUnderkategori.ORDINÆR;
    };

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
                onSubmit<IRestNyBehandling>(
                    {
                        data: {
                            kategori: utredKategori(),
                            underkategori: utredUnderkategori(),
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
