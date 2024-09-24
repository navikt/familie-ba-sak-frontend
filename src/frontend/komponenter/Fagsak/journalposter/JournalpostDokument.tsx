import React from 'react';

import styled from 'styled-components';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';

import { Vedleggsliste, EllipsisBodyShort } from './JournalpostListe';
import type { FamilieAxiosRequestConfig } from '../../../context/AppContext';

const ListeElement = styled.li`
    margin-bottom: 1rem;
    &:last-child {
        margin-bottom: 0;
    }
`;

const DokumentTittelMedLenkeWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;
`;

const StyledLink = styled(Link)`
    margin-left: 0.5rem;
`;

interface IProps {
    dokument: IDokumentInfo;
    journalpostId: string;
    hentForhåndsvisning: <D>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<D>) => void;
    harTilgang: boolean;
}

export const JournalpostDokument: React.FC<IProps> = ({
    dokument,
    journalpostId,
    hentForhåndsvisning,
    harTilgang,
}) => {
    const hentPdfDokument = (dokumentId: string | undefined) => {
        if (dokumentId !== undefined) {
            hentForhåndsvisning({
                method: 'GET',
                url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentId}`,
            });
        } else {
            alert('Klarer ikke å åpne dokument. Ta kontakt med teamet.');
        }
    };
    return (
        <ListeElement>
            <DokumentTittelMedLenkeWrapper>
                {harTilgang ? (
                    <>
                        <EllipsisBodyShort size="small" title={dokument.tittel}>
                            <Link href="#" onClick={() => hentPdfDokument(dokument.dokumentInfoId)}>
                                {dokument.tittel}
                            </Link>
                        </EllipsisBodyShort>

                        <StyledLink
                            href={`/familie-ba-sak/api/journalpost/${journalpostId}/dokument/${dokument.dokumentInfoId}`}
                            target="_blank"
                            aria-label="Åpne dokument i ny fane"
                            title="Åpne dokument i ny fane"
                        >
                            <ExternalLinkIcon fontSize={'1.3rem'} />
                        </StyledLink>
                    </>
                ) : (
                    <>{dokument.tittel}</>
                )}
            </DokumentTittelMedLenkeWrapper>

            <Vedleggsliste>
                {dokument.logiskeVedlegg &&
                    dokument.logiskeVedlegg.map(vedlegg => (
                        <ListeElement key={vedlegg.logiskVedleggId}>
                            <EllipsisBodyShort size="small" title={vedlegg.tittel}>
                                {vedlegg.tittel}
                            </EllipsisBodyShort>
                        </ListeElement>
                    ))}
            </Vedleggsliste>
        </ListeElement>
    );
};
