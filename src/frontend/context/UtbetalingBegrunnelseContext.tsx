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
import { useBehandling } from './BehandlingContext';
import { BeregningEndringType, IOppsummeringBeregning } from '../typer/beregning';

interface IProps {
    aktivVedtak?: IVedtakForBehandling;
    fagsak: IFagsak;
    hentVedtaksbrev: () => void;
}

const [UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser] = constate(
    ({ aktivVedtak, fagsak, hentVedtaksbrev }: IProps) => {
        const { axiosRequest } = useApp();

        const { settFagsak } = useFagsakRessurser();
        const { åpenBehandling } = useBehandling();
        const beregningOversikt =
            åpenBehandling.status === RessursStatus.SUKSESS
                ? åpenBehandling.data.beregningOversikt
                : [];

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
            if (beregningOversikt !== undefined) {
                const uendrede = beregningOversikt
                    .filter(
                        (b: IOppsummeringBeregning) =>
                            b.endring === BeregningEndringType.UENDRET_SATS ||
                            b.endring === BeregningEndringType.UENDRET
                    )
                    .map((satsendring: IOppsummeringBeregning) => {
                        return {
                            fom: satsendring.periodeFom,
                            tom: satsendring.periodeTom,
                        };
                    });
                const satsendringer = beregningOversikt
                    .filter(
                        (b: IOppsummeringBeregning) =>
                            b.endring === BeregningEndringType.ENDRET_SATS
                    )
                    .map((satsendring: IOppsummeringBeregning) => {
                        return {
                            fom: satsendring.periodeFom,
                            tom: satsendring.periodeTom,
                        };
                    });
                settUendrede(uendrede);
                settSatsendringer(satsendringer);
            }
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
                } else if (fagsak.status === RessursStatus.FEILET) {
                    settUtbetalingBegrunnelseFeilmelding({
                        id,
                        feilmelding: fagsak.frontendFeilmelding,
                    });
                }
            });
        };

        const settUendrede = (data: IRestUtbetalingBegrunnelse[]) => {
            håndterEndretUtbetalingBegrunnelser(
                axiosRequest<IFagsak, IRestUtbetalingBegrunnelse[]>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse/uendrede`,
                    data,
                })
            );
        };

        const settSatsendringer = (data: IRestUtbetalingBegrunnelse[]) => {
            håndterEndretUtbetalingBegrunnelser(
                axiosRequest<IFagsak, IRestUtbetalingBegrunnelse[]>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse/satsendringer`,
                    data,
                })
            );
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
