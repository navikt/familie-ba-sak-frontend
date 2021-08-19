import * as React from 'react';

import Ikon, { IIkonProps } from './Ikon';

const IkonTotrinnskontroll = ({ width = 32, height = 32 }: IIkonProps) => {
    return (
        <Ikon width={width} height={height} viewBox={32}>
            <title id={'totrinnskontroll'}>Totrinnskontroll</title>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C16 7.76142 13.7614 10 11 10C8.23858 10 6 7.76142 6 5C6 2.23858 8.23858 0 11 0C13.7614 0 16 2.23858 16 5ZM4 18C4 14.134 7.13401 11 11 11C12.3956 11 13.6959 11.4084 14.7877 12.1123L8.7108 18H4Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.2782 12.2854C18.8876 11.9049 18.2545 11.9049 17.8639 12.2854L15.3891 14.6973C14.9985 15.0778 14.9985 15.6949 15.3891 16.0754L16.8033 17.4536L11.5 22.6218L12.9142 24L18.2175 18.8318L19.8085 20.3823C20.199 20.7628 20.8322 20.7628 21.2227 20.3823L23.6976 17.9704C24.0881 17.5899 24.0881 16.9728 23.6976 16.5923L19.2782 12.2854Z"
            />
        </Ikon>
    );
};

export default IkonTotrinnskontroll;
