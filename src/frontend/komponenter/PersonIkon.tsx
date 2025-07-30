import React from 'react';

import styled from 'styled-components';

import {
    GuttIkon,
    JenteIkon,
    KvinneIkon,
    MannIkon,
    NøytralPersonIkon,
} from '@navikt/familie-ikoner';
import { kjønnType } from '@navikt/familie-typer';

import KontorIkonGrønn from '../ikoner/KontorIkonGrønn';
import StatusIkon, { Status } from '../ikoner/StatusIkon';
import { FagsakType } from '../typer/fagsak';
import { Adressebeskyttelsegradering } from '../typer/person';

const StyledJenteIkon = styled(JenteIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet)
            return `
            g {
                fill: var(--a-orange-600);
            }
        `;
    }};
`;

const StyledKvinneIkon = styled(KvinneIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet)
            return `
            g {
                fill: var(--a-orange-600);
            }
        `;
    }};
`;

const StyledGuttIkon = styled(GuttIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet)
            return `
            g {
                fill: var(--a-orange-600);
            }
        `;
    }};
`;

const StyledMannIkon = styled(MannIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet)
            return `
            g {
                fill: var(--a-orange-600);
            }
        `;
    }};
`;

const StyledNøytralIkon = styled(NøytralPersonIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet)
            return `
            g {
                fill: var(--a-orange-600);
            }
        `;
    }};
`;

interface PersonIkonProps {
    fagsakType?: FagsakType;
    kjønn: kjønnType;
    erBarn: boolean;
    størrelse?: 's' | 'm';
    adresseBeskyttelse?: Adressebeskyttelsegradering;
    harTilgang?: boolean;
}

export const PersonIkon = ({
    fagsakType,
    kjønn,
    erBarn,
    størrelse = 's',
    adresseBeskyttelse,
    harTilgang = true,
}: PersonIkonProps) => {
    if (!harTilgang) {
        return <StatusIkon status={Status.FEIL} />;
    }
    const erBeskyttet =
        adresseBeskyttelse !== null && adresseBeskyttelse !== Adressebeskyttelsegradering.UGRADERT;

    if (fagsakType === FagsakType.INSTITUSJON) {
        if (størrelse === 'm') {
            return <KontorIkonGrønn height="32" width="32" />;
        }
        return <KontorIkonGrønn height="24" width="24" />;
    }
    if (fagsakType === FagsakType.SKJERMET_BARN) {
        const ikonProps = størrelse === 's' ? { height: 28, width: 28 } : { height: 36, width: 36 };
        if (kjønn === kjønnType.KVINNE) {
            return <StyledJenteIkon $adresseBeskyttet={true} {...ikonProps} />;
        }
        if (kjønn === kjønnType.MANN) {
            return <StyledGuttIkon $adresseBeskyttet={true} {...ikonProps} />;
        }
    }

    const ikonProps = størrelse === 's' ? { height: 24, width: 24 } : { height: 32, width: 32 };
    if (kjønn === kjønnType.KVINNE) {
        return erBarn ? (
            <StyledJenteIkon $adresseBeskyttet={erBeskyttet} {...ikonProps} />
        ) : (
            <StyledKvinneIkon $adresseBeskyttet={erBeskyttet} {...ikonProps} />
        );
    }
    if (kjønn === kjønnType.MANN) {
        return erBarn ? (
            <StyledGuttIkon $adresseBeskyttet={erBeskyttet} {...ikonProps} />
        ) : (
            <StyledMannIkon $adresseBeskyttet={erBeskyttet} {...ikonProps} />
        );
    }
    return <StyledNøytralIkon $adresseBeskyttet={erBeskyttet} {...ikonProps} />;
};
