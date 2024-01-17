import * as React from 'react';

import styled from 'styled-components';

import { Buldings3Icon } from '@navikt/aksel-icons';
import { AGreen600 } from '@navikt/ds-tokens/dist/tokens';

interface IKontorIkonGrønn {
    className?: string;
    height?: '32' | '24';
    width?: '32' | '24';
}

const IkonSirkel = styled.span<{
    $height: IKontorIkonGrønn['height'];
    $width: IKontorIkonGrønn['width'];
}>`
    border-color: ${AGreen600};
    border-radius: 50%;
    background-color: ${AGreen600};
    display: inline-grid;
    place-items: center;
    height: ${props => props.$height}px;
    width: ${props => props.$width}px;
    color: white;
`;

const KontorIkonGrønn: React.FunctionComponent<IKontorIkonGrønn> = ({
    className,
    height = '24',
    width = '24',
}) => {
    return (
        <IkonSirkel $height={height} $width={width}>
            <Buldings3Icon
                height={height === '24' ? 20 : 28}
                width={width === '24' ? 20 : 28}
                className={className}
            />
        </IkonSirkel>
    );
};

export default KontorIkonGrønn;
