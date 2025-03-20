import { SettPåVentÅrsak } from '../../../../../typer/behandling';

export const hentAlleÅrsaker = () =>
    Object.keys(SettPåVentÅrsak).filter(key => isNaN(Number(key))) as SettPåVentÅrsak[];
