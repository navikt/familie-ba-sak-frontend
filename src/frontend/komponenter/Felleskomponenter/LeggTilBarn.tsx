import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import Lenke from 'nav-frontend-lenker';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { ExternalLink } from '@navikt/ds-icons';
import { HelpText, BodyLong, Heading, Button } from '@navikt/ds-react';
import { FamilieInput } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Avhengigheter, Felt } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../context/behandlingContext/BehandlingContext';
import Pluss from '../../ikoner/Pluss';
import type { IPersonInfo, IRestTilgang } from '../../typer/person';
import { adressebeskyttelsestyper } from '../../typer/person';
import type { IBarnMedOpplysninger } from '../../typer/søknad';
import type { FamilieIsoDate } from '../../utils/kalender';
import { identValidator } from '../../utils/validators';
import LeggTilUregistrertBarn from '../Fagsak/Søknad/LeggTilUregistrertBarn';
import UIModalWrapper from './Modal/UIModalWrapper';

const LeggTilBarnKnapp = styled(Button)`
    margin-left: 1rem;
`;

const StyledUIModalWrapper = styled(UIModalWrapper)`
    min-height: 20rem !important;
`;

const LeggTilBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

const StyledHelpText = styled(HelpText)`
    margin-left: 0.5rem;

    .hjelpetekst__innhold {
        max-width: 36rem;
    }
`;

const DrekLenkeContainer = styled.div`
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
`;

export interface IRegistrerBarnSkjema {
    ident: string;
    erFolkeregistrert: boolean;
    uregistrertBarnFødselsdato: FamilieIsoDate | undefined;
    uregistrertBarnNavn: string;
}

interface IProps {
    barnaMedOpplysninger: Felt<IBarnMedOpplysninger[]>;
    onSuccess?: (barn: IPersonInfo) => void;
}

const LeggTilBarn: React.FC<IProps> = ({ barnaMedOpplysninger, onSuccess }) => {
    const { request } = useHttp();
    const { logg } = useBehandling();

    const [visModal, settVisModal] = useState<boolean>(false);
    const [fnrInputNode, settFnrInputNode] = useState<HTMLInputElement | null>(null);

    const [kanLeggeTilUregistrerteBarn, settKanLeggeTilUregistrerteBarn] = useState(true);

    const fnrInputRef = React.useCallback((inputNode: HTMLInputElement | null) => {
        inputNode?.focus();
        settFnrInputNode(inputNode);
    }, []);

    React.useEffect(() => {
        settKanLeggeTilUregistrerteBarn(true);
    }, [logg.status]);

    const erFolkeregistrert = useFelt<boolean>({
        verdi: true,
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
            erFolkeregistrert: boolean;
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
                    const { erFolkeregistrert } = avhengigheter;
                    return erFolkeregistrert;
                },
                avhengigheter: { erFolkeregistrert: erFolkeregistrert.verdi },
            }),
            erFolkeregistrert,
            uregistrertBarnFødselsdato: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
                skalFeltetVises: (avhengigheter: Avhengigheter) => {
                    const { erFolkeregistrert } = avhengigheter;
                    return !erFolkeregistrert;
                },
                avhengigheter: { erFolkeregistrert: erFolkeregistrert.verdi },
            }),
            uregistrertBarnNavn: useFelt<string>({
                verdi: '',
                valideringsfunksjon: felt =>
                    felt.verdi !== '' ? ok(felt) : feil(felt, 'Må fylle ut navn'),
                skalFeltetVises: (avhengigheter: Avhengigheter) => {
                    const { erFolkeregistrert } = avhengigheter;
                    return !erFolkeregistrert;
                },
                avhengigheter: { erFolkeregistrert: erFolkeregistrert.verdi },
            }),
        },
        skjemanavn: 'Hent barn',
    });

    const onAvbryt = () => {
        settVisModal(false);
        nullstillRegistrerBarnSkjema();
    };

    const leggTilOnClick = () => {
        const erSkjemaOk = kanSendeSkjema();
        if (
            barnaMedOpplysninger.verdi.some(
                (barn: IBarnMedOpplysninger) =>
                    barn.erFolkeregistrert && barn.ident === registrerBarnSkjema.felter.ident.verdi
            )
        ) {
            settSubmitRessurs(byggFeiletRessurs('Barnet er allerede lagt til'));
        } else if (erSkjemaOk) {
            if (!registrerBarnSkjema.felter.erFolkeregistrert.verdi) {
                barnaMedOpplysninger.validerOgSettFelt([
                    ...barnaMedOpplysninger.verdi,
                    {
                        fødselsdato: registrerBarnSkjema.felter.uregistrertBarnFødselsdato.verdi,
                        ident: '',
                        merket: true,
                        manueltRegistrert: true,
                        navn: registrerBarnSkjema.felter.uregistrertBarnNavn.verdi,
                        erFolkeregistrert: false,
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
                                    barnaMedOpplysninger.validerOgSettFelt([
                                        ...barnaMedOpplysninger.verdi,
                                        {
                                            fødselsdato: hentetPerson.data.fødselsdato,
                                            ident: hentetPerson.data.personIdent,
                                            merket: true,
                                            manueltRegistrert: true,
                                            navn: hentetPerson.data.navn,
                                            erFolkeregistrert: true,
                                        },
                                    ]);
                                    onSuccess && onSuccess(hentetPerson.data);

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
            <LeggTilBarnKnapp
                variant={'tertiary'}
                id={'legg-til-barn'}
                size={'small'}
                onClick={() => {
                    settVisModal(true);
                }}
            >
                <Pluss />
                {'Legg til barn'}
            </LeggTilBarnKnapp>

            <StyledUIModalWrapper
                modal={{
                    tittel: (
                        <LeggTilBarnLegend>
                            Legg til barn
                            <StyledHelpText placement="top">
                                <Heading level="3" size="xsmall">
                                    Nasjonale saker:
                                </Heading>
                                <BodyLong size="small" spacing>
                                    Hvis barnet ikke er registrert i Folkeregisteret må du tilskrive
                                    bruker først.
                                </BodyLong>
                                <BodyLong size="small" spacing>
                                    Hvis barnet ikke er folkeregistrert innen angitt frist, kan du
                                    registrere barnet med fødselsdato og/eller navn. Det vil føre
                                    til et avslag, uten at vilkårene skal vurderes. Har du ikke
                                    navnet på barnet kan du skrive “ukjent”.
                                </BodyLong>
                                <Heading level="3" size="xsmall">
                                    EØS-saker:
                                </Heading>
                                <BodyLong size="small">
                                    Dersom Folkeregisteret ikke har registrerte barn tilknyttet
                                    denne søkeren kan du registrere D-nummer i DREK.
                                </BodyLong>
                            </StyledHelpText>
                        </LeggTilBarnLegend>
                    ),
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: onAvbryt,
                    actions: [
                        <Button
                            variant={'tertiary'}
                            key={'Avbryt'}
                            size={'small'}
                            onClick={onAvbryt}
                            children={'Avbryt'}
                        />,
                        <Button
                            variant={'primary'}
                            key={'Legg til'}
                            size={'small'}
                            onClick={leggTilOnClick}
                            children={'Legg til'}
                            loading={
                                registrerBarnSkjema.submitRessurs.status === RessursStatus.HENTER
                            }
                            disabled={
                                registrerBarnSkjema.submitRessurs.status === RessursStatus.HENTER
                            }
                        />,
                    ],
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <SkjemaGruppe
                    feil={
                        registrerBarnSkjema.visFeilmeldinger &&
                        (registrerBarnSkjema.submitRessurs.status === RessursStatus.FEILET ||
                            registrerBarnSkjema.submitRessurs.status ===
                                RessursStatus.FUNKSJONELL_FEIL ||
                            registrerBarnSkjema.submitRessurs.status === RessursStatus.IKKE_TILGANG)
                            ? registrerBarnSkjema.submitRessurs.frontendFeilmelding
                            : undefined
                    }
                    utenFeilPropagering={true}
                >
                    <FamilieInput
                        {...registrerBarnSkjema.felter.ident.hentNavInputProps(
                            registrerBarnSkjema.visFeilmeldinger
                        )}
                        disabled={
                            registrerBarnSkjema.felter.erFolkeregistrert.erSynlig &&
                            !registrerBarnSkjema.felter.erFolkeregistrert.verdi
                        }
                        label={'Fødselsnummer / D-nummer'}
                        placeholder={'11 siffer'}
                        inputRef={fnrInputRef}
                    />
                    <DrekLenkeContainer>
                        <Lenke
                            href="#"
                            target="_blank"
                            onClick={(e: React.UIEvent) => {
                                e.preventDefault();
                                fnrInputNode?.focus();
                                window.open('/redirect/drek', '_new');
                            }}
                        >
                            <span>Rekvirer D-nummer i DREK</span>
                            <ExternalLink aria-label="Rekvirer D-nummer i DREK" />
                        </Lenke>
                    </DrekLenkeContainer>
                    {registrerBarnSkjema.felter.erFolkeregistrert.erSynlig && (
                        <LeggTilUregistrertBarn registrerBarnSkjema={registrerBarnSkjema} />
                    )}
                </SkjemaGruppe>
            </StyledUIModalWrapper>
        </>
    );
};

export default LeggTilBarn;
