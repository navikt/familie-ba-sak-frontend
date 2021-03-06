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
    sider,
} from '../komponenter/Felleskomponenter/Venstremeny/sider';
import { BehandlingSteg, hentStegNummer, IBehandling } from '../typer/behandling';
import { PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { hentBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

const [BehandlingProvider, useBehandling] = createUseContext(() => {
    const [åpenBehandling, settÅpenBehandling] = useState<Ressurs<IBehandling>>(byggTomRessurs());
    const { harInnloggetSaksbehandlerSkrivetilgang } = useApp();
    const { fagsak } = useFagsakRessurser();

    const history = useHistory();
    const [forrigeÅpneSide, settForrigeÅpneSide] = React.useState<ISide | undefined>(undefined);
    useEffect(() => {
        settForrigeÅpneSide(
            Object.values(sider).find((side: ISide) =>
                history.location.pathname.includes(side.href)
            )
        );
    }, [history.location.pathname]);

    useEffect(() => {
        automatiskNavigeringTilSideForSteg();
    }, [åpenBehandling]);

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

    return {
        bestemÅpenBehandling,
        erLesevisning,
        forrigeÅpneSide,
        søkersMålform,
        åpenBehandling,
    };
});

export { BehandlingProvider, useBehandling };
