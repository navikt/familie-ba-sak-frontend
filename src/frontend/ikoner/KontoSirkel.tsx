import * as React from 'react';

import styled from 'styled-components';

interface IKontoSirkel {
    className?: string;
    height?: number;
    width?: number;
}

export const Kontosirkel: React.FC<IKontoSirkel> = ({ className, width = 48, height = 48 }) => {
    return (
        <StyledSvg
            aria-labelledby={'kontosirkel'}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            className={className}
        >
            <title id={'kontosirkel'}>Kontosirkel</title>
            <g>
                <StyledPath
                    d="M10,15c0,0-1.5-0.5-1.5-3c-0.8,0-0.8-2,0-2c0-0.3-1.5-4,1-3.5c0.5-2,6-2,6.5,0c0.3,1.4-0.5,3.3-0.5,3.5
		c0.8,0,0.8,2,0,2c0,2.5-1.5,3-1.5,3v2.5c2.5,0.9,4.9,1.7,6.2,2.6c2-2.1,3.3-4.9,3.3-8.1c0-6.4-5.1-11.5-11.5-11.5S0.5,5.6,0.5,12
		c0,3.2,1.3,6,3.3,8.1c1.3-0.9,4-1.7,6.2-2.6C10,17.5,10,15,10,15z M3.8,20.1c2.1,2.1,5,3.4,8.2,3.4c3.2,0,6.1-1.3,8.2-3.4"
                />
            </g>
        </StyledSvg>
    );
};

const StyledSvg = styled.svg`
    enable-background: new 0 0 24 24;
`;

const StyledPath = styled.path`
    fill: none;
    stroke: #0067c5;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
`;
