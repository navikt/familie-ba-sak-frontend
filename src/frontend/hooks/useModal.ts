import { useCallback } from 'react';

import { type Args, ModalType, useModalContext } from '../context/ModalContext';

export function useModal<T extends keyof typeof ModalType>(type: T) {
    const context = useModalContext();

    const settTittel = useCallback(
        (tittel: string) => {
            context.settTittel(ModalType[type], tittel);
        },
        [context.settTittel, type]
    );

    const åpneModal = useCallback(
        (args: T extends keyof Args ? Args[T] : void) => {
            context.åpneModal(type, args);
        },
        [context.åpneModal, type]
    );

    const lukkModal = useCallback(() => {
        context.lukkModal(ModalType[type]);
    }, [context.lukkModal, type]);

    const settBredde = useCallback(
        (bredde: `${number}${string}`) => {
            context.settBredde(ModalType[type], bredde);
        },
        [context.settBredde, type]
    );

    const tittel = context.hentTittel(ModalType[type]);
    const erModalÅpen = context.erModalÅpen(ModalType[type]);
    const args = context.hentArgs(type);
    const bredde = context.hentBredde(ModalType[type]);

    return { tittel, settTittel, åpneModal, lukkModal, erModalÅpen, args, bredde, settBredde };
}
