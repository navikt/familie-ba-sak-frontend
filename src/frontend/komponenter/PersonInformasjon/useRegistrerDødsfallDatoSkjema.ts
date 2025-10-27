import { isValid } from 'date-fns';
import { useForm } from 'react-hook-form';

import { RessursStatus } from '@navikt/familie-typer';

import { useRegistrerDødsfallDato } from '../../hooks/useRegistrerDødsfallDato';
import { useBehandlingContext } from '../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IGrunnlagPerson } from '../../typer/person';
import { dateTilIsoDatoString } from '../../utils/dato';
import { isEmpty } from '../../utils/eøsValidators';

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
}

interface RegistrerDødsfallDatoFormValues {
    dødsfallDato: Date | undefined;
    begrunnelse: string;
}

export const useRegistrerDødsfallDatoSkjema = ({ person, lukkModal }: IProps) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { mutateAsync: registrerDødsfallDatoAsync } = useRegistrerDødsfallDato();

    const erSkjemaGyldig = (values: RegistrerDødsfallDatoFormValues) => {
        return !isEmpty(values.begrunnelse) && isValid(values.dødsfallDato);
    };

    const form = useForm<RegistrerDødsfallDatoFormValues>({
        values: {
            dødsfallDato: undefined,
            begrunnelse: '',
        },
    });

    const {
        setError,
        formState: { isSubmitting: registrerDødsfallDatoPending },
    } = form;

    async function registrerDødsfall(values: RegistrerDødsfallDatoFormValues) {
        if (erSkjemaGyldig(values)) {
            const { dødsfallDato, begrunnelse } = values;

            const registrerDødsfallParameters = {
                dødsfallDato: dateTilIsoDatoString(dødsfallDato),
                begrunnelse,
                personIdent: person.personIdent,
                behandlingId: behandling.behandlingId,
            };

            return registrerDødsfallDatoAsync(registrerDødsfallParameters)
                .then(behandling => {
                    settÅpenBehandling({ status: RessursStatus.SUKSESS, data: behandling });
                    lukkModal();
                })
                .catch(error => {
                    if (error.status === RessursStatus.FEILET || error.status === RessursStatus.FUNKSJONELL_FEIL) {
                        setError('root', {
                            message: error.frontendFeilmelding,
                        });
                    } else {
                        console.log('error', error);
                        setError('root', {
                            message: 'Teknisk feil ved lagring av manuell dødsfall dato',
                        });
                    }
                });
        } else {
            setError('root', {
                message: 'Begrunnelse og dødsfall dato må fylles ut',
            });
        }
    }

    return {
        form,
        registrerDødsfall,
        erSkjemaGyldig,
        registrerDødsfallDatoPending,
    };
};
