import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import {
    BehandlingResultat,
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    behandlingÅrsak,
    IBehandling,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { datoformat, formaterIsoDato, formaterIverksattDato } from '../../../utils/formatter';
import Informasjonsbolk from '../../Felleskomponenter/Informasjonsbolk/Informasjonsbolk';
import { sakstype } from '../Saksoversikt/Saksoversikt';

interface IBehandlingskortProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const hentResultatfarge = (behandlingResultat: BehandlingResultat) => {
    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return navFarger.navGronnDarken20;
        case BehandlingResultat.ENDRET:
            return navFarger.navDypBlaDarken20;
        case BehandlingResultat.AVSLÅTT:
        case BehandlingResultat.OPPHØRT:
            return navFarger.redErrorDarken20;
        case BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET:
        case BehandlingResultat.HENLAGT_SØKNAD_TRUKKET:
            return navFarger.navGra20;
        case BehandlingResultat.IKKE_VURDERT:
            return '#F2F2F2';
        default:
            return navFarger.navGra60;
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

const StyledUndertittel = styled(Undertittel)`
    font-size: 1rem;
    margin-bottom: 0.2rem;
`;

const StyledHr = styled.hr`
    border: none;
    border-bottom: 1px solid ${navFarger.navLysGra};
`;

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ fagsak, åpenBehandling }) => {
    const antallBehandlinger = fagsak.behandlinger.length;
    const åpenBehandlingIndex = fagsak.behandlinger.findIndex(() => åpenBehandling) + 1;
    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);

    const tittel = `${
        åpenBehandling ? behandlingstyper[åpenBehandling.type].navn : 'ukjent'
    } (${åpenBehandlingIndex}/${antallBehandlinger}) - ${sakstype(åpenBehandling).toLowerCase()}`;

    return (
        <Container behandlingResultat={åpenBehandling.resultat}>
            <StyledUndertittel>{tittel}</StyledUndertittel>
            <Normaltekst>{behandlingÅrsak[åpenBehandling.årsak]}</Normaltekst>
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
                infoTeksFarve={hentResultatfarge(åpenBehandling.resultat)}
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
                        tekst: formaterIverksattDato(aktivVedtak?.vedtaksdato),
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
