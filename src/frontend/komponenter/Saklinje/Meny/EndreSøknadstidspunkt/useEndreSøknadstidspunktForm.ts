import type { RegistrertSøknadstidspunkt } from '@api/hentRegistrerteSøknadstidspunkter';
import { useEndreSøknadstidspunkt } from '@hooks/useEndreSøknadstidspunkt';
import { HentRegistrerteSøknadstidspunkterQueryKeyFactory } from '@hooks/useHentRegistrerteSøknadstidspunkter';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { useQueryClient } from '@tanstack/react-query';
import { erRevurderingEtterKlage, type IBehandling } from '@typer/behandling';
import { BehandlingUnderkategori } from '@typer/behandlingstema';
import { type IGrunnlagPerson, PersonType } from '@typer/person';
import { dateTilIsoDatoString, isoStringTilDateEllerUndefined } from '@utils/dato';
import { useFieldArray, useForm } from 'react-hook-form';

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

function kanRegistrereNyttSøknadstidspunkt(person: IGrunnlagPerson, behandling: IBehandling) {
    return (
        erRevurderingEtterKlage(behandling) &&
        !person.skjermesForBruker &&
        (person.type === PersonType.BARN ||
            (person.type === PersonType.SØKER && behandling.underkategori === BehandlingUnderkategori.UTVIDET))
    );
}

function mapTilPerson(søknadstidspunkter: RegistrertSøknadstidspunkt[], behandling: IBehandling): Person[] {
    const søknadstidspunktPerIdent = new Map(
        søknadstidspunkter.map(({ personIdent, søknadstidspunkt }) => [personIdent, søknadstidspunkt])
    );

    return behandling.personer
        .filter(
            person =>
                søknadstidspunktPerIdent.has(person.personIdent) ||
                kanRegistrereNyttSøknadstidspunkt(person, behandling)
        )
        .map(({ personIdent, navn, fødselsdato }) => ({
            personIdent,
            navn,
            fødselsdato,
            søknadstidspunkt: isoStringTilDateEllerUndefined(søknadstidspunktPerIdent.get(personIdent)) ?? null,
        }));
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
            personer: mapTilPerson(søknadstidspunkter, behandling),
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
