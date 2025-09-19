import { feil, ok, useFelt } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema/dist/typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { IsoDatoString } from './dato';
import { Datoformat, erIsoStringGyldig, isoStringTilFormatertString } from './dato';
import { useFagsakContext } from '../sider/Fagsak/FagsakContext';
import type { IForelderBarnRelasjon } from '../typer/person';
import { ForelderBarnRelasjonRolle } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';

interface IProps {
    avhengigheter?: Avhengigheter;
    skalFeltetVises?: (avhengigheter: Avhengigheter) => boolean;
}

export const useDeltBostedFelter = ({ avhengigheter, skalFeltetVises }: IProps) => {
    const { bruker: brukerRessurs } = useFagsakContext();

    const barnMedDeltBosted = useFelt<IBarnMedOpplysninger[]>({
        verdi: [],
        valideringsfunksjon: felt => {
            return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                ? ok(felt)
                : feil(felt, 'Du må velge barn');
        },
        avhengigheter: avhengigheter,
        skalFeltetVises: skalFeltetVises,
        nullstillVedAvhengighetEndring: false,
    });

    const avtalerOmDeltBostedPerBarn = useFelt<Record<string, IsoDatoString[]>>({
        verdi: {},
        valideringsfunksjon: (felt, avhengigheter) => {
            const barnMedDeltBosted = avhengigheter?.verdi ?? [];

            return barnMedDeltBosted
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .some((barn: IBarnMedOpplysninger) =>
                    felt.verdi[barn.ident]?.some(
                        avtaleDato => avtaleDato.length === 0 || !erIsoStringGyldig(avtaleDato)
                    )
                )
                ? feil(felt, 'Minst én av barna mangler avtale om delt bosted')
                : ok(felt);
        },
        avhengigheter: barnMedDeltBosted,
    });

    const hentBarnMedOpplysningerFraBruker = () => {
        if (brukerRessurs.status === RessursStatus.SUKSESS)
            return (
                brukerRessurs.data.forelderBarnRelasjon
                    .filter(
                        (relasjon: IForelderBarnRelasjon) => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                    )
                    .map(
                        (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                            merket: false,
                            ident: relasjon.personIdent,
                            navn: relasjon.navn,
                            fødselsdato: relasjon.fødselsdato,
                            manueltRegistrert: false,
                            erFolkeregistrert: true,
                        })
                    ) ?? []
            );
        else return [];
    };

    const nullstillDeltBosted = () => {
        avtalerOmDeltBostedPerBarn.nullstill();
        barnMedDeltBosted.validerOgSettFelt(hentBarnMedOpplysningerFraBruker());
    };

    const hentDeltBostedMulitiselectVerdierForBarn = (barn: IBarnMedOpplysninger) => {
        const avtalerOmDeltBosted = avtalerOmDeltBostedPerBarn.verdi[barn.ident] ?? [];

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

    return {
        barnMedDeltBosted,
        avtalerOmDeltBostedPerBarn,
        nullstillDeltBosted,
        hentDeltBostedMulitiselectVerdierForBarn,
    };
};
