import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { erBehandlingHenlagt } from '../../typer/behandling';
import { IMinimalFagsak } from '../../typer/fagsak';
import { IInfotrygdSak } from '../../typer/infotrygd';
import { Sakstabell } from './Sakstabell';
import { useInfotrygdMigrering } from './useInfotrygd';
import { Vedtakstabell } from './Vedtakstabell';

interface InfotrygdtabellerProps {
    ident?: string;
    saker: IInfotrygdSak[];
    minimalFagsak?: IMinimalFagsak;
}

const SakerTekst = styled(Undertittel)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const VedtakTekst = styled(Undertittel)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const FlyttSakKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 30px;
    margint-bottom: auto;
    height: 40px;
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
    const { flyttBrukerTilBaSak, migrerInfotrygdSakRessurs } = useInfotrygdMigrering();

    return (
        <>
            {minimalFagsak?.behandlinger.filter(
                behandling => !erBehandlingHenlagt(behandling.resultat)
            ).length === 0 && (
                <FlyttSakKnapp
                    mini
                    disabled={migrerInfotrygdSakRessurs.status === RessursStatus.HENTER}
                    onClick={() => {
                        ident && flyttBrukerTilBaSak(ident);
                    }}
                >
                    Flytt til BA-sak
                </FlyttSakKnapp>
            )}
            <SakerTekst>{ident ? `Saker for ${ident}` : 'Saker'}</SakerTekst>
            <Sakstabell saker={sorterSakerEtterSaksnr(saker)} />
            <VedtakTekst>Vedtak</VedtakTekst>
            <Vedtakstabell saker={saker} />
        </>
    );
};
