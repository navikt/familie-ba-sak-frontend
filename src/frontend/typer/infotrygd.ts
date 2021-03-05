import { Adressebeskyttelsegradering } from '../../../node_dist/frontend/typer/person';

export interface IInfotrygdsaker {
    adressebeskyttelsegradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    saker: IInfotrygdSak[];
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
    stønadList?: IInfotrygdStønad[];
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
    sakNr?: string;
    status?: string;
    stønadId?: number;
    tekstkode?: string;
    virkningFom?: string;
}

export interface IInfotrygdBarn {
    barnFnr?: string;
    barnetrygdTom?: string;
}
