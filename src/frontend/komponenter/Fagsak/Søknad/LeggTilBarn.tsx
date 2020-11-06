import * as React from 'react';
import { useState } from 'react';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import Pluss from '../../../ikoner/Pluss';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { adressebeskyttelsestyper, IPersonInfo, IRestTilgang } from '../../../typer/person';
import { identValidator, lagInitiellFelt, validerFelt } from '../../../utils/validators';
import { Valideringsstatus } from '../../../typer/felt';
import { useApp } from '../../../context/AppContext';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import { FamilieInput } from '@navikt/familie-form-elements';
import styled from 'styled-components';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const StyledKnapp = styled(Knapp)`
    margin-left: 1rem;
`;

const LeggTilBarn: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { axiosRequest } = useApp();

    const [visModal, settVisModal] = useState<boolean>(false);
    const [inputValue, settInputValue] = useState<string>('');

    const [person, settPerson] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());

    const onAvbryt = () => {
        settVisModal(false);
        settPerson(byggTomRessurs());
        settInputValue('');
    };

    const leggTilOnClick = () => {
        if (søknad.barnaMedOpplysninger.find(barn => barn.ident === inputValue)) {
            settPerson(byggFeiletRessurs('Barnet er allerede lagt til'));
            return;
        }

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
                            }
                        });
                    } else {
                        settPerson(
                            byggFeiletRessurs(
                                `Barnet kan ikke legges til på grunn av diskresjonskode ${
                                    adressebeskyttelsestyper[
                                        ressurs.data.adressebeskyttelsegradering
                                    ] ?? 'ukjent'
                                }`
                            )
                        );
                    }
                } else if (ressurs.status === RessursStatus.FEILET) {
                    settPerson(ressurs);
                }
            });
        } else {
            ident.valideringsstatus === Valideringsstatus.FEIL &&
                settPerson(byggFeiletRessurs(ident.feilmelding));
        }
    };

    return (
        <>
            <StyledKnapp
                mini
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Pluss />
                <span>Legg til barn</span>
            </StyledKnapp>

            <UIModalWrapper
                modal={{
                    tittel: 'Legg til barn',
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: onAvbryt,
                    actions: [
                        <Flatknapp key={'Avbryt'} mini onClick={onAvbryt} children={'Avbryt'} />,
                        <Knapp
                            type={'hoved'}
                            key={'Legg til'}
                            mini={true}
                            onClick={leggTilOnClick}
                            children={'Legg til'}
                            spinner={person.status === RessursStatus.HENTER}
                            disabled={person.status === RessursStatus.HENTER}
                        />,
                    ],
                }}
            >
                <FamilieInput
                    label={'Fødselsnummer'}
                    placeholder={'11 siffer'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        settPerson(byggTomRessurs());
                        settInputValue(event.target.value);
                    }}
                    feil={
                        person.status === RessursStatus.FEILET
                            ? person.frontendFeilmelding
                            : undefined
                    }
                />
            </UIModalWrapper>
        </>
    );
};

export default LeggTilBarn;
