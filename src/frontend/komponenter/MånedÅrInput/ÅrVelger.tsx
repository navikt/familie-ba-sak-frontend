import React from 'react';

import { Select } from '@navikt/ds-react';

interface ÅrProps {
    år: number | undefined;
    settÅr: (år: number | undefined) => void;
    antallÅrFrem: number;
    antallÅrTilbake: number;
    lesevisning?: boolean;
    feil?: boolean;
}

const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start }, (_, k) => k + start);

const lagÅrOptions = (år: number | undefined, antallÅrFrem: number, antallÅrTilbake: number) => {
    const gjeldendeÅr = new Date().getFullYear();
    const start = år ? Math.min(år, gjeldendeÅr - antallÅrTilbake) : gjeldendeÅr - antallÅrTilbake;
    const slutt = år ? Math.max(år, gjeldendeÅr + antallÅrFrem) : gjeldendeÅr + antallÅrFrem;
    return range(start, slutt + 1).map(år => {
        return (
            <option value={år} key={år}>
                {år}
            </option>
        );
    });
};

const Årvelger: React.FC<ÅrProps> = ({
    år,
    settÅr,
    antallÅrFrem,
    antallÅrTilbake,
    lesevisning = false,
    feil = false,
}) => {
    const årOptions = lagÅrOptions(år, antallÅrFrem, antallÅrTilbake);
    return (
        <Select
            value={år ?? ''}
            onChange={event => {
                event.persist();
                settÅr(event.target.value !== '' ? parseInt(event.target.value) : undefined);
            }}
            readOnly={lesevisning}
            error={feil}
            label={'År'}
            hideLabel
            style={{ marginTop: '2rem' }}
        >
            <option value="">År</option>
            {årOptions}
        </Select>
    );
};

export default Årvelger;
