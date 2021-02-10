import React, { SVGProps } from 'react';

export interface IkonProps extends SVGProps<SVGSVGElement> {
    color?: string;
    width?: number;
    height?: number;
    className?: string;
}

export const Ikon = ({
    children,
    width = 16,
    height = 16,
    viewBox = '24',
    className = '',
    ...props
}: IkonProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            className={className}
            {...props}
        >
            {children}
        </svg>
    );
};
