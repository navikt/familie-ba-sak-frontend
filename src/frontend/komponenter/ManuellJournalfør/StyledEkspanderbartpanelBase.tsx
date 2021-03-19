import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

export const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)<{
    visFeilmeldinger: boolean;
    valgt?: boolean;
}>`
    ${({ visFeilmeldinger }) =>
        visFeilmeldinger
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

    ${({ valgt }) =>
        valgt
            ? `&& {
                border: 3px solid ${navFarger.fokusFarge};
                &:hover {
                    border-color: ${navFarger.navBla};
                }
                &:focus {
                    border-color: ${navFarger.fokusFarge};
                }
            }`
            : ''}
`;
