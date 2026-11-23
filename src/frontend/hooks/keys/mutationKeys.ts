function fagsakMutationKey(fagsakId: number) {
    return ['fagsak', fagsakId] as const;
}

function behandlingMutationKey(behandlingId: number) {
    return ['behandling', behandlingId] as const;
}

function vedtaksperiodeMutationKey(vedtaksperiodeId: number) {
    return ['vedtaksperiode', vedtaksperiodeId] as const;
}

function endretUtbetalingAndelMutationKey(endretUtbetalingAndelId: number | undefined) {
    return ['endret-utbetaling-andel', endretUtbetalingAndelId] as const;
}

export const mutationKeys = {
    // Frittstående
    hentFagsakPåPerson: () => {
        return ['hent-fagsak-pa-person'] as const;
    },
    hentFagsakerPåPerson: () => {
        return ['hent-fagsaker-pa-person'] as const;
    },
    slettBrevmottaker: () => {
        return ['slett-brevmottaker'] as const;
    },
    slettVilkårResultat: () => {
        return ['slett-vilkar-resultat'] as const;
    },
    opprettForhåndsvisbarTilbakekrevingVarselbrevPdf: () => {
        return ['opprett-forhandsvisbar-tilbakekreving-varselbrev-pdf'] as const;
    },

    // Fagsak
    forhåndsvisBrevPåFagsak: (fagsakId: number) => {
        return [...fagsakMutationKey(fagsakId), 'forhandsvis-brev'] as const;
    },
    sendInformasjonsbrev: (fagsakId: number) => {
        return [...fagsakMutationKey(fagsakId), 'send-informasjonsbrev'] as const;
    },

    // Behandling
    opprettSammensattKontrollsak: (behandlingId: number) => {
        return [...behandlingMutationKey(behandlingId), 'sammensatt-kontrollsak', 'opprett'] as const;
    },
    slettSammensattKontrollsak: (behandlingId: number) => {
        return [...behandlingMutationKey(behandlingId), 'sammensatt-kontrollsak', 'slett'] as const;
    },

    // Vedtaksperiode
    oppdaterVedtaksperiodeMedBegrunnelser: (vedtaksperiodeId: number) => {
        return [...vedtaksperiodeMutationKey(vedtaksperiodeId), 'oppdater-begrunnelser'] as const;
    },
    oppdaterVedtaksperiodeMedFritekster: (vedtaksperiodeId: number) => {
        return [...vedtaksperiodeMutationKey(vedtaksperiodeId), 'oppdater-fritekster'] as const;
    },

    // Endret utbetaling
    oppdaterEndretUtbetalingAndel: (endretUtbetalingAndelId: number | undefined) => {
        return [...endretUtbetalingAndelMutationKey(endretUtbetalingAndelId), 'oppdater'] as const;
    },
    slettEndretUtbetalingAndel: (endretUtbetalingAndelId: number | undefined) => {
        return [...endretUtbetalingAndelMutationKey(endretUtbetalingAndelId), 'slett'] as const;
    },

    // Refusjon EØS
    slettRefusjonEøs: (refusjonEøsId: number) => {
        return ['refusjon-eos', refusjonEøsId, 'slett'] as const;
    },

    // Feilutbetalt valuta
    slettFeilutbetaltValuta: (feilutbetaltValutaId: number) => {
        return ['feilutbetalt-valuta', feilutbetaltValutaId, 'slett'] as const;
    },
};
