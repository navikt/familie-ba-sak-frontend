import * as React from 'react';

import styled from 'styled-components';

import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { TextDangerSubtle, TextInfoSubtle, TextNeutral, TextSuccessSubtle } from '@navikt/ds-tokens/dist/tokens';
import type { AkselColoredBorderToken } from '@navikt/ds-tokens/types';

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

const hentResultatfarge = (behandlingResultat: BehandlingResultat): AkselColoredBorderToken => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return 'neutral-subtle';
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return 'success';
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return 'accent';
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return 'danger';
        case BehandlingResultat.IKKE_VURDERT:
            return 'neutral-subtle';
        default:
            return 'neutral';
    }
};

const hentResultatfargeTekst = (behandlingResultat: BehandlingResultat) => {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return TextNeutral;
    }

    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return TextSuccessSubtle;
        case (BehandlingResultat.ENDRET_UTBETALING, BehandlingResultat.ENDRET_UTEN_UTBETALING):
            return TextInfoSubtle;
        case BehandlingResultat.AVSLÅTT:
        case (BehandlingResultat.OPPHØRT, BehandlingResultat.FORTSATT_OPPHØRT):
            return TextDangerSubtle;
        default:
            return TextNeutral;
    }
};

const StyledHeading = styled(Heading)`
    font-size: var(--ax-space-16);
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
            padding="space-8"
            borderColor={hentResultatfarge(behandling.resultat)}
            borderWidth="1 1 1 5"
            borderRadius="4"
            margin="space-8"
        >
            <Box borderWidth="0 0 1 0" borderColor="neutral-subtle">
                <VStack gap="space-4" marginBlock="space-0 space-8">
                    <StyledHeading size={'xsmall'} level={'2'}>
                        {tittel}
                    </StyledHeading>
                    <BodyShort>{behandlingÅrsak[behandling.årsak]}</BodyShort>
                </VStack>
            </Box>
            <VStack gap="space-16" marginBlock="space-16">
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
