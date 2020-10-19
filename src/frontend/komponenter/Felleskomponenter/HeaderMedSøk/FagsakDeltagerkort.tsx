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
import { kjønnType } from '@navikt/familie-typer';
import { Adressebeskyttelsegradering } from '../../../../../node_dist/frontend/typer/person';
import { FagsakDeltagerRolle } from '../../../typer/fagsakdeltager';

export interface IFagsakDeltagerkortProps {
    navn?: string;
    ident: string;
    rolle: FagsakDeltagerRolle;
    index: number;
    kjønn?: kjønnType;
    fagsakId?: string;
    adressebeskyttelsegradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    onClick?: (index: number) => void;
    children?: React.ReactNode | React.ReactNode[];
}

const FagsakDeltagerkort: React.FunctionComponent<IFagsakDeltagerkortProps> = ({
    navn,
    ident,
    rolle,
    index,
    kjønn,
    fagsakId,
    adressebeskyttelsegradering,
    harTilgang,
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

    const ingenTreff = !fagsakId;

    return (
        <div className={`fagsakdeltagerkort ${ingenTreff ? 'ingentreff' : 'treff'}`}>
            <Infokort
                ikon={
                    harTilgang ? (
                        ikoner[`${rolle}_${kjønn}`]
                    ) : (
                        <IkkeTilgang heigth={30} width={30} />
                    )
                }
                header={
                    harTilgang
                        ? `${navn} (${ident})${rolleNavn[`${rolle}_${kjønn}`] || ''}`
                        : `Personen har diskresjonskode ${
                              adressebeskyttelsegradering
                                  ? adressebeskyttelsestyper[adressebeskyttelsegradering]
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
