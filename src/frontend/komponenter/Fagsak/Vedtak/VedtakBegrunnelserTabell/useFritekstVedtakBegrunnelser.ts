import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import { FeltState, ok, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus, Ressurs, byggFeiletRessurs } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IFagsak } from '../../../../typer/fagsak';
import {
    IRestPostFritekstVedtakBegrunnelser,
    IRestVedtakBegrunnelse,
    VedtakBegrunnelse,
} from '../../../../typer/vedtak';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';

interface Fritekster {
    [key: string]: FeltState<string>;
}

const useFritekstVedtakBegrunnelser = (vedtaksperiode: Vedtaksperiode) => {
    const { fagsak, settFagsak } = useFagsakRessurser();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();
    const { request } = useHttp();

    const [redigerbarefritekster, settRedigerbarefritekster] = useState<Fritekster>({});
    const [fritekster, settFritekster] = useState<Fritekster>({});

    useEffect(() => {
        settRedigerbarefritekster(
            vedtakBegrunnelser
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
                )
        );
    }, [vedtakBegrunnelser]);

    useEffect(() => {
        settFritekster(
            vedtakBegrunnelser
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
                )
        );
    }, [vedtakBegrunnelser]);

    const genererIdBasertPåAndreFritekster = () => {
        return Math.max(...Object.keys(fritekster).map(key => parseInt(key, 10))) + 1;
    };

    const lagInitiellFritekst = (initiellVerdi: string) => ({
        feilmelding: '',
        verdi: initiellVerdi,
        valider: (felt: FeltState<string>) => ok(felt),
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
    });

    const leggTilRedigerbareFritekst = () => {
        settRedigerbarefritekster({
            ...redigerbarefritekster,
            [genererIdBasertPåAndreFritekster()]: lagInitiellFritekst(''),
        });
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

    return {
        redigerbarefritekster,
        fritekster,
        leggTilRedigerbareFritekst,
        onSubmit,
        settRedigerbarefritekster,
        settFritekster,
    };
};

export default useFritekstVedtakBegrunnelser;
