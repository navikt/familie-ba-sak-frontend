import * as React from 'react';
import { useState } from 'react';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import Pluss from '../../../ikoner/Pluss';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { adressebeskyttelsestyper, IPersonInfo, IRestTilgang } from '../../../typer/person';
import { identValidator, lagInitiellFelt, validerFelt } from '../../../utils/validators';
import { Valideringsstatus } from '../../../typer/felt';
import { useApp } from '../../../context/AppContext';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import { FamilieInput } from '@navikt/familie-form-elements';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const LeggTilBarn: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { axiosRequest } = useApp();

    const [visModal, settVisModal] = useState<boolean>(false);
    const [inputValue, settInputValue] = useState<string>('');
    const [feilmelding, settFeilmelding] = useState<string | undefined>();

    const [person, settPerson] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());

    const onAvbryt = () => {
        settVisModal(false);
        settFeilmelding(undefined);
        settInputValue('');
    };

    const leggTilOnClick = () => {
        const ident = validerFelt(inputValue, lagInitiellFelt('', identValidator));

        if (
            ident.valideringsstatus === Valideringsstatus.OK ||
            process.env.NODE_ENV === 'development'
        ) {
            settPerson({ status: RessursStatus.HENTER });

            axiosRequest<IRestTilgang, { brukerIdent: string }>({
                method: 'POST',
                url: '/familie-ba-sak/api/tilgang',
                data: { brukerIdent: ident.verdi },
            }).then((ressurs: Ressurs<IRestTilgang>) => {
                if (ressurs.status === RessursStatus.SUKSESS) {
                    if (ressurs.data.saksbehandlerHarTilgang) {
                        axiosRequest<IPersonInfo, void>({
                            method: 'GET',
                            url: '/familie-ba-sak/api/person/enkel',
                            headers: {
                                personIdent: ident.verdi,
                            },
                        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
                            settPerson(hentetPerson);
                            if (hentetPerson.status === RessursStatus.SUKSESS) {
                                const barn: IBarnMedOpplysninger = {
                                    ident: hentetPerson.data.personIdent,
                                    navn: hentetPerson.data.navn,
                                    fødselsdato: hentetPerson.data.fødselsdato,
                                    inkludertISøknaden: true,
                                    manueltRegistrert: true,
                                };
                                settSøknadOgValider({
                                    ...søknad,
                                    barnaMedOpplysninger: [...søknad.barnaMedOpplysninger, barn],
                                });

                                settVisModal(false);
                            } else if (hentetPerson.status === RessursStatus.FEILET) {
                                settFeilmelding(hentetPerson.frontendFeilmelding);
                            }
                        });
                    } else {
                        settFeilmelding(
                            `Barnet kan ikke legges til på grunn av diskresjonskode ${
                                adressebeskyttelsestyper[
                                    ressurs.data.adressebeskyttelsegradering
                                ] ?? 'ukjent'
                            }`
                        );
                    }
                } else if (ressurs.status === RessursStatus.FEILET) {
                    settFeilmelding(ressurs.frontendFeilmelding);
                }
            });
        } else {
            ident.valideringsstatus === Valideringsstatus.FEIL &&
                settFeilmelding(ident.feilmelding);
        }
    };

    return (
        <>
            <Knapp
                mini
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Pluss />
                <span>Legg til barn</span>
            </Knapp>

            <UIModalWrapper
                modal={{
                    tittel: 'Legg til barn',
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: onAvbryt,
                    actions: [
                        <Knapp
                            key={'Legg til'}
                            mini
                            onClick={leggTilOnClick}
                            children={'Legg til'}
                            spinner={person.status === RessursStatus.HENTER}
                        />,
                        <Flatknapp key={'Avbryt'} mini onClick={onAvbryt} children={'Avbryt'} />,
                    ],
                }}
            >
                <FamilieInput
                    label={'Fødselsnummer'}
                    placeholder={'11 siffer'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        settFeilmelding(undefined);
                        settInputValue(event.target.value);
                    }}
                    feil={feilmelding}
                />
            </UIModalWrapper>
        </>
    );
};

export default LeggTilBarn;
