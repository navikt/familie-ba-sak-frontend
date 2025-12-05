import { SettPåVentÅrsak } from '../../../../typer/behandling';

export const hentAlleÅrsaker = () =>
    Object.keys(SettPåVentÅrsak).filter(key => isNaN(Number(key))) as SettPåVentÅrsak[];

export const hentVelgbareÅrsaker = () =>
    Object.keys(SettPåVentÅrsak)
        .filter(key => isNaN(Number(key)))
        .filter(årsak => årsak !== SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING) as SettPåVentÅrsak[];
