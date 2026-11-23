import { erStegEtter, finnSideForBehandlingssteg, finnSiderForBehandling } from '@sider/Fagsak/Behandling/Sider/sider';
import type { IBehandling } from '@typer/behandling';
import { matchPath, useLocation } from 'react-router';

const BASE_PATH = `/fagsak/:fagsakId/:behandlingId/`;

export function useErViPåUgyldigSideForBehandling(behandling: IBehandling): boolean {
    const location = useLocation();

    const siderForBehandling = finnSiderForBehandling(behandling);
    const sideForBehandlingssteg = finnSideForBehandlingssteg(behandling);

    const nåværendeSide = siderForBehandling.find(side => {
        const path = `${BASE_PATH}${side.href}`;
        const pathname = location.pathname;
        return matchPath({ path, end: true }, pathname);
    });

    if (nåværendeSide === undefined) {
        // Ukjent side, eller en side som er skjult for denne behandlingen.
        return true;
    }

    if (sideForBehandlingssteg === undefined) {
        // Steget har ingen synlig side (f.eks. REGISTRERE_PERSONGRUNNLAG), så ingen sider er gyldige.
        return true;
    }

    return erStegEtter(nåværendeSide.steg, sideForBehandlingssteg.steg);
}
