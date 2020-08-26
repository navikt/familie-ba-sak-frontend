import { AxiosError } from 'axios';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { useApp } from '../../../../context/AppContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IFagsak } from '../../../../typer/fagsak';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import UIModalWrapper from '../../Modal/UIModalWrapper';
import Brevskjema from '../../BrevModul/BrevSkjema';
import { IBrevData } from '../../BrevModul/typer';
import { useBehandling } from '../../../../context/BehandlingContext';
import PdfFrame from '../../../Fagsak/Vedtak/PdfFrame';
import { hentStegNummer } from '../../../../typer/behandling';

const Brev = () => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();

    const [innsendtBrev, settInnsendtBrev] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );
    const [visModal, settVisModal] = React.useState(false);
    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;
    const behandlingSteg =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.steg;

    const sendBrev = (brevData: IBrevData) => {
        settInnsendtBrev(byggHenterRessurs());
        axiosRequest<IFagsak, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/send-brev/innhente-opplysninger/${behandlingId}`,
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

    const hentForhåndsvisning = (brevData: IBrevData) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/innhente-opplysninger/${behandlingId}`,
        })
            .then((response: Ressurs<string>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settHentetForhåndsvisning(
                        byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                    );
                } else if (response.status === RessursStatus.FEILET) {
                    settHentetForhåndsvisning(response);
                } else {
                    settHentetForhåndsvisning(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settHentetForhåndsvisning(
                    byggFeiletRessurs('Ukjent feil ved henting av forhåndsvisning.')
                );
            });
    };

    return (
        <div className={'brev'}>
            {behandlingSteg && hentStegNummer(behandlingSteg) >= 2 && (
                <Brevskjema
                    sendBrev={sendBrev}
                    innsendtBrev={innsendtBrev}
                    hentForhåndsvisning={hentForhåndsvisning}
                    hentetForhåndsvisning={hentetForhåndsvisning}
                />
            )}
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
            {hentetForhåndsvisning.status === RessursStatus.SUKSESS && (
                <PdfFrame file={hentetForhåndsvisning.data} />
            )}
        </div>
    );
};
export default Brev;
