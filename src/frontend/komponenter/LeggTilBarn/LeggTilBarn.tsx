import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { ExternalLinkIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Fieldset, Heading, Link, Modal, TextField } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Avhengigheter, Felt } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import {
    Adressebeskyttelsegradering,
    byggFeiletRessurs,
    byggHenterRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import LeggTilUregistrertBarn from './LeggTilUregistrertBarn';
import type {
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from '../../sider/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IPersonInfo, IRestTilgang } from '../../typer/person';
import { adressebeskyttelsestyper } from '../../typer/person';
import type { IBarnMedOpplysninger } from '../../typer/søknad';
import { dateTilIsoDatoStringEllerUndefined } from '../../utils/dato';
import { identValidator } from '../../utils/validators';
import HelpText from '../HelpText';

const StyledHeading = styled(Heading)`
    display: flex;
    gap: 0.5rem;
`;

const StyledHelpText = styled(HelpText)`
    margin-top: 0.2rem;
`;

const DrekLenkeContainer = styled.div`
    margin-top: 1.25rem;
`;

export interface IRegistrerBarnSkjema {
    ident: string;
    erFolkeregistrert: boolean;
    uregistrertBarnFødselsdato: Date | undefined;
    uregistrertBarnNavn: string;
}

interface IProps {
    barnaMedOpplysninger: Felt<IBarnMedOpplysninger[]>;
    onSuccess?: (barn: IPersonInfo) => void;
    manuelleBrevmottakere: SkjemaBrevmottaker[] | IRestBrevmottaker[];
    vurderErLesevisning: () => boolean;
}

const LeggTilBarn: React.FC<IProps> = ({
    barnaMedOpplysninger,
    onSuccess,
    manuelleBrevmottakere,
    vurderErLesevisning,
}) => {
    const { request } = useHttp();
    const [visModal, settVisModal] = useState<boolean>(false);
    const [fnrInputNode, settFnrInputNode] = useState<HTMLInputElement | null>(null);
    const fnrInputRef = React.useCallback((inputNode: HTMLInputElement | null) => {
        inputNode?.focus();
        settFnrInputNode(inputNode);
    }, []);

    const erFolkeregistrert = useFelt<boolean>({
        verdi: true,
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
            uregistrertBarnFødselsdato: Date | undefined;
            uregistrertBarnNavn: string;
        },
        IPersonInfo
    >({
        felter: {
            ident: useFelt<string>({
                verdi: '',
                valideringsfunksjon: identValidator,
                skalFeltetVises: (avhengigheter: Avhengigheter) => {
                    // Bruker logikk i skjema for å disable validering på feltet, men det er fortsatt synlig for bruker.
                    const { erFolkeregistrert } = avhengigheter;
                    return erFolkeregistrert;
                },
                avhengigheter: { erFolkeregistrert: erFolkeregistrert.verdi },
            }),
            erFolkeregistrert,
            uregistrertBarnFødselsdato: useFelt<Date | undefined>({
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

    const harBrevMottakereOgHarStrengtFortroligAdressebeskyttelse = (
        adressebeskyttelsegradering: Adressebeskyttelsegradering,
        antallBrevmottakere: number
    ): boolean => {
        return (
            (adressebeskyttelsegradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
                adressebeskyttelsegradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND) &&
            antallBrevmottakere > 0
        );
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
                        fødselsdato: dateTilIsoDatoStringEllerUndefined(
                            registrerBarnSkjema.felter.uregistrertBarnFødselsdato.verdi
                        ),
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
                                    if (
                                        harBrevMottakereOgHarStrengtFortroligAdressebeskyttelse(
                                            ressurs.data.adressebeskyttelsegradering,
                                            manuelleBrevmottakere.length
                                        )
                                    ) {
                                        settSubmitRessurs(
                                            byggFeiletRessurs(
                                                `Barnet du prøver å legge til har diskresjonskode: "${
                                                    adressebeskyttelsestyper[
                                                        ressurs.data.adressebeskyttelsegradering
                                                    ] ?? 'ukjent'
                                                }". Brevmottaker(e) er endret og må fjernes før du kan legge til barnet.`
                                            )
                                        );
                                    } else {
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
                                        if (onSuccess) onSuccess(hentetPerson.data);
                                        nullstillRegistrerBarnSkjema();

                                        settVisModal(false);
                                    }
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
            <Button
                variant={'tertiary'}
                id={'legg-til-barn'}
                size={'medium'}
                onClick={() => {
                    settVisModal(true);
                }}
                icon={<PlusCircleIcon />}
            >
                {'Legg til barn'}
            </Button>

            {visModal && (
                <Modal open onClose={onAvbryt} width={'35rem'} aria-label={'Legg til barn'}>
                    <Modal.Header>
                        <StyledHeading level="2" size="medium" spacing>
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
                        </StyledHeading>
                    </Modal.Header>
                    <Modal.Body>
                        <Fieldset
                            error={
                                registrerBarnSkjema.visFeilmeldinger &&
                                (registrerBarnSkjema.submitRessurs.status ===
                                    RessursStatus.FEILET ||
                                    registrerBarnSkjema.submitRessurs.status ===
                                        RessursStatus.FUNKSJONELL_FEIL ||
                                    registrerBarnSkjema.submitRessurs.status ===
                                        RessursStatus.IKKE_TILGANG)
                                    ? registrerBarnSkjema.submitRessurs.frontendFeilmelding
                                    : undefined
                            }
                            errorPropagation={false}
                            legend={'Legg til barn'}
                            hideLegend
                        >
                            <TextField
                                {...registrerBarnSkjema.felter.ident.hentNavInputProps(
                                    registrerBarnSkjema.visFeilmeldinger
                                )}
                                disabled={
                                    registrerBarnSkjema.felter.erFolkeregistrert.erSynlig &&
                                    !registrerBarnSkjema.felter.erFolkeregistrert.verdi
                                }
                                label={'Fødselsnummer / D-nummer'}
                                placeholder={'11 siffer'}
                                ref={fnrInputRef}
                            />
                            <DrekLenkeContainer>
                                <Link
                                    href="#"
                                    target="_blank"
                                    onClick={(e: React.UIEvent) => {
                                        e.preventDefault();
                                        fnrInputNode?.focus();
                                        window.open('/redirect/drek', '_new');
                                    }}
                                >
                                    Rekvirer D-nummer i DREK
                                    <ExternalLinkIcon
                                        title="Rekvirer D-nummer i DREK"
                                        fontSize={'1.5rem'}
                                    />
                                </Link>
                            </DrekLenkeContainer>
                            {registrerBarnSkjema.felter.erFolkeregistrert.erSynlig && (
                                <LeggTilUregistrertBarn
                                    registrerBarnSkjema={registrerBarnSkjema}
                                    vurderErLesevisning={vurderErLesevisning}
                                />
                            )}
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={'primary'}
                            key={'Legg til'}
                            size={'medium'}
                            onClick={leggTilOnClick}
                            children={'Legg til'}
                            loading={
                                registrerBarnSkjema.submitRessurs.status === RessursStatus.HENTER
                            }
                            disabled={
                                registrerBarnSkjema.submitRessurs.status === RessursStatus.HENTER
                            }
                        />
                        <Button
                            variant={'tertiary'}
                            key={'Avbryt'}
                            size={'medium'}
                            onClick={onAvbryt}
                            children={'Avbryt'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default LeggTilBarn;
