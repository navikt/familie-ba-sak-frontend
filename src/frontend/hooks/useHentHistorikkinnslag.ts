import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentHistorikkinnslag, type HistorikkinnslagDto } from '../api/hentHistorikkinnslag';
import { useAppContext } from '../context/AppContext';
import type { BehandlerRolle } from '../typer/behandling';
import { LoggType } from '../typer/logg';
import { Datoformat, isoStringTilFormatertString } from '../utils/dato';

export interface Historikkinnslag {
    id: string;
    dato: string;
    tittel: string;
    utførtAv: string;
    rolle: keyof typeof BehandlerRolle;
    beskrivelse?: string;
}

export const HentHistorikkinnslagQueryKeyFactory = {
    historikkinnslag: (behandlingId: number) => ['historikkinnslag', behandlingId],
};

type Options = Omit<
    UseQueryOptions<HistorikkinnslagDto[], DefaultError, Historikkinnslag[]>,
    'queryKey' | 'queryFn' | 'select'
>;

export function useHentHistorikkinnslag(behandlingId: number, options?: Options) {
    const { request } = useHttp();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandlingId),
        queryFn: () => hentHistorikkinnslag(request, behandlingId),
        select: historikkinnslag => {
            let historikkinnslagKopi = [...historikkinnslag];
            if (skalObfuskereData) {
                historikkinnslagKopi = obfuskerHistorikkinnslag(historikkinnslag);
            }
            return historikkinnslagKopi.map(
                (dto: HistorikkinnslagDto): Historikkinnslag => ({
                    id: dto.id.toString(),
                    dato: isoStringTilFormatertString({
                        isoString: dto.opprettetTidspunkt,
                        tilFormat: Datoformat.DATO_TID,
                    }),
                    utførtAv: dto.opprettetAv,
                    rolle: dto.rolle,
                    tittel: dto.tittel,
                    beskrivelse: dto.tekst,
                })
            );
        },
        ...options,
    });
}

function obfuskerHistorikkinnslag(logg: HistorikkinnslagDto[]) {
    return logg.map(logg => {
        if (logg.type === LoggType.BREVMOTTAKER_LAGT_TIL_ELLER_FJERNET || logg.type === LoggType.BARN_LAGT_TIL) {
            return { ...logg, tekst: '' };
        }
        return logg;
    });
}
