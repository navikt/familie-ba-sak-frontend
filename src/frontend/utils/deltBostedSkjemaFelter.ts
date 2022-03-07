import { useEffect } from 'react';

import { ISODateString } from '@navikt/familie-form-elements';
import { feil, ok, useFelt } from '@navikt/familie-skjema';
import { Avhengigheter } from '@navikt/familie-skjema/dist/typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../context/FagsakContext';
import { ForelderBarnRelasjonRolle, IForelderBarnRelasjon } from '../typer/person';
import { IBarnMedOpplysninger } from '../typer/søknad';
import { erIsoStringGyldig } from './kalender';

interface IProps {
    avhengigheter?: Avhengigheter;
    skalFeltetVises?: (avhengigheter: Avhengigheter) => boolean;
}

export const useDeltBostedFelter = ({ avhengigheter, skalFeltetVises }: IProps) => {
    const { bruker } = useFagsakRessurser();

    const barnaMedOpplysninger = useFelt<IBarnMedOpplysninger[]>({
        verdi: [],
        valideringsfunksjon: felt => {
            return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                ? ok(felt)
                : feil(felt, 'Du må velge barn');
        },
        avhengigheter: avhengigheter,
        skalFeltetVises: skalFeltetVises,
    });

    const avtalerOmDeltBostedPerBarn = useFelt<Record<string, ISODateString[]>>({
        verdi: {},
        valideringsfunksjon: (felt, avhengigheter) => {
            const barnaMedOpplysninger = avhengigheter?.verdi ?? [];

            return barnaMedOpplysninger
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .some((barn: IBarnMedOpplysninger) =>
                    felt.verdi[barn.ident]?.some(
                        avtaleDato => avtaleDato.length === 0 || !erIsoStringGyldig(avtaleDato)
                    )
                )
                ? feil(felt, 'Minst én av barna mangler avtale om delt bosted')
                : ok(felt);
        },
        avhengigheter: barnaMedOpplysninger,
    });

    const nullstillBarnaMedOpplysninger = () => {
        if (bruker.status === RessursStatus.SUKSESS) {
            barnaMedOpplysninger.validerOgSettFelt(
                bruker.data.forelderBarnRelasjon
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
        }
    };

    useEffect(() => {
        nullstillBarnaMedOpplysninger();
    }, [bruker]);

    return { barnaMedOpplysninger, avtalerOmDeltBostedPerBarn, nullstillBarnaMedOpplysninger };
};
