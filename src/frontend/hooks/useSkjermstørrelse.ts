import { useState, useEffect } from 'react';

export enum Skjermstørrelse {
    XS = 0, // 0–479px
    SM = 1, // 480–767px
    MD = 2, // 768–1023px
    LG = 3, // 1024–1279px
    XL = 4, // 1280–1439px
    '2XL' = 5, // 1440–1599px
    '3XL' = 6, // 1600–1919px
    '4XL' = 7, // 1920–2047px
    '5XL' = 8, // 2048–2559px
    '6XL' = 9, // 2560px+
}

const BREAKPOINTS: { breakpoint: Skjermstørrelse; minWidth: number }[] = [
    { breakpoint: Skjermstørrelse['6XL'], minWidth: 2560 },
    { breakpoint: Skjermstørrelse['5XL'], minWidth: 2048 },
    { breakpoint: Skjermstørrelse['4XL'], minWidth: 1920 },
    { breakpoint: Skjermstørrelse['3XL'], minWidth: 1600 },
    { breakpoint: Skjermstørrelse['2XL'], minWidth: 1440 },
    { breakpoint: Skjermstørrelse.XL, minWidth: 1280 },
    { breakpoint: Skjermstørrelse.LG, minWidth: 1024 },
    { breakpoint: Skjermstørrelse.MD, minWidth: 768 },
    { breakpoint: Skjermstørrelse.SM, minWidth: 480 },
    { breakpoint: Skjermstørrelse.XS, minWidth: 0 },
];

function utledSkjermstørrelse(width: number): Skjermstørrelse {
    for (const { breakpoint, minWidth } of BREAKPOINTS) {
        if (width >= minWidth) return breakpoint;
    }
    return Skjermstørrelse.XS;
}

export function useSkjermstørrelse(): Skjermstørrelse {
    const [størrelse, setStørrelse] = useState<Skjermstørrelse>(() => utledSkjermstørrelse(window.innerWidth));

    useEffect(() => {
        const mediaQueries = BREAKPOINTS.slice(0, -1).map(({ minWidth }) =>
            window.matchMedia(`(min-width: ${minWidth}px)`)
        );

        const handleChange = () => {
            setStørrelse(utledSkjermstørrelse(window.innerWidth));
        };

        mediaQueries.forEach(mq => mq.addEventListener('change', handleChange));

        return () => {
            mediaQueries.forEach(mq => mq.removeEventListener('change', handleChange));
        };
    }, []);

    return størrelse;
}
