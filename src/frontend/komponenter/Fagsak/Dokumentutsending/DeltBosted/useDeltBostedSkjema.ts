import { useEffect } from 'react';

import { ok, useFelt, feil, useSkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IForelderBarnRelasjon, ForelderBarnRelasjonRolle } from '../../../../typer/person';
import { IBarnMedOpplysninger } from '../../../../typer/søknad';

export const useDeltBostedSkjema = () => {
    const { bruker } = useFagsakRessurser();

    const { skjema: deltBostedSkjema, nullstillSkjema, onSubmit: onDeltBostedSubmit } = useSkjema<
        {
            barnaMedOpplysninger: IBarnMedOpplysninger[];
        },
        string
    >({
        felter: {
            barnaMedOpplysninger: useFelt<IBarnMedOpplysninger[]>({
                verdi: [],
                valideringsfunksjon: felt => {
                    return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                        ? ok(felt)
                        : feil(felt, 'Ingen av barna er valgt.');
                },
            }),
        },
        skjemanavn: 'Delt bosted',
    });

    useEffect(() => {
        if (bruker.status === RessursStatus.SUKSESS) {
            nullstillSkjema();
            deltBostedSkjema.felter.barnaMedOpplysninger.validerOgSettFelt(
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
    }, [bruker.status]);

    return {
        deltBostedSkjema,
        onDeltBostedSubmit,
    };
};
