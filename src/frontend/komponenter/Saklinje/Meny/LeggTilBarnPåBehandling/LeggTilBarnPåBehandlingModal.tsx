import React from 'react';

import styled from 'styled-components';

import { Alert, Button, Fieldset, Heading, HelpText, Modal, TextField } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IPersonInfo, IRestTilgang } from '../../../../typer/person';
import { adressebeskyttelsestyper } from '../../../../typer/person';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { identValidator } from '../../../../utils/validators';

const LeggTilBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

interface Props {
    lukkModal: () => void;
}

export function LeggTilBarnPåBehandlingModal({ lukkModal }: Props) {
    const { request } = useHttp();
    const { settÅpenBehandling, behandling } = useBehandlingContext();

    const { skjema, settSubmitRessurs, kanSendeSkjema, nullstillSkjema } = useSkjema<
        {
            ident: string;
        },
        IPersonInfo
    >({
        felter: {
            ident: useFelt<string>({
                verdi: '',
                valideringsfunksjon: identValidator,
            }),
        },
        skjemanavn: 'Legg til barn',
    });

    const onAvbryt = () => {
        lukkModal();
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
                                settSubmitRessurs(byggFeiletRessurs(leggTilRespons.frontendFeilmelding));
                            } else {
                                settÅpenBehandling(leggTilRespons);
                                lukkModal();
                            }
                        });
                    } else {
                        settSubmitRessurs(
                            byggFeiletRessurs(
                                `Barnet kan ikke legges til på grunn av diskresjonskode ${
                                    adressebeskyttelsestyper[ressurs.data.adressebeskyttelsegradering] ?? 'ukjent'
                                }`
                            )
                        );
                    }
                } else if (
                    [RessursStatus.FEILET, RessursStatus.FUNKSJONELL_FEIL, RessursStatus.IKKE_TILGANG].includes(
                        ressurs.status
                    )
                ) {
                    settSubmitRessurs(ressurs);
                }
            });
        }
    };

    return (
        <Modal open onClose={onAvbryt} aria-label={'Legg til barn'} width={'35rem'} portal>
            <Modal.Header>
                <Heading level="2" size="small">
                    <LeggTilBarnLegend>
                        Legg til barn
                        <HelpText style={{ marginLeft: '0.5rem' }}>
                            Her kan du, ved klage eller ettersendt dokumentasjon, legge til barn som ikke lenger ligger
                            på behandlingen fordi vi tidligere har avslått eller opphørt.
                        </HelpText>
                    </LeggTilBarnLegend>
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Fieldset
                    error={hentFrontendFeilmelding(skjema.submitRessurs)}
                    errorPropagation={false}
                    legend="Legg til barn på behandling"
                    hideLegend
                >
                    <TextField
                        {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Fødselsnummer'}
                        placeholder={'11 siffer'}
                    />
                    <Alert variant="info" inline={true}>
                        Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke reverseres uten å
                        henlegge.
                    </Alert>
                </Fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    key={'Legg til'}
                    variant="primary"
                    size="small"
                    onClick={leggTilOnClick}
                    children={'Legg til'}
                    loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                />
                <Button key={'Avbryt'} variant="tertiary" size="small" onClick={onAvbryt} children={'Avbryt'} />
            </Modal.Footer>
        </Modal>
    );
}
