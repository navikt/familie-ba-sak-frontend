import React from 'react';

import styled from 'styled-components';

import { BodyShort, Table } from '@navikt/ds-react';

import type { IInfotrygdSak, IInfotrygdStønad } from '../../typer/infotrygd';

const IngenVedtakTekst = styled(BodyShort)`
    margin: 1rem;
`;

const seqYearMonthTilYearMonth = (seqDato: string | undefined) => {
    if (!seqDato) {
        return '';
    }
    const yearMonth = 999999 - parseInt(seqDato);
    return yearMonth.toString().substring(0, 4) + '-' + yearMonth.toString().substring(4, 6);
};

const antallBarn = (stønad: IInfotrygdStønad) => {
    return stønad.barn.length;
};

const visBeløp = (stønad: IInfotrygdStønad) => {
    return stønad.delytelse.map((delytelse, index) => {
        let beløp = '';
        beløp += delytelse.beløp ?? '?';
        beløp += ' (';
        beløp += delytelse.typeDelytelse ?? '?';
        beløp += ', ';
        beløp += delytelse.typeUtbetaling ?? '?';
        beløp += ')';
        return <BodyShort key={beløp + index}>{beløp}</BodyShort>;
    });
};

const visDelytelseFom = (stønad: IInfotrygdStønad) => {
    return stønad.delytelse.map((delytelse, index) => {
        let fom = '';
        fom += delytelse.fom ?? '?';
        return <BodyShort key={fom + index}>{fom}</BodyShort>;
    });
};

const visDelytelseTom = (stønad: IInfotrygdStønad) => {
    return stønad.delytelse.map((delytelse, index) => {
        let tom = '';
        tom += delytelse.tom ?? '-';
        return <BodyShort key={tom + index}>{tom}</BodyShort>;
    });
};

export const Vedtakstabell: React.FC<{ saker: IInfotrygdSak[] }> = ({ saker }) => {
    const sakerMedVedtak = saker.filter(sak => sak.stønad);

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Saksblokk</Table.HeaderCell>
                        <Table.HeaderCell>Iverksatt</Table.HeaderCell>
                        <Table.HeaderCell>Virkfom</Table.HeaderCell>
                        <Table.HeaderCell>Vedtakstype</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Tekstkode</Table.HeaderCell>
                        <Table.HeaderCell>Ant barn</Table.HeaderCell>
                        <Table.HeaderCell>Opphør iverksatt</Table.HeaderCell>
                        <Table.HeaderCell>Opphør virkfom</Table.HeaderCell>
                        <Table.HeaderCell>Opphørsgrunn</Table.HeaderCell>
                        <Table.HeaderCell>Beløp</Table.HeaderCell>
                        <Table.HeaderCell>Fom</Table.HeaderCell>
                        <Table.HeaderCell>Tom</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sakerMedVedtak.map((sak: IInfotrygdSak, index: number) => {
                        const stønad = sak.stønad;
                        return (
                            <Table.Row key={index}>
                                <Table.DataCell>
                                    {(sak.saksblokk ?? '') + (sak.saksnr ?? '')}
                                </Table.DataCell>
                                <Table.DataCell>
                                    {seqYearMonthTilYearMonth(stønad?.iverksattFom)}
                                </Table.DataCell>
                                <Table.DataCell>
                                    {seqYearMonthTilYearMonth(stønad?.virkningFom)}
                                </Table.DataCell>
                                <Table.DataCell>
                                    {/* kommer når vi finner dataene i replikasettet */}
                                </Table.DataCell>
                                <Table.DataCell>{stønad?.status}</Table.DataCell>
                                <Table.DataCell>{stønad?.tekstkode}</Table.DataCell>
                                <Table.DataCell>{stønad ? antallBarn(stønad) : ''}</Table.DataCell>
                                <Table.DataCell>{stønad?.opphørtIver}</Table.DataCell>
                                <Table.DataCell>{stønad?.opphørtFom}</Table.DataCell>
                                <Table.DataCell>{stønad?.opphørsgrunn}</Table.DataCell>
                                <Table.DataCell>{stønad ? visBeløp(stønad) : ''}</Table.DataCell>
                                <Table.DataCell>
                                    {stønad ? visDelytelseFom(stønad) : ''}
                                </Table.DataCell>
                                <Table.DataCell>
                                    {stønad ? visDelytelseTom(stønad) : ''}
                                </Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {sakerMedVedtak.length === 0 ? (
                <IngenVedtakTekst>Ingen vedtak.</IngenVedtakTekst>
            ) : undefined}
        </>
    );
};
