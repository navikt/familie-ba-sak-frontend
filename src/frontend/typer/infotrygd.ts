import type { Adressebeskyttelsegradering } from '@navikt/familie-typer';

export interface IInfotrygdsaker {
    adressebeskyttelsegradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    saker: IInfotrygdSak[];
}

export interface IInfotrygdsakerRequest {
    ident: string;
}

export interface IInfotrygdstønader {
    adressebeskyttelsegradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    stønader: IInfotrygdStønad[];
}

export interface IInfotrygdSak {
    behenEnhet?: string;
    iverksattdato?: string;
    kapittelnr?: string;
    mottattdato?: string;
    nivå?: string;
    regAvEnhet?: string;
    regDato?: string;
    resultat?: string;
    saksblokk?: string;
    saksnr?: string;
    status?: string;
    stønad?: IInfotrygdStønad;
    type?: string;
    undervalg?: string;
    valg?: string;
    vedtaksdato?: string;
    årsakskode?: string;
}

export interface IInfotrygdStønad {
    barn: IInfotrygdBarn[];
    iverksattFom?: string;
    opphørsgrunn?: string;
    opphørtFom?: string;
    opphørtIver?: string;
    status?: string;
    tekstkode?: string;
    virkningFom?: string;
    delytelse: IDelytelse[];
}

export interface IInfotrygdBarn {
    barnFnr?: string;
    barnetrygdTom?: string;
}

export interface IDelytelse {
    fom?: string;
    tom?: string;
    beløp?: number;
    typeDelytelse?: string;
    oppgjørsordning?: string;
    typeUtbetaling?: string;
}

export interface IMigreringResponseDto {
    fagsakId: number;
    behandlingId: number;
}
