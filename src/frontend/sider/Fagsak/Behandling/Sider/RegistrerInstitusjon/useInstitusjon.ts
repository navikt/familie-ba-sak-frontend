import { useState } from 'react';

import { useNavigate } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingSteg } from '../../../../../typer/behandling';
import type { IRegistrerInstitusjon } from '../../../../../typer/institusjon';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

export const useInstitusjon = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();
    const { vurderErLesevisning, settÅpenBehandling } = useBehandlingContext();
    const { minimalFagsakRessurs } = useFagsakContext();
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();
    const [submitFeilmelding, settSubmitFeilmelding] = useState<string | undefined>('');

    const fagsak =
        minimalFagsakRessurs.status === RessursStatus.SUKSESS
            ? minimalFagsakRessurs.data
            : undefined;
    const fagsakFeilmelding =
        minimalFagsakRessurs.status !== RessursStatus.SUKSESS
            ? hentFrontendFeilmelding(minimalFagsakRessurs) || 'Ukjent feil ved henting av fagsak'
            : '';
    const institusjon = fagsak?.institusjon;

    const onSubmitMottaker = () => {
        if (
            vurderErLesevisning() ||
            åpenBehandling.steg !== BehandlingSteg.REGISTRERE_INSTITUSJON
        ) {
            navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`);
        } else {
            request<IRegistrerInstitusjon | undefined, IBehandling>({
                data: institusjon,
                method: 'POST',
                url: `/familie-ba-sak/api/behandlinger/${åpenBehandling?.behandlingId}/steg/registrer-institusjon`,
            })
                .then((ressurs: Ressurs<IBehandling>) => {
                    if (ressurs.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(ressurs);
                        navigate(
                            `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`
                        );
                    } else {
                        settSubmitFeilmelding(hentFrontendFeilmelding(ressurs));
                    }
                })
                .catch((ressurs: Ressurs<IBehandling>) => {
                    settSubmitFeilmelding(hentFrontendFeilmelding(ressurs));
                });
        }
    };

    return {
        fagsakFeilmelding,
        onSubmitMottaker,
        institusjon,
        submitFeilmelding,
    };
};
