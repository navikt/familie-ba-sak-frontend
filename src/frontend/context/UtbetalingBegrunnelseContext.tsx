import React, { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IFagsak } from '../typer/fagsak';
import { IPeriode, lagPeriodeId } from '../typer/periode';
import {
    IRestPostUtbetalingBegrunnelse,
    IRestUtbetalingBegrunnelse,
    IVedtakForBehandling,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser } from '../typer/vilkår';
import { useFagsakRessurser } from './FagsakContext';

export interface IUtbetalingBegrunnelseSubmit {
    periodeId: string;
    feilmelding: string;
    status: RessursStatus;
}

const initialUtbetalingBegrunnelseSubmit = {
    periodeId: '',
    feilmelding: '',
    status: RessursStatus.IKKE_HENTET,
};

interface IProps {
    aktivVedtak?: IVedtakForBehandling;
    fagsak: IFagsak;
}

const [UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser] = constate(
    ({ aktivVedtak, fagsak }: IProps) => {
        const { request } = useHttp();

        const { settFagsak } = useFagsakRessurser();

        const [utbetalingBegrunnelseSubmit, settUtbetalingBegrunnelseSubmit] = useState<
            IUtbetalingBegrunnelseSubmit
        >(initialUtbetalingBegrunnelseSubmit);

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
                påvirkerSystemLaster: true,
            }).then((vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>) => {
                settVilkårbegrunnelser(vilkårBegrunnelser);
            });
        };

        const håndterEndretUtbetalingBegrunnelser = (
            promise: Promise<Ressurs<IFagsak>>,
            periodeId: string
        ) => {
            settUtbetalingBegrunnelseSubmit({
                periodeId,
                feilmelding: '',
                status: RessursStatus.HENTER,
            });
            promise.then((fagsak: Ressurs<IFagsak>) => {
                if (fagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(fagsak);
                    settUtbetalingBegrunnelseSubmit(initialUtbetalingBegrunnelseSubmit);
                } else if (
                    fagsak.status === RessursStatus.FEILET ||
                    fagsak.status === RessursStatus.FUNKSJONELL_FEIL ||
                    fagsak.status === RessursStatus.IKKE_TILGANG
                ) {
                    settUtbetalingBegrunnelseSubmit({
                        periodeId,
                        feilmelding: fagsak.frontendFeilmelding,
                        status: RessursStatus.FEILET,
                    });
                }
            });
        };

        const leggTilUtbetalingBegrunnelse = (
            utbetalingBegrunnelse: IRestPostUtbetalingBegrunnelse
        ) => {
            håndterEndretUtbetalingBegrunnelser(
                request<IRestPostUtbetalingBegrunnelse, IFagsak>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/begrunnelser`,
                    data: utbetalingBegrunnelse,
                }),
                lagPeriodeId({ fom: utbetalingBegrunnelse.fom, tom: utbetalingBegrunnelse.tom })
            );
        };

        const slettUtbetalingBegrunnelse = (utbetalingBegrunnelse: IRestUtbetalingBegrunnelse) => {
            håndterEndretUtbetalingBegrunnelser(
                request<void, IFagsak>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/utbetaling-begrunnelse/${utbetalingBegrunnelse.id}`,
                }),
                lagPeriodeId({ fom: utbetalingBegrunnelse.fom, tom: utbetalingBegrunnelse.tom })
            );
        };

        const slettUtbetalingBegrunnelserForPeriode = (fom: string, tom?: string) => {
            håndterEndretUtbetalingBegrunnelser(
                request<IPeriode, IFagsak>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/begrunnelser/perioder`,
                    data: {
                        fom,
                        tom,
                    },
                }),
                lagPeriodeId({ fom, tom })
            );
        };

        return {
            hentVilkårBegrunnelseTekster,
            leggTilUtbetalingBegrunnelse,
            settUtbetalingBegrunnelser,
            slettUtbetalingBegrunnelse,
            slettUtbetalingBegrunnelserForPeriode,
            utbetalingBegrunnelseSubmit,
            utbetalingBegrunnelser,
            vilkårBegrunnelser,
        };
    }
);

export { UtbetalingBegrunnelserProvider, useUtbetalingBegrunnelser };
