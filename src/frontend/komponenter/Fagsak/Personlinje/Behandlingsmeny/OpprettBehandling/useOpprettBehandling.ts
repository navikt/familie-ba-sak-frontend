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
} from '../../../../../typer/behandling';
import useFagsakApi from '../../../useFagsakApi';

const useOpprettBehandling = (lukkModal: () => void) => {
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());
    const [behandlingstype, settBehandlingstype] = useState<Behandlingstype | undefined>(undefined);

    const { opprettBehandling } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        feilmelding => {
            settSubmitRessurs(byggFeiletRessurs(feilmelding));
        }
    );

    const fjernState = () => {
        settBehandlingstype(undefined);
        settSubmitRessurs(byggTomRessurs());
    };

    const onBekreft = (søkersIdent: string) => {
        if (!behandlingstype) {
            settSubmitRessurs(
                byggFeiletRessurs('Velg type behandling som skal opprettes fra nedtrekkslisten')
            );
        } else {
            settSubmitRessurs(byggHenterRessurs());
            opprettBehandling({
                behandlingType: behandlingstype,
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
        settBehandlingstype,
        behandlingstype,
        settSubmitRessurs,
        submitRessurs,
    };
};

export default useOpprettBehandling;
