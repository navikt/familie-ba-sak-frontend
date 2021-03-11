import React, { useEffect, useState } from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IFagsak } from '../typer/fagsak';
import { IPeriode, lagPeriodeId } from '../typer/periode';
import {
    IRestDeleteVedtakBegrunnelser,
    IRestPostAvslagBegrunnelse,
    IRestPostVedtakBegrunnelse,
    IRestVedtakBegrunnelse,
    IVedtakForBehandling,
    VedtakBegrunnelseType,
} from '../typer/vedtak';
import { Vilkårsbegrunnelser, VilkårType } from '../typer/vilkår';
import { useFagsakRessurser } from './FagsakContext';

export interface IVedtakBegrunnelseSubmit {
    komponentId: string;
    feilmelding: string;
    status: RessursStatus;
}

const initialVedtakBegrunnelseSubmit = {
    komponentId: '',
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

        useEffect(() => {
            hentVilkårBegrunnelseTekster();
        }, []);

        useEffect(() => {
            if (aktivVedtak) {
                settVedtakBegrunnelser(aktivVedtak.begrunnelser);
            }
        }, [aktivVedtak]);

        const lagKomponentId = (periode: IPeriode, personident?: string, vilkårType?: VilkårType) =>
            `multiselect
            _${personident ?? `utenperson`}
            _${vilkårType ?? `utenvilkår`}
            _${lagPeriodeId(periode)}`;

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
            submitId: string
        ) => {
            settVedtakBegrunnelseSubmit({
                komponentId: submitId,
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
                        komponentId: submitId,
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
                lagKomponentId({ fom: postVedtakBegrunnelse.fom, tom: postVedtakBegrunnelse.tom })
            );
        };

        const slettVedtakBegrunnelse = (vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
            håndterEndringerPåVedtakBegrunnelser(
                request<void, IFagsak>({
                    method: 'DELETE',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/begrunnelser/${vedtakBegrunnelse.id}`,
                }),
                lagKomponentId({ fom: vedtakBegrunnelse.fom, tom: vedtakBegrunnelse.tom })
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
                lagKomponentId({ fom, tom })
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
                lagKomponentId({ fom, tom })
            );
        };

        const oppdaterAvslagBegrunnelser = (postAvslagBegrunnelser: IRestPostAvslagBegrunnelse) => {
            håndterEndringerPåVedtakBegrunnelser(
                request<IRestPostAvslagBegrunnelse, IFagsak>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/vedtak/avslagbegrunnelser`,
                    data: postAvslagBegrunnelser,
                }),
                lagKomponentId(
                    { fom: postAvslagBegrunnelser.fom, tom: postAvslagBegrunnelser.tom },
                    postAvslagBegrunnelser.personIdent,
                    postAvslagBegrunnelser.vilkår
                )
            );
        };

        return {
            hentVilkårBegrunnelseTekster,
            leggTilVedtakBegrunnelse,
            slettVedtakBegrunnelse,
            slettVedtakBegrunnelserForPeriode,
            slettVedtakBegrunnelserForPeriodeOgVedtakbegrunnelseTyper,
            oppdaterAvslagBegrunnelser,
            vedtakBegrunnelseSubmit,
            vedtakBegrunnelser,
            vilkårBegrunnelser,
            lagKomponentId,
        };
    }
);

export { VedtakBegrunnelserProvider, useVedtakBegrunnelser };
