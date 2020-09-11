import * as React from 'react';
import { useEffect, useState } from 'react';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import Pluss from '../../../ikoner/Pluss';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { IPerson } from '../../../typer/person';
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

    const [person, settPerson] = React.useState<Ressurs<IPerson>>(byggTomRessurs());

    useEffect(() => {
        if (person.status === RessursStatus.SUKSESS) {
            const barn: IBarnMedOpplysninger = {
                ident: person.data.personIdent,
                navn: person.data.navn,
                fødselsdato: person.data.fødselsdato,
                inkludertISøknaden: true,
                manueltRegistrert: true,
            };
            søknad.barnaMedOpplysninger.push(barn);
            settSøknadOgValider(søknad);

            settVisModal(false);
        } else if (person.status === RessursStatus.FEILET) {
            settFeilmelding(person.frontendFeilmelding);
        }
    }, [person.status]);

    const leggTilOnClick = () => {
        const ident = validerFelt(inputValue, lagInitiellFelt('', identValidator));

        if (
            ident.valideringsstatus === Valideringsstatus.OK ||
            process.env.NODE_ENV === 'development'
        ) {
            settPerson({ status: RessursStatus.HENTER });
            axiosRequest<IPerson, void>({
                method: 'GET',
                url: '/familie-ba-sak/api/person/enkel',
                headers: {
                    personIdent: ident.verdi,
                },
            })
                .then((hentetPerson: Ressurs<IPerson>) => {
                    settPerson(hentetPerson);
                })
                .catch(() => {
                    settPerson({
                        status: RessursStatus.FEILET,
                        frontendFeilmelding: 'Ukjent feil ved henting av person',
                    });
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
                    onClose: () => settVisModal(false),
                    actions: [
                        <Knapp
                            key={'Legg til'}
                            mini
                            onClick={leggTilOnClick}
                            children={'Legg til'}
                            spinner={person.status === RessursStatus.HENTER}
                        />,
                        <Flatknapp
                            key={'Avbryt'}
                            mini
                            onClick={() => {
                                settVisModal(false);
                            }}
                            children={'Avbryt'}
                        />,
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
