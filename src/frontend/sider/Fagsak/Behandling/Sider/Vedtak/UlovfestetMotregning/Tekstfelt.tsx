import React from 'react';

import { useController } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import type { TilbakekrevingsvedtakMotregningSkjemaverdier } from './TilbakekrevingsvedtakMotregning';

interface TilbakekrevingsvedtakMotregningFritekstProps {
    feltnavn: keyof Omit<TilbakekrevingsvedtakMotregningSkjemaverdier, 'varselDato'>;
    tittel: string;
    beskrivelse?: string;
}

export const Tekstfelt = ({
    feltnavn,
    tittel,
    beskrivelse,
}: TilbakekrevingsvedtakMotregningFritekstProps) => {
    const { field, fieldState, formState } = useController({
        name: feltnavn,
        rules: { required: `${tittel} er påkrevd.` },
    });

    return (
        <Textarea
            label={tittel}
            description={beskrivelse}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
        />
    );
};
