import React from 'react';

import styled from 'styled-components';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import {
    Accent600,
    MetaLime500,
    MetaPurple800,
    Neutral000,
    Success500,
    Warning500,
} from '@navikt/ds-tokens/dist/tokens';
import { GuttIkon, JenteIkon, KvinneIkon, MannIkon, NøytralPersonIkon } from '@navikt/familie-ikoner';
import { kjønnType } from '@navikt/familie-typer';

import KontorIkonGrønn from '../ikoner/KontorIkonGrønn';
import NavLogo from '../ikoner/NavLogo';
import StatusIkon, { Status } from '../ikoner/StatusIkon';
import { FagsakType } from '../typer/fagsak';

const StyledJenteIkon = styled(JenteIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            return `
            g {
                fill: ${Warning500};
            }
        `;
        } else {
            return `
                g {
                    fill: ${MetaPurple800};
                }
        `;
        }
    }};
`;

const StyledKvinneIkon = styled(KvinneIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            return `
            g {
                fill: ${Warning500};
            }
        `;
        } else {
            return `
                g {
                    fill: ${MetaPurple800};
                }
        `;
        }
    }};
`;

const StyledGuttIkon = styled(GuttIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            {
                return `
            g {
                fill: ${Warning500};
            }
        `;
            }
        } else {
            return `
                g {
                    fill: ${Accent600};
                }
        `;
        }
    }};
`;

const StyledMannIkon = styled(MannIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            return `
            g {
                fill: ${Warning500};
            }
        `;
        } else {
            return `
                g {
                    fill: ${Accent600};
                }
        `;
        }
    }};
`;

const StyledNøytralIkon = styled(NøytralPersonIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet)
            return `
                path:first-of-type {
                    fill: ${Warning500};
                }
            `;
    }}
`;

const StyledEnsligMindreårigIkon = styled(PersonCircleFillIcon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            return `
                path {
                    fill: ${Warning500};
                }
            `;
        } else {
            return `
            path {
                fill: ${MetaLime500};
            `;
        }
    }};
`;

const StyledNavIkon = styled(NavLogo)`
    path {
        fill: ${Neutral000};
    }

    margin: auto;
    height: 100%;
    width: 100%;
`;

const StyledNavIkonContaier = styled.div<{
    $adresseBeskyttet: boolean;
    $kjønn: string;
    $størrelse: string;
}>`
    border-radius: 100%;
    padding: 3px;
    place-content: center;

    min-height: 24px;
    min-width: 24px;
    max-height: 24px;
    max-width: 24px;

    background-color: ${Accent600};

    ${props => {
        if (props.$størrelse === 'm') {
            return `
                min-height: 32px;
                min-width: 32px;
                max-height: 32px;
                max-width: 32px;
            `;
        }
    }}

    ${props => {
        if (props.$kjønn === 'KVINNE') {
            return `
                background-color: ${MetaPurple800};
            `;
        }
    }}

    ${props => {
        if (props.$adresseBeskyttet) {
            return `
                background-color: ${Warning500};
                
            `;
        }
    }};
`;

interface PersonIkonProps {
    fagsakType?: FagsakType;
    kjønn: kjønnType;
    erBarn: boolean;
    størrelse?: 's' | 'm';
    erAdresseBeskyttet?: boolean;
    harTilgang?: boolean;
    erEgenAnsatt?: boolean;
}

export const PersonIkon = ({
    fagsakType,
    kjønn,
    erBarn,
    størrelse = 's',
    erAdresseBeskyttet = false,
    harTilgang = true,
    erEgenAnsatt = false,
}: PersonIkonProps) => {
    if (!harTilgang) {
        return <StatusIkon status={Status.FEIL} />;
    }

    if (erEgenAnsatt) {
        return (
            <StyledNavIkonContaier $adresseBeskyttet={erAdresseBeskyttet} $kjønn={kjønn} $størrelse={størrelse}>
                <StyledNavIkon />
            </StyledNavIkonContaier>
        );
    }

    if (fagsakType === FagsakType.INSTITUSJON) {
        if (størrelse === 'm') {
            return <KontorIkonGrønn height="32" width="32" color={erAdresseBeskyttet ? Warning500 : Success500} />;
        }
        return <KontorIkonGrønn height="24" width="24" color={erAdresseBeskyttet ? Warning500 : Success500} />;
    }
    const brukStørreIkon = fagsakType === FagsakType.SKJERMET_BARN || fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;

    const ikonProps = brukStørreIkon
        ? størrelse === 's'
            ? { height: 28, width: 28 }
            : { height: 36, width: 36 }
        : størrelse === 's'
          ? { height: 24, width: 24 }
          : { height: 32, width: 32 };

    if (fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return <StyledEnsligMindreårigIkon $adresseBeskyttet={erAdresseBeskyttet} {...ikonProps} />;
    }

    if (kjønn === kjønnType.KVINNE) {
        return erBarn ? (
            <StyledJenteIkon $adresseBeskyttet={erAdresseBeskyttet} {...ikonProps} />
        ) : (
            <StyledKvinneIkon $adresseBeskyttet={erAdresseBeskyttet} {...ikonProps} />
        );
    }
    if (kjønn === kjønnType.MANN) {
        return erBarn ? (
            <StyledGuttIkon $adresseBeskyttet={erAdresseBeskyttet} {...ikonProps} />
        ) : (
            <StyledMannIkon $adresseBeskyttet={erAdresseBeskyttet} {...ikonProps} />
        );
    }
    return <StyledNøytralIkon $adresseBeskyttet={erAdresseBeskyttet} {...ikonProps} />;
};
