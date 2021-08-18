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
    siderForBehandling,
} from '../komponenter/Felleskomponenter/Venstremeny/sider';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    hentStegNummer,
    IBehandling,
} from '../typer/behandling';
import { PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { hentBehandlingPåFagsak } from '../utils/fagsak';
import { hentSideHref } from '../utils/miljø';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

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
    const [besøkteSider, settBesøkteSider] = React.useState<{
        [sideId: string]: ISide & { besøkt: boolean };
    }>({});

    useEffect(() => {
        const siderPåBehandling =
            åpenBehandling.status === RessursStatus.SUKSESS
                ? siderForBehandling(åpenBehandling.data)
                : [];

        const sideHref = hentSideHref(history.location.pathname);
        settBesøkteSider(
            Object.entries(siderPåBehandling).reduce((acc, [sideId, side]) => {
                return {
                    ...acc,
                    [sideId]: {
                        ...side,
                        besøkt: sideHref === side.href ? true : false,
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
            settBesøkteSider({
                ...besøkteSider,
                [besøktSide]: {
                    ...besøkteSider[besøktSide],
                    besøkt: true,
                },
            });
        }
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

    const erLesevisning = (): boolean => {
        const innloggetSaksbehandlerSkrivetilgang = harInnloggetSaksbehandlerSkrivetilgang();
        const steg = hentStegPåÅpenBehandling();

        if (
            innloggetSaksbehandlerSkrivetilgang &&
            steg &&
            !(hentStegNummer(steg) >= hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK))
        ) {
            return false;
        } else if (!innloggetSaksbehandlerSkrivetilgang) {
            return true;
        } else {
            // Default til lesevisning dersom vi er usikre
            return true;
        }
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
        leggTilBesøktSide,
        besøkteSider,
        kanBeslutteVedtak,
        forrigeÅpneSide,
        søkersMålform,
        åpenBehandling,
    };
});

export { BehandlingProvider, useBehandling };
