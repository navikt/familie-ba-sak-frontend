import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import constate from 'constate';
import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import { FeltState, ok, Valideringsstatus } from '@navikt/familie-skjema';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { Behandlingstype } from '../typer/behandling';
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
    behandlingsType: Behandlingstype;
}

const [FritekstVedtakBegrunnelserProvider, useFritekstVedtakBegrunnelser] = constate(
    ({ vedtaksperiode, behandlingsType }: IProps) => {
        const { fagsak, settFagsak } = useFagsakRessurser();
        const { vedtakBegrunnelser } = useVedtakBegrunnelser();
        const { request } = useHttp();

        const [redigerbarefritekster, settRedigerbarefritekster] = useState<Fritekster>({});
        const [fritekster, settFritekster] = useState<Fritekster>({});
        const [idPaSistOpprettetFritekst, settIdPaSistOpprettetFritekst] = useState<number>();

        const [ekspandertFritekst, settEkspandertFritekst] = useState(
            behandlingsType === Behandlingstype.FØRSTEGANGSBEHANDLING
        );

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
            const idPåNyFritekste = genererIdBasertPåAndreFritekster();
            settRedigerbarefritekster({
                ...redigerbarefritekster,
                [idPåNyFritekste]: lagInitiellFritekst(''),
            });
            settIdPaSistOpprettetFritekst(idPåNyFritekste);
        };

        const onSubmit = () => {
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
                    påvirkerSystemLaster: true,
                })
                    .then((hentetFagsak: Ressurs<IFagsak>) => {
                        settFagsak(hentetFagsak);
                    })
                    .catch((_error: AxiosError) => {
                        settFagsak(byggFeiletRessurs('Ukjent ved innhenting av fagsak'));
                    });
            }
        };

        const toggleForm = (visAlert: boolean) => {
            if (ekspandertFritekst && visAlert && !deepEqual(redigerbarefritekster, fritekster)) {
                alert('Fritekst har endringer som ikke er lagret!');
            } else {
                settEkspandertFritekst(!ekspandertFritekst);
                settRedigerbarefritekster({ ...fritekster });
            }
        };

        return {
            redigerbarefritekster,
            fritekster,
            ekspandertFritekst,
            settEkspandertFritekst,
            leggTilRedigerbareFritekst,
            onSubmit,
            settRedigerbarefritekster,
            settFritekster,
            idPaSistOpprettetFritekst,
            toggleForm,
        };
    }
);

export { FritekstVedtakBegrunnelserProvider, useFritekstVedtakBegrunnelser };
