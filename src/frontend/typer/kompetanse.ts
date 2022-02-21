import { FeltState } from '@navikt/familie-skjema';

import { IYearMonthPeriode, YearMonth } from '../utils/kalender';

export const LandkodeNorge = 'NO';

export enum SøkerAktivitet {
    IARBEID_NORGE = 'IARBEID_NORGE',
    SELVSTENDIG = 'SELVSTENDIG',
    UTSENDT_ARBEIDSTAKER = 'UTSENDT_ARBEIDSTAKER',
    LIKESTILT_YTELSE = 'LIKESTILT_YTELSE',
    UFØRETRYGD = 'UFØRETRYGD',
    UFØRETRYGD_EØS = 'UFØRETRYGD_EØS',
    PENSJON = 'PENSJON',
    PENSJON_EØS = 'PENSJON_EØS',
    NORSKREGISTRERT_SKIP = 'NORSKREGISTRERT_SKIP',
    NORSK_SOKKEL = 'NORSK_SOKKEL',
    NORSK_FLYSELSKAP = 'NORSK_FLYSELSKAP',
    UTENRIKSSTASJON = 'UTENRIKSSTASJON',
    LIKESTILT_YTELSE_UTLAND = 'LIKESTILT_YTELSE_UTLAND',
    UFØRETRGYD_UTLAND = 'UFØRETRGYD_UTLAND',
    PENSON_UTLAND = 'PENSON_UTLAND',
    INAKTIV = 'INAKTIV',
}

export enum AnnenForelderAktivitet {
    AF_IARBEID = 'AF_IARBEID',
    AF_LIKESTILT_YTELSE = 'AF_LIKESTILT_YTELSE',
    AF_PENSJON = 'AF_PENSJON',
    AF_FORSIKRET = 'AF_FORSIKRET',
    AF_IKKE_AKTUELT = 'AF_IKKE_AKTUELT',
    AF_INAKTIV = 'AF_INAKTIV',
}

export const søkerAktiviteter: Record<SøkerAktivitet, string> = {
    IARBEID_NORGE: 'Arbeid i Norge',
    SELVSTENDIG: 'Selvstendig næringsdrivende',
    UTSENDT_ARBEIDSTAKER: 'Utsendt arbeidstaker fra Norge',
    LIKESTILT_YTELSE: 'Mottar ytelse likestilt med arbeid',
    UFØRETRYGD: 'Mottar uføretrygd fra Norge',
    UFØRETRYGD_EØS: 'Mottar uføretrygd fra annet EØS-land',
    PENSJON: 'Mottar pensjon fra Norge',
    PENSJON_EØS: 'Mottar pensjon fra annet EØS-land',
    NORSKREGISTRERT_SKIP: 'Arbeider på norskregistrert skip',
    NORSK_SOKKEL: 'Arbeider på norsk sokkel',
    NORSK_FLYSELSKAP: 'Arbeider for norsk flyselskap',
    UTENRIKSSTASJON:
        'Arbeider som lokalt ansatt ved utenlandsk utenriksstasjon og er omfattet av norsk lovgivning',
    LIKESTILT_YTELSE_UTLAND: 'Mottar ytelse likestilt med arbeid fra NAV under opphold i utlandet',
    UFØRETRGYD_UTLAND: 'Mottar uføretrygd fra Norge under opphold i utlandet',
    PENSON_UTLAND: 'Mottar pensjon fra Norge under opphold i utlandet',
    INAKTIV: 'Inaktiv',
};

export const annenForelderAktiviteter: Record<AnnenForelderAktivitet, string> = {
    AF_IARBEID: 'I arbeid / yrkesaktiv',
    AF_LIKESTILT_YTELSE: 'Mottar ytelse likestilt med arbeid',
    AF_PENSJON: 'Mottar pensjon',
    AF_FORSIKRET: 'Forsikret i bostedsland',
    AF_IKKE_AKTUELT: 'Ikke aktuelt',
    AF_INAKTIV: 'Inaktiv',
};

export enum KompetanseStatus {
    IKKE_UTFYLT = 'IKKE_UTFYLT',
    UFULLSTENDIG = 'UFULLSTENDIG',
    OK = 'OK',
}

export interface IRestKompetanse {
    id: number;
    behandlingId: number;
    status: KompetanseStatus;
    fom: YearMonth;
    tom?: YearMonth;
    barn: string[];
    søkersAktivitet?: SøkerAktivitet;
    annenForeldersAktivitet?: AnnenForelderAktivitet;
    barnetsBostedsland?: string;
    primærland?: string;
    sekundærland?: string;
}

export interface IKompetanse {
    id: number;
    behandlingId: number;
    status: KompetanseStatus;
    initielFom: YearMonth;
    periode: FeltState<IYearMonthPeriode>;
    barn: FeltState<string[]>;
    søkersAktivitet: FeltState<SøkerAktivitet | undefined>;
    annenForeldersAktivitet: FeltState<AnnenForelderAktivitet | undefined>;
    barnetsBostedsland: FeltState<string | undefined>;
    primærland: FeltState<string | undefined>;
    sekundærland: FeltState<string | undefined>;
}
