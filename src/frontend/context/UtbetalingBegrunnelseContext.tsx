import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import constate from 'constate';
import React, { useEffect, useState } from 'react';
import { IFagsak } from '../typer/fagsak';
import {
    IRestPutUtbetalingBegrunnelse,
    IRestUtbetalingBegrunnelse,
    IVedtakForBehandling,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser } from '../typer/vilkår';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

interface IProps {
    aktivVedtak?: IVedtakForBehandling;
    fagsak: IFagsak;
    hentVedtaksbrev: () => void;
}

const [UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser] = constate(
    ({ aktivVedtak, fagsak, hentVedtaksbrev }: IProps) => {
        const { axiosRequest } = useApp();

        const { settFagsak } = useFagsakRessurser();

        const [utbetalingBegrunnelseFeilmelding, settUtbetalingBegrunnelseFeilmelding] = useState<{
            id?: number;
            feilmelding: string;
        }>({ id: undefined, feilmelding: '' });

        const [utbetalingBegrunnelser, settUtbetalingBegrunnelser] = React.useState<
            IRestUtbetalingBegrunnelse[]
        >([]);

        const [vilkårBegrunnelser, settVilkårbegrunnelser] = React.useState<
            Ressurs<Vilkårsbegrunnelser>
        >(byggTomRessurs());

        useEffect(() => {
            hentVilkårBegrunnelseTekster();
        }, []);

        useEffect(() => {
            if (aktivVedtak) {
                settUtbetalingBegrunnelser(aktivVedtak.utbetalingBegrunnelser);
            }
        }, [aktivVedtak]);

        const hentVilkårBegrunnelseTekster = () => {
            axiosRequest<Vilkårsbegrunnelser, void>({
                method: 'GET',
                url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
            }).then((vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>) => {
                settVilkårbegrunnelser(vilkårBegrunnelser);
            });
        };

        const håndterEndretUtbetalingBegrunnelser = (
            promise: Promise<Ressurs<IFagsak>>,
            id?: number
        ) => {
            promise.then((fagsak: Ressurs<IFagsak>) => {
                if (fagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(fagsak);
                    settUtbetalingBegrunnelseFeilmelding({ id, feilmelding: '' });
                    hentVedtaksbrev();
                } else if (fagsak.status === RessursStatus.FUNKSJONELL_FEIL) {
                    settUtbetalingBegrunnelseFeilmelding({
                        id,
                        feilmelding: fagsak.frontendFeilmelding,
                    });
                }
            });
        };

        const leggTilUtbetalingBegrunnelse = (data: IRestUtbetalingBegrunnelse) => {
            håndterEndretUtbetalingBegrunnelser(
                axiosRequest<IFagsak, IRestUtbetalingBegrunnelse>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse`,
                    data,
                })
            );
        };

        const slettUtbetalingBegrunnelse = (utbetalingBegrunnelseId: number) => {
            håndterEndretUtbetalingBegrunnelser(
                axiosRequest<IFagsak, IRestUtbetalingBegrunnelse>({
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
            håndterEndretUtbetalingBegrunnelser(
                axiosRequest<IFagsak, IRestPutUtbetalingBegrunnelse>({
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
