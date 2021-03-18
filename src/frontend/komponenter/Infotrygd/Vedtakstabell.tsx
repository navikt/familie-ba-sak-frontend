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

export const Vedtakstabell: React.FC<{ saker: IInfotrygdSak[] }> = ({ saker }) => {
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
                    {saker.map((sak: IInfotrygdSak, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{sak.stønad ? sak.stønad.iverksattFom : ''}</td>
                                <td>{sak.stønad ? sak.stønad.virkningFom : ''}</td>
                                <td>{/* kommer når vi finner dataene i replikasettet */}</td>
                                <td>{sak.stønad ? sak.stønad.status : ''}</td>
                                <td>{sak.stønad ? sak.stønad.tekstkode : ''}</td>
                                <td>{sak.stønad ? antallBarn(sak.stønad) : ''}</td>
                                <td>{sak.stønad ? sak.stønad.opphørtIver : ''}</td>
                                <td>{sak.stønad ? sak.stønad.opphørtFom : ''}</td>
                                <td>{sak.stønad ? sak.stønad.opphørsgrunn : ''}</td>
                                <td>{/* detaljer, kommer senere */}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {saker.length === 0 ? <IngenVedtakTekst>Ingen vedtak.</IngenVedtakTekst> : undefined}
        </>
    );
};
