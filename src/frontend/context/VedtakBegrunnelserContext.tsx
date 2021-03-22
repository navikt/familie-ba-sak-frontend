import React, { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { Behandlingstype } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IPeriode, lagPeriodeId } from '../typer/periode';
import {
    IRestAvslagbegrunnelser,
    IRestDeleteVedtakBegrunnelser,
    IRestPostVedtakBegrunnelse,
    IRestVedtakBegrunnelse,
    IVedtakForBehandling,
    VedtakBegrunnelseType,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser } from '../typer/vilkår';
import { useFagsakRessurser } from './FagsakContext';
import { useApp } from './AppContext';
import { ToggleNavn } from '../typer/toggles';

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
    behandlingstype: Behandlingstype;
}

const [VedtakBegrunnelserProvider, useVedtakBegrunnelser] = constate(
    ({ aktivVedtak, fagsak, behandlingstype }: IProps) => {
        const { request } = useHttp();
        const { toggles } = useApp();

        const { settFagsak } = useFagsakRessurser();

        const [
            vedtakBegrunnelseSubmit,
            settVedtakBegrunnelseSubmit,
        ] = useState<IVedtakBegrunnelseSubmit>(initialVedtakBegrunnelseSubmit);

        const [vedtakBegrunnelser, settVedtakBegrunnelser] = React.useState<
            IRestVedtakBegrunnelse[]
        >([]);

        const [vilkårBegrunnelser, settVilkårbegrunnelser] = React.useState<
            Ressurs<Vilkårsbegrunnelser>
        >(byggTomRessurs());

        const [ekspandertBegrunnelse, settEkspandertBegrunnelse] = useState(
            behandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
        );

        const [avslagBegrunnelser, settAvslagBegrunnelser] = React.useState<
            IRestAvslagbegrunnelser[]
        >([]);

        useEffect(() => {
            hentVilkårBegrunnelseTekster();
        }, []);

        useEffect(() => {
            if (aktivVedtak) {
                settVedtakBegrunnelser(aktivVedtak.begrunnelser);
                if (toggles[ToggleNavn.visAvslag]) {
                    settAvslagBegrunnelser(aktivVedtak.avslagBegrunnelser);
                }
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

        const slettVedtakBegrunnelserForPeriode = (fom: string, tom?: string) => {
            håndterEndringerPåVedtakBegrunnelser(
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
            avslagBegrunnelser,
            leggTilVedtakBegrunnelse,
            slettVedtakBegrunnelse,
            slettVedtakBegrunnelserForPeriode,
            slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper,
            vedtakBegrunnelseSubmit,
            vedtakBegrunnelser,
            vilkårBegrunnelser,
            ekspandertBegrunnelse,
            settEkspandertBegrunnelse,
        };
    }
);

export { VedtakBegrunnelserProvider, useVedtakBegrunnelser };
