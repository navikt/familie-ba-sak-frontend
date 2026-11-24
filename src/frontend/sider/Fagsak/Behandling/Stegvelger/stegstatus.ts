import {
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    erBehandlingAvslått,
    erBehandlingHenlagt,
    hentStegnummer,
    type IBehandling,
} from '@typer/behandling';

import { erSidenAktiv, type Side, SideId } from '../Sider/sider';

/** Statusene i Figma-komponenten «XProsessteg». */
export enum Stegstatus {
    INNVILGET = 'INNVILGET',
    AKSJONSPUNKT = 'AKSJONSPUNKT',
    AVSLAG = 'AVSLAG',
    IKKE_FULLFØRT = 'IKKE_FULLFØRT',
    DELVIS_INNVILGET = 'DELVIS_INNVILGET',
    LÅST_INNVILGET = 'LÅST_INNVILGET',
    LÅST_AVSLAG = 'LÅST_AVSLAG',
}

const delvisInnvilgetResultater = [
    BehandlingResultat.DELVIS_INNVILGET,
    BehandlingResultat.DELVIS_INNVILGET_OG_OPPHØRT,
    BehandlingResultat.DELVIS_INNVILGET_OG_ENDRET,
    BehandlingResultat.DELVIS_INNVILGET_ENDRET_OG_OPPHØRT,
];

/** Stegene som viser utfallet av behandlingen får farge etter behandlingsresultatet. */
const stegMedUtfall = [SideId.BEHANDLINGRESULTAT, SideId.VEDTAK];

export function utledStegstatus(side: Side, behandling: IBehandling, gjeldendeSide: Side | undefined): Stegstatus {
    if (!erSidenAktiv(side, behandling)) {
        return Stegstatus.IKKE_FULLFØRT;
    }
    const erGjeldendeSide = side.id === gjeldendeSide?.id;
    const erAvslag = stegMedUtfall.includes(side.id) && erBehandlingAvslått(behandling.resultat);

    // Hengelås først når behandlingen er avsluttet. Underveis vises stegene som utført, også i lesevisning.
    if (behandling.status === BehandlingStatus.AVSLUTTET) {
        // Steget en henlagt behandling stod på ble aldri fullført
        if (erGjeldendeSide && erBehandlingHenlagt(behandling.resultat)) {
            return Stegstatus.IKKE_FULLFØRT;
        }
        return erAvslag ? Stegstatus.LÅST_AVSLAG : Stegstatus.LÅST_INNVILGET;
    }

    const harAksjonspunkter = (side.undersider?.(behandling) ?? []).some(
        underside => underside.antallAksjonspunkter() > 0
    );
    // Steget behandlingen står på er det noen må gjøre noe med, også når den som ser på ikke kan endre.
    // Etter at beslutter har godkjent er det bare systemet som jobber (iverksetting, journalføring, distribusjon).
    const venterPåSaksbehandlerEllerBeslutter =
        hentStegnummer(behandling.steg) <= hentStegnummer(BehandlingSteg.BESLUTTE_VEDTAK);
    if (harAksjonspunkter || (erGjeldendeSide && venterPåSaksbehandlerEllerBeslutter)) {
        return Stegstatus.AKSJONSPUNKT;
    }
    if (erAvslag) {
        return Stegstatus.AVSLAG;
    }
    if (stegMedUtfall.includes(side.id) && delvisInnvilgetResultater.includes(behandling.resultat)) {
        return Stegstatus.DELVIS_INNVILGET;
    }
    return Stegstatus.INNVILGET;
}
