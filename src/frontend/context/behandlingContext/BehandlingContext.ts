import React, { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useHistory } from 'react-router';

import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggTomRessurs,
    hentDataFraRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
    ISide,
    SideId,
    sider,
    hentTrinnForBehandling,
    ITrinn,
    KontrollertStatus,
} from '../../komponenter/Felleskomponenter/Venstremeny/sider';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    IBehandling,
} from '../../typer/behandling';
import { harTilgangTilEnhet } from '../../typer/enhet';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import { hentBehandlingPåFagsak } from '../../utils/fagsak';
import { hentSideHref } from '../../utils/miljø';
import { useApp } from '../AppContext';
import { useFagsakRessurser } from '../FagsakContext';
import { saksbehandlerHarKunLesevisning } from './util';

const [BehandlingProvider, useBehandling] = createUseContext(() => {
    const [åpenBehandling, settÅpenBehandling] = useState<Ressurs<IBehandling>>(byggTomRessurs());
    const {
        harInnloggetSaksbehandlerSkrivetilgang,
        innloggetSaksbehandler,
        hentSaksbehandlerRolle,
    } = useApp();
    const { fagsak } = useFagsakRessurser();

    const history = useHistory();
    const [forrigeÅpneSide, settForrigeÅpneSide] = React.useState<ISide | undefined>(undefined);
    const [trinnPåBehandling, settTrinnPåBehandling] = React.useState<{
        [sideId: string]: ITrinn;
    }>({});

    useEffect(() => {
        const siderPåBehandling =
            åpenBehandling.status === RessursStatus.SUKSESS
                ? hentTrinnForBehandling(åpenBehandling.data)
                : [];

        const sideHref = hentSideHref(history.location.pathname);
        settTrinnPåBehandling(
            Object.entries(siderPåBehandling).reduce((acc, [sideId, side]) => {
                return {
                    ...acc,
                    [sideId]: {
                        ...side,
                        kontrollert:
                            sideHref === side.href
                                ? KontrollertStatus.KONTROLLERT
                                : KontrollertStatus.IKKE_KONTROLLERT,
                    },
                };
            }, {})
        );

        automatiskNavigeringTilSideForSteg();
    }, [åpenBehandling]);

    useEffect(() => {
        settForrigeÅpneSide(
            Object.values(sider).find((side: ISide) =>
                history.location.pathname.includes(side.href)
            )
        );
    }, [history.location.pathname]);

    const leggTilBesøktSide = (besøktSide: SideId) => {
        if (kanBeslutteVedtak) {
            settTrinnPåBehandling({
                ...trinnPåBehandling,
                [besøktSide]: {
                    ...trinnPåBehandling[besøktSide],
                    kontrollert: KontrollertStatus.KONTROLLERT,
                },
            });
        }
    };

    const settIkkeKontrollerteSiderTilManglerKontroll = () => {
        settTrinnPåBehandling(
            Object.entries(trinnPåBehandling).reduce((acc, [sideId, trinn]) => {
                if (trinn.kontrollert === KontrollertStatus.IKKE_KONTROLLERT) {
                    return {
                        ...acc,
                        [sideId]: {
                            ...trinn,
                            kontrollert: KontrollertStatus.MANGLER_KONTROLL,
                        },
                    };
                } else return acc;
            }, trinnPåBehandling)
        );
    };

    const bestemÅpenBehandling = (behandlingId: string | undefined) => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            const åpenBehandling =
                behandlingId && hentBehandlingPåFagsak(fagsak.data, parseInt(behandlingId, 10));

            if (åpenBehandling) {
                settÅpenBehandling(byggDataRessurs(åpenBehandling));
            } else if (behandlingId) {
                settÅpenBehandling(
                    byggFeiletRessurs(`Finner ikke behandling med id ${behandlingId}`)
                );
            } else {
                settÅpenBehandling(byggTomRessurs());
            }
        }
    };

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return hentDataFraRessurs(åpenBehandling)?.steg;
    };

    const erLesevisning = (sjekkTilgangTilEnhet = true): boolean => {
        const innloggetSaksbehandlerSkrivetilgang = harInnloggetSaksbehandlerSkrivetilgang();
        const saksbehandlerHarTilgangTilEnhet = harTilgangTilEnhet(
            hentDataFraRessurs(åpenBehandling)?.arbeidsfordelingPåBehandling.behandlendeEnhetId ??
                '',
            innloggetSaksbehandler?.groups ?? []
        );
        const steg = hentStegPåÅpenBehandling();

        return saksbehandlerHarKunLesevisning(
            innloggetSaksbehandlerSkrivetilgang,
            saksbehandlerHarTilgangTilEnhet,
            steg,
            sjekkTilgangTilEnhet
        );
    };

    const automatiskNavigeringTilSideForSteg = () => {
        if (
            åpenBehandling.status === RessursStatus.SUKSESS &&
            fagsak.status === RessursStatus.SUKSESS
        ) {
            const sideForSteg: ISide | undefined = finnSideForBehandlingssteg(åpenBehandling.data);

            if (
                (erViPåUdefinertFagsakSide(history.location.pathname) ||
                    erViPåUlovligSteg(history.location.pathname, sideForSteg)) &&
                sideForSteg
            ) {
                history.push(
                    `/fagsak/${fagsak.data.id}/${åpenBehandling.data.behandlingId}/${sideForSteg.href}`
                );
            }
        }
    };

    const søkersMålform: Målform =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? åpenBehandling.data.personer.find(person => person.type === PersonType.SØKER)
                  ?.målform ?? Målform.NB
            : Målform.NB;

    const kanBeslutteVedtak =
        åpenBehandling.status === RessursStatus.SUKSESS &&
        åpenBehandling.data.status === BehandlingStatus.FATTER_VEDTAK &&
        BehandlerRolle.BESLUTTER === hentSaksbehandlerRolle() &&
        innloggetSaksbehandler?.email !== åpenBehandling.data.endretAv;

    return {
        bestemÅpenBehandling,
        erLesevisning,
        forrigeÅpneSide,
        hentStegPåÅpenBehandling,
        leggTilBesøktSide,
        settIkkeKontrollerteSiderTilManglerKontroll,
        søkersMålform,
        trinnPåBehandling,
        åpenBehandling,
    };
});

export { BehandlingProvider, useBehandling };
