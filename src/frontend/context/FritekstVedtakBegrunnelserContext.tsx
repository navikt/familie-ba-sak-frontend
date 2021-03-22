import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import constate from 'constate';
import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import { FeltState, ok, Valideringsstatus } from '@navikt/familie-skjema';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IFagsak } from '../typer/fagsak';
import {
    IRestPostFritekstVedtakBegrunnelser,
    IRestVedtakBegrunnelse,
    VedtakBegrunnelse,
} from '../typer/vedtak';
import { Vedtaksperiode } from '../typer/vedtaksperiode';
import { useFagsakRessurser } from './FagsakContext';
import { useVedtakBegrunnelser } from './VedtakBegrunnelserContext';

interface Fritekster {
    [key: string]: FeltState<string>;
}

interface IProps {
    vedtaksperiode: Vedtaksperiode;
}

export enum FritekstSubmit {
    POST,
    NONE,
}

const [FritekstVedtakBegrunnelserProvider, useFritekstVedtakBegrunnelser] = constate(
    ({ vedtaksperiode }: IProps) => {
        const { fagsak, settFagsak } = useFagsakRessurser();
        const { vedtakBegrunnelser } = useVedtakBegrunnelser();
        const { request } = useHttp();
        const { ekspandertBegrunnelse, settEkspandertBegrunnelse } = useVedtakBegrunnelser();

        const [redigerbarefritekster, settRedigerbarefritekster] = useState<Fritekster>({});
        const [fritekster, settFritekster] = useState<Fritekster>({});
        const [fritekstSubmit, settFritekstSubmit] = useState<FritekstSubmit>(FritekstSubmit.NONE);
        const [idPåSistOpprettetFritekst, settIdPåSistOpprettetFritekst] = useState<number>();

        useEffect(() => {
            const vedtakBegrunnelserForPeriode = vedtakBegrunnelser
                .filter((vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                    return (
                        vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                        vedtakBegrunnelse.tom === vedtaksperiode.periodeTom &&
                        vedtakBegrunnelse.begrunnelse === VedtakBegrunnelse.OPPHØR_FRITEKST
                    );
                })
                .reduce(
                    (acc: Fritekster, vedtakBegrunnelse: IRestVedtakBegrunnelse) => ({
                        ...acc,
                        [vedtakBegrunnelse.id ?? 0]: lagInitiellFritekst(
                            vedtakBegrunnelse.brevBegrunnelse ?? ''
                        ),
                    }),
                    {}
                );
            settRedigerbarefritekster(vedtakBegrunnelserForPeriode);
            settFritekster(vedtakBegrunnelserForPeriode);
        }, [vedtakBegrunnelser]);

        const genererIdBasertPåAndreFritekster = () => {
            return (
                Math.max(...Object.keys(redigerbarefritekster).map(key => parseInt(key, 10))) + 1
            );
        };

        const lagInitiellFritekst = (initiellVerdi: string) => ({
            feilmelding: '',
            verdi: initiellVerdi,
            valider: (felt: FeltState<string>) => ok(felt),
            valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        });

        const leggTilRedigerbareFritekst = () => {
            const idPåNyFritekst = genererIdBasertPåAndreFritekster();
            settRedigerbarefritekster({
                ...redigerbarefritekster,
                [idPåNyFritekst]: lagInitiellFritekst(''),
            });
            settIdPåSistOpprettetFritekst(idPåNyFritekst);
        };

        const onSubmit = () => {
            settFritekstSubmit(FritekstSubmit.POST);

            if (fagsak.status === RessursStatus.SUKSESS) {
                request<IRestPostFritekstVedtakBegrunnelser, IFagsak>({
                    method: 'POST',
                    url: `/familie-ba-sak/api/fagsaker/${fagsak.data.id}/vedtak/fritekster`,
                    data: {
                        fom: vedtaksperiode.periodeFom,
                        tom: vedtaksperiode.periodeTom,
                        fritekster: Object.values(redigerbarefritekster).map(
                            fritekst => fritekst.verdi
                        ),
                        vedtaksperiodetype: vedtaksperiode.vedtaksperiodetype,
                    },
                })
                    .then((hentetFagsak: Ressurs<IFagsak>) => {
                        settFritekstSubmit(FritekstSubmit.NONE);
                        settFagsak(hentetFagsak);
                    })
                    .catch((_error: AxiosError) => {
                        settFagsak(byggFeiletRessurs('Ukjent ved innhenting av fagsak'));
                    });
            }
        };

        const toggleForm = (visAlert: boolean) => {
            if (
                ekspandertBegrunnelse &&
                visAlert &&
                !deepEqual(redigerbarefritekster, fritekster)
            ) {
                alert('Fritekst har endringer som ikke er lagret!');
            } else {
                settEkspandertBegrunnelse(!ekspandertBegrunnelse);
                settRedigerbarefritekster({ ...fritekster });
            }
        };

        return {
            redigerbarefritekster,
            fritekster,
            leggTilRedigerbareFritekst,
            onSubmit,
            settRedigerbarefritekster,
            settFritekster,
            settFritekstSubmit,
            fritekstSubmit,
            idPaSistOpprettetFritekst: idPåSistOpprettetFritekst,
            toggleForm,
        };
    }
);

export { FritekstVedtakBegrunnelserProvider, useFritekstVedtakBegrunnelser };
