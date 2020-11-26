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
    const [visÅrsakerSelect, settVisÅrsakerSelect] = useState(false);

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

    const behandlingstypeOnChange = (behandlingstype: Behandlingstype | '') => {
        settSubmitRessurs(byggTomRessurs());
        settValideringsfeil(valideringsFeil => {
            return {
                ...valideringsFeil,
                behandlingstype: '',
            };
        });

        switch (behandlingstype) {
            case Behandlingstype.TEKNISK_OPPHØR:
                settSelectedBehandlingÅrsak(BehandlingÅrsak.TEKNISK_OPPHØR);
                settVisÅrsakerSelect(false);
                break;
            case Behandlingstype.FØRSTEGANGSBEHANDLING:
                settSelectedBehandlingÅrsak(BehandlingÅrsak.SØKNAD);
                settVisÅrsakerSelect(false);
                break;
            default:
                settVisÅrsakerSelect(true);
        }

        settSelectedBehandlingstype(behandlingstype);
    };

    const behandlingÅrsakOnChange = (behandlingÅrsak: BehandlingÅrsak | '') => {
        settSubmitRessurs(byggTomRessurs());
        settValideringsfeil(valideringsFeil => {
            return {
                ...valideringsFeil,
                behandlingÅrsak: '',
            };
        });
        settSelectedBehandlingÅrsak(behandlingÅrsak);
    };

    return {
        onBekreft,
        fjernState,
        submitRessurs,
        selectedBehandlingstype,
        selectedBehandlingÅrsak,
        valideringsFeil,
        behandlingstypeOnChange,
        behandlingÅrsakOnChange,
        visÅrsakerSelect,
    };
};

export default useOpprettBehandling;
