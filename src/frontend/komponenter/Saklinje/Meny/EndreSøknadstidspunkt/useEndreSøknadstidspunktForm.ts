import type { IRegistrertSøknadstidspunktPåPersonDto } from '@api/hentRegistrertSøknadstidspunktPåPerson';
import { useEndreSøknadstidspunkt } from '@hooks/useEndreSøknadstidspunkt';
import { HentRegistrertSøknadstidspunktPåPersonQueryKeyFactory } from '@hooks/useHentRegistrertSøknadstidspunktPåPerson';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useQueryClient } from '@tanstack/react-query';
import { dateTilIsoDatoString, isoStringTilDateEllerUndefined } from '@utils/dato';
import { useFieldArray, useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

export interface SøknadstidspunktFeltValues {
    personIdent: string;
    navn: string;
    fødselsdato: string;
    søknadstidspunkt: Date | null;
}

export interface EndreSøknadstidspunktFormValues {
    personer: SøknadstidspunktFeltValues[];
}

interface Props {
    lukkModal: () => void;
    søknadstidspunkter: IRegistrertSøknadstidspunktPåPersonDto[];
}

export function useEndreSøknadstidspunktForm({ lukkModal, søknadstidspunkter }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const queryClient = useQueryClient();

    const { mutateAsync: endreSøknadstidspunkt } = useEndreSøknadstidspunkt({
        onSuccess: async oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            await queryClient.invalidateQueries({
                queryKey: HentRegistrertSøknadstidspunktPåPersonQueryKeyFactory.registrertSøknadstidspunkt(
                    behandling.behandlingId
                ),
            });
            lukkModal();
        },
        onError: error => {
            setError('root', { message: error.message ?? 'Teknisk feil ved endring av søknadstidspunkt.' });
        },
    });

    const form = useForm<EndreSøknadstidspunktFormValues>({
        defaultValues: {
            personer: søknadstidspunkter
                .map(({ personIdent, søknadstidspunkt }): SøknadstidspunktFeltValues | undefined => {
                    const person = behandling.personer.find(p => p.personIdent === personIdent);

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
                .filter((person): person is SøknadstidspunktFeltValues => person !== undefined),
        },
    });

    const { clearErrors, setError } = form;

    const fieldArray = useFieldArray({
        control: form.control,
        name: 'personer',
    });

    function onSubmit(values: EndreSøknadstidspunktFormValues) {
        clearErrors('root');

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
