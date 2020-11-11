import { byggHenterRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useState } from 'react';
import { FamilieAxiosRequestConfig, useApp } from '../context/AppContext';
import { ISkjema, Felt, Valideringsstatus, FieldBag } from './typer';

export const useSkjema = <Felter extends FieldBag, SkjemaRespons>({
    initialSkjema,
    nullstillEtterSubmit = true,
}: {
    initialSkjema: ISkjema<Felter, SkjemaRespons>;
    nullstillEtterSubmit?: boolean;
}) => {
    const { axiosRequest } = useApp();
    const [skjema, settSkjema] = useState<ISkjema<Felter, SkjemaRespons>>(initialSkjema);

    const settSubmitRessurs = (submitRessurs: Ressurs<SkjemaRespons>) => {
        settSkjema({
            ...skjema,
            submitRessurs,
        });
    };

    const kanSendeSkjema = (): boolean => {
        // eslint-disable-next-line
        Object.values(skjema.felter).forEach((felt: Felt<unknown>) => {
            felt.valider(felt, {
                felter: skjema.felter,
            });
        });

        return (
            Object.values(skjema.felter).filter(
                (felt: Felt<unknown>) => felt.valideringsstatus !== Valideringsstatus.OK
            ).length === 0 && skjema.submitRessurs.status !== RessursStatus.HENTER
        );
    };

    const nullstillSkjema = () => {
        // eslint-disable-next-line
        Object.values(skjema.felter).forEach((felt: Felt<unknown>) => felt.nullstill);
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

    return {
        kanSendeSkjema,
        nullstillSkjema,
        onSubmit,
        skjema,
    };
};
