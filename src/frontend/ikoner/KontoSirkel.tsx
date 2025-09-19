import * as React from 'react';

import styled from 'styled-components';

interface IKontoSirkel {
    filled?: boolean;
    className?: string;
    height?: number;
    width?: number;
}

export const KontoSirkel: React.FC<IKontoSirkel> = ({ className, filled = false, width = 48, height = 48 }) => {
    return filled ? (
        <StyledSvg
            aria-labelledby={'kontosirkel'}
            version="1.1"
            id="Filled_Version"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            enableBackground="new 0 0 24 24"
            fill="#0067c5"
        >
            <StyledPath
                d="M12,0C5.383,0,0,5.383,0,12c0,3.18,1.232,6.177,3.469,8.438l0,0.001C5.743,22.735,8.772,24,12,24
       c3.234,0,6.268-1.27,8.542-3.573C22.772,18.166,24,15.174,24,12C24,5.383,18.617,0,12,0z M20.095,19.428
       c-1.055-0.626-2.64-1.202-4.32-1.81c-0.418-0.151-0.846-0.307-1.275-0.465v-1.848c0.501-0.309,1.384-1.107,1.49-2.935
       c0.386-0.227,0.63-0.728,0.63-1.37c0-0.578-0.197-1.043-0.52-1.294c0.242-0.757,0.681-2.145,0.385-3.327
       C16.138,4.992,14.256,4.5,12.75,4.5c-1.342,0-2.982,0.391-3.569,1.456C8.477,5.922,8.085,6.229,7.891,6.487
       c-0.635,0.838-0.216,2.368,0.021,3.21C7.583,9.946,7.38,10.415,7.38,11c0,0.643,0.244,1.144,0.63,1.37
       c0.106,1.828,0.989,2.626,1.49,2.935v1.848c-0.385,0.144-0.78,0.287-1.176,0.431c-1.621,0.587-3.288,1.194-4.407,1.857
       C2.04,17.405,1,14.782,1,12C1,5.935,5.935,1,12,1c6.065,0,11,4.935,11,11C23,14.775,21.965,17.394,20.095,19.428z"
            />
        </StyledSvg>
    ) : (
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
            fill="none"
            stroke="#0067c5"
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
    stroke-linejoin: round;
    stroke-miterlimit: 10;
`;
