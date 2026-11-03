import { useBruker } from '@hooks/useBruker';
import { useFagsakId } from '@hooks/useFagsakId';
import { useHentJournalposterForBruker } from '@hooks/useHentJournalposterForBruker';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, HStack, Link, Loader, LocalAlert, VStack } from '@navikt/ds-react';
import { Journalposttype } from '@navikt/familie-typer';
import { JournalpostDokument } from '@sider/Fagsak/Dokumenter/JournalpostDokument';
import {
    formaterDatoRegistrertSendtMottatt,
    hentDatoRegistrertSendt,
    hentSorterteJournalposter,
} from '@sider/Fagsak/Dokumenter/journalpostUtils';
import type { ITilgangsstyrtJournalpost } from '@typer/journalpost';
import { Sorteringsrekkefølge } from '@utils/tabell';
import { Link as ReactRouterLink } from 'react-router';

import Styles from './Dokumenter.module.css';

function Journalposttypeikon({ journalposttype }: { journalposttype: Journalposttype }) {
    switch (journalposttype) {
        case Journalposttype.I:
            return <ArrowRightIcon title="Inngående" fontSize="1.25rem" />;
        case Journalposttype.U:
            return <ArrowLeftIcon title="Utgående" fontSize="1.25rem" />;
        case Journalposttype.N:
            return <ArrowDownIcon title="Notat" fontSize="1.25rem" />;
    }
}

function medDatoMottatt({ journalpost, journalpostTilgang }: ITilgangsstyrtJournalpost): ITilgangsstyrtJournalpost {
    return {
        journalpostTilgang,
        journalpost: {
            ...journalpost,
            datoMottatt:
                journalpost.datoMottatt ||
                hentDatoRegistrertSendt(journalpost.relevanteDatoer, journalpost.journalposttype),
        },
    };
}

/** Kompakt dokumentoversikt for høyremenyen. Hele oversikten med alle kolonner ligger på Dokumenter-siden. */
export function Dokumenter() {
    const bruker = useBruker();
    const fagsakId = useFagsakId();

    const { data: journalposter, isPending, error } = useHentJournalposterForBruker(bruker.personIdent);

    if (isPending) {
        return (
            <HStack gap="space-8" padding="space-16" align="center">
                <Loader size="small" />
                <BodyShort size="small">Henter dokumenter...</BodyShort>
            </HStack>
        );
    }

    if (error) {
        return (
            <Box padding="space-16">
                <LocalAlert status="error" size="small">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Klarte ikke å hente dokumenter</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>{error.message}</LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    const sorterte = hentSorterteJournalposter(journalposter.map(medDatoMottatt), Sorteringsrekkefølge.SYNKENDE);

    return (
        <VStack gap="space-8" padding="space-16">
            <Link as={ReactRouterLink} to={`/fagsak/${fagsakId}/dokumenter`} className={Styles.helOversikt}>
                Åpne hele dokumentoversikten
            </Link>
            {sorterte.length === 0 && <BodyShort size="small">Ingen dokumenter</BodyShort>}
            <VStack as="ul" className={Styles.liste}>
                {sorterte.map(tilgangsstyrtJournalpost => {
                    const { journalpost } = tilgangsstyrtJournalpost;
                    return (
                        <li key={journalpost.journalpostId} className={Styles.journalpost}>
                            <HStack gap="space-8" align="center" wrap={false}>
                                <Journalposttypeikon journalposttype={journalpost.journalposttype} />
                                <Detail className={Styles.dato}>
                                    {formaterDatoRegistrertSendtMottatt(journalpost.datoMottatt)}
                                </Detail>
                            </HStack>
                            <BodyShort size="small" weight="semibold" className={Styles.tittel}>
                                {journalpost.tittel || 'Uten tittel'}
                            </BodyShort>
                            {journalpost.dokumenter?.length ? (
                                <VStack as="ul" gap="space-4" className={Styles.dokumenter}>
                                    {journalpost.dokumenter.map(dokument => (
                                        <JournalpostDokument
                                            key={dokument.dokumentInfoId}
                                            dokument={dokument}
                                            tilgangsstyrtJournalpost={tilgangsstyrtJournalpost}
                                        />
                                    ))}
                                </VStack>
                            ) : (
                                <Detail>Ingen dokumenter</Detail>
                            )}
                        </li>
                    );
                })}
            </VStack>
        </VStack>
    );
}
