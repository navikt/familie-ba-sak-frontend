import type { ISODateString } from '@navikt/familie-form-elements';
import { feil, ok, useFelt } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema/dist/typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakContext } from '../context/fagsak/FagsakContext';
import type { IForelderBarnRelasjon } from '../typer/person';
import { ForelderBarnRelasjonRolle } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import { datoformat, formaterIsoDato } from './formatter';
import { erIsoStringGyldig } from './kalender';

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

    const avtalerOmDeltBostedPerBarn = useFelt<Record<string, ISODateString[]>>({
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
                        (relasjon: IForelderBarnRelasjon) =>
                            relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
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
                `Barn født ${formaterIsoDato(
                    barn.fødselsdato,
                    datoformat.DATO
                )}. Avtalen gjelder fra ${formaterIsoDato(
                    avtaletidspunktDeltBosted,
                    datoformat.DATO_FORLENGET
                )}.`
        );
    };

    return {
        barnMedDeltBosted,
        avtalerOmDeltBostedPerBarn,
        nullstillDeltBosted,
        hentDeltBostedMulitiselectVerdierForBarn,
    };
};
