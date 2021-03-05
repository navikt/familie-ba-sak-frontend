import React from 'react';

import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { IInfotrygdStønad } from '../../typer/infotrygd';

const IngenVedtakTekst = styled(Normaltekst)`
    margin: 1rem;
`;

const antallBarn = (stønad: IInfotrygdStønad) => {
    return stønad.barn.length;
};

export const Vedtakstabell: React.FC<{ stønader: IInfotrygdStønad[] }> = ({ stønader }) => {
    return (
        <>
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Iverksatt</th>
                        <th>Virkfom</th>
                        <th>Vedtakstype</th>
                        <th>Status</th>
                        <th>Tekstkode</th>
                        <th>Ant barn</th>
                        <th>Iverksatt</th>
                        <th>Virkfom</th>
                        <th>Opphørsgrunn</th>
                        <th>Detaljer</th>
                    </tr>
                </thead>
                <tbody>
                    {stønader.map((stønad: IInfotrygdStønad, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{stønad.iverksattFom}</td>
                                <td>{stønad.virkningFom}</td>
                                <td>{/* kommer når vi finner dataene i replikasettet */}</td>
                                <td>{stønad.status}</td>
                                <td>{stønad.tekstkode}</td>
                                <td>{antallBarn(stønad)}</td>
                                <td>{stønad.opphørtIver}</td>
                                <td>{stønad.opphørtFom}</td>
                                <td>{stønad.opphørsgrunn}</td>
                                <td>{/* detaljer, kommer senere */}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {stønader.length === 0 ? <IngenVedtakTekst>Ingen vedtak.</IngenVedtakTekst> : undefined}
        </>
    );
};
