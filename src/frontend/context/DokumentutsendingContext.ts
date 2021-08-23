import createUseContext from 'constate';

import useForhåndsvisning from '../hooks/useForhåndsvisning';

export const [DokumentutsendingProvider, useDokumentutsending] = createUseContext(() => {
    const { hentForhåndsvisning, hentetForhåndsvisning } = useForhåndsvisning();

    return {
        hentForhåndsvisning,
        hentetForhåndsvisning,
    };
});
