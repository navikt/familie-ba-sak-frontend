import type { Regionkode } from '@komponenter/FlaggCombobox';
import { Brevmottakertype } from '@typer/brevmottaker';

export function utledPreutfyltNavn(brevmottakertype: Brevmottakertype, land: Regionkode | null, navn: string) {
    if (brevmottakertype === Brevmottakertype.DØDSBO) {
        return land === null || land === 'NO' ? `${navn} v/dødsbo` : `Estate of ${navn}`;
    }
    return navn;
}
