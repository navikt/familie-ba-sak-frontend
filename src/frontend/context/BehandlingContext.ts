import createUseContext from 'constate';
import React, { useEffect, useState } from 'react';
import { BehandlerRolle, BehandlingSteg, hentStegNummer, IBehandling } from '../typer/behandling';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggTomRessurs,
    hentDataFraRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { tilFeilside } from '../utils/commons';
import { hentBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';
import { useHistory } from 'react-router';
import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
    ISide,
    sider,
} from '../komponenter/Felleskomponenter/Venstremeny/sider';

const [BehandlingProvider, useBehandling] = createUseContext(() => {
    const [åpenBehandling, settÅpenBehandling] = useState<Ressurs<IBehandling>>(byggTomRessurs());
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsak } = useFagsakRessurser();
    const harOpplysningsplikt =
        åpenBehandling.status === RessursStatus.SUKSESS && !!åpenBehandling.data.opplysningsplikt;

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
        const rolle = hentSaksbehandlerRolle();
        const steg = hentStegPåÅpenBehandling();

        if (
            rolle &&
            rolle >= BehandlerRolle.SAKSBEHANDLER &&
            steg &&
            !(hentStegNummer(steg) >= hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK))
        ) {
            return false;
        } else if (rolle && rolle >= BehandlerRolle.VEILEDER) {
            return true;
        } else {
            tilFeilside();
            return true;
        }
    };

    const automatiskNavigeringTilSideForSteg = () => {
        if (
            åpenBehandling.status === RessursStatus.SUKSESS &&
            fagsak.status === RessursStatus.SUKSESS
        ) {
            const sideForSteg: ISide | undefined = finnSideForBehandlingssteg(
                åpenBehandling.data.steg
            );

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

    return {
        åpenBehandling,
        harOpplysningsplikt,
        erLesevisning,
        bestemÅpenBehandling,
        forrigeÅpneSide,
    };
});

export { BehandlingProvider, useBehandling };
