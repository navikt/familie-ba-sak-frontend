import { useErLesevisning } from '@hooks/useErLesevisning';
import { BodyLong, Box, Heading, HelpText, HStack, Textarea } from '@navikt/ds-react';
import {
    MAKS_LENGDE_TEKST,
    TilbakekrevingFormField,
    type TilbakekrevingFormValues,
} from '@sider/Fagsak/Behandling/Sider/Simulering/form/useTilbakekrevingForm';
import { useController, useFormContext } from 'react-hook-form';

export function BegrunnelseField() {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<TilbakekrevingFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: TilbakekrevingFormField.BEGRUNNELSE,
        control,
        rules: {
            required: 'Du må skrive en begrunnelse for valget om tilbakekreving.',
            maxLength: {
                value: MAKS_LENGDE_TEKST,
                message: `Du har nådd maks antall tegn i begrunnelsen: 1 500. Prøv å forkorte/forenkle teksten.`,
            },
        },
    });

    return (
        <Textarea
            id={name}
            name={name}
            label={
                <HStack gap={'space-16'}>
                    Årsak til feilutbetaling og videre behandling
                    <HelpText title="Hvordan skal feltet fylles ut?" placement="right">
                        <Box maxWidth={'20rem'}>
                            <Heading size="xsmall">Hvordan skal feltet fylles ut?</Heading>
                            <BodyLong size="small">
                                Pass på at teksten besvarer dette:
                                <ul>
                                    <li>Hva er årsaken til feilutbetaling?</li>
                                    <li>Hvordan ble feilutbetalingen oppdaget?</li>
                                    <li>Når ble feilutbetalingen oppdaget?</li>
                                </ul>
                            </BodyLong>
                            <Heading size="xsmall">Teksteksempel ved opprett tilbakekreving</Heading>
                            <BodyLong size="small" spacing={true}>
                                Barn født 01.02.03 flyttet fra bruker 01.01.2019. Bruker har mottatt barnetrygd for
                                barnet etter at barnet ikke lenger bor fast sammen med bruker.
                            </BodyLong>
                            <BodyLong size="small" spacing={true}>
                                Ble oppdaget når den andre forelderen fremsatte søknad om barnetrygd for barnet.
                            </BodyLong>
                            <BodyLong size="small" spacing={true}>
                                Søknaden ble mottatt 11.03.2022. Bruker har ikke meldt fra om dette selv.
                            </BodyLong>
                            <Heading size="xsmall">Teksteksempel ved avvent tilbakekreving</Heading>
                            <BodyLong size="small">
                                Feilutbetaling gjelder kun inneværende måned, og utbetalingen stoppes antakelig.
                            </BodyLong>
                        </Box>
                    </HelpText>
                </HStack>
            }
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error?.message}
            readOnly={erLesevisning || isSubmitting}
            maxLength={MAKS_LENGDE_TEKST}
            description="Hva er årsaken til feilutbetaling? Hvordan og når ble feilutbetalingen oppdaget? Begrunn hvordan feilutbetalingen skal behandles videre."
        />
    );
}
