import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { VisningBehandling } from './Saksoversikt/visningBehandling';
import type { IOpprettEllerHentFagsakData } from '../../api/fagsak';
import { useFagsakContext } from '../../context/fagsak/FagsakContext';
import type { IMinimalFagsak } from '../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const { settMinimalFagsak } = useFagsakContext();
    const { request } = useHttp();

    const navigate = useNavigate();

    const opprettEllerHentFagsak = (data: IOpprettEllerHentFagsakData) => {
        request<IOpprettEllerHentFagsakData, IMinimalFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
            påvirkerSystemLaster: true,
        })
            .then((response: Ressurs<IMinimalFagsak>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settMinimalFagsak(response);

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
                    settVisFeilmeldinger(true);
                    settFeilmelding(response.frontendFeilmelding);
                } else {
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av fagsak feilet');
                }
            })
            .catch(() => {
                settVisFeilmeldinger(true);
                settFeilmelding('Opprettelse av fagsak feilet');
            });
    };

    return {
        opprettEllerHentFagsak,
    };
};

export default useFagsakApi;
