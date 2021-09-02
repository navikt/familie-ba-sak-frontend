import { useEffect } from 'react';

import { ISODateString } from '@navikt/familie-form-elements';
import { ok, useFelt, feil, useSkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IManueltBrevRequestPåFagsak } from '../../../../typer/dokument';
import { IForelderBarnRelasjon, ForelderBarnRelasjonRolle } from '../../../../typer/person';
import { IBarnMedOpplysninger, Målform } from '../../../../typer/søknad';
import { datoformat, formaterIsoDato } from '../../../../utils/formatter';
import { erIsoStringGyldig } from '../../../../utils/kalender';
import { Informasjonsbrev } from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

export const useDeltBostedSkjema = () => {
    const { bruker } = useFagsakRessurser();

    const barnaMedOpplysninger = useFelt<IBarnMedOpplysninger[]>({
        verdi: [],
        valideringsfunksjon: felt => {
            return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                ? ok(felt)
                : feil(felt, 'Du må velge barn');
        },
    });

    const {
        skjema: deltBostedSkjema,
        nullstillSkjema,
        onSubmit: onDeltBostedSubmit,
        settVisfeilmeldinger: settVisfeilmeldingerDeltBosted,
    } = useSkjema<
        {
            barnaMedOpplysninger: IBarnMedOpplysninger[];
            avtalerOmDeltBostedPerBarn: Record<string, ISODateString[]>;
        },
        string
    >({
        felter: {
            barnaMedOpplysninger,
            avtalerOmDeltBostedPerBarn: useFelt<Record<string, ISODateString[]>>({
                verdi: {},
                valideringsfunksjon: (felt, avhengigheter) => {
                    const barnaMedOpplysninger = avhengigheter?.verdi ?? [];

                    return barnaMedOpplysninger
                        .filter((barn: IBarnMedOpplysninger) => barn.merket)
                        .some((barn: IBarnMedOpplysninger) =>
                            felt.verdi[barn.ident]?.some(
                                avtaleDato =>
                                    avtaleDato.length === 0 || !erIsoStringGyldig(avtaleDato)
                            )
                        )
                        ? feil(felt, 'Minst én av barna mangler avtale om delt bosted')
                        : ok(felt);
                },
                avhengigheter: barnaMedOpplysninger,
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

    const hentDeltBostedSkjemaData = (): IManueltBrevRequestPåFagsak => {
        if (bruker.status === RessursStatus.SUKSESS) {
            const barnIBrev = deltBostedSkjema.felter.barnaMedOpplysninger.verdi.filter(
                barn => barn.merket
            );

            return {
                mottakerIdent: bruker.data.personIdent,
                multiselectVerdier: barnIBrev.flatMap(barn => {
                    const avtalerOmDeltBosted =
                        deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.verdi[barn.ident] ?? [];

                    return avtalerOmDeltBosted.map(
                        avtaleOmDeltBosted =>
                            `Barn født ${formaterIsoDato(
                                barn.fødselsdato,
                                datoformat.DATO
                            )}. Avtalen gjelder fra ${formaterIsoDato(
                                avtaleOmDeltBosted,
                                datoformat.DATO_FORLENGET
                            )}.`
                    );
                }),
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
        settVisfeilmeldingerDeltBosted,
    };
};
