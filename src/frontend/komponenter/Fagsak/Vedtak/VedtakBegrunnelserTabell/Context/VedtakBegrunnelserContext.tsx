import React, { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { IFagsak } from '../../../../../typer/fagsak';
import {
    IRestAvslagbegrunnelser,
    IRestDeleteVedtakBegrunnelser,
    IRestPostVedtakBegrunnelse,
    IRestVedtakBegrunnelse,
    IVedtakForBehandling,
    VedtakBegrunnelseType,
} from '../../../../../typer/vedtak';
import { lagPeriodeId } from '../../../../../utils/kalender';

export interface IVedtakBegrunnelseSubmit {
    periodeId: string;
    feilmelding: string;
    status: RessursStatus;
}

const initialVedtakBegrunnelseSubmit = {
    periodeId: '',
    feilmelding: '',
    status: RessursStatus.IKKE_HENTET,
};

interface IProps {
    aktivVedtak?: IVedtakForBehandling;
    fagsak: IFagsak;
}

const [VedtakBegrunnelserProvider, useVedtakBegrunnelser] = constate(
    ({ aktivVedtak, fagsak }: IProps) => {
        const { request } = useHttp();

        const { settFagsak } = useFagsakRessurser();

        const [vedtakBegrunnelseSubmit, settVedtakBegrunnelseSubmit] =
            useState<IVedtakBegrunnelseSubmit>(initialVedtakBegrunnelseSubmit);

        const [vedtakBegrunnelser, settVedtakBegrunnelser] = React.useState<
            IRestVedtakBegrunnelse[]
        >([]);

        const [avslagBegrunnelser, settAvslagBegrunnelser] = React.useState<
            IRestAvslagbegrunnelser[]
        >([]);

        useEffect(() => {
            if (aktivVedtak) {
                settVedtakBegrunnelser(aktivVedtak.begrunnelser);
                settAvslagBegrunnelser(aktivVedtak.avslagBegrunnelser);
            }
        }, [aktivVedtak]);

        const håndterEndringerPåVedtakBegrunnelser = (
            promise: Promise<Ressurs<IFagsak>>,
            periodeId: string
        ) => {
            settVedtakBegrunnelseSubmit({
                periodeId,
                feilmelding: '',
                status: RessursStatus.HENTER,
            });
            promise.then((fagsak: Ressurs<IFagsak>) => {
                if (fagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(fagsak);
                    settVedtakBegrunnelseSubmit(initialVedtakBegrunnelseSubmit);
                } else if (
                    fagsak.status === RessursStatus.FEILET ||
                    fagsak.status === RessursStatus.FUNKSJONELL_FEIL ||
                    fagsak.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVedtakBegrunnelseSubmit({
                        periodeId,
                        feilmelding: fagsak.frontendFeilmelding,
                        status: RessursStatus.FEILET,
                    });
                }
            });
        };

        const leggTilVedtakBegrunnelse = (postVedtakBegrunnelse: IRestPostVedtakBegrunnelse) => {
            håndterEndringerPåVedtakBegrunnelser(
                request<IRestPostVedtakBegrunnelse, IFagsak>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/begrunnelser`,
                    data: postVedtakBegrunnelse,
                }),
                lagPeriodeId({
                    fom: postVedtakBegrunnelse.fom,
                    tom: postVedtakBegrunnelse.tom,
                })
            );
        };

        const slettVedtakBegrunnelse = (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
            håndterEndringerPåVedtakBegrunnelser(
                request<void, IFagsak>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/begrunnelser/${vedtakBegrunnelse.id}`,
                }),
                lagPeriodeId({ fom: vedtakBegrunnelse.fom, tom: vedtakBegrunnelse.tom })
            );
        };

        const slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper = (
            fom: string,
            vedtakbegrunnelseTyper: VedtakBegrunnelseType[],
            tom?: string
        ) => {
            håndterEndringerPåVedtakBegrunnelser(
                request<IRestDeleteVedtakBegrunnelser, IFagsak>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/begrunnelser/perioder-vedtaksbegrunnelsetyper`,
                    data: {
                        fom,
                        tom,
                        vedtakbegrunnelseTyper,
                    },
                }),
                lagPeriodeId({ fom, tom })
            );
        };

        return {
            avslagBegrunnelser,
            leggTilVedtakBegrunnelse,
            slettVedtakBegrunnelse,
            slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper,
            vedtakBegrunnelseSubmit,
            vedtakBegrunnelser,
        };
    }
);

export { VedtakBegrunnelserProvider, useVedtakBegrunnelser };
