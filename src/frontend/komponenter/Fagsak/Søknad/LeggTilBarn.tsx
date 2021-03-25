import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';

import { FamilieInput } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { Avhengigheter, feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    hentDataFraRessursMedFallback,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import Pluss from '../../../ikoner/Pluss';
import { LoggType } from '../../../typer/logg';
import { adressebeskyttelsestyper, IPersonInfo, IRestTilgang } from '../../../typer/person';
import { FamilieIsoDate } from '../../../typer/tid';
import { identValidator } from '../../../utils/validators';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import LeggTilUregistrertBarn from './LeggTilUregistrertBarn';

const StyledKnapp = styled(Knapp)`
    margin-left: 1rem;
`;

const StyledUIModalWrapper = styled(UIModalWrapper)`
    min-height: 20rem !important;
`;

export interface IRegistrerBarnSkjema {
    ident: string;
    erIkkeFolkeregistrert: boolean;
    uregistrertBarnFødselsdato: FamilieIsoDate | undefined;
    uregistrertBarnNavn: string;
}

const LeggTilBarn: React.FunctionComponent = () => {
    const { request } = useHttp();
    const { logg } = useFagsakRessurser();

    const { skjema } = useSøknad();
    const [visModal, settVisModal] = useState<boolean>(false);

    const [kanLeggeTilUregistrerteBarn, settKanLeggeTilUregistrerteBarn] = useState(false);

    React.useEffect(() => {
        settKanLeggeTilUregistrerteBarn(
            hentDataFraRessursMedFallback(logg, [])?.some(
                l => l.type === LoggType.DISTRIBUERE_BREV && l.tekst.includes('Innhenting')
            ) ?? false
        );
    }, [logg.status]);

    const erIkkeFolkeregistrert = useFelt<boolean>({
        verdi: false,
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            const { kanLeggeTilUregistrerteBarn } = avhengigheter;
            return kanLeggeTilUregistrerteBarn;
        },
        avhengigheter: { kanLeggeTilUregistrerteBarn },
    });

    const {
        skjema: registrerBarnSkjema,
        settSubmitRessurs,
        kanSendeSkjema,
        nullstillSkjema: nullstillRegistrerBarnSkjema,
    } = useSkjema<
        {
            ident: string;
            erIkkeFolkeregistrert: boolean;
            uregistrertBarnFødselsdato: FamilieIsoDate | undefined;
            uregistrertBarnNavn: string;
        },
        IPersonInfo
    >({
        felter: {
            ident: useFelt<string>({
                verdi: '',
                valideringsfunksjon:
                    process.env.NODE_ENV === 'development' ? felt => ok(felt) : identValidator,
                skalFeltetVises: (avhengigheter: Avhengigheter) => {
                    // Bruker logikk i skjema for å disable validering på feltet, men det er fortsatt synlig for bruker.
                    const { erIkkeFolkeregistrert } = avhengigheter;
                    return !erIkkeFolkeregistrert;
                },
                avhengigheter: { erIkkeFolkeregistrert: erIkkeFolkeregistrert.verdi },
            }),
            erIkkeFolkeregistrert,
            uregistrertBarnFødselsdato: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
                skalFeltetVises: (avhengigheter: Avhengigheter) => {
                    const { erIkkeFolkeregistrert } = avhengigheter;
                    return erIkkeFolkeregistrert;
                },
                avhengigheter: { erIkkeFolkeregistrert: erIkkeFolkeregistrert.verdi },
            }),
            uregistrertBarnNavn: useFelt<string>({
                verdi: '',
                valideringsfunksjon: felt =>
                    felt.verdi !== '' ? ok(felt) : feil(felt, 'Må fylle ut navn'),
                skalFeltetVises: (avhengigheter: Avhengigheter) => {
                    const { erIkkeFolkeregistrert } = avhengigheter;
                    return erIkkeFolkeregistrert;
                },
                avhengigheter: { erIkkeFolkeregistrert: erIkkeFolkeregistrert.verdi },
            }),
        },
        skjemanavn: 'Hent barn',
    });

    const onAvbryt = () => {
        settVisModal(false);
        settSubmitRessurs(byggTomRessurs());
        registrerBarnSkjema.felter.ident.nullstill();
    };

    const leggTilOnClick = () => {
        if (
            skjema.felter.barnaMedOpplysninger.verdi.some(
                barn => barn.ident === registrerBarnSkjema.felter.ident.verdi
            )
        ) {
            settSubmitRessurs(byggFeiletRessurs('Barnet er allerede lagt til'));
            return;
        }

        if (kanSendeSkjema()) {
            if (registrerBarnSkjema.felter.erIkkeFolkeregistrert) {
                skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                    ...skjema.felter.barnaMedOpplysninger.verdi,
                    {
                        fødselsdato: registrerBarnSkjema.felter.uregistrertBarnFødselsdato.verdi,
                        ident: '',
                        inkludertISøknaden: true,
                        manueltRegistrert: true,
                        navn: registrerBarnSkjema.felter.uregistrertBarnNavn.verdi,
                        uregistrert: true,
                    },
                ]);
                settVisModal(false);
                nullstillRegistrerBarnSkjema();
            } else {
                settSubmitRessurs(byggHenterRessurs());

                request<{ brukerIdent: string }, IRestTilgang>({
                    method: 'POST',
                    url: '/familie-ba-sak/api/tilgang',
                    data: { brukerIdent: registrerBarnSkjema.felter.ident.verdi },
                }).then((ressurs: Ressurs<IRestTilgang>) => {
                    nullstillRegistrerBarnSkjema();

                    if (ressurs.status === RessursStatus.SUKSESS) {
                        if (ressurs.data.saksbehandlerHarTilgang) {
                            request<void, IPersonInfo>({
                                method: 'GET',
                                url: '/familie-ba-sak/api/person/enkel',
                                headers: {
                                    personIdent: registrerBarnSkjema.felter.ident.verdi,
                                },
                            }).then((hentetPerson: Ressurs<IPersonInfo>) => {
                                settSubmitRessurs(hentetPerson);
                                if (hentetPerson.status === RessursStatus.SUKSESS) {
                                    skjema.felter.barnaMedOpplysninger.validerOgSettFelt([
                                        ...skjema.felter.barnaMedOpplysninger.verdi,
                                        {
                                            fødselsdato: hentetPerson.data.fødselsdato,
                                            ident: hentetPerson.data.personIdent,
                                            inkludertISøknaden: true,
                                            manueltRegistrert: true,
                                            navn: hentetPerson.data.navn,
                                            uregistrert: false,
                                        },
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

            <StyledUIModalWrapper
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
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <FamilieInput
                    {...registrerBarnSkjema.felter.ident.hentNavInputProps(
                        registrerBarnSkjema.visFeilmeldinger
                    )}
                    disabled={registrerBarnSkjema.felter.erIkkeFolkeregistrert.verdi}
                    label={'Fødselsnummer'}
                    placeholder={'11 siffer'}
                />

                {registrerBarnSkjema.felter.erIkkeFolkeregistrert.erSynlig && (
                    <LeggTilUregistrertBarn registrerBarnSkjema={registrerBarnSkjema} />
                )}
            </StyledUIModalWrapper>
        </>
    );
};

export default LeggTilBarn;
