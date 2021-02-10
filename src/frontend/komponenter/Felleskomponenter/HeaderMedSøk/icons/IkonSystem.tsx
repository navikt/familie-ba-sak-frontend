import React from 'react';

import navFarger from 'nav-frontend-core';

import { Ikon, IkonProps } from './Ikon';

export const IkonSystem = ({ color = navFarger.white, width = 16, height = 16 }: IkonProps) => {
    return (
        <Ikon aria-label={'system'} width={width} height={height} viewBox={'128'}>
            <path
                fill={color}
                d="M0 0h32v32H0zm48 0h32v32H48zm48 0h32v32H96zM0 48h32v32H0zm48 0h32v32H48zm48 0h32v32H96zM0 96h32v32H0zm48 0h32v32H48zm48 0h32v32H96z"
            />
        </Ikon>
    );
};
