import * as React from 'react';

import type { IIkonProps } from './Ikon';
import Ikon from './Ikon';

const IkonDokumenter = ({ width = 32, height = 32 }: IIkonProps) => {
    return (
        <Ikon width={width} height={height} viewBox={32}>
            <title id={'dokumenter'}>Dokumenter</title>
            <path d="M26.2895 2.93333H10.9521L8.31884 0.2156C8.18526 0.0777333 8.00479 0 7.81579 0H0.710526C0.319737 0 0 0.328533 0 0.733333V21.2667C0 21.6729 0.319737 22 0.710526 22H26.2895C26.6831 22 27 21.6729 27 21.2667V3.66667C27 3.26187 26.6831 2.93333 26.2895 2.93333Z" />
        </Ikon>
    );
};

export default IkonDokumenter;
