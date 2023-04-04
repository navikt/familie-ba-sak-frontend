import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import { ANavRed, ABorderDanger, ABlue800, ABlue500 } from '@navikt/ds-tokens/dist/tokens';

export const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase).withConfig({
    shouldForwardProp: prop => !['visFeilmeldinger', 'valgt'].includes(prop),
})<{
    visFeilmeldinger: boolean;
    valgt?: boolean;
}>`
    margin-top: 1rem;
    width: 100%;

    ${({ visFeilmeldinger }) =>
        visFeilmeldinger
            ? `&& {
                border: ${ANavRed} solid;
                &:hover {
                    border-color: ${ABorderDanger};
                }
                &:focus {
                    border-color: ${ABorderDanger};
                }
        }`
            : ''}

    ${({ valgt }) =>
        valgt
            ? `&& {
                border: 3px solid ${ABlue800};
                &:hover {
                    border-color: ${ABlue500};
                }
                &:focus {
                    border-color: ${ABlue800};
                }
            }`
            : ''}
`;
