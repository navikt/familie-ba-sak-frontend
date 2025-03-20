import React from 'react';

import styled from 'styled-components';

import { BodyShort, Table } from '@navikt/ds-react';

import type { IInfotrygdSak } from '../../typer/infotrygd';

const IngenSakerTekst = styled(BodyShort)`
    margin: 1rem;
`;

export const Sakstabell: React.FC<{ saker: IInfotrygdSak[] }> = ({ saker }) => {
    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Saksblokk</Table.HeaderCell>
                        <Table.HeaderCell>Mottatt</Table.HeaderCell>
                        <Table.HeaderCell>Ru</Table.HeaderCell>
                        <Table.HeaderCell>Kode</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Nivå</Table.HeaderCell>
                        <Table.HeaderCell>Res</Table.HeaderCell>
                        <Table.HeaderCell>Vedtak</Table.HeaderCell>
                        <Table.HeaderCell>Iverksatt</Table.HeaderCell>
                        <Table.HeaderCell>Detaljer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {saker.map((infotrygdsak: IInfotrygdSak, index: number) => {
                        return (
                            <Table.Row key={index}>
                                <Table.DataCell>
                                    {(infotrygdsak.saksblokk ?? '') + (infotrygdsak.saksnr ?? '')}
                                </Table.DataCell>
                                <Table.DataCell>{infotrygdsak.mottattdato}</Table.DataCell>
                                <Table.DataCell>{infotrygdsak.kapittelnr}</Table.DataCell>
                                <Table.DataCell>
                                    {(infotrygdsak.valg ?? '') +
                                        ' ' +
                                        (infotrygdsak.undervalg ?? '')}
                                </Table.DataCell>
                                <Table.DataCell>{infotrygdsak.type}</Table.DataCell>
                                <Table.DataCell>{infotrygdsak.nivå}</Table.DataCell>
                                <Table.DataCell>{infotrygdsak.resultat}</Table.DataCell>
                                <Table.DataCell>{infotrygdsak.vedtaksdato}</Table.DataCell>
                                <Table.DataCell>{infotrygdsak.iverksattdato}</Table.DataCell>
                                <Table.DataCell>{/* detaljer, kommer senere */}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {saker.length === 0 ? <IngenSakerTekst>Ingen saker.</IngenSakerTekst> : undefined}
        </>
    );
};
