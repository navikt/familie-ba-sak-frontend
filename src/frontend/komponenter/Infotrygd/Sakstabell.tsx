import React from 'react';

import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import type { IInfotrygdSak } from '../../typer/infotrygd';

const IngenSakerTekst = styled(Normaltekst)`
    margin: 1rem;
`;

export const Sakstabell: React.FC<{ saker: IInfotrygdSak[] }> = ({ saker }) => {
    return (
        <>
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Saksblokk</th>
                        <th>Mottatt</th>
                        <th>Ru</th>
                        <th>Kode</th>
                        <th>Type</th>
                        <th>Nivå</th>
                        <th>Res</th>
                        <th>Vedtak</th>
                        <th>Iverksatt</th>
                        <th>Detaljer</th>
                    </tr>
                </thead>
                <tbody>
                    {saker.map((infotrygdsak: IInfotrygdSak, index: number) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {(infotrygdsak.saksblokk ?? '') + (infotrygdsak.saksnr ?? '')}
                                </td>
                                <td>{infotrygdsak.mottattdato}</td>
                                <td>{infotrygdsak.kapittelnr}</td>
                                <td>
                                    {(infotrygdsak.valg ?? '') +
                                        ' ' +
                                        (infotrygdsak.undervalg ?? '')}
                                </td>
                                <td>{infotrygdsak.type}</td>
                                <td>{infotrygdsak.nivå}</td>
                                <td>{infotrygdsak.resultat}</td>
                                <td>{infotrygdsak.vedtaksdato}</td>
                                <td>{infotrygdsak.iverksattdato}</td>
                                <td>{/* detaljer, kommer senere */}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {saker.length === 0 ? <IngenSakerTekst>Ingen saker.</IngenSakerTekst> : undefined}
        </>
    );
};
