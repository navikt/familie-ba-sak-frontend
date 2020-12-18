import React, { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IFagsak } from '../typer/fagsak';
import {
    IRestPutUtbetalingBegrunnelse,
    IRestUtbetalingBegrunnelse,
    IVedtakForBehandling,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser } from '../typer/vilkår';
import { useFagsakRessurser } from './FagsakContext';

interface IProps {
    aktivVedtak?: IVedtakForBehandling;
    fagsak: IFagsak;
}

const [UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser] = constate(
    ({ aktivVedtak, fagsak }: IProps) => {
        const { request } = useHttp();

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
            request<void, Vilkårsbegrunnelser>({
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
                } else if (
                    fagsak.status === RessursStatus.FEILET ||
                    fagsak.status === RessursStatus.FUNKSJONELL_FEIL
                ) {
                    settUtbetalingBegrunnelseFeilmelding({
                        id,
                        feilmelding: fagsak.frontendFeilmelding,
                    });
                }
            });
        };

        const leggTilUtbetalingBegrunnelse = (data: IRestUtbetalingBegrunnelse) => {
            håndterEndretUtbetalingBegrunnelser(
                request<IRestUtbetalingBegrunnelse, IFagsak>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse`,
                    data,
                })
            );
        };

        const slettUtbetalingBegrunnelse = (utbetalingBegrunnelseId: number) => {
            håndterEndretUtbetalingBegrunnelser(
                request<IRestUtbetalingBegrunnelse, IFagsak>({
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
                request<IRestPutUtbetalingBegrunnelse, IFagsak>({
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
