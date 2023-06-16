import React from 'react';

import styled from 'styled-components';

import { Alert, Heading } from '@navikt/ds-react';

import type { IMinimalFagsak } from '../../typer/fagsak';
import type { IInfotrygdSak } from '../../typer/infotrygd';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import { Sakstabell } from './Sakstabell';
import { Vedtakstabell } from './Vedtakstabell';

interface InfotrygdtabellerProps {
    ident?: string;
    saker: IInfotrygdSak[];
    minimalFagsak?: IMinimalFagsak;
}

const SakerTekst = styled(Heading)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const VedtakTekst = styled(Heading)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const sorterSakerEtterSaksnr = (saker: IInfotrygdSak[]): IInfotrygdSak[] =>
    saker.sort((sakA, sakB) => {
        const saksnrA = sakA.saksnr ? parseInt(sakA.saksnr) : 1000;
        const saksnrB = sakB.saksnr ? parseInt(sakB.saksnr) : 1000;
        return saksnrA - saksnrB;
    });

export const Infotrygdtabeller: React.FC<InfotrygdtabellerProps> = ({
    ident,
    saker,
    minimalFagsak,
}) => {
    return (
        <>
            {minimalFagsak?.migreringsdato !== null && (
                <Alert
                    variant="info"
                    children={`Saken ble migrert fra Infotrygd ${formaterIsoDato(
                        minimalFagsak?.migreringsdato,
                        datoformat.DATO_FORKORTTET
                    )}`}
                />
            )}
            <SakerTekst size={'small'} level={'2'}>
                {ident ? `Saker for ${ident}` : 'Saker'}
            </SakerTekst>
            <Sakstabell saker={sorterSakerEtterSaksnr(saker)} />
            <VedtakTekst size={'small'} level={'2'}>
                Vedtak
            </VedtakTekst>
            <Vedtakstabell saker={saker} />
        </>
    );
};
