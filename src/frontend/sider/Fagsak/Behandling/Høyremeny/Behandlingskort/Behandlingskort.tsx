import * as React from 'react';

import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { TextDangerSubtle, TextInfoSubtle, TextNeutral, TextSuccessSubtle } from '@navikt/ds-tokens/dist/tokens';
import type { AkselColoredBorderToken } from '@navikt/ds-tokens/types';

import { Informasjonsbolk } from './Informasjonsbolk';
import { useBehandling } from '../../../../../hooks/useBehandling';
import { useFagsak } from '../../../../../hooks/useFagsak';
import {
    BehandlingResultat,
    behandlingsresultater,
    behandlingsstatuser,
    behandlingstyper,
    behandlingÅrsak,
    erBehandlingHenlagt,
    type IBehandling,
} from '../../../../../typer/behandling';
import { behandlingKategori, behandlingUnderkategori } from '../../../../../typer/behandlingstema';
import { Datoformat, isoStringTilFormatertString } from '../../../../../utils/dato';

function hentResultatfarge(behandlingResultat: BehandlingResultat): AkselColoredBorderToken {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return 'neutral-subtle';
    }
    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return 'success';
        case BehandlingResultat.ENDRET_UTBETALING:
        case BehandlingResultat.ENDRET_UTEN_UTBETALING:
            return 'accent';
        case BehandlingResultat.AVSLÅTT:
        case BehandlingResultat.OPPHØRT:
        case BehandlingResultat.FORTSATT_OPPHØRT:
            return 'danger';
        case BehandlingResultat.IKKE_VURDERT:
            return 'neutral-subtle';
        default:
            return 'neutral';
    }
}

function hentResultatfargeTekst(behandlingResultat: BehandlingResultat) {
    if (erBehandlingHenlagt(behandlingResultat)) {
        return TextNeutral;
    }
    switch (behandlingResultat) {
        case BehandlingResultat.INNVILGET:
        case BehandlingResultat.DELVIS_INNVILGET:
        case BehandlingResultat.FORTSATT_INNVILGET:
            return TextSuccessSubtle;
        case BehandlingResultat.ENDRET_UTBETALING:
        case BehandlingResultat.ENDRET_UTEN_UTBETALING:
            return TextInfoSubtle;
        case BehandlingResultat.AVSLÅTT:
        case BehandlingResultat.OPPHØRT:
        case BehandlingResultat.FORTSATT_OPPHØRT:
            return TextDangerSubtle;
        default:
            return TextNeutral;
    }
}

function utledSakstype(behandling: IBehandling) {
    const kategori = behandling?.kategori && behandlingKategori[behandling.kategori];
    const underkategori = behandling?.underkategori && behandlingUnderkategori[behandling.underkategori].toLowerCase();
    return [kategori, underkategori].filter(Boolean).join(', ');
}

export function Behandlingskort() {
    const fagsak = useFagsak();
    const behandling = useBehandling();

    const behandlinger = fagsak.behandlinger;
    const antallBehandlinger = behandlinger.length;
    const behandlingIndex = behandlinger.findIndex(b => b.behandlingId === behandling.behandlingId) + 1;

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
                    <HStack gap={'space-4'}>
                        <Heading size={'xsmall'} level={'2'}>
                            {`${behandlingstyper[behandling.type].navn} (${behandlingIndex}/${antallBehandlinger})`}
                        </Heading>
                        <BodyShort>{utledSakstype(behandling)}</BodyShort>
                    </HStack>
                    <BodyShort>{behandlingÅrsak[behandling.årsak]}</BodyShort>
                </VStack>
            </Box>
            <VStack gap="space-16" marginBlock="space-12 space-0">
                <Informasjonsbolk label="Behandlingsstatus" tekst={behandlingsstatuser[behandling.status]} />
                <Informasjonsbolk
                    label="Resultat"
                    tekst={behandlingsresultater[behandling.resultat]}
                    tekstFarge={hentResultatfargeTekst(behandling.resultat)}
                />
                <Box>
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
                </Box>
                <Informasjonsbolk
                    label="Enhet"
                    tekst={behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId}
                    tekstHover={behandling.arbeidsfordelingPåBehandling.behandlendeEnhetNavn}
                />
            </VStack>
        </Box>
    );
}
