import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

export const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)<{
    visFeilmeldinger: boolean;
    valgt?: boolean;
}>`
    margin-top: 1rem;
    width: 100%;

    ${({ visFeilmeldinger }) =>
        visFeilmeldinger
            ? `&& {
                border: ${navFarger.navRod} solid;
                &:hover {
                    border-color: ${navFarger.redError};
                }
                &:focus {
                    border-color: ${navFarger.redError};
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
