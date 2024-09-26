import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, Heading, Alert, Table } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs, Utsendingsinfo } from '@navikt/familie-typer';
import {
    byggHenterRessurs,
    byggTomRessurs,
    journalpoststatus,
    Journalposttype,
    RessursStatus,
} from '@navikt/familie-typer';

import { JournalpostDokument } from './JournalpostDokument';
import {
    formaterDatoRegistrertSendtMottatt,
    formaterFagsak,
    hentDatoRegistrertSendt,
    hentSorterteJournalposter,
} from './journalpostUtils';
import { UtsendingsinfoModal } from './UtsendingsinfoModal';
import useDokument from '../../../hooks/useDokument';
import type { ITilgangsstyrtJournalpost } from '../../../typer/journalpost';
import type { IPersonInfo } from '../../../typer/person';
import { hentSortState, Sorteringsrekkefølge } from '../../../utils/tabell';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
`;

const InnUtWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const IkonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
`;

const StyledTable = styled(Table)`
    table-layout: fixed;
`;

const StyledDataCell = styled(Table.DataCell)`
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
    white-space: nowrap;

    &:nth-of-type(1) {
        width: 3.5rem;
    }
    &:nth-of-type(3) {
        width: 25%;
    }
    &:nth-of-type(4) {
        width: 15%;
    }
    &:nth-of-type(5) {
        width: 20%;
    }
    &:nth-of-type(6) {
        width: 22%;
    }
    &:nth-of-type(7) {
        width: 8%;
    }
`;

const StyledColumnHeader = styled(Table.ColumnHeader)`
    white-space: nowrap;
    width: 10rem;
`;

const StyledButton = styled(Button)`
    padding: 0;
    .navds-label {
        font-weight: normal;
    }
`;

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
    transform: rotate(90deg);
`;

export const Vedleggsliste = styled.ul`
    list-style-type: none;
    margin: 0;
    &:first-child {
        padding-inline-start: 0;
    }
`;

export const EllipsisBodyShort = styled(BodyShort)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

interface IProps {
    bruker: IPersonInfo;
}

const hentIkonForJournalpostType = (journalposttype: Journalposttype) => {
    switch (journalposttype) {
        case Journalposttype.I:
            return <ArrowRightIcon title="Inngående" fontSize={'1.3rem'} />;
        case Journalposttype.U:
            return <ArrowLeftIcon title="Utgående" fontSize={'1.3rem'} />;
        case Journalposttype.N:
            return <ArrowDownIcon title="Notat" fontSize={'1.3rem'} />;
    }
};

const JournalpostListe = ({ bruker }: IProps) => {
    const { request } = useHttp();
    const [journalposterRessurs, settJournalposterRessurs] =
        useState<Ressurs<ITilgangsstyrtJournalpost[]>>(byggTomRessurs());
    const [sortering, settSortering] = useState<Sorteringsrekkefølge>(
        Sorteringsrekkefølge.INGEN_SORTERING
    );
    const { visDokumentModal, hentetDokument, settVisDokumentModal, hentForhåndsvisning } =
        useDokument();
    const [utsendingsinfo, settUtsendingsinfo] = useState<Utsendingsinfo | undefined>(undefined);

    useEffect(() => {
        settJournalposterRessurs(byggHenterRessurs());

        const ident = bruker.personIdent;

        request<{ ident: string }, ITilgangsstyrtJournalpost[]>({
            method: 'POST',
            data: { ident },
            url: `/familie-ba-sak/api/journalpost/for-bruker`,
            påvirkerSystemLaster: true,
        }).then(journalposterRessurs => {
            settJournalposterRessurs(journalposterRessurs);
        });
    }, [bruker]);

    const settNesteSorteringsrekkefølge = (): void => {
        switch (sortering) {
            case Sorteringsrekkefølge.INGEN_SORTERING:
                settSortering(Sorteringsrekkefølge.STIGENDE);
                break;
            case Sorteringsrekkefølge.STIGENDE:
                settSortering(Sorteringsrekkefølge.SYNKENDE);
                break;
            case Sorteringsrekkefølge.SYNKENDE:
            default:
                settSortering(Sorteringsrekkefølge.INGEN_SORTERING);
                break;
        }
    };

    if (
        journalposterRessurs.status === RessursStatus.FEILET ||
        journalposterRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        journalposterRessurs.status === RessursStatus.IKKE_TILGANG
    ) {
        return (
            <Container>
                <Alert variant="error">Klarte ikke å hente inn journalposter for fagsak.</Alert>
            </Container>
        );
    }

    if (journalposterRessurs.status === RessursStatus.SUKSESS) {
        const journalposterMedOverstyrtDato = journalposterRessurs.data?.map(
            tilgangsstyrtJournalpost => {
                const { journalpost } = tilgangsstyrtJournalpost;
                const journalpostMedRiktigDatoMottatt = {
                    ...journalpost,
                    datoMottatt:
                        journalpost.datoMottatt ||
                        hentDatoRegistrertSendt(
                            journalpost.relevanteDatoer,
                            journalpost.journalposttype
                        ),
                };

                return {
                    ...tilgangsstyrtJournalpost,
                    ...journalpostMedRiktigDatoMottatt,
                };
            }
        );
        const sorterteJournalPoster = hentSorterteJournalposter(
            journalposterMedOverstyrtDato,
            sortering
        );
        return (
            <Container>
                <Heading level="2" size="large" spacing>
                    Dokumentoversikt
                </Heading>

                <StyledTable
                    size="small"
                    zebraStripes
                    sort={hentSortState(sortering, 'datoRegistrertSendt')}
                    onSortChange={settNesteSorteringsrekkefølge}
                >
                    <Table.Header>
                        <Table.Row>
                            <StyledHeaderCell>Inn/ut</StyledHeaderCell>
                            <StyledColumnHeader sortKey="datoRegistrertSendt" sortable>
                                Registrert/sendt
                            </StyledColumnHeader>

                            <StyledHeaderCell>Dokumenter</StyledHeaderCell>
                            <StyledHeaderCell>Fagsystem | Saksid</StyledHeaderCell>
                            <StyledHeaderCell>Avsender/Mottaker</StyledHeaderCell>
                            <StyledHeaderCell>Journalpost</StyledHeaderCell>
                            <StyledHeaderCell>Status</StyledHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sorterteJournalPoster.map(tilgangsstyrtJournalpost => (
                            <Table.Row key={tilgangsstyrtJournalpost.journalpost.journalpostId}>
                                <StyledDataCell>
                                    <InnUtWrapper>
                                        <IkonWrapper>
                                            {hentIkonForJournalpostType(
                                                tilgangsstyrtJournalpost.journalpost.journalposttype
                                            )}{' '}
                                        </IkonWrapper>
                                        {tilgangsstyrtJournalpost.journalpost.journalposttype}
                                    </InnUtWrapper>
                                </StyledDataCell>
                                <StyledDataCell>
                                    {formaterDatoRegistrertSendtMottatt(
                                        tilgangsstyrtJournalpost.journalpost.datoMottatt
                                    )}
                                </StyledDataCell>

                                <StyledDataCell>
                                    {tilgangsstyrtJournalpost.journalpost.dokumenter?.length ? (
                                        <Vedleggsliste>
                                            {tilgangsstyrtJournalpost.journalpost.dokumenter?.map(
                                                dokument => (
                                                    <JournalpostDokument
                                                        dokument={dokument}
                                                        key={dokument.dokumentInfoId}
                                                        hentForhåndsvisning={hentForhåndsvisning}
                                                        tilgangsstyrtJournalpost={
                                                            tilgangsstyrtJournalpost
                                                        }
                                                    />
                                                )
                                            )}
                                        </Vedleggsliste>
                                    ) : (
                                        <BodyShort>Ingen dokumenter</BodyShort>
                                    )}
                                </StyledDataCell>

                                <StyledDataCell>
                                    <EllipsisBodyShort
                                        size="small"
                                        title={formaterFagsak(
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsaksystem,
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsakId
                                        )}
                                    >
                                        {formaterFagsak(
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsaksystem,
                                            tilgangsstyrtJournalpost.journalpost.sak?.fagsakId
                                        )}
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                                <StyledDataCell>
                                    {tilgangsstyrtJournalpost.journalpost.utsendingsinfo ? (
                                        <StyledButton
                                            icon={<StyledMagnifyingGlassIcon />}
                                            iconPosition={'right'}
                                            variant={'tertiary'}
                                            size={'xsmall'}
                                            onClick={() =>
                                                settUtsendingsinfo(
                                                    tilgangsstyrtJournalpost.journalpost
                                                        .utsendingsinfo
                                                )
                                            }
                                        >
                                            {
                                                tilgangsstyrtJournalpost.journalpost
                                                    .avsenderMottaker?.navn
                                            }
                                        </StyledButton>
                                    ) : (
                                        <EllipsisBodyShort
                                            size="small"
                                            title={
                                                tilgangsstyrtJournalpost.journalpost
                                                    .avsenderMottaker?.navn
                                            }
                                        >
                                            {
                                                tilgangsstyrtJournalpost.journalpost
                                                    .avsenderMottaker?.navn
                                            }
                                        </EllipsisBodyShort>
                                    )}
                                </StyledDataCell>
                                <StyledDataCell>
                                    <EllipsisBodyShort
                                        size="small"
                                        title={tilgangsstyrtJournalpost.journalpost.tittel}
                                    >
                                        {tilgangsstyrtJournalpost.journalpost.tittel}
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                                <StyledDataCell>
                                    <EllipsisBodyShort
                                        size="small"
                                        title={
                                            journalpoststatus[
                                                tilgangsstyrtJournalpost.journalpost.journalstatus
                                            ]
                                        }
                                    >
                                        {
                                            journalpoststatus[
                                                tilgangsstyrtJournalpost.journalpost.journalstatus
                                            ]
                                        }
                                    </EllipsisBodyShort>
                                </StyledDataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </StyledTable>
                {visDokumentModal && (
                    <PdfVisningModal
                        onRequestClose={() => settVisDokumentModal(false)}
                        pdfdata={hentetDokument}
                    />
                )}
                {utsendingsinfo && (
                    <UtsendingsinfoModal
                        onClose={() => settUtsendingsinfo(undefined)}
                        data={utsendingsinfo}
                    />
                )}
            </Container>
        );
    } else {
        return null;
    }
};

export default JournalpostListe;
