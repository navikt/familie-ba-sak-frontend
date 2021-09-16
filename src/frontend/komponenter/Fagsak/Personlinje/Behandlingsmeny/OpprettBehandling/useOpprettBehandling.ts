import { useHistory } from 'react-router';

import { useFelt, feil, ok, Avhengigheter, useSkjema } from '@navikt/familie-skjema';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
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

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit, settSubmitRessurs } = useSkjema<
        {
            behandlingstype: Behandlingstype | Tilbakekrevingsbehandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            underkategori: BehandlingUnderkategori | '';
        },
        IFagsak
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

    const hentBehandlingårsak = () => {
        switch (skjema.felter.behandlingstype.verdi) {
            case Behandlingstype.TEKNISK_OPPHØR:
                return BehandlingÅrsak.TEKNISK_OPPHØR;
            case Behandlingstype.FØRSTEGANGSBEHANDLING:
                return BehandlingÅrsak.SØKNAD;
            default:
                return skjema.felter.behandlingsårsak.verdi;
        }
    };

    const onBekreft = (søkersIdent: string) => {
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
            } else {
                onSubmit(
                    {
                        data: {
                            behandlingType: skjema.felter.behandlingstype.verdi as Behandlingstype,
                            behandlingÅrsak: hentBehandlingårsak(),
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
