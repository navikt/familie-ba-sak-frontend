import { Adressebeskyttelsegradering } from '@navikt/familie-typer';

export interface IInfotrygdsaker {
    adressebeskyttelsegradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    saker: IInfotrygdSak[];
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
    opphørsgrunn?: string;
    opphørtFom?: string;
    sakNr?: string;
    stønadId?: string;
}
