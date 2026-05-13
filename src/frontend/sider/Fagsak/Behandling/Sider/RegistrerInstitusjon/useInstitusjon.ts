import { useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { BehandlingSteg, BehandlingÅrsak, type IBehandling } from '@typer/behandling';
import type { IRegistrerInstitusjon } from '@typer/institusjon';
import { hentFrontendFeilmelding } from '@utils/ressursUtils';
import { useNavigate } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandlingContext } from '../../context/BehandlingContext';

export const useInstitusjon = (åpenBehandling: IBehandling) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandlingContext();

    const fagsak = useFagsak();
    const erLesevisning = useErLesevisning();
    const navigate = useNavigate();

    const [submitFeilmelding, settSubmitFeilmelding] = useState<string | undefined>('');

    const institusjon = fagsak.institusjon;

    const onSubmitMottaker = () => {
        if (erLesevisning || åpenBehandling.steg !== BehandlingSteg.REGISTRERE_INSTITUSJON) {
            navigate(
                åpenBehandling.årsak === BehandlingÅrsak.SØKNAD
                    ? `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/registrer-soknad`
                    : `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
            );
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
                            åpenBehandling.årsak === BehandlingÅrsak.SØKNAD
                                ? `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/registrer-soknad`
                                : `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
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
        onSubmitMottaker,
        institusjon,
        submitFeilmelding,
    };
};
