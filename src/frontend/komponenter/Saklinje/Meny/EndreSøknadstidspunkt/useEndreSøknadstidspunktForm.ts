import type { IRegistrertSøknadstidspunktDto } from '@api/hentRegistrertSøknadstidspunkt';
import { useEndreSøknadstidspunkt } from '@hooks/useEndreSøknadstidspunkt';
import { HentRegistrertSøknadstidspunktQueryKeyFactory } from '@hooks/useHentRegistrertSøknadstidspunkt';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useQueryClient } from '@tanstack/react-query';
import { PersonType } from '@typer/person';
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
    søknadstidspunkter: IRegistrertSøknadstidspunktDto[];
}

export const useEndreSøknadstidspunktForm = ({ lukkModal, søknadstidspunkter }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: endreSøknadstidspunkt } = useEndreSøknadstidspunkt();
    const queryClient = useQueryClient();

    // Forhåndsutfyll med persistert søknadstidspunkt for personen hvis det finnes,
    // ellers behandlingens søknad mottatt-dato som default, ellers tomt.
    const utledSøknadstidspunkt = (personIdent: string): Date | null => {
        const persistertSøknadstidspunkt = søknadstidspunkter.find(
            person => person.personIdent === personIdent
        )?.søknadstidspunkt;

        return isoStringTilDateEllerUndefined(persistertSøknadstidspunkt ?? behandling.søknadMottattDato) ?? null;
    };

    const form = useForm<EndreSøknadstidspunktFormValues>({
        defaultValues: {
            personer: behandling.personer
                .filter(person => person.type !== PersonType.SØKER)
                .map(person => ({
                    personIdent: person.personIdent,
                    navn: person.navn,
                    fødselsdato: person.fødselsdato,
                    søknadstidspunkt: utledSøknadstidspunkt(person.personIdent),
                })),
        },
    });

    const { clearErrors, setError } = form;

    const fieldArray = useFieldArray({
        control: form.control,
        name: 'personer',
    });

    const onSubmit = async (values: EndreSøknadstidspunktFormValues) => {
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
        })
            .then(async oppdatertBehandling => {
                settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
                await queryClient.invalidateQueries({
                    queryKey: HentRegistrertSøknadstidspunktQueryKeyFactory.registrertSøknadstidspunkt(
                        behandling.behandlingId
                    ),
                });
                lukkModal();
            })
            .catch((e: unknown) =>
                setError('root', {
                    message: e instanceof Error ? e.message : 'Teknisk feil ved endring av søknadstidspunkt.',
                })
            );
    };

    return {
        form,
        fieldArray,
        onSubmit,
    };
};
