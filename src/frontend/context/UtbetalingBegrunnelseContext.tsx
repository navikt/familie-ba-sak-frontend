import { Ressurs, RessursStatus, byggTomRessurs } from '@navikt/familie-typer';
import constate from 'constate';
import React, { useState } from 'react';
import { IFagsak } from '../typer/fagsak';
import {
    IRestUtbetalingBegrunnelse,
    IVedtakForBehandling,
    IRestPutUtbetalingBegrunnelse,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser } from '../typer/vilkår';
import { useApp } from './AppContext';

interface IProps {
    fagsak: IFagsak;
    aktivVedtak: IVedtakForBehandling | undefined;
}

const [UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser] = constate(
    ({ fagsak, aktivVedtak }: IProps) => {
        const { axiosRequest } = useApp();

        const [utbetalingBegrunnelseFeilmelding, settUtbetalingBegrunnelseFeilmelding] = useState<{
            id?: number;
            feilmelding: string;
        }>();

        const [utbetalingBegrunnelser, settUtbetalingBegrunnelser] = React.useState<
            IRestUtbetalingBegrunnelse[]
        >(aktivVedtak?.utbetalingBegrunnelser ? aktivVedtak.utbetalingBegrunnelser : []);

        const [vilkårBegrunnelser, settVilkårbegrunnelser] = React.useState<
            Ressurs<Vilkårsbegrunnelser>
        >(byggTomRessurs());

        React.useEffect(() => {
            hentVilkårBegrunnelseTekster();
        }, []);

        const hentVilkårBegrunnelseTekster = () => {
            axiosRequest<Vilkårsbegrunnelser, void>({
                method: 'GET',
                url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
            }).then((vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>) => {
                settVilkårbegrunnelser(vilkårBegrunnelser);
            });
        };

        const håndterEndretUtbetalinBegrunnelser = (
            promise: Promise<Ressurs<IRestUtbetalingBegrunnelse[]>>,
            id?: number
        ) => {
            promise.then((nyeBegrunnelser: Ressurs<IRestUtbetalingBegrunnelse[]>) => {
                if (nyeBegrunnelser.status === RessursStatus.SUKSESS) {
                    settUtbetalingBegrunnelser(nyeBegrunnelser.data);
                } else if (nyeBegrunnelser.status === RessursStatus.FEILET) {
                    settUtbetalingBegrunnelseFeilmelding({
                        id,
                        feilmelding: nyeBegrunnelser.frontendFeilmelding,
                    });
                }
            });
        };

        const leggTilUtbetalingBegrunnelse = (data: IRestUtbetalingBegrunnelse) => {
            håndterEndretUtbetalinBegrunnelser(
                axiosRequest<IRestUtbetalingBegrunnelse[], IRestUtbetalingBegrunnelse>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse`,
                    data,
                })
            );
        };

        const slettUtbetalingBegrunnelse = (utbetalingBegrunnelseId: number) => {
            håndterEndretUtbetalinBegrunnelser(
                axiosRequest<IRestUtbetalingBegrunnelse[], IRestUtbetalingBegrunnelse>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse/${utbetalingBegrunnelseId}`,
                }),
                utbetalingBegrunnelseId
            );
        };

        const endreUtbetalingBegrunnelse = (
            utbetalingBegrunnelseId: number,
            data: IRestPutUtbetalingBegrunnelse
        ) => {
            håndterEndretUtbetalinBegrunnelser(
                axiosRequest<IRestUtbetalingBegrunnelse[], IRestPutUtbetalingBegrunnelse>({
                    method: 'PUT',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse/${utbetalingBegrunnelseId}`,
                    data,
                }),
                utbetalingBegrunnelseId
            );
        };

        return {
            endreUtbetalingBegrunnelse,
            hentVilkårBegrunnelseTekster,
            leggTilUtbetalingBegrunnelse,
            settUtbetalingBegrunnelser,
            slettUtbetalingBegrunnelse,
            utbetalingBegrunnelseFeilmelding,
            utbetalingBegrunnelser,
            vilkårBegrunnelser,
        };
    }
);

export { UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser };
