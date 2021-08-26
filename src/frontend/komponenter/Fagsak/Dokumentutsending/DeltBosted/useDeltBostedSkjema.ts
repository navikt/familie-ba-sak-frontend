import { useEffect } from 'react';

import { ok, useFelt, feil, useSkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IForelderBarnRelasjon, ForelderBarnRelasjonRolle } from '../../../../typer/person';
import { IBarnMedOpplysninger, Målform } from '../../../../typer/søknad';
import { Informasjonsbrev } from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

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

    const nullstillDeltBostedSkjema = () => {
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
    };

    useEffect(() => {
        nullstillDeltBostedSkjema();
    }, [bruker.status]);

    const hentDeltBostedSkjemaData = () => {
        if (bruker.status === RessursStatus.SUKSESS) {
            const barnIBrev = deltBostedSkjema.felter.barnaMedOpplysninger.verdi.filter(
                barn => barn.merket
            );
            return {
                mottakerIdent: bruker.data.personIdent,
                multiselectVerdier: barnIBrev.map(
                    barn => `Barn født ${barn.fødselsdato}. Avtale 15.01.20.`
                ),
                barnIBrev: barnIBrev.map(barn => barn.ident),
                mottakerMålform: Målform.NB,
                mottakerNavn: bruker.data.navn,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_DELT_BOSTED,
            };
        } else {
            throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
        }
    };

    return {
        deltBostedSkjema,
        hentDeltBostedSkjemaData,
        nullstillDeltBostedSkjema,
        onDeltBostedSubmit,
    };
};
