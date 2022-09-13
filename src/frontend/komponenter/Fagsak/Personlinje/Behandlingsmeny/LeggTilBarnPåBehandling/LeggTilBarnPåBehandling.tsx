import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Alert, Button, HelpText } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { FamilieInput } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IPersonInfo, IRestTilgang } from '../../../../../typer/person';
import { adressebeskyttelsestyper } from '../../../../../typer/person';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { identValidator } from '../../../../../utils/validators';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

const LeggTilBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

interface IProps {
    behandling: IBehandling;
}

const LeggTiLBarnPåBehandling: React.FC<IProps> = ({ behandling }) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

    const [visModal, settVisModal] = useState<boolean>(false);

    const { skjema, settSubmitRessurs, kanSendeSkjema, nullstillSkjema } = useSkjema<
        {
            ident: string;
        },
        IPersonInfo
    >({
        felter: {
            ident: useFelt<string>({
                verdi: '',
                valideringsfunksjon:
                    process.env.NODE_ENV === 'development' ? felt => ok(felt) : identValidator,
            }),
        },
        skjemanavn: 'Legg til barn',
    });

    const onAvbryt = () => {
        settVisModal(false);
        settSubmitRessurs(byggTomRessurs());
    };

    const leggTilOnClick = () => {
        const erSkjemaOk = kanSendeSkjema();
        if (erSkjemaOk) {
            settSubmitRessurs(byggHenterRessurs());
            request<{ brukerIdent: string }, IRestTilgang>({
                method: 'POST',
                url: '/familie-ba-sak/api/tilgang',
                data: { brukerIdent: skjema.felter.ident.verdi },
            }).then((ressurs: Ressurs<IRestTilgang>) => {
                nullstillSkjema();
                if (ressurs.status === RessursStatus.SUKSESS) {
                    if (ressurs.data.saksbehandlerHarTilgang) {
                        request<{ barnIdent: string }, IBehandling>({
                            method: 'POST',
                            data: { barnIdent: skjema.felter.ident.verdi },
                            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/legg-til-barn`,
                        }).then((leggTilRespons: Ressurs<IBehandling>) => {
                            if (
                                leggTilRespons.status === RessursStatus.FEILET ||
                                leggTilRespons.status === RessursStatus.FUNKSJONELL_FEIL ||
                                leggTilRespons.status === RessursStatus.IKKE_TILGANG
                            ) {
                                settSubmitRessurs(
                                    byggFeiletRessurs(leggTilRespons.frontendFeilmelding)
                                );
                            } else {
                                settÅpenBehandling(leggTilRespons);
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
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Legg til barn
            </Dropdown.Menu.List.Item>
            <UIModalWrapper
                modal={{
                    tittel: (
                        <LeggTilBarnLegend>
                            Legg til barn
                            <HelpText style={{ marginLeft: '0.5rem' }}>
                                Her kan du, ved klage eller ettersendt dokumentasjon, legge til barn
                                som ikke lenger ligger på behandlingen fordi vi tidligere har
                                avslått eller opphørt.
                            </HelpText>
                        </LeggTilBarnLegend>
                    ),
                    visModal: visModal,
                    lukkKnapp: true,
                    onClose: onAvbryt,
                    actions: [
                        <Button
                            key={'Avbryt'}
                            variant="tertiary"
                            size="small"
                            onClick={onAvbryt}
                            children={'Avbryt'}
                        />,
                        <Button
                            key={'Legg til'}
                            variant="primary"
                            size="small"
                            onClick={leggTilOnClick}
                            children={'Legg til'}
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    style: {
                        minHeight: '20rem !important',
                    },
                }}
            >
                <SkjemaGruppe
                    feil={hentFrontendFeilmelding(skjema.submitRessurs)}
                    utenFeilPropagering={true}
                >
                    <FamilieInput
                        {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Fødselsnummer'}
                        placeholder={'11 siffer'}
                    />
                    <Alert variant="info" inline={true}>
                        Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke
                        reverseres uten å henlegge.
                    </Alert>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default LeggTiLBarnPåBehandling;
