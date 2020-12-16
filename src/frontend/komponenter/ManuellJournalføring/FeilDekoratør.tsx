import styled from 'styled-components';
import { AnyStyledComponent } from 'styled-components/index';

import navFarger from 'nav-frontend-core';

export const feilDekoratør = <T extends unknown>(
    component: AnyStyledComponent | React.ComponentType<T>
) => styled(component)`
    && {
        border: ${navFarger.navRod} solid;
        &:hover {
            border-color: ${navFarger.navRod};
        }
        &:focus {
            border-color: ${navFarger.navRodDarken40};
        }
    }
`;
