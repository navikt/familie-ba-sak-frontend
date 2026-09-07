import type { IForelderBarnRelasjon, IPersonInfo } from '../typer/person';
import { ForelderBarnRelasjonRolle } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import type { IsoDatoString } from './dato';
import { Datoformat, erIsoStringGyldig, isoStringTilFormatertString } from './dato';

export const hentBarnMedOpplysningerFraBruker = (bruker: IPersonInfo): IBarnMedOpplysninger[] => {
    return bruker.forelderBarnRelasjon
        .filter((relasjon: IForelderBarnRelasjon) => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map(
            (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                merket: false,
                ident: relasjon.personIdent,
                navn: relasjon.navn,
                fødselsdato: relasjon.fødselsdato,
                manueltRegistrert: false,
                erFolkeregistrert: true,
            })
        );
};

export const validerBarnMedDeltBosted = (barnMedDeltBosted: IBarnMedOpplysninger[]): string | undefined => {
    return barnMedDeltBosted.some((barn: IBarnMedOpplysninger) => barn.merket) ? undefined : 'Du må velge barn';
};

export const validerAvtalerOmDeltBostedPerBarn = (
    avtalerOmDeltBostedPerBarn: Record<string, IsoDatoString[]>,
    barnMedDeltBosted: IBarnMedOpplysninger[]
): string | undefined => {
    return barnMedDeltBosted
        .filter((barn: IBarnMedOpplysninger) => barn.merket)
        .some((barn: IBarnMedOpplysninger) =>
            avtalerOmDeltBostedPerBarn[barn.ident]?.some(
                avtaleDato => avtaleDato.length === 0 || !erIsoStringGyldig(avtaleDato)
            )
        )
        ? 'Minst én av barna mangler avtale om delt bosted'
        : undefined;
};

export const hentDeltBostedMulitiselectVerdierForBarn = (
    barn: IBarnMedOpplysninger,
    avtalerOmDeltBostedPerBarn: Record<string, IsoDatoString[]>
): string[] => {
    const avtalerOmDeltBosted = avtalerOmDeltBostedPerBarn[barn.ident] ?? [];

    return avtalerOmDeltBosted.map(
        avtaletidspunktDeltBosted =>
            `Barn født ${isoStringTilFormatertString({
                isoString: barn.fødselsdato,
                tilFormat: Datoformat.DATO,
            })}. Avtalen gjelder fra ${isoStringTilFormatertString({
                isoString: avtaletidspunktDeltBosted,
                tilFormat: Datoformat.DATO_FORLENGET,
            })}.`
    );
};
