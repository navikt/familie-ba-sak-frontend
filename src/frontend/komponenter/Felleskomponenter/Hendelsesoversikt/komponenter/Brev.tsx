import { AxiosError } from 'axios';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { useApp } from '../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IFagsak } from '../../../../typer/fagsak';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from '../../BrevModul/BrevSkjema';
import { IBrevData } from '../../BrevModul/typer';

const Brev = () => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();

    const [innsendtBrev, settInnsendtBrev] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [visModal, settVisModal] = React.useState(false);

    const sendBrev = (brevData: IBrevData) => {
        settInnsendtBrev(byggHenterRessurs());
        axiosRequest<IFagsak, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/fagsaker/${123}/pathforsendingavbrev`,
        })
            .then((response: Ressurs<IFagsak>) => {
                settInnsendtBrev(response);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);
                    settVisModal(true);
                }
            })
            .catch((_error: AxiosError) => {
                settInnsendtBrev(byggFeiletRessurs('Ukjent feil ved sending av brev.'));
            });
    };

    return (
        <div className={'brev'}>
            <Brevskjema sendBrev={sendBrev} innsendtBrev={innsendtBrev} />
            {visModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Brevet er bestilt',
                        lukkKnapp: false,
                        visModal: visModal,
                        actions: [
                            <Knapp
                                key={'ok'}
                                mini={true}
                                onClick={() => {
                                    settVisModal(false);
                                }}
                                children={'Ok'}
                            />,
                        ],
                    }}
                >
                    Brevet er bestilt
                </UIModalWrapper>
            )}
        </div>
    );
};
export default Brev;
