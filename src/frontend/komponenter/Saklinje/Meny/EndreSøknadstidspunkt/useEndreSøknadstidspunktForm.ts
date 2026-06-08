import type { RegistrertSøknadstidspunkt } from '@api/hentRegistrerteSøknadstidspunkter';
import { useEndreSøknadstidspunkt } from '@hooks/useEndreSøknadstidspunkt';
import { HentRegistrerteSøknadstidspunkterQueryKeyFactory } from '@hooks/useHentRegistrerteSøknadstidspunkter';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useQueryClient } from '@tanstack/react-query';
import type { IGrunnlagPerson } from '@typer/person';
import { dateTilIsoDatoString, isoStringTilDateEllerUndefined } from '@utils/dato';
import { useFieldArray, useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

export interface Person {
    personIdent: string;
    navn: string;
    fødselsdato: string;
    søknadstidspunkt: Date | null;
}

export interface EndreSøknadstidspunktFormValues {
    personer: Person[];
}

interface Props {
    lukkModal: () => void;
    søknadstidspunkter: RegistrertSøknadstidspunkt[];
}

function mapTilPerson(
    søknadstidspunkter: RegistrertSøknadstidspunkt[],
    grunnlagspersoner: IGrunnlagPerson[]
): Person[] {
    return søknadstidspunkter
        .map(({ personIdent, søknadstidspunkt }): Person | undefined => {
            const person = grunnlagspersoner.find(p => p.personIdent === personIdent);

            if (person === undefined) {
                return undefined;
            }

            return {
                personIdent,
                navn: person.navn,
                fødselsdato: person.fødselsdato,
                søknadstidspunkt: isoStringTilDateEllerUndefined(søknadstidspunkt) ?? null,
            };
        })
        .filter((person): person is Person => person !== undefined);
}

export function useEndreSøknadstidspunktForm({ lukkModal, søknadstidspunkter }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const queryClient = useQueryClient();

    const { mutateAsync: endreSøknadstidspunkt } = useEndreSøknadstidspunkt({
        onSuccess: async oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            await queryClient.invalidateQueries({
                queryKey: HentRegistrerteSøknadstidspunkterQueryKeyFactory.registrerteSøknadstidspunkter(
                    behandling.behandlingId
                ),
            });
            lukkModal();
        },
        onError: error => {
            setError('root', { message: `Teknisk feil ved endring av søknadstidspunkt: ${error.message}` });
        },
    });

    const form = useForm<EndreSøknadstidspunktFormValues>({
        values: {
            personer: mapTilPerson(søknadstidspunkter, behandling.personer),
        },
    });

    const { setError } = form;

    const fieldArray = useFieldArray({
        control: form.control,
        name: 'personer',
    });

    function onSubmit(values: EndreSøknadstidspunktFormValues) {
        const personerMedDato = values.personer.filter(person => person.søknadstidspunkt !== null);

        if (personerMedDato.length === 0) {
            setError('root', { message: 'Du må sette søknadstidspunkt for minst én person.' });
            return;
        }

        return endreSøknadstidspunkt({
            behandlingId: behandling.behandlingId,
            søknadstidspunktPerPerson: personerMedDato.map(person => ({
                personIdent: person.personIdent,
                søknadstidspunkt: dateTilIsoDatoString(person.søknadstidspunkt ?? undefined),
            })),
        });
    }

    return { form, fieldArray, onSubmit };
}
