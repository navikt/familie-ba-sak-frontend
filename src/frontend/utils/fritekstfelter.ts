export interface IFritekstFelt {
    tekst: string;
    id: number;
    valideringsmelding?: string;
}

export const genererIdBasertPåAndreFritekstKulepunkter = (fritekstKulepunkter: IFritekstFelt[]): number => {
    if (fritekstKulepunkter.length > 0) {
        return Math.max(...fritekstKulepunkter.map(fritekstKulepunkt => fritekstKulepunkt.id)) + 1;
    } else {
        return 1;
    }
};

export const lagInitiellFritekst = (initiellVerdi: string, id: number, valideringsmelding?: string): IFritekstFelt => ({
    tekst: initiellVerdi,
    id: id,
    valideringsmelding: valideringsmelding,
});

export const validerFritekstKulepunkt = (fritekst: IFritekstFelt, makslengde: number): string | undefined => {
    if (fritekst.tekst.length > makslengde) {
        return `Du har nådd maks antall tegn: ${makslengde}.`;
    } else if (fritekst.tekst.trim().length === 0) {
        return (
            fritekst.valideringsmelding || 'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.'
        );
    } else {
        return undefined;
    }
};
