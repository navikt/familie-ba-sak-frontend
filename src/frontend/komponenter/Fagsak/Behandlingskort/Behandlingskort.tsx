import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import { BodyShort, Heading } from '@navikt/ds-react';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import type { IBehandling } from '../../../typer/behandling';
import {
    BehandlingResultat,
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    behandlingÅrsak,
    erBehandlingHenlagt,
} from '../../../typer/behandling';
import { datoformat, formaterIsoDato, formaterIverksattDato } from '../../../utils/formatter';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { sakstype } from '../Saksoversikt/Saksoversikt';

interface IBehandlingskortProps {
    åpenBehandling: IBehandling;
}

const hentResultatfarge = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return navFarger.navGra20;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return navFarger.navGronnDarken20;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return navFarger.navDypBlaDarken20;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return navFarger.redErrorDarken20;
        case BehandlingResultat.IKKE_VURDERT:
            return '#F2F2F2';
        default:
            return navFarger.navGra60;
    }
};

const hentResultatfargeTekst = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return navFarger.navMorkGra;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return navFarger.navGronnDarken20;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return navFarger.navDypBlaDarken20;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return navFarger.redErrorDarken20;
        default:
            return navFarger.navMorkGra;
    }
};

const Container = styled.div<{ behandlingResultat: BehandlingResultat }>`
    border: 1px solid ${navFarger.navGra40};
    border-left: 0.5rem solid ${navFarger.navGra40};
    border-radius: 0.25rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border-left-color: ${({ behandlingResultat }) => hentResultatfarge(behandlingResultat)};
`;

const StyledHeading = styled(Heading)`
    font-size: 1rem;
    margin-bottom: 0.2rem;
`;

const StyledHr = styled.hr`
    border: none;
    border-bottom: 1px solid ${navFarger.navLysGra};
`;

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ åpenBehandling }) => {
    const minimalFagsak = hentDataFraRessurs(useFagsakContext().minimalFagsak);
    const behandlinger = minimalFagsak?.behandlinger ?? [];

    const antallBehandlinger = behandlinger.length;
    const åpenBehandlingIndex =
        behandlinger.findIndex(
            behandling => behandling.behandlingId === åpenBehandling.behandlingId
        ) + 1;

    const tittel = `${
        åpenBehandling ? behandlingstyper[åpenBehandling.type].navn : 'ukjent'
    } (${åpenBehandlingIndex}/${antallBehandlinger}) - ${sakstype(åpenBehandling).toLowerCase()}`;

    return (
        <Container behandlingResultat={åpenBehandling.resultat}>
            <StyledHeading size={'small'} level={'2'}>
                {tittel}
            </StyledHeading>
            <BodyShort>{behandlingÅrsak[åpenBehandling.årsak]}</BodyShort>
            <StyledHr />
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Behandlingsstatus',
                        tekst: behandlingsstatuser[åpenBehandling.status],
                    },
                ]}
            />
            <Informasjonsbolk
                infoTeksFarve={hentResultatfargeTekst(åpenBehandling.resultat)}
                informasjon={[
                    {
                        label: 'Resultat',
                        tekst: behandlingsresultater[åpenBehandling.resultat],
                    },
                ]}
            />
            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Opprettet',
                        tekst: formaterIsoDato(åpenBehandling.opprettetTidspunkt, datoformat.DATO),
                    },
                    {
                        label: 'Vedtaksdato',
                        tekst: formaterIverksattDato(åpenBehandling.vedtak?.vedtaksdato),
                    },
                ]}
            />

            <Informasjonsbolk
                informasjon={[
                    {
                        label: 'Enhet',
                        tekst: åpenBehandling.arbeidsfordelingPåBehandling.behandlendeEnhetId,
                        tekstTitle:
                            åpenBehandling.arbeidsfordelingPåBehandling.behandlendeEnhetNavn,
                    },
                ]}
            />
        </Container>
    );
};

export default Behandlingskort;
