import React from 'react';

import { TrashFillIcon } from '@navikt/aksel-icons';
import { Button, HStack, Table } from '@navikt/ds-react';

import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { formaterIdent, formaterTekstStorForbokstav } from '../../../utils/formatter';

interface Props {
    samhandler: ISamhandlerInfo;
    slettSamhandler: () => void;
    readOnly: boolean;
}

export function SamhandlerTabell({ samhandler, slettSamhandler, readOnly }: Props) {
    const { navn, orgNummer, tssEksternId, adresser } = samhandler;
    return (
        <Table size={'small'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan={2}>
                        <HStack gap={'4'} justify={'space-between'}>
                            <div>Opplysninger om institusjon</div>
                            <div>
                                <Button
                                    variant={'tertiary'}
                                    size={'small'}
                                    icon={<TrashFillIcon />}
                                    onClick={slettSamhandler}
                                    disabled={readOnly}
                                >
                                    Fjern institusjon
                                </Button>
                            </div>
                        </HStack>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.DataCell>Institusjonnavn</Table.DataCell>
                    <Table.DataCell>{navn}</Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell>Organisasjonsnummer</Table.DataCell>
                    <Table.DataCell>{formaterIdent(orgNummer)}</Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell>TSS-ident</Table.DataCell>
                    <Table.DataCell>{tssEksternId}</Table.DataCell>
                </Table.Row>
                {adresser.map((adresse, index) => {
                    const { adresseType, adresselinjer, postNr, postSted } = adresse;
                    return (
                        <Table.Row key={index}>
                            <Table.DataCell>{adresseType}</Table.DataCell>
                            <Table.DataCell>
                                {formaterTekstStorForbokstav(`${adresselinjer}, ${postNr} ${postSted}`)}
                            </Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}
