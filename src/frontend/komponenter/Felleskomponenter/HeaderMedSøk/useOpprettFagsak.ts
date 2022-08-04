import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import type { IMinimalFagsak, FagsakEier } from '../../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../utils/fagsak';
import type { VisningBehandling } from '../../Fagsak/Saksoversikt/visningBehandling';

export interface IOpprettFagsakData {
    personIdent: string | null;
    aktørId: string | null;
    fagsakEier: FagsakEier | null;
}

const useOpprettFagsak = () => {
    const navigate = useNavigate();
    const { request } = useHttp();
    const [feilmelding, settFeilmelding] = useState('');
    const [senderInn, settSenderInn] = useState<FagsakEier | null>(null);

    const opprettFagsak = (data: IOpprettFagsakData, onSuccess?: () => void) => {
        request<IOpprettFagsakData, IMinimalFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
            påvirkerSystemLaster: true,
        })
            .then((response: Ressurs<IMinimalFagsak>) => {
                settSenderInn(null);
                if (response.status === RessursStatus.SUKSESS) {
                    onSuccess && onSuccess();
                    const aktivBehandling: VisningBehandling | undefined =
                        hentAktivBehandlingPåMinimalFagsak(response.data);
                    aktivBehandling
                        ? navigate(`/fagsak/${response.data.id}/${aktivBehandling.behandlingId}`)
                        : navigate(`/fagsak/${response.data.id}/saksoversikt`);
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
                settSenderInn(null);
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
