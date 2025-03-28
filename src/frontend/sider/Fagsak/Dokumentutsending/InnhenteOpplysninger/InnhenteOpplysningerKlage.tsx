import React from 'react';

import styled from 'styled-components';

import { Textarea } from '@navikt/ds-react';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';

const StyledTextArea = styled(Textarea)`
    margin: 1rem 0;
`;

const maksLengdeFritekstAvsnitt = 1000;
const InnhenteOpplysningerKlage = () => {
    const { skjema } = useDokumentutsending();

    return (
        <StyledTextArea
            label="Skriv inn fritekst avsnitt"
            value={skjema.felter.fritekstAvsnitt.verdi}
            maxLength={maksLengdeFritekstAvsnitt}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                skjema.felter.fritekstAvsnitt.validerOgSettFelt(event.target.value)
            }
            error={skjema.visFeilmeldinger && skjema.felter.fritekstAvsnitt?.feilmelding}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
            resize={'vertical'}
        />
    );
};

export default InnhenteOpplysningerKlage;
