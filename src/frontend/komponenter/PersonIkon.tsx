import React from 'react';

import styled from 'styled-components';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import { AGreen400, AOrange600 } from '@navikt/ds-tokens/dist/tokens';
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

const StyledJenteIkon = styled(JenteIkon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            return `
            g {
                fill: var(--a-orange-600);
            }
        `;
        } else {
            return `
                g {
                    fill: var(--a-purple-400);
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
                fill: var(--a-orange-600);
            }
        `;
        } else {
            return `
                g {
                    fill: var(--a-purple-400);
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
                fill: var(--a-orange-600);
            }
        `;
            }
        } else {
            return `
                g {
                    fill: var(--a-blue-400);
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
                fill: var(--a-orange-600);
            }
        `;
        } else {
            return `
                g {
                    fill: var(--a-blue-400);
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
                    fill: var(--a-orange-600);
                }
            `;
    }}
`;

const StyledEnsligMindreårigIkon = styled(PersonCircleFillIcon)<{ $adresseBeskyttet: boolean }>`
    ${props => {
        if (props.$adresseBeskyttet) {
            return `
                path {
                    fill: var(--a-orange-600);
                }
            `;
        } else {
            return `
            path {
                fill: var(--a-limegreen-700);
            `;
        }
    }};
`;

interface PersonIkonProps {
    fagsakType?: FagsakType;
    kjønn: kjønnType;
    erBarn: boolean;
    størrelse?: 's' | 'm';
    adresseBeskyttelse?: boolean;
    harTilgang?: boolean;
}

export const PersonIkon = ({
    fagsakType,
    kjønn,
    erBarn,
    størrelse = 's',
    adresseBeskyttelse = false,
    harTilgang = true,
}: PersonIkonProps) => {
    if (!harTilgang) {
        return <StatusIkon status={Status.FEIL} />;
    }

    if (fagsakType === FagsakType.INSTITUSJON) {
        if (størrelse === 'm') {
            return (
                <KontorIkonGrønn
                    height="32"
                    width="32"
                    color={adresseBeskyttelse ? AOrange600 : AGreen400}
                />
            );
        }
        return (
            <KontorIkonGrønn
                height="24"
                width="24"
                color={adresseBeskyttelse ? AOrange600 : AGreen400}
            />
        );
    }
    let ikonProps = størrelse === 's' ? { height: 28, width: 28 } : { height: 36, width: 36 };
    if (fagsakType === FagsakType.SKJERMET_BARN) {
        if (kjønn === kjønnType.KVINNE) {
            return <StyledJenteIkon $adresseBeskyttet={true} {...ikonProps} />;
        }
        if (kjønn === kjønnType.MANN) {
            return <StyledGuttIkon $adresseBeskyttet={true} {...ikonProps} />;
        }
    }

    if (fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return <StyledEnsligMindreårigIkon $adresseBeskyttet={adresseBeskyttelse} {...ikonProps} />;
    }

    ikonProps = størrelse === 's' ? { height: 24, width: 24 } : { height: 32, width: 32 };
    if (kjønn === kjønnType.KVINNE) {
        return erBarn ? (
            <StyledJenteIkon $adresseBeskyttet={adresseBeskyttelse} {...ikonProps} />
        ) : (
            <StyledKvinneIkon $adresseBeskyttet={adresseBeskyttelse} {...ikonProps} />
        );
    }
    if (kjønn === kjønnType.MANN) {
        return erBarn ? (
            <StyledGuttIkon $adresseBeskyttet={adresseBeskyttelse} {...ikonProps} />
        ) : (
            <StyledMannIkon $adresseBeskyttet={adresseBeskyttelse} {...ikonProps} />
        );
    }
    return <StyledNøytralIkon $adresseBeskyttet={adresseBeskyttelse} {...ikonProps} />;
};
