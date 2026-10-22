import { useBehandling } from '@hooks/useBehandling';
import { Brevmottakertype } from '@typer/brevmottaker';

export function useValgbareBrevmottakertyper(): Brevmottakertype[] {
    const { brevmottakere } = useBehandling();

    const alleredeValgteBrevmottakertyper = brevmottakere.map(it => it.type);

    if (alleredeValgteBrevmottakertyper.includes(Brevmottakertype.DØDSBO)) {
        return [];
    }

    const harValgtFullmektigEllerVerge =
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.FULLMEKTIG) ||
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.VERGE);

    return Object.values(Brevmottakertype)
        .filter(it => alleredeValgteBrevmottakertyper.length === 0 || it !== Brevmottakertype.DØDSBO)
        .filter(it => !harValgtFullmektigEllerVerge || it === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE)
        .filter(it => !alleredeValgteBrevmottakertyper.includes(it));
}
