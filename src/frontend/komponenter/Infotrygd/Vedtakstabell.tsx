import React from 'react';

import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { IInfotrygdSak, IInfotrygdStønad } from '../../typer/infotrygd';

const IngenVedtakTekst = styled(Normaltekst)`
    margin: 1rem;
`;

const antallBarn = (stønad: IInfotrygdStønad) => {
    return stønad.barn.length;
};

const visBeløp = (stønad: IInfotrygdStønad) => {
    return stønad.delytelse.map(delytelse => {
        let beløp = '';
        beløp += delytelse.beløp ? delytelse.beløp : '?';
        beløp += ' (';
        beløp += delytelse.typeDelytelse ? delytelse.typeDelytelse : '?';
        beløp += ', ';
        beløp += delytelse.typeUtbetaling ? delytelse.typeUtbetaling : '?';
        beløp += ')';
        return <Normaltekst>{beløp}</Normaltekst>;
    });
};

// Anta at alle delytelser har samme fom
const visDelytelseFom = (stønad: IInfotrygdStønad) => {
    let fom = stønad.delytelse[0].fom;
    return stønad.delytelse.every(delytelse => {
        return fom === delytelse.fom;
    })
        ? fom
        : 'Feil';
};

// Anta at alle delytelser har samme tom
const visDelytelseTom = (stønad: IInfotrygdStønad) => {
    let tom = stønad.delytelse[0].tom;
    return stønad.delytelse.every(delytelse => {
        return tom === delytelse.tom;
    })
        ? tom
        : 'Feil';
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
                        <th>Iverksatt</th>
                        <th>Virkfom</th>
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
                                <td>{stønad?.iverksattFom ? stønad.iverksattFom : ''}</td>
                                <td>{stønad ? stønad.virkningFom : ''}</td>
                                <td>{/* kommer når vi finner dataene i replikasettet */}</td>
                                <td>{stønad ? stønad.status : ''}</td>
                                <td>{stønad ? stønad.tekstkode : ''}</td>
                                <td>{stønad ? antallBarn(stønad) : ''}</td>
                                <td>{stønad ? stønad.opphørtIver : ''}</td>
                                <td>{stønad ? stønad.opphørtFom : ''}</td>
                                <td>{stønad ? stønad.opphørsgrunn : ''}</td>
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
