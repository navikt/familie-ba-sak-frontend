import { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import type { IMinimalFagsak, FagsakType } from '../../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';
import type { VisningBehandling } from '../../Fagsak/Saksoversikt/visningBehandling';

export interface IOpprettFagsakData {
    personIdent: string | null;
    aktørId: string | null;
    fagsakType: FagsakType | null;
}

const useOpprettFagsak = () => {
    const history = useHistory();
    const { request } = useHttp();
    const [feilmelding, settFeilmelding] = useState('');
    const [senderInn, settSenderInn] = useState(false);

    const opprettFagsak = (data: IOpprettFagsakData, onSuccess?: () => void) => {
        request<IOpprettFagsakData, IMinimalFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
            påvirkerSystemLaster: true,
        })
            .then((response: Ressurs<IMinimalFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    onSuccess && onSuccess();
                    const aktivBehandling: VisningBehandling | undefined =
                        hentAktivBehandlingPåMinimalFagsak(response.data);
                    aktivBehandling
                        ? history.push(
                              `/fagsak/${response.data.id}/${aktivBehandling.behandlingId}`
                          )
                        : history.push(`/fagsak/${response.data.id}/saksoversikt`);
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
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
