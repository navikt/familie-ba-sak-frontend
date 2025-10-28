import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useRegistrerDødsfallDato } from '../../hooks/useRegistrerDødsfallDato';
import { useBehandlingContext } from '../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IGrunnlagPerson } from '../../typer/person';
import { dateTilIsoDatoString } from '../../utils/dato';

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
}

export enum RegistrerDødsfallDatoFelt {
    DØDSFALL_DATO = 'dødsfallDato',
    BEGRUNNELSE = 'begrunnelse',
}

export interface RegistrerDødsfallDatoFormValues {
    [RegistrerDødsfallDatoFelt.DØDSFALL_DATO]: Date | undefined;
    [RegistrerDødsfallDatoFelt.BEGRUNNELSE]: string;
}

export const useRegistrerDødsfallDatoSkjema = ({ person, lukkModal }: IProps) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { mutateAsync: registrerDødsfallDato } = useRegistrerDødsfallDato();

    const form = useForm<RegistrerDødsfallDatoFormValues>({
        values: {
            [RegistrerDødsfallDatoFelt.DØDSFALL_DATO]: undefined,
            [RegistrerDødsfallDatoFelt.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    async function onSubmit(values: RegistrerDødsfallDatoFormValues) {
        const { dødsfallDato, begrunnelse } = values;

        const registrerDødsfallParameters = {
            dødsfallDato: dateTilIsoDatoString(dødsfallDato),
            begrunnelse,
            personIdent: person.personIdent,
            behandlingId: behandling.behandlingId,
        };

        return registrerDødsfallDato(registrerDødsfallParameters)
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
            })
            .catch((e: unknown) =>
                setError('root', {
                    message: e instanceof Error ? e.message : 'Teknisk feil ved lagring av manuell dødsfall dato.',
                })
            );
    }

    return {
        form,
        onSubmit,
    };
};
