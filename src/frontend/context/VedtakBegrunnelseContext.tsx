import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import constate from 'constate';
import React from 'react';
import { IFagsak } from '../typer/fagsak';
import { IRestStønadBrevBegrunnelse, IVedtakForBehandling } from '../typer/vedtak';
import { Vilkårsbegrunnelser } from '../typer/vilkår';
import { useApp } from './AppContext';

interface IProps {
    fagsak: IFagsak;
    aktivVedtak: IVedtakForBehandling | undefined;
}

const [VedtakBegrunnelserProvider, useBegrunnelser] = constate(
    ({ fagsak, aktivVedtak }: IProps) => {
        const { axiosRequest } = useApp();

        const [begrunnelser, settBegrunnelser] = React.useState<IRestStønadBrevBegrunnelse[]>(
            aktivVedtak?.stønadBrevBegrunnelser ? aktivVedtak.stønadBrevBegrunnelser : []
        );

        console.log(begrunnelser);

        const [vilkårBegrunnelser, settVilkårbegrunnelser] = React.useState<Vilkårsbegrunnelser>();

        React.useEffect(() => {
            hentBegrunnelseTekster();
        }, []);

        const hentBegrunnelseTekster = () => {
            axiosRequest<Vilkårsbegrunnelser, void>({
                method: 'GET',
                url: `/familie-ba-sak/api/vilkaarsvurdering//vilkaarsbegrunnelser`,
            })
                .then((begrunnelser: Ressurs<Vilkårsbegrunnelser>) => {
                    if (begrunnelser.status === RessursStatus.SUKSESS) {
                        settVilkårbegrunnelser(begrunnelser.data);
                    } else if (begrunnelser.status === RessursStatus.FEILET) {
                        //TODO: Håndter feil
                    } else {
                        //TODO: Håndter feil
                    }
                })
                .catch(() => {
                    //TODO: Håndter feil
                });
        };

        const håndterEndretBegrunnelser = (
            promise: Promise<Ressurs<IRestStønadBrevBegrunnelse[]>>
        ) => {
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
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/stonad-brev-begrunnelse`,
                    data,
                })
            );
        };

        const endreBegrunnelse = (data: IRestStønadBrevBegrunnelse) => {
            håndterEndretBegrunnelser(
                axiosRequest<IRestStønadBrevBegrunnelse[], IRestStønadBrevBegrunnelse>({
                    method: 'PUT',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/stonad-brev-begrunnelse`,
                    data,
                })
            );
        };

        return {
            begrunnelser,
            settBegrunnelser,
            leggTilBegrunnelse,
            endreBegrunnelse,
            hentBegrunnelseTekster,
            vilkårBegrunnelser,
        };
    }
);

export { VedtakBegrunnelserProvider, useBegrunnelser };
