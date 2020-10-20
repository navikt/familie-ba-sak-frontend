import './fagsakdeltagerkort.less';

import React from 'react';

import { Infokort } from '@navikt/familie-header';
import {
    GuttIkon,
    JenteIkon,
    KvinneIkon,
    MannIkon,
    NøytralPersonIkon,
} from '@navikt/familie-ikoner';

import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import { adressebeskyttelsestyper } from '../../../typer/person';
import { IFagsakDeltager } from '../../../typer/fagsakdeltager';

export interface IFagsakDeltagerkortProps {
    deltager: IFagsakDeltager;
    index: number;
    onClick?: (index: number) => void;
    children?: React.ReactNode | React.ReactNode[];
}

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

    const ingenTreff = !deltager.fagsakId;

    return (
        <div className={`fagsakdeltagerkort ${ingenTreff ? 'ingentreff' : 'treff'}`}>
            <Infokort
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
            />
        </div>
    );
};

export default FagsakDeltagerkort;
