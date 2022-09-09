import React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';

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
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Saksblokk</th>
                        <th>Iverksatt</th>
                        <th>Virkfom</th>
                        <th>Vedtakstype</th>
                        <th>Status</th>
                        <th>Tekstkode</th>
                        <th>Ant barn</th>
                        <th>Opphør iverksatt</th>
                        <th>Opphør virkfom</th>
                        <th>Opphørsgrunn</th>
                        <th>Beløp</th>
                        <th>Fom</th>
                        <th>Tom</th>
                    </tr>
                </thead>
                <tbody>
                    {sakerMedVedtak.map((sak: IInfotrygdSak, index: number) => {
                        const stønad = sak.stønad;
                        return (
                            <tr key={index}>
                                <td>{(sak.saksblokk ?? '') + (sak.saksnr ?? '')}</td>
                                <td>{seqYearMonthTilYearMonth(stønad?.iverksattFom)}</td>
                                <td>{seqYearMonthTilYearMonth(stønad?.virkningFom)}</td>
                                <td>{/* kommer når vi finner dataene i replikasettet */}</td>
                                <td>{stønad?.status}</td>
                                <td>{stønad?.tekstkode}</td>
                                <td>{stønad ? antallBarn(stønad) : ''}</td>
                                <td>{stønad?.opphørtIver}</td>
                                <td>{stønad?.opphørtFom}</td>
                                <td>{stønad?.opphørsgrunn}</td>
                                <td>{stønad ? visBeløp(stønad) : ''}</td>
                                <td>{stønad ? visDelytelseFom(stønad) : ''}</td>
                                <td>{stønad ? visDelytelseTom(stønad) : ''}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {sakerMedVedtak.length === 0 ? (
                <IngenVedtakTekst>Ingen vedtak.</IngenVedtakTekst>
            ) : undefined}
        </>
    );
};
