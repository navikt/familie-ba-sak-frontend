import { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';

export interface IOpprettFagsakData {
    personIdent: string | null;
    aktørId: string | null;
}

const useOpprettFagsak = () => {
    const history = useHistory();
    const { request } = useHttp();
    const [feilmelding, settFeilmelding] = useState('');
    const [senderInn, settSenderInn] = useState(false);

    const opprettFagsak = (data: IOpprettFagsakData, onSuccess?: () => void) => {
        request<IOpprettFagsakData, IFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
            påvirkerSystemLaster: true,
        })
            .then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    onSuccess && onSuccess();
                    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(
                        response.data
                    );
                    aktivBehandling
                        ? history.push(
                              `/fagsak/${response.data.id}/${aktivBehandling.behandlingId}`
                          )
                        : history.push(`/fagsak/${response.data.id}/saksoversikt`);
                } else if (response.status === RessursStatus.FEILET) {
                    settFeilmelding(response.frontendFeilmelding);
                } else {
                    settFeilmelding('Opprettelse av fagsak feilet');
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding('Opprettelse av fagsak feilet');
            });
    };

    return {
        opprettFagsak,
        feilmelding,
        senderInn,
        settSenderInn,
    };
};

export default useOpprettFagsak;
