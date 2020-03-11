import React from 'react';
import Ikon, { IIkonProps } from './Ikon';

const IkonMeldinger = ({ width = 20, height = 20 }: IIkonProps) => {
    return (
        <Ikon width={width} height={height} viewBox={24}>
            <path d="m16.5 8.75c0.476 0 0.941 0.045 1.399 0.115 0.065-0.379 0.101-0.771 0.101-1.18 0-4.1-4.038-7.435-9-7.435-4.963 0-9 3.335-9 7.435 0 1.962 0.855 3.826 2.36 5.178l-1.794 3.14c-0.105 0.185-0.083 0.416 0.057 0.576 0.097 0.11 0.235 0.171 0.377 0.171 0.062 0 0.125-0.012 0.186-0.035l4.839-1.937c0.435 0.124 0.887 0.218 1.348 0.281 0.022 2e-3 0.065-5e-3 0.075 4e-3 0.075 0 0.319-2e-3 0.678-0.022 0.679-3.514 4.233-6.291 8.374-6.291z" />
            <path d="m16.5 9.75c-4.065 0-7.5 2.977-7.5 6.5 0 3.355 2.878 6.224 6.434 6.572 1e-3 0 4e-3 0 6e-3 2e-3 1.296 0.123 2.572-0.116 3.572-0.536 0.314 0.118 3.496 1.312 3.813 1.43 0.184 0.071 0.405 0.024 0.547-0.134 0.138-0.152 0.167-0.373 0.076-0.557-0.276-0.554-1.069-2.137-1.325-2.65 1.204-1.088 1.877-2.509 1.877-4.127 0-3.523-3.435-6.5-7.5-6.5z" />
        </Ikon>
    );
};

export default IkonMeldinger;
