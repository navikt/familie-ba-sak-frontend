import { useHistory } from 'react-router';

import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { useFelt } from '../../../../../familie-skjema/felt';
import { useSkjema } from '../../../../../familie-skjema/skjema';
import { FeltContext } from '../../../../../familie-skjema/typer';
import { feil, ok } from '../../../../../familie-skjema/validators';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';

const useOpprettBehandling = (lukkModal: () => void) => {
    const { innloggetSaksbehandler } = useApp();
    const { settFagsak } = useFagsakRessurser();
    const history = useHistory();

    const behandlingstype = useFelt<Behandlingstype | ''>({
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
        skalFeltetVises: (avhengigheter: FeltContext) => {
            const behandlingstypeVerdi = avhengigheter.behandlingstype.verdi;
            return behandlingstypeVerdi === Behandlingstype.REVURDERING;
        },
        avhengigheter: { behandlingstype },
    });

    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit } = useSkjema<
        {
            behandlingstype: Behandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
        },
        IFagsak
    >({
        felter: { behandlingstype, behandlingsårsak },
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
            onSubmit(
                {
                    data: {
                        behandlingType: skjema.felter.behandlingstype.verdi as Behandlingstype,
                        behandlingÅrsak: hentBehandlingårsak(),
                        kategori: BehandlingKategori.NASJONAL,
                        navIdent: innloggetSaksbehandler?.navIdent,
                        søkersIdent,
                        underkategori: BehandlingUnderkategori.ORDINÆR,
                    },
                    method: 'POST',
                    url: '/familie-ba-sak/api/behandlinger',
                },
                response => {
                    if (response.status === RessursStatus.SUKSESS) {
                        lukkModal();
                        nullstillSkjema();

                        settFagsak(response);
                        const aktivBehandling:
                            | IBehandling
                            | undefined = hentAktivBehandlingPåFagsak(response.data);

                        if (aktivBehandling && aktivBehandling.årsak === BehandlingÅrsak.SØKNAD) {
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
    };

    return {
        onBekreft,
        opprettBehandlingSkjema: skjema,
        nullstillSkjema,
    };
};

export default useOpprettBehandling;
