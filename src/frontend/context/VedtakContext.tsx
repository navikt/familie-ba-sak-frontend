import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import constate from 'constate';
import React from 'react';
import { IFagsak } from '../typer/fagsak';
import { IRestStønadBrevBegrunnelse, IVedtakForBehandling } from '../typer/vedtak';
import { useApp } from './AppContext';

interface IProps {
    fagsak: IFagsak;
    aktivVedtak: IVedtakForBehandling | undefined;
}

const [BegrunnelserProvider, useBegrunnelser] = constate(({ fagsak, aktivVedtak }: IProps) => {
    const { axiosRequest } = useApp();

    const [begrunnelser, settBegrunnelser] = React.useState<IRestStønadBrevBegrunnelse[]>(
        aktivVedtak?.stønadBrevBegrunnelser ? aktivVedtak.stønadBrevBegrunnelser : []
    );

    const håndterEndretBegrunnelser = (promise: Promise<Ressurs<IRestStønadBrevBegrunnelse[]>>) => {
        promise
            .then((nyeBegrunnelser: Ressurs<IRestStønadBrevBegrunnelse[]>) => {
                if (nyeBegrunnelser.status === RessursStatus.SUKSESS) {
                    settBegrunnelser(nyeBegrunnelser.data);
                } else if (nyeBegrunnelser.status === RessursStatus.FEILET) {
                    //TODO: Håndter feil
                } else {
                    //TODO: Håndter feil
                }
            })
            .catch(() => {
                //TODO: Håndter feil
            });
    };

    const leggTilBegrunnelse = (data: IRestStønadBrevBegrunnelse) => {
        håndterEndretBegrunnelser(
            axiosRequest<IRestStønadBrevBegrunnelse[], IRestStønadBrevBegrunnelse>({
                method: 'POST',
                url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/legg-til-stønad-brev-begrunnelse`,
                data,
            })
        );
    };

    const endreBegrunnelse = (data: IRestStønadBrevBegrunnelse) => {
        håndterEndretBegrunnelser(
            axiosRequest<IRestStønadBrevBegrunnelse[], IRestStønadBrevBegrunnelse>({
                method: 'PUT',
                url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/endre-stønad-brev-begrunnelse`,
                data,
            })
        );
    };

    return { begrunnelser, settBegrunnelser, leggTilBegrunnelse, endreBegrunnelse };
});

export { BegrunnelserProvider, useBegrunnelser };
