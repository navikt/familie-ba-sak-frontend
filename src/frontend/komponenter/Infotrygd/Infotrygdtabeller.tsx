import React from 'react';

import styled from 'styled-components';

import { Systemtittel, Undertittel } from 'nav-frontend-typografi';

import { sorterSakerEtterSaksnr } from '../../context/InfotrygdContext';
import { Sakstabell } from './Sakstabell';
import { Vedtakstabell } from './Vedtakstabell';
import { IInfotrygdSak } from '../../typer/infotrygd';

interface InfotrygdtabellerProps {
    saker: IInfotrygdSak[];
}

const InfotrygdDataTittel = styled(Systemtittel)`
    margin-top: 4rem;
`;

const SakerTekst = styled(Undertittel)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const VedtakTekst = styled(Undertittel)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

export const Infotrygdtabeller: React.FC<InfotrygdtabellerProps> = ({ saker }) => {
    return (
        <>
            <SakerTekst>Saker</SakerTekst>
            <Sakstabell saker={sorterSakerEtterSaksnr(saker)} />
            <VedtakTekst>Vedtak</VedtakTekst>
            <Vedtakstabell saker={saker} />
        </>
    );
};
