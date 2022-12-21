import React from 'react';

import styled from 'styled-components';

import { type DatepickerLimitations, FamilieDatovelger } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

import type { FamilieIsoDate } from '../../../../../utils/kalender';

const FixedDatoVelger = styled(FamilieDatovelger)`
    .nav-datovelger__kalenderPortal__content {
        position: fixed;
    }
    .nav-datovelger__kalenderknapp {
        z-index: 0;
    }
    margin-top: 2rem;
`;

interface IProps {
    skjemafelt: Felt<FamilieIsoDate>;
    visFeilmeldinger: boolean;
    etikett: string;
    begrensninger: DatepickerLimitations;
}

export const Datofelt: React.FC<IProps> = ({
    skjemafelt,
    visFeilmeldinger,
    etikett,
    begrensninger,
}) => (
    <FixedDatoVelger
        {...skjemafelt.hentNavInputProps(visFeilmeldinger)}
        value={skjemafelt.verdi}
        valgtDato={skjemafelt.verdi}
        label={etikett}
        limitations={begrensninger}
        onChange={input => skjemafelt.hentNavInputProps(visFeilmeldinger).onChange(input ?? '')}
        feil={visFeilmeldinger && skjemafelt.feilmelding}
    />
);
