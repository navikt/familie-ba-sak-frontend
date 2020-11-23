import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { useState } from 'react';
import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
} from '../../../../../typer/behandling';
import useFagsakApi from '../../../useFagsakApi';

const useOpprettBehandling = (lukkModal: () => void) => {
    const { innloggetSaksbehandler } = useApp();
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());
    const [selectedBehandlingstype, settSelectedBehandlingstype] = useState<Behandlingstype | ''>(
        ''
    );
    const [selectedBehandlingÅrsak, settSelectedBehandlingÅrsak] = useState<BehandlingÅrsak | ''>(
        ''
    );
    const [valideringsFeil, settValideringsfeil] = useState({
        behandlingstype: '',
        behandlingÅrsak: '',
    });

    const { opprettBehandling } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        feilmelding => {
            settSubmitRessurs(byggFeiletRessurs(feilmelding));
        }
    );

    const fjernState = () => {
        settSelectedBehandlingstype('');
        settSelectedBehandlingÅrsak('');
        settSubmitRessurs(byggTomRessurs());
        settValideringsfeil({
            behandlingÅrsak: '',
            behandlingstype: '',
        });
    };

    const onBekreft = (søkersIdent: string) => {
        if (!selectedBehandlingstype || !selectedBehandlingÅrsak) {
            settValideringsfeil({
                behandlingÅrsak: !selectedBehandlingÅrsak
                    ? 'Velg type behandling som skal opprettes fra nedtrekkslisten'
                    : '',
                behandlingstype: !selectedBehandlingstype
                    ? 'Velg årsak for opprettelse av behandlingen fra nedtrekkslisten'
                    : '',
            });
        } else {
            settSubmitRessurs(byggHenterRessurs());
            opprettBehandling({
                behandlingType: selectedBehandlingstype,
                behandlingÅrsak: selectedBehandlingÅrsak,
                kategori: BehandlingKategori.NASJONAL,
                navIdent: innloggetSaksbehandler?.navIdent,
                søkersIdent,
                underkategori: BehandlingUnderkategori.ORDINÆR,
            }).then(response => {
                if (response.status === RessursStatus.SUKSESS) {
                    lukkModal();
                    fjernState();
                }
            });
        }
    };

    return {
        onBekreft,
        fjernState,
        settSubmitRessurs,
        submitRessurs,
        settSelectedBehandlingstype,
        selectedBehandlingstype,
        selectedBehandlingÅrsak,
        settSelectedBehandlingÅrsak,
        valideringsFeil,
        settValideringsfeil,
    };
};

export default useOpprettBehandling;
