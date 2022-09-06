import React from 'react';

import { Table } from '@navikt/ds-react';

import type { ISamhandlerInfo } from '../../../typer/samhandler';

export const SamhandlerTabell: React.FC<{ samhandler: ISamhandlerInfo }> = ({ samhandler }) => {
    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan={2}>Opplysninger om institusjon</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.DataCell>Institusjonnavn</Table.DataCell>
                    <Table.DataCell>{samhandler.navn}</Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell>Organisasjonsnummer</Table.DataCell>
                    <Table.DataCell>{samhandler.orgNummer}</Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell>TSS-ident</Table.DataCell>
                    <Table.DataCell>{samhandler.tssEksternId}</Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell>Adresse</Table.DataCell>
                    <Table.DataCell>
                        <div>
                            {samhandler.adresser.map((adresse, index) => (
                                <div key={index}>
                                    {adresse.adresseType}: <br />
                                    {adresse.adresselinjer} {adresse.postNr} {adresse.postSted}{' '}
                                    <br />
                                </div>
                            ))}
                        </div>
                    </Table.DataCell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};
