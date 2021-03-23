import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useSøknad } from '../../../context/SøknadContext';
import Pluss from '../../../ikoner/Pluss';
import { adressebeskyttelsestyper, IPersonInfo, IRestTilgang } from '../../../typer/person';
import { IBarnMedOpplysninger } from '../../../typer/søknad';
import { identValidator } from '../../../utils/validators';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';

const StyledKnapp = styled(Knapp)`
    margin-left: 1rem;
`;

const LeggTilBarn: React.FunctionComponent = () => {
    const { request } = useHttp();

    const { skjema } = useSøknad();
    const [visModal, settVisModal] = useState<boolean>(false);

    const {
        skjema: hentBarnSkjema,
        settSubmitRessurs,
        kanSendeSkjema,
        nullstillSkjema: nullstillHentBarnSkjema,
    } = useSkjema<{ ident: string }, IPersonInfo>({
        felter: {
            ident: useFelt<string>({
                verdi: '',
                valideringsfunksjon:
                    process.env.NODE_ENV === 'development' ? felt => ok(felt) : identValidator,
            }),
        },
        skjemanavn: 'Hent barn',
    });

    const onAvbryt = () => {
        settVisModal(false);
        settSubmitRessurs(byggTomRessurs());
        hentBarnSkjema.felter.ident.nullstill();
    };

    const leggTilOnClick = () => {
        if (
            skjema.felter.barnaMedOpplysninger.verdi.some(
                barn => barn.ident === hentBarnSkjema.felter.ident.verdi
            )
        ) {
            settSubmitRessurs(byggFeiletRessurs('Barnet er allerede lagt til'));
            return;
        }

        if (kanSendeSkjema()) {
            settSubmitRessurs(byggHenterRessurs());

            request<{ brukerIdent: string }, IRestTilgang>({
                method: 'POST',
                url: '/familie-ba-sak/api/tilgang',
                data: { brukerIdent: hentBarnSkjema.felter.ident.verdi },
            }).then((ressurs: Ressurs<IRestTilgang>) => {
                nullstillHentBarnSkjema();

                if (ressurs.status === RessursStatus.SUKSESS) {
                    if (ressurs.data.saksbehandlerHarTilgang) {
                        request<void, IPersonInfo>({
                            method: 'GET',
                            url: '/familie-ba-sak/api/person/enkel',
                            headers: {
                                personIdent: hentBarnSkjema.felter.ident.verdi,
                            },
                        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
                            settSubmitRessurs(hentetPerson);
                            if (hentetPerson.status === RessursStatus.SUKSESS) {
                                const barn: IBarnMedOpplysninger = {
                                    ident: hentetPerson.data.personIdent,
                                    navn: hentetPerson.data.navn,
                                    fødselsdato: hentetPerson.data.fødselsdato,
                                    inkludertISøknaden: true,
                                    manueltRegistrert: true,
                                };
                                skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                                    ...skjema.felter.barnaMedOpplysninger.verdi,
                                    barn,
                                ]);

                                settVisModal(false);
                            }
                        });
                    } else {
                        settSubmitRessurs(
                            byggFeiletRessurs(
                                `Barnet kan ikke legges til på grunn av diskresjonskode ${
                                    adressebeskyttelsestyper[
                                        ressurs.data.adressebeskyttelsegradering
                                    ] ?? 'ukjent'
                                }`
                            )
                        );
                    }
                } else if (
                    [
                        RessursStatus.FEILET,
                        RessursStatus.FUNKSJONELL_FEIL,
                        RessursStatus.IKKE_TILGANG,
                    ].includes(ressurs.status)
                ) {
                    settSubmitRessurs(ressurs);
                }
            });
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
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                }}
            >
                <FamilieInput
                    {...hentBarnSkjema.felter.ident.hentNavInputProps(
                        hentBarnSkjema.visFeilmeldinger
                    )}
                    label={'Fødselsnummer'}
                    placeholder={'11 siffer'}
                />
            </UIModalWrapper>
        </>
    );
};

export default LeggTilBarn;
