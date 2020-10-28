import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useState } from 'react';
import { useApp } from '../../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';

const useOpprettBehandling = (lukkModal: () => void) => {
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();
    const [feilmelding, settFeilmelding] = useState<string | undefined>(undefined);

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

    const onBekreft = (behandlingId: number) => {
        if (!selectedHenleggelseÅrsak) {
            settValideringsfeil({
                henleggelseÅrsak: !selectedHenleggelseÅrsak ? 'Velg årsak til henleggelse' : '',
            });
        } else {
            settSubmitRessurs(byggHenterRessurs());

            axiosRequest<
                IFagsak,
                {
                    årsak: HenleggelseÅrsak;
                    begrunnelse: string;
                }
            >({
                data: {
                    årsak: selectedHenleggelseÅrsak,
                    begrunnelse,
                },
                method: 'PUT',
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/henlegg`,
            }).then((response: Ressurs<IFagsak>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);
                    lukkModal();
                    settVisVeivalgModal(true);
                } else {
                    settFeilmelding(
                        response.status === RessursStatus.FEILET ||
                            response.status === RessursStatus.FUNKSJONELL_FEIL ||
                            response.status === RessursStatus.IKKE_TILGANG
                            ? response.frontendFeilmelding
                            : undefined
                    );
                }
            });
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
        visVeivalgModal,
        settVisVeivalgModal,
        feilmelding,
    };
};

export default useOpprettBehandling;
