import React from 'react';

import { Textarea } from '@navikt/ds-react';

import { useDokumentutsendingContext } from '../../../../context/DokumentutsendingContext';

const maksLengdeFritekstAvsnitt = 1000;
const FritekstAvsnitt = () => {
    const { skjema } = useDokumentutsendingContext();

    return (
        <Textarea
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

export default FritekstAvsnitt;
