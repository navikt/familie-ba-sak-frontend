import { byggHenterRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useEffect, useState } from 'react';
import { FamilieAxiosRequestConfig, useApp } from '../context/AppContext';
import { validerFelt } from '../utils/validators';
import { IFelt, Valideringsstatus } from './felt';

// eslint-disable-next-line
export type felterType = { [key: string]: IFelt<any> };

export interface ISkjema<SkjemaRespons> {
    // eslint-disable-next-line
    felter: felterType;
    skjemanavn: string;
    submitRessurs: Ressurs<SkjemaRespons>;
    visFeilmeldinger: boolean;
}

export const useSkjema = <SkjemaRespons>(initialSkjema: ISkjema<SkjemaRespons>) => {
    const { axiosRequest } = useApp();
    const [skjema, settSkjema] = useState<ISkjema<SkjemaRespons>>(initialSkjema);

    const settInitialState = () => {
        settSkjema({
            ...initialSkjema,
            felter: Object.entries(initialSkjema.felter).reduce(
                (validerteFelter: felterType, [feltNavn, felt]) => {
                    return {
                        ...validerteFelter,
                        [feltNavn]: felt.valider(felt),
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
    const oppdaterFeltISkjema = (feltNavn: string, nyVerdi: any) => {
        settSkjema({
            ...skjema,
            felter: {
                ...skjema.felter,
                [feltNavn]: validerFelt(nyVerdi, skjema.felter[feltNavn], {
                    felter: skjema.felter,
                }),
            },
        });
    };

    const settSubmitRessurs = (submitRessurs: Ressurs<SkjemaRespons>) => {
        settSkjema({
            ...skjema,
            submitRessurs,
        });
    };

    const kanSendeSkjema = (): boolean => {
        const validertSkjema = {
            ...skjema,
            felter: Object.entries(skjema.felter).reduce(
                (validerteFelter: felterType, [feltNavn, felt]) => {
                    return {
                        ...validerteFelter,
                        [feltNavn]: felt.valider(felt, {
                            felter: skjema.felter,
                        }),
                    };
                },
                {}
            ),
            visFeilmeldinger: true,
        };

        settSkjema(validertSkjema);

        return (
            Object.values(validertSkjema.felter).filter(
                // eslint-disable-next-line
                (felt: IFelt<any>) => felt.valideringsstatus !== Valideringsstatus.OK
            ).length === 0 && skjema.submitRessurs.status !== RessursStatus.HENTER
        );
    };

    const hentFeltProps = (feltNavn: string) => {
        return {
            name: feltNavn,
            id: `${skjema.skjemanavn}_${feltNavn}`,
            feil: hentFeilmelding(feltNavn),
            value: skjema.felter[feltNavn].verdi,
        };
    };

    const hentFeilmelding = (feltNavn: string) => {
        return skjema.visFeilmeldinger ? skjema.felter[feltNavn].feilmelding : undefined;
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
                        settInitialState();
                        onSuccess(response);
                    }
                }
            );
        }
    };

    return {
        hentFeltProps,
        kanSendeSkjema,
        onSubmit,
        oppdaterFeltISkjema,
        settInitialState,
        skjema,
    };
};
