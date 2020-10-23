import { byggHenterRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useEffect, useState } from 'react';
import { FamilieAxiosRequestConfig, useApp } from '../context/AppContext';
import { validerFelt } from '../utils/validators';
import { IFelt, Valideringsstatus } from './felt';

// eslint-disable-next-line
type felterType = { [key: string]: IFelt<any> };

export interface ISkjema<T> {
    // eslint-disable-next-line
    felter: felterType;
    submitRessurs: Ressurs<T>;
    visFeilmeldinger: boolean;
}

export const useSkjema = <T>(initialSkjema: ISkjema<T>) => {
    const { axiosRequest } = useApp();
    const [skjema, settSkjema] = useState<ISkjema<T>>(initialSkjema);

    const settInitialState = () => {
        settSkjema({
            ...initialSkjema,
            felter: Object.entries(initialSkjema.felter).reduce(
                (validerteFelter: felterType, [feltId, felt]) => {
                    return {
                        ...validerteFelter,
                        [feltId]: felt.valideringsfunksjon(felt),
                    };
                },
                {}
            ),
        });
    };

    useEffect(() => {
        settInitialState();
    }, []);

    // eslint-disable-next-line
    const oppdaterFeltISkjema = (feltId: string, nyVerdi: any) => {
        settSkjema({
            ...skjema,
            felter: {
                ...skjema.felter,
                [feltId]: validerFelt(nyVerdi, skjema.felter[feltId]),
            },
        });
    };

    const settSubmitRessurs = (submitRessurs: Ressurs<T>) => {
        settSkjema({
            ...skjema,
            submitRessurs,
        });
    };

    const kanSendeSkjema = (): boolean => {
        settSkjema({
            ...skjema,
            visFeilmeldinger: true,
        });

        return (
            Object.values(skjema.felter).filter(
                // eslint-disable-next-line
                (felt: IFelt<any>) => felt.valideringsstatus !== Valideringsstatus.OK
            ).length === 0 && skjema.submitRessurs.status !== RessursStatus.HENTER
        );
    };

    const hentFeilmelding = (feltId: string) => {
        return skjema.visFeilmeldinger ? skjema.felter[feltId].feilmelding : undefined;
    };

    const onSubmit = <D>(
        familieAxiosRequestConfig: FamilieAxiosRequestConfig<D>,
        onSuccess: () => void
    ) => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggHenterRessurs());

            axiosRequest<T, D>(familieAxiosRequestConfig).then((response: Ressurs<T>) => {
                settSubmitRessurs(response);
                if (response.status === RessursStatus.SUKSESS) {
                    settInitialState();
                    onSuccess();
                }
            });
        }
    };

    return {
        hentFeilmelding,
        kanSendeSkjema,
        oppdaterFeltISkjema,
        skjema,
        onSubmit,
    };
};
