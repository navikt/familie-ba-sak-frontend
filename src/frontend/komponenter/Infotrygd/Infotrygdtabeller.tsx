import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { erBehandlingHenlagt } from '../../typer/behandling';
import type { IMinimalFagsak } from '../../typer/fagsak';
import type { IInfotrygdSak } from '../../typer/infotrygd';
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

const SakerTekst = styled(Heading)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const VedtakTekst = styled(Heading)`
    margin-top: 4rem;
    margin-bottom: 1rem;
`;

const FlyttSakButton = styled(Button)`
    margin-left: 1rem;
    margin-top: 30px;
    margint-bottom: auto;
    height: 40px;
`;

const Feilmelding = styled(Alert)`
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
                        children="Saken kan ikke migreres. Du må behandle saken i Infotrygd."
                        variant="error"
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
                    <FlyttSakButton
                        variant={'secondary'}
                        size={'small'}
                        disabled={disableMigrerKnapp}
                        onClick={() => {
                            ident && flyttBrukerTilBaSak(ident);
                        }}
                    >
                        Flytt til BA-sak
                    </FlyttSakButton>
                )}
            {visFlyttSakAlert()}
            {visMigrertModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Migreringen pågår',
                        lukkKnapp: false,
                        visModal: visMigrertModal,
                        actions: [
                            <Button
                                key={'bekreft'}
                                variant={'secondary'}
                                size={'small'}
                                onClick={() => gåTilSaksoversiktVedSuksess(minimalFagsak?.id)}
                                children={'Gå til saksoversikt'}
                            />,
                        ],
                    }}
                >
                    <BodyShort>
                        Migrering tar 1-2 minutter. Du vil se behandlingen i saksoversikten så fort
                        migreringen er ferdig.
                    </BodyShort>
                </UIModalWrapper>
            )}

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
