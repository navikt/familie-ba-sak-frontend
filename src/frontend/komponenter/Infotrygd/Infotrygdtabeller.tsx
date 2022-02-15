import React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { erBehandlingHenlagt } from '../../typer/behandling';
import { IMinimalFagsak } from '../../typer/fagsak';
import { IInfotrygdSak } from '../../typer/infotrygd';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
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

const Feilmelding = styled(AlertStripe)`
    margin-top: 10px;
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
    const {
        flyttBrukerTilBaSak,
        migrerInfotrygdSakRessurs,
        visMigrertModal,
        gåTilSaksoversiktVedSuksess,
    } = useInfotrygdMigrering();

    const visFlyttSakAlert = () => {
        if (
            migrerInfotrygdSakRessurs.status === RessursStatus.FEILET ||
            migrerInfotrygdSakRessurs.status === RessursStatus.FUNKSJONELL_FEIL
        ) {
            return (
                <>
                    <Feilmelding
                        children={migrerInfotrygdSakRessurs.frontendFeilmelding}
                        type={'feil'}
                    />
                </>
            );
        }
    };

    const disableMigrerKnapp =
        migrerInfotrygdSakRessurs.status === RessursStatus.HENTER ||
        migrerInfotrygdSakRessurs.status === RessursStatus.FEILET ||
        migrerInfotrygdSakRessurs.status === RessursStatus.FUNKSJONELL_FEIL;

    return (
        <>
            {saker.length > 0 &&
                minimalFagsak?.behandlinger.filter(
                    behandling => !erBehandlingHenlagt(behandling.resultat)
                ).length === 0 && (
                    <FlyttSakKnapp
                        mini
                        disabled={disableMigrerKnapp}
                        onClick={() => {
                            ident && flyttBrukerTilBaSak(ident);
                        }}
                    >
                        Flytt til BA-sak
                    </FlyttSakKnapp>
                )}
            {visFlyttSakAlert()}
            {visMigrertModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Migreringen pågår',
                        lukkKnapp: false,
                        visModal: visMigrertModal,
                        actions: [
                            <Knapp
                                key={'bekreft'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => gåTilSaksoversiktVedSuksess(minimalFagsak?.id)}
                                children={'Gå til saksoversikt'}
                            />,
                        ],
                    }}
                >
                    <Normaltekst>
                        Migrering tar 1-2 minutter. Du vil se behandlingen i saksoversikten så fort
                        migreringen er ferdig.
                    </Normaltekst>
                </UIModalWrapper>
            )}

            {minimalFagsak?.migreringsdato !== undefined && (
                <AlertStripe
                    type={'info'}
                    children={`Saken ble migrert fra Infotrygd ${formaterIsoDato(
                        minimalFagsak?.migreringsdato,
                        datoformat.DATO_FORKORTTET
                    )}`}
                />
            )}
            <SakerTekst>{ident ? `Saker for ${ident}` : 'Saker'}</SakerTekst>
            <Sakstabell saker={sorterSakerEtterSaksnr(saker)} />
            <VedtakTekst>Vedtak</VedtakTekst>
            <Vedtakstabell saker={saker} />
        </>
    );
};
