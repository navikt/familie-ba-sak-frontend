import { useState } from 'react';

import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { FamilieAxiosRequestConfig, useApp } from '../context/AppContext';
import { Felt, FieldDictionary, ISkjema, Valideringsstatus } from './typer';

export const useSkjema = <Felter, SkjemaRespons>({
    felter,
    skjemanavn,
}: {
    felter: FieldDictionary<Felter>;
    skjemanavn: string;
}) => {
    const { axiosRequest } = useApp();
    const [visFeilmeldinger, settVisfeilmeldinger] = useState(false);
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs<SkjemaRespons>());

    const alleSynligeFelter = () => {
        return Object.values(felter).filter(felt => (felt as Felt<unknown>).erSynlig);
    };

    const validerAlleSynligeFelter = () => {
        alleSynligeFelter()
            .filter(
                felt =>
                    (felt as Felt<unknown>).valideringsstatus === Valideringsstatus.IKKE_VALIDERT
            )
            .forEach(felt => {
                const unknownFelt = felt as Felt<unknown>;
                unknownFelt.validerOgSettFelt(unknownFelt.verdi, {
                    felter,
                });
            });
    };

    const kanSendeSkjema = (): boolean => {
        validerAlleSynligeFelter();
        settVisfeilmeldinger(true);

        return (
            alleSynligeFelter().filter(felt => {
                const unknownFelt = felt as Felt<unknown>;
                return unknownFelt.valideringsstatus !== Valideringsstatus.OK;
            }).length === 0 && skjema.submitRessurs.status !== RessursStatus.HENTER
        );
    };

    const nullstillSkjema = () => {
        // eslint-disable-next-line
        alleSynligeFelter().forEach((felt: unknown) => (felt as Felt<unknown>).nullstill());
        settVisfeilmeldinger(false);
        settSubmitRessurs(byggTomRessurs());
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
                        nullstillSkjema();
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
