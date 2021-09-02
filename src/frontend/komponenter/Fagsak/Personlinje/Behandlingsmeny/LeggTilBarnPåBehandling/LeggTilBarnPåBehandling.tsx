import React, { useState } from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

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

import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { IBehandling } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { adressebeskyttelsestyper, IPersonInfo, IRestTilgang } from '../../../../../typer/person';
import { identValidator } from '../../../../../utils/validators';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

const LeggTilBarnLegend = styled.div`
    margin-top: 1rem;
    display: flex;
`;

interface IProps {
    onListElementClick: () => void;
    behandling: IBehandling;
}

const LeggTiLBarnPåBehandling: React.FC<IProps> = ({ onListElementClick, behandling }) => {
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();

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
                        request<{ barnIdent: string }, IFagsak>({
                            method: 'POST',
                            data: { barnIdent: skjema.felter.ident.verdi },
                            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/legg-til-barn`,
                        }).then((leggTilRespons: Ressurs<IFagsak>) => {
                            if (
                                leggTilRespons.status === RessursStatus.FEILET ||
                                leggTilRespons.status === RessursStatus.FUNKSJONELL_FEIL ||
                                leggTilRespons.status === RessursStatus.IKKE_TILGANG
                            ) {
                                settSubmitRessurs(
                                    byggFeiletRessurs(leggTilRespons.frontendFeilmelding)
                                );
                            } else {
                                settFagsak(leggTilRespons);
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
            <KnappBase
                mini={true}
                onClick={() => {
                    settVisModal(true);
                    onListElementClick();
                }}
            >
                Legg til barn
            </KnappBase>
            <UIModalWrapper
                modal={{
                    tittel: (
                        <LeggTilBarnLegend>
                            <Undertittel children={'Legg til barn'} />
                            <Hjelpetekst
                                children={'Hjelpetekst her'}
                                style={{ marginLeft: '0.5rem' }}
                            />
                        </LeggTilBarnLegend>
                    ),
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
                <SkjemaGruppe
                    feil={
                        skjema.submitRessurs.status === RessursStatus.FEILET ||
                        skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                        skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG
                            ? skjema.submitRessurs.frontendFeilmelding
                            : undefined
                    }
                    utenFeilPropagering={true}
                >
                    <FamilieInput
                        {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Fødselsnummer'}
                        placeholder={'11 siffer'}
                    />
                    <Alertstripe type="info" form="inline">
                        Du er i ferd med å legge til et barn på behandlingen. Handlingen kan ikke
                        reverseres uten å henlegge.
                    </Alertstripe>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default LeggTiLBarnPåBehandling;
