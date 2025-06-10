import { useCallback } from 'react';

import { type Args, useModalContext } from '../context/ModalContext';

export function useModal<T extends keyof Args>(type: T) {
    const context = useModalContext();

    const settTittel = useCallback(
        (tittel: string) => {
            context.settTittel(type, tittel);
        },
        [context.settTittel, type]
    );

    const åpneModal = useCallback(
        (args: Args[T]) => {
            context.åpneModal(type, args);
        },
        [context.åpneModal, type]
    );

    const lukkModal = useCallback(() => {
        context.lukkModal(type);
    }, [context.lukkModal, type]);

    const settBredde = useCallback(
        (bredde: `${number}${string}`) => {
            context.settBredde(type, bredde);
        },
        [context.settBredde, type]
    );

    const tittel = context.hentTittel(type);
    const erModalÅpen = context.erModalÅpen(type);
    const args = context.hentArgs(type);
    const bredde = context.hentBredde(type);

    return { tittel, settTittel, åpneModal, lukkModal, erModalÅpen, args, bredde, settBredde };
}
