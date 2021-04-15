import React from 'react';

import styled from 'styled-components';

import { Undertittel } from 'nav-frontend-typografi';

import { IInfotrygdSak } from '../../typer/infotrygd';
import { Sakstabell } from './Sakstabell';
import { Vedtakstabell } from './Vedtakstabell';

interface InfotrygdtabellerProps {
    ident?: string;
    saker: IInfotrygdSak[];
}

const SakerTekst = styled(Undertittel)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const VedtakTekst = styled(Undertittel)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const sorterSakerEtterSaksnr = (saker: IInfotrygdSak[]): IInfotrygdSak[] =>
    saker.sort((sakA, sakB) => {
        const saksnrA = sakA.saksnr ? parseInt(sakA.saksnr) : 1000;
        const saksnrB = sakB.saksnr ? parseInt(sakB.saksnr) : 1000;
        return saksnrA - saksnrB;
    });

export const Infotrygdtabeller: React.FC<InfotrygdtabellerProps> = ({ ident, saker }) => {
    return (
        <>
            <SakerTekst>{ident ? `Saker for ${ident}` : 'Saker'}</SakerTekst>
            <Sakstabell saker={sorterSakerEtterSaksnr(saker)} />
            <VedtakTekst>Vedtak</VedtakTekst>
            <Vedtakstabell saker={saker} />
        </>
    );
};
