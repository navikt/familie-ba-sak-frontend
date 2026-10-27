import { apiClient } from '@api/client/apiClient';
import type { SettAktivBrukerIModiaContextDTO } from '@typer/modiaContext';

export async function settAktivBrukerIModiaContext(personIdent: string) {
    return apiClient.post<SettAktivBrukerIModiaContextDTO, void>({
        url: '/familie-ba-sak/api/modia-context/sett-aktiv-bruker',
        data: { personIdent },
    });
}
