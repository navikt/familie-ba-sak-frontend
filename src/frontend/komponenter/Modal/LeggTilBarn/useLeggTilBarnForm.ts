import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useHttp } from '@navikt/familie-http';
import { Adressebeskyttelsegradering } from '@navikt/familie-typer';

import { useLeggTilBarnModalContext } from './LeggTilBarnModalContext';
import { hentPersonEnkel } from '../../../api/hentPersonEnkel';
import { HentPersonEnkelQueryKeyFactory } from '../../../hooks/useHentPersonEnkel';
import { useOnFormSubmitSuccessful } from '../../../hooks/useOnFormSubmitSuccessful';
import { adressebeskyttelsestyper } from '../../../typer/person';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';
import { dateTilIsoDatoStringEllerUndefined } from '../../../utils/dato';

const påvirkerSystemLaster = false;

function harBrevmottakerOgHarStrengtFortroligAdressebeskyttelse(
    gradering: Adressebeskyttelsegradering,
    harBrevmottaker: boolean
) {
    const erStrengtFortrolig = gradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG;
    const erStrengtFortroligUtland = gradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND;
    return (erStrengtFortrolig || erStrengtFortroligUtland) && harBrevmottaker;
}

export interface FormValues {
    [Fields.FØDSELSNUMMER]: string;
    [Fields.ER_FOLKEREGISTERT]: boolean;
    [Fields.FØDSELSDATO]: Date | null;
    [Fields.NAVN]: string;
}

type TransformedFormValues =
    | {
          [Fields.FØDSELSNUMMER]: string;
          [Fields.ER_FOLKEREGISTERT]: true;
          [Fields.FØDSELSDATO]: never;
          [Fields.NAVN]: never;
      }
    | {
          [Fields.FØDSELSNUMMER]: never;
          [Fields.ER_FOLKEREGISTERT]: false;
          [Fields.FØDSELSDATO]: Date | null;
          [Fields.NAVN]: string;
      };

export enum Fields {
    FØDSELSNUMMER = 'fødselsnummer',
    ER_FOLKEREGISTERT = 'erFolkeregistrert',
    FØDSELSDATO = 'fødselsdato',
    NAVN = 'navn',
}

interface Props {
    onLeggTilBarn: (barn: IBarnMedOpplysninger) => void;
    harBrevmottaker: boolean;
}

export function useLeggTilBarnForm({ onLeggTilBarn, harBrevmottaker }: Props) {
    const queryClient = useQueryClient();
    const { request } = useHttp();
    const { lukkModal } = useLeggTilBarnModalContext();

    const form = useForm<FormValues, unknown, TransformedFormValues>({
        defaultValues: {
            [Fields.FØDSELSNUMMER]: '',
            [Fields.ER_FOLKEREGISTERT]: true,
            [Fields.FØDSELSDATO]: null,
            [Fields.NAVN]: '',
        },
    });

    useOnFormSubmitSuccessful(form.control, () => form.reset());

    async function onSubmit(values: TransformedFormValues) {
        const { fødselsnummer, erFolkeregistrert, fødselsdato, navn } = values;
        if (!erFolkeregistrert) {
            const nyttBarn = {
                fødselsdato: dateTilIsoDatoStringEllerUndefined(fødselsdato),
                ident: '',
                merket: true,
                manueltRegistrert: true,
                navn: navn,
                erFolkeregistrert: false,
            };
            onLeggTilBarn(nyttBarn);
            lukkModal();
            return;
        }
        if (erFolkeregistrert) {
            try {
                const person = await queryClient.fetchQuery({
                    queryKey: HentPersonEnkelQueryKeyFactory.personEnkel(fødselsnummer),
                    queryFn: () => hentPersonEnkel(request, fødselsnummer, påvirkerSystemLaster),
                });
                if (
                    harBrevmottakerOgHarStrengtFortroligAdressebeskyttelse(
                        person.adressebeskyttelseGradering,
                        harBrevmottaker
                    )
                ) {
                    const feilmelding = `Barnet du prøver å legge til har diskresjonskode: "${adressebeskyttelsestyper[person.adressebeskyttelseGradering] ?? 'ukjent'}". Brevmottaker(e) er endret og må fjernes før du kan legge til barnet.`;
                    form.setError('root', { message: feilmelding });
                    return;
                }
                const nyttBarn = {
                    fødselsdato: person.fødselsdato,
                    ident: person.personIdent,
                    merket: true,
                    manueltRegistrert: true,
                    navn: person.navn,
                    erFolkeregistrert: true,
                };
                onLeggTilBarn(nyttBarn);
                lukkModal();
                return;
            } catch (e: unknown) {
                form.setError('root', { message: e instanceof Error ? e.message : 'En ukjent feil oppstod.' });
                return;
            }
        }
        form.setError('root', { message: 'En uventent feil oppstod ved registrering av nytt barn.' });
        return;
    }

    return { form, onSubmit };
}
