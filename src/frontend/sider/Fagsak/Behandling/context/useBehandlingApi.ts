import { useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs } from '@navikt/familie-typer';

import { useAppContext } from '../../../../context/AppContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import { type ILogg } from '../../../../typer/logg';
import { obfuskerLogg } from '../../../../utils/obfuskerData';

const useBehandlingApi = () => {
    const { request } = useHttp();
    const { behandlingId } = useSakOgBehandlingParams();

    const [logg, settLogg] = useState<Ressurs<ILogg[]>>(byggTomRessurs());

    const { skalObfuskereData } = useAppContext();

    const hentLogg = (): void => {
        if (behandlingId === undefined) {
            settLogg(byggFeiletRessurs('Klarte ikke laste logg. Ingen behandlingsid.'));
        } else {
            settLogg(byggHenterRessurs());
            request<void, ILogg[]>({
                method: 'GET',
                url: `/familie-ba-sak/api/logg/${behandlingId}`,
            })
                .then((hentetLogg: Ressurs<ILogg[]>) => {
                    if (skalObfuskereData) {
                        obfuskerLogg(hentetLogg);
                    }
                    settLogg(hentetLogg);
                })
                .catch(() => {
                    settLogg(byggFeiletRessurs('Feil ved lasting av logg'));
                });
        }
    };

    return {
        logg,
        hentLogg,
    };
};

export default useBehandlingApi;
