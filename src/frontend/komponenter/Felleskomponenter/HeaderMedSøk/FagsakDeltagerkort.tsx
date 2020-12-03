import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import { Infokort } from '@navikt/familie-header';
import {
    GuttIkon,
    JenteIkon,
    KvinneIkon,
    MannIkon,
    NøytralPersonIkon,
} from '@navikt/familie-ikoner';

import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import { IFagsakDeltager } from '../../../typer/fagsakdeltager';
import { adressebeskyttelsestyper } from '../../../typer/person';

export interface IFagsakDeltagerkortProps {
    deltager: IFagsakDeltager;
    index: number;
    onClick?: (index: number) => void;
    children?: React.ReactNode | React.ReactNode[];
}

const StyledInfokort = styled(Infokort)<{ deaktivert: boolean }>`
    :hover {
        cursor: ${({ deaktivert }) => (deaktivert ? 'default' : 'pointer')};
    }
`;

const IngenFagsakTekst = styled.p`
    margin: 0.5rem 0;
    color: ${navFarger.navGra80};
`;

const FagsakDeltagerkort: React.FunctionComponent<IFagsakDeltagerkortProps> = ({
    deltager,
    index,
    onClick,
}) => {
    type IkonerMap = Record<string, React.ReactNode>;
    type RolleNavnMap = Record<string, string>;

    const ikoner: IkonerMap = {
        FORELDER_MANN: <MannIkon className="ikon" />,
        FORELDER_KVINNE: <KvinneIkon className="ikon" />,
        FORELDER_UKJENT: <NøytralPersonIkon className="ikon" />,
        BARN_KVINNE: <JenteIkon className="ikon" />,
        BARN_MANN: <GuttIkon className="ikon" />,
        BARN_UKJENT: <NøytralPersonIkon className="ikon" />,
        UKJENT_UKJENT: <NøytralPersonIkon className="ikon" />,
        UKJENT_MANN: <MannIkon className="ikon" />,
        UKJENT_KVINNE: <KvinneIkon className="ikon" />,
    };

    const rolleNavn: RolleNavnMap = {
        FORELDER_MANN: ' : FAR',
        FORELDER_KVINNE: ' : MOR',
        FORELDER_UKJENT: ' : FORELDER',
        BARN_KVINNE: ' : BARN',
        BARN_MANN: ' : BARN',
        BARN_UKJENT: ' : BARN',
    };

    return (
        <StyledInfokort
            deaktivert={!deltager.harTilgang}
            ikon={
                deltager.harTilgang ? (
                    ikoner[`${deltager.rolle}_${deltager.kjønn}`]
                ) : (
                    <IkkeTilgang heigth={30} width={30} />
                )
            }
            header={
                deltager.harTilgang
                    ? `${deltager.navn} (${deltager.ident})${
                          rolleNavn[`${deltager.rolle}_${deltager.kjønn}`] || ''
                      }`
                    : `Personen har diskresjonskode ${
                          deltager.adressebeskyttelseGradering
                              ? adressebeskyttelsestyper[deltager.adressebeskyttelseGradering]
                              : ''
                      }`
            }
            index={index}
            onClick={onClick}
        >
            {!deltager.fagsakId && deltager.harTilgang && (
                <IngenFagsakTekst>Ingen fagsak. Trykk for å opprette &gt;</IngenFagsakTekst>
            )}
        </StyledInfokort>
    );
};

export default FagsakDeltagerkort;
