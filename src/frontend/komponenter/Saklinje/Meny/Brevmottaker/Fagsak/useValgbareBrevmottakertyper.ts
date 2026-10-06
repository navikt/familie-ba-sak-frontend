import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { Brevmottakertype } from '@typer/brevmottaker';

export function useValgbareBrevmottakertyper() {
    const { brevmottakere } = useBrevmottakereFagsakContext();

    const alleredeValgteBrevmottakertyper = brevmottakere.map(it => it.type);

    const harValgtFullmektigEllerVerge =
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.FULLMEKTIG) ||
        alleredeValgteBrevmottakertyper.includes(Brevmottakertype.VERGE);

    return Object.values(Brevmottakertype)
        .filter(it => it !== Brevmottakertype.DØDSBO)
        .filter(it => !harValgtFullmektigEllerVerge || it === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE)
        .filter(it => !alleredeValgteBrevmottakertyper.includes(it));
}
