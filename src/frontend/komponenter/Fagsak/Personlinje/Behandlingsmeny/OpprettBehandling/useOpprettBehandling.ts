import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { useState } from 'react';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
} from '../../../../../typer/behandling';
import useFagsakApi from '../../../useFagsakApi';

const useOpprettBehandling = (lukkModal: () => void) => {
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());
    const [selectedBehandlingstype, settSelectedBehandlingstype] = useState<Behandlingstype | ''>(
        ''
    );
    const [selectedBehandlingÅrsak, settSelectedBehandlingÅrsak] = useState<BehandlingÅrsak | ''>(
        ''
    );

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
    };

    const onBekreft = (søkersIdent: string) => {
        if (!selectedBehandlingstype) {
            settSubmitRessurs(
                byggFeiletRessurs('Velg type behandling som skal opprettes fra nedtrekkslisten')
            );
        } else if (!selectedBehandlingÅrsak) {
            settSubmitRessurs(
                byggFeiletRessurs('Velg årsak for opprettelse av behandlingen fra nedtrekkslisten')
            );
        } else {
            settSubmitRessurs(byggHenterRessurs());
            opprettBehandling({
                behandlingType: selectedBehandlingstype,
                behandlingÅrsak: selectedBehandlingÅrsak,
                søkersIdent,
                kategori: BehandlingKategori.NASJONAL,
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
    };
};

export default useOpprettBehandling;
