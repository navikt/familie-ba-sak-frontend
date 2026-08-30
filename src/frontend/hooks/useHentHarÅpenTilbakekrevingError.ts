import { useHentHarÅpenTilbakekreving } from '@hooks/useHentHarÅpenTilbakekreving';

// Leser feilen fra spørringen SimuleringContainer allerede har startet, uten å starte en ny henting.
export function useHentHarÅpenTilbakekrevingError(fagsakId: number) {
    const { error } = useHentHarÅpenTilbakekreving(fagsakId, { enabled: false });
    return error;
}
