import * as React from 'react';

import styled from 'styled-components';

import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { AIconInfo, AIconSuccess, ASpacing4, ATextDanger, ATextDefault } from '@navikt/ds-tokens/dist/tokens';

import Informasjonsbolk from './Informasjonsbolk';
import {
    BehandlingResultat,
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    behandlingÅrsak,
    erBehandlingHenlagt,
} from '../../../../../typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '../../../../../utils/dato';
import { useFagsakContext } from '../../../FagsakContext';
import { sakstype } from '../../../Saksoversikt/Saksoversikt';
import { useBehandlingContext } from '../../context/BehandlingContext';

const hentResultatfarge = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return 'border-subtle';
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return 'border-success';
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return 'border-action';
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return 'border-danger';
        case BehandlingResultat.IKKE_VURDERT:
            return 'border-subtle';
        default:
            return 'border-default';
    }
};

const hentResultatfargeTekst = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return ATextDefault;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return AIconSuccess;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return AIconInfo;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return ATextDanger;
        default:
            return ATextDefault;
    }
};

const StyledHeading = styled(Heading)`
    font-size: ${ASpacing4};
`;

export function Behandlingskort() {
    const { fagsak } = useFagsakContext();
    const { behandling } = useBehandlingContext();

    const behandlinger = fagsak.behandlinger;

    const antallBehandlinger = behandlinger.length;
    const behandlingIndex = behandlinger.findIndex(b => b.behandlingId === behandling.behandlingId) + 1;

    const tittel = `${behandlingstyper[behandling.type].navn} (${behandlingIndex}/${antallBehandlinger}) - ${sakstype(behandling).toLowerCase()}`;

    return (
        <Box
            padding="2"
            borderColor={hentResultatfarge(behandling.resultat)}
            borderWidth="1 1 1 5"
            borderRadius="medium"
            margin="2"
        >
            <Box borderWidth="0 0 1 0" borderColor="border-subtle">
                <VStack gap="1" marginBlock="0 2">
                    <StyledHeading size={'xsmall'} level={'2'}>
                        {tittel}
                    </StyledHeading>
                    <BodyShort>{behandlingÅrsak[behandling.årsak]}</BodyShort>
                </VStack>
            </Box>
            <VStack gap="4" marginBlock="4">
                <Informasjonsbolk label="Behandlingsstatus" tekst={behandlingsstatuser[behandling.status]} />
                <Informasjonsbolk
                    label="Resultat"
                    tekst={behandlingsresultater[behandling.resultat]}
                    tekstFarge={hentResultatfargeTekst(behandling.resultat)}
                />
                <div>
                    {behandling.søknadMottattDato && (
                        <Informasjonsbolk
                            label="Søknad mottatt"
                            tekst={isoStringTilFormatertString({
                                isoString: behandling.søknadMottattDato,
                                tilFormat: Datoformat.DATO,
                            })}
                        />
                    )}
                    <Informasjonsbolk
                        label="Opprettet"
                        tekst={isoStringTilFormatertString({
                            isoString: behandling.opprettetTidspunkt,
                            tilFormat: Datoformat.DATO,
                        })}
                    />
                    <Informasjonsbolk
                        label="Vedtaksdato"
                        tekst={isoStringTilFormatertString({
                            isoString: behandling.vedtak?.vedtaksdato,
                            tilFormat: Datoformat.DATO,
                            defaultString: 'Ikke satt',
                        })}
                    />
                </div>
                <Informasjonsbolk
                    label="Enhet"
                    tekst={behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId}
                    tekstHover={behandling.arbeidsfordelingPåBehandling.behandlendeEnhetNavn}
                />
            </VStack>
        </Box>
    );
}
