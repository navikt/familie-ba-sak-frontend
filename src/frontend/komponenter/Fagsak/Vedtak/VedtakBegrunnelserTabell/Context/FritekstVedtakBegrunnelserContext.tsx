import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import constate from 'constate';
import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import { FeltState, ok, Valideringsstatus } from '@navikt/familie-skjema';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { Fritekster } from '../../../../../typer/begrunnelser';
import { Behandlingstype } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { IGrunnlagPerson, PersonType } from '../../../../../typer/person';
import { Målform } from '../../../../../typer/søknad';
import {
    IRestPostFritekstVedtakBegrunnelser,
    IRestVedtakBegrunnelse,
    VedtakBegrunnelse,
} from '../../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import { useVedtakBegrunnelser } from './VedtakBegrunnelserContext';

export interface FriteksterFeilmelding {
    [key: string]: string;
}

interface IProps {
    vedtaksperiode: Vedtaksperiode;
    behandlingstype: Behandlingstype;
}

export enum FritekstSubmit {
    POST,
    NONE,
}

const [FritekstVedtakBegrunnelserProvider, useFritekstVedtakBegrunnelser] = constate(
    ({ vedtaksperiode, behandlingstype }: IProps) => {
        const { åpenBehandling } = useBehandling();
        const { fagsak, settFagsak } = useFagsakRessurser();
        const { vedtakBegrunnelser } = useVedtakBegrunnelser();
        const { request } = useHttp();

        // ekspandertBegrunnelse borde leget i VedtakBegrunnelserContext men ettersom den dekker alle
        // ekspanderte vedtakbegrunnelser så virket ikke det og derfor ligger den her.
        const [ekspandertBegrunnelse, settEkspandertBegrunnelse] = useState(
            behandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
        );
        const [redigerbarefritekster, settRedigerbarefritekster] = useState<Fritekster>({});
        const [fritekster, settFritekster] = useState<Fritekster>({});
        const [fritekstSubmit, settFritekstSubmit] = useState<FritekstSubmit>(FritekstSubmit.NONE);
        const [idPåSistOpprettetFritekst, settIdPåSistOpprettetFritekst] = useState<number>();

        const [feilMelding, settFeilMelding] = useState<FriteksterFeilmelding>({});

        useEffect(() => {
            const vedtakBegrunnelserForPeriode = vedtakBegrunnelser
                .filter((vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
                    return (
                        vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                        vedtakBegrunnelse.tom === vedtaksperiode.periodeTom &&
                        vedtakBegrunnelse.begrunnelse ===
                            vedtakBegrunnelsenForPeriodeType(vedtaksperiode.vedtaksperiodetype)
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

        const vedtakBegrunnelsenForPeriodeType = (vedtaksperiodetype: Vedtaksperiodetype) => {
            switch (vedtaksperiodetype) {
                case Vedtaksperiodetype.OPPHØR:
                    return VedtakBegrunnelse.OPPHØR_FRITEKST;
                case Vedtaksperiodetype.AVSLAG:
                    return VedtakBegrunnelse.AVSLAG_FRITEKST;
                case Vedtaksperiodetype.UTBETALING:
                    return VedtakBegrunnelse.REDUKSJON_FRITEKST;
                case Vedtaksperiodetype.FORTSATT_INNVILGET:
                    return VedtakBegrunnelse.FORTSATT_INNVILGET_FRITEKST;
            }
        };

        const genererIdBasertPåAndreFritekster = () => {
            if (Object.keys(redigerbarefritekster).length > 0) {
                return (
                    Math.max(...Object.keys(redigerbarefritekster).map(key => parseInt(key, 10))) +
                    1
                );
            } else {
                return 1;
            }
        };

        const lagInitiellFritekst = (initiellVerdi: string) => ({
            feilmelding: '',
            verdi: initiellVerdi,
            valider: (felt: FeltState<string>) => ok(felt),
            valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        });

        const leggTilRedigerbareFritekst = () => {
            if (Object.keys(redigerbarefritekster).length >= 3) {
                settFeilMelding({
                    ...feilMelding,
                    [`legg-til-fritekst`]: 'Du har nådd maks antall kulepunkter: 3',
                });
                return;
            }
            settFeilMelding({});

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
                        settFagsak(byggFeiletRessurs('Ukjent ved lagring av fritekster'));
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

        const personer =
            åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

        const søkersMålform = () => {
            return (
                personer.find((person: IGrunnlagPerson) => {
                    return person.type === PersonType.SØKER;
                })?.målform ?? Målform.NB
            );
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
            idPåSistOpprettetFritekst,
            ekspandertBegrunnelse,
            settEkspandertBegrunnelse,
            toggleForm,
            feilMelding,
            settFeilMelding,
            søkersMålform,
        };
    }
);

export { FritekstVedtakBegrunnelserProvider, useFritekstVedtakBegrunnelser };
