import React, { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useHistory } from 'react-router';

import { byggTomRessurs, hentDataFraRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
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
    Behandlingstype,
    BehandlingÅrsak,
    IBehandling,
} from '../../typer/behandling';
import { harTilgangTilEnhet } from '../../typer/enhet';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import { hentSideHref } from '../../utils/miljø';
import { useApp } from '../AppContext';
import { useFagsakRessurser } from '../FagsakContext';
import useBehandlingApi from './useBehandlingApi';
import useBehandlingssteg from './useBehandlingssteg';
import { saksbehandlerHarKunLesevisning } from './util';

const [BehandlingProvider, useBehandling] = createUseContext(() => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { hentMinimalFagsak } = useFagsakRessurser();
    const [åpenBehandling, privatSettÅpenBehandling] = useState<Ressurs<IBehandling>>(
        byggTomRessurs()
    );

    const settÅpenBehandling = (behandling: Ressurs<IBehandling>, oppdaterMinimalFagsak = true) => {
        if (oppdaterMinimalFagsak && fagsakId) {
            hentMinimalFagsak(fagsakId, false);
        }
        privatSettÅpenBehandling(behandling);
        settBehandlingsstegSubmitressurs(byggTomRessurs());
    };

    const {
        submitRessurs: behandlingsstegSubmitressurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
        sendTilBeslutterNesteOnClick,
        settSubmitRessurs: settBehandlingsstegSubmitressurs,
    } = useBehandlingssteg(settÅpenBehandling, hentDataFraRessurs(åpenBehandling));

    const { opprettBehandling, logg, hentLogg, oppdaterRegisteropplysninger } = useBehandlingApi(
        åpenBehandling,
        settÅpenBehandling
    );

    const {
        harInnloggetSaksbehandlerSkrivetilgang,
        innloggetSaksbehandler,
        hentSaksbehandlerRolle,
    } = useApp();

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

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return hentDataFraRessurs(åpenBehandling)?.steg;
    };

    const erLesevisning = (sjekkTilgangTilEnhet = true): boolean => {
        const åpenBehandlingData = hentDataFraRessurs(åpenBehandling);
        if (åpenBehandlingData?.settPåVent) {
            return true;
        }

        const innloggetSaksbehandlerSkrivetilgang = harInnloggetSaksbehandlerSkrivetilgang();
        const behandlingsårsak = åpenBehandlingData?.årsak;
        const behandlingsårsakErÅpenForAlleMedTilgangTilÅOppretteÅrsak =
            behandlingsårsak === BehandlingÅrsak.TEKNISK_ENDRING ||
            behandlingsårsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV;

        const saksbehandlerHarTilgangTilEnhet =
            harTilgangTilEnhet(
                åpenBehandlingData?.arbeidsfordelingPåBehandling.behandlendeEnhetId ?? '',
                innloggetSaksbehandler?.groups ?? []
            ) || behandlingsårsakErÅpenForAlleMedTilgangTilÅOppretteÅrsak;

        const steg = hentStegPåÅpenBehandling();

        return saksbehandlerHarKunLesevisning(
            innloggetSaksbehandlerSkrivetilgang,
            saksbehandlerHarTilgangTilEnhet,
            steg,
            sjekkTilgangTilEnhet
        );
    };

    const automatiskNavigeringTilSideForSteg = () => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            const sideForSteg: ISide | undefined = finnSideForBehandlingssteg(åpenBehandling.data);

            if (
                (erViPåUdefinertFagsakSide(history.location.pathname) ||
                    erViPåUlovligSteg(history.location.pathname, sideForSteg)) &&
                sideForSteg
            ) {
                history.push(
                    `/fagsak/${fagsakId}/${åpenBehandling.data.behandlingId}/${sideForSteg.href}`
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

    const erMigreringsbehandling =
        åpenBehandling.status === RessursStatus.SUKSESS &&
        åpenBehandling.data.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return {
        erLesevisning,
        forrigeÅpneSide,
        hentStegPåÅpenBehandling,
        leggTilBesøktSide,
        settIkkeKontrollerteSiderTilManglerKontroll,
        søkersMålform,
        trinnPåBehandling,
        åpenBehandling,
        opprettBehandling,
        logg,
        hentLogg,
        behandlingsstegSubmitressurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
        settÅpenBehandling,
        oppdaterRegisteropplysninger,
        sendTilBeslutterNesteOnClick,
        erMigreringsbehandling,
    };
});

export { BehandlingProvider, useBehandling };
