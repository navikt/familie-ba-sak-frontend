import * as React from 'react';
import Ikon, { IIkonProps } from './Ikon';

const IkonDokumenter = ({ width = 20, height = 20 }: IIkonProps) => {
    return (
        <Ikon width={width} height={height} viewBox={24}>
            <path d="M23.5,6H9.707L7.854,4.146C7.76,4.053,7.633,4,7.5,4h-7C0.225,4,0,4.224,0,4.5v19C0,23.776,0.225,24,0.5,24h23  c0.276,0,0.5-0.224,0.5-0.5v-17C24,6.224,23.776,6,23.5,6z" />
        </Ikon>
    );
};

export default IkonDokumenter;
