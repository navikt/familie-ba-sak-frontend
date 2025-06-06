/**
 * Kun brukt for manuell testing. Kjekt for å f.eks. simulere et tregt nettverkskall.
 *
 * @param ms - Antall millisekunder man skal vente.
 */
export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
