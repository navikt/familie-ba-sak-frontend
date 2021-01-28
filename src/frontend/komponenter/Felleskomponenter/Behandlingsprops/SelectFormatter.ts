import { Behandlingstype, BehandlingÅrsak } from '../../../typer/behandling';

export type PropType = Behandlingstype | BehandlingÅrsak;

export const tilAlternativ = <T extends PropType>(key: T) =>
    (
        key.toString().charAt(0).toLocaleUpperCase() +
        key.toString().substring(1, key.toString().length).toLocaleLowerCase()
    ).replace('_', ' ') || '';

export const tilPropType = <T extends PropType>(label: string): T =>
    (label.toString().replace(' ', '_').toLocaleUpperCase() as unknown) as T;
