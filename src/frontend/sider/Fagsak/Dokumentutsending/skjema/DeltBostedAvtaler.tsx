import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import {
    type DokumentutsendingAvtaleDato,
    type DokumentutsendingBarn,
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { erIsoStringGyldig } from '@utils/dato';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { DokumentÅrsak } from '../dokumentÅrsakTyper';
import { AvtaleDatoInput } from './AvtaleDatoInput';

interface Props {
    barn: DokumentutsendingBarn;
    index: number;
}

export function DeltBostedAvtaler({ barn, index }: Props) {
    const erLesevisning = useErLesevisningFagsak();
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();
    const årsak = useWatch({ control, name: DokumentutsendingFeltnavn.ÅRSAK });
    const avtaleDatoErPåkrevd = årsak === DokumentÅrsak.DELT_BOSTED && barn.merket;

    const { fields, append, remove } = useFieldArray({
        control,
        name: `${DokumentutsendingFeltnavn.VALGTE_BARN}.${index}.avtalerOmDeltBosted`,
        rules: {
            validate: (avtaler: unknown) => {
                const avtaledatoer = avtaler as DokumentutsendingAvtaleDato[];
                return !avtaleDatoErPåkrevd || avtaledatoer.some(avtale => erIsoStringGyldig(avtale.dato))
                    ? undefined
                    : 'Du må fylle inn en gyldig dato for avtale';
            },
        },
    });

    return (
        <HStack marginInline={'space-32 space-0'} gap={'space-16'}>
            {fields.map((field, avtaleIndex) => (
                <HStack key={field.id} gap={'space-16'} align={'end'}>
                    <AvtaleDatoInput
                        name={`${DokumentutsendingFeltnavn.VALGTE_BARN}.${index}.avtalerOmDeltBosted.${avtaleIndex}.dato`}
                        avtaleDatoErPåkrevd={avtaleDatoErPåkrevd}
                        minDatoAvgrensning={barn.fødselsdato ? new Date(barn.fødselsdato) : undefined}
                    />
                    {avtaleIndex !== 0 && !erLesevisning && (
                        <Button
                            variant={'tertiary'}
                            size={'small'}
                            type={'button'}
                            onClick={() => remove(avtaleIndex)}
                            icon={<TrashIcon />}
                            disabled={isSubmitting}
                        >
                            Fjern
                        </Button>
                    )}
                </HStack>
            ))}

            {barn.merket && !erLesevisning && (
                <Box marginBlock={'space-0 space-16'}>
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        type={'button'}
                        onClick={() => append({ dato: '' })}
                        icon={<PlusCircleIcon />}
                        disabled={isSubmitting}
                    >
                        Legg til dato for avtale
                    </Button>
                </Box>
            )}
        </HStack>
    );
}
