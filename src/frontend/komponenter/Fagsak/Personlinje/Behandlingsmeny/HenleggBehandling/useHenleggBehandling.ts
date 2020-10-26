import { byggHenterRessurs, byggTomRessurs } from '@navikt/familie-typer';
import { useState } from 'react';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';

const useOpprettBehandling = (lukkModal: () => void) => {
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    const [selectedHenleggelseÅrsak, settSelectedHenleggelseÅrsak] = useState<
        HenleggelseÅrsak | ''
    >('');
    const [valideringsFeil, settValideringsfeil] = useState({
        henleggelseÅrsak: '',
    });
    const [begrunnelse, settBegrunnelse] = useState('');

    const fjernState = () => {
        settSelectedHenleggelseÅrsak('');
        settSubmitRessurs(byggTomRessurs());
        settValideringsfeil({
            henleggelseÅrsak: '',
        });
    };

    const onBekreft = () => {
        if (!selectedHenleggelseÅrsak) {
            settValideringsfeil({
                henleggelseÅrsak: !selectedHenleggelseÅrsak
                    ? 'Velg type behandling som skal opprettes fra nedtrekkslisten'
                    : '',
            });
        } else {
            settSubmitRessurs(byggHenterRessurs());
            /*henleggBehandling({
                henleggelseÅrsak: selectedHenleggelseÅrsak,
                begrunnelse
            }).then(response => {
                if (response.status === RessursStatus.SUKSESS) {
                    lukkModal();
                    fjernState();
                }
            });*/
            lukkModal();
            fjernState();
        }
    };

    return {
        onBekreft,
        fjernState,
        settSubmitRessurs,
        submitRessurs,
        selectedHenleggelseÅrsak,
        settSelectedHenleggelseÅrsak,
        begrunnelse,
        settBegrunnelse,
        valideringsFeil,
        settValideringsfeil,
    };
};

export default useOpprettBehandling;
