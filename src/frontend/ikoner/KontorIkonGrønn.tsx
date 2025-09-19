import * as React from 'react';

import styled from 'styled-components';

import { Buildings3Icon } from '@navikt/aksel-icons';
import { AGreen600 } from '@navikt/ds-tokens/dist/tokens';

interface IKontorIkonGrønn {
    className?: string;
    height?: '32' | '24';
    width?: '32' | '24';
    color?: string;
}

const IkonSirkel = styled.span<{
    $height: IKontorIkonGrønn['height'];
    $width: IKontorIkonGrønn['width'];
    $color: IKontorIkonGrønn['color'];
}>`
    border-color: ${props => props.$color};
    border-radius: 50%;
    background-color: ${props => props.$color};
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
    color = AGreen600,
}) => {
    return (
        <IkonSirkel $height={height} $width={width} $color={color}>
            <Buildings3Icon height={height === '24' ? 20 : 28} width={width === '24' ? 20 : 28} className={className} />
        </IkonSirkel>
    );
};

export default KontorIkonGrønn;
