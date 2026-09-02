import { useHentJournalpostDokumentPdf } from '@hooks/useHentJournalpostDokumentPdf';
import { ExternalLinkIcon, PadlockLockedIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Dialog, ErrorMessage, Heading, HStack, Link, Loader, VStack } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';
import type { ITilgangsstyrtJournalpost } from '@typer/journalpost';
import { useState } from 'react';

import styles from './JournalpostDokument.module.css';

interface Props {
    dokument: IDokumentInfo;
    tilgangsstyrtJournalpost: ITilgangsstyrtJournalpost;
}

export function JournalpostDokument({ dokument, tilgangsstyrtJournalpost }: Props) {
    const { journalpost, journalpostTilgang } = tilgangsstyrtJournalpost;

    const [visDialog, settVisDialog] = useState(false);

    const {
        data: journalpostDokumentPdf,
        mutate: hentJournalpostDokumentPdf,
        isPending: hentJournalpostDokumentPdfIsPending,
        error: hentJournalpostDokumentPdfError,
    } = useHentJournalpostDokumentPdf();

    function onHentJournalpostDokumentClicked() {
        const journalpostId = journalpost.journalpostId;
        const dokumentId = dokument.dokumentInfoId;
        if (!dokumentId) {
            alert('Klarer ikke å åpne dokument. Ta kontakt med teamet.');
            return;
        }
        hentJournalpostDokumentPdf({ journalpostId, dokumentId });
        settVisDialog(true);
    }

    const dokumentTittel = dokument.tittel || 'Uten tittel';

    return (
        <li>
            <HStack gap="space-4">
                {journalpostTilgang.harTilgang ? (
                    <>
                        <BodyShort className={styles.text} size="small" title={dokumentTittel}>
                            <Link href="#" onClick={onHentJournalpostDokumentClicked}>
                                {dokumentTittel}
                            </Link>
                        </BodyShort>
                        <Link
                            href={`/familie-ba-sak/api/journalpost/${journalpost.journalpostId}/dokument/${dokument.dokumentInfoId}`}
                            target="_blank"
                            aria-label="Åpne dokument i ny fane"
                            title="Åpne dokument i ny fane"
                        >
                            <ExternalLinkIcon fontSize={'1.3rem'} />
                        </Link>
                    </>
                ) : (
                    <>
                        <BodyShort size="small">{dokumentTittel}</BodyShort>
                        <PadlockLockedIcon
                            title={`Dokumentet krever ekstra tilganger. ${journalpostTilgang.begrunnelse}`}
                        />
                    </>
                )}
            </HStack>
            {dokument.logiskeVedlegg && dokument.logiskeVedlegg.length > 0 && (
                <ul className={styles.vedleggListe}>
                    <VStack gap={'space-16'}>
                        {dokument.logiskeVedlegg.map(vedlegg => (
                            <li key={vedlegg.logiskVedleggId}>
                                <BodyShort className={styles.text} size="small" title={vedlegg.tittel}>
                                    {vedlegg.tittel}
                                </BodyShort>
                            </li>
                        ))}
                    </VStack>
                </ul>
            )}
            <Dialog open={visDialog} onOpenChange={settVisDialog}>
                <Dialog.Popup width={'max(100rem, 60vw)'} height={'80vh'}>
                    <Dialog.Header>
                        <Dialog.Title>{dokumentTittel}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body className={styles.dialogBody}>
                        {hentJournalpostDokumentPdfIsPending && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <Loader size={'small'} title={'Laster dokument...'} />
                                <Heading size={'small'} level={'2'}>
                                    Laster dokument...
                                </Heading>
                            </HStack>
                        )}
                        {hentJournalpostDokumentPdfError && (
                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                <XMarkOctagonFillIcon color={'var(--ax-text-danger-subtle)'} fontSize={'1.2rem'} />
                                <ErrorMessage>{hentJournalpostDokumentPdfError.message}</ErrorMessage>
                            </HStack>
                        )}
                        {!hentJournalpostDokumentPdfIsPending && !hentJournalpostDokumentPdfError && (
                            <iframe className={styles.iframe} title={dokumentTittel} src={journalpostDokumentPdf} />
                        )}
                    </Dialog.Body>
                </Dialog.Popup>
            </Dialog>
        </li>
    );
}
