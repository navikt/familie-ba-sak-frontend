interface FritekstKulepunktValidering {
    tekst: string;
    valideringsmelding?: string;
}

export const validerFritekstKulepunkt = (
    fritekst: FritekstKulepunktValidering,
    makslengde: number
): string | undefined => {
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
