import { type Args, useModalContext } from '../context/ModalContext';

export function useModal<T extends keyof Args>(type: T) {
    const context = useModalContext();

    function settTittel(tittel: string) {
        context.settTittel(type, tittel);
    }

    function åpneModal(args: Args[T]) {
        context.åpneModal(type, args);
    }

    function lukkModal() {
        context.lukkModal(type);
    }

    function settBredde(bredde: `${number}${string}`) {
        context.settBredde(type, bredde);
    }

    const tittel = context.hentTittel(type);
    const erModalÅpen = context.erModalÅpen(type);
    const args = context.hentArgs(type);
    const bredde = context.hentBredde(type);

    return { tittel, settTittel, åpneModal, lukkModal, erModalÅpen, args, bredde, settBredde };
}
