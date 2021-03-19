import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

export const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)<{
    visFeilmeldinger: boolean;
}>`
    ${({ visFeilmeldinger: harFeil }) =>
        harFeil
            ? `&& {
        border: ${navFarger.navRod} solid;
        &:hover {
            border-color: ${navFarger.navRod};
        }
        &:focus {
            border-color: ${navFarger.navRodDarken40};
        }
    }`
            : ''}
`;
