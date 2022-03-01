import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';

interface ÅrProps {
    år: number | undefined;
    settÅr: (år: number | undefined) => void;
    antallÅrFrem: number;
    antallÅrTilbake: number;
    lesevisning?: boolean;
    disabled?: boolean;
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
    disabled = false,
    feil = false,
}) => {
    const årOptions = lagÅrOptions(år, antallÅrFrem, antallÅrTilbake);
    return (
        <FamilieSelect
            lesevisningVerdi={år ? år.toString() : ''}
            value={år ?? ''}
            bredde={'xs'}
            onChange={event => {
                event.persist();
                settÅr(event.target.value !== '' ? parseInt(event.target.value) : undefined);
            }}
            erLesevisning={lesevisning}
            disabled={disabled}
            feil={feil}
        >
            <option value="">År</option>
            {årOptions}
        </FamilieSelect>
    );
};

export default Årvelger;
