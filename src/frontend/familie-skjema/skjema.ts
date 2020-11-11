import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useState } from 'react';
import { FamilieAxiosRequestConfig, useApp } from '../context/AppContext';
import { Felt, FieldDictionary, ISkjema, Valideringsstatus } from './typer';

export const useSkjema = <Felter, SkjemaRespons>({
    skjemanavn,
    felter,
    nullstillEtterSubmit = true,
}: {
    skjemanavn: string;
    felter: FieldDictionary<Felter>;
    nullstillEtterSubmit?: boolean;
}) => {
    const { axiosRequest } = useApp();
    const [visFeilmeldinger, settVisfeilmeldinger] = useState(false);
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs<SkjemaRespons>());

    const kanSendeSkjema = (): boolean => {
        settVisfeilmeldinger(true);
        return (
            Object.values(felter).filter(felt => {
                const unknownFelt = felt as Felt<unknown>;
                return unknownFelt.valideringsstatus !== Valideringsstatus.OK;
            }) && skjema.submitRessurs.status !== RessursStatus.HENTER
        );
    };

    const nullstillSkjema = () => {
        // eslint-disable-next-line
        Object.values(felter).forEach((felt: unknown) => (felt as Felt<unknown>).nullstill);
    };

    const onSubmit = <SkjemaData>(
        familieAxiosRequestConfig: FamilieAxiosRequestConfig<SkjemaData>,
        onSuccess: (ressurs: Ressurs<SkjemaRespons>) => void
    ) => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggHenterRessurs());

            axiosRequest<SkjemaRespons, SkjemaData>(familieAxiosRequestConfig).then(
                (response: Ressurs<SkjemaRespons>) => {
                    settSubmitRessurs(response);
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillEtterSubmit && nullstillSkjema();
                        onSuccess(response);
                    }
                }
            );
        }
    };

    const skjema: ISkjema<Felter, SkjemaRespons> = {
        felter,
        visFeilmeldinger,
        skjemanavn,
        submitRessurs,
    };

    return {
        kanSendeSkjema,
        nullstillSkjema,
        onSubmit,
        skjema,
    };
};
