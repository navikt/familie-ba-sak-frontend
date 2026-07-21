import { useEffect } from 'react';

import type { IBarnMedOpplysninger } from '@typer/søknad';
import { erIsoStringGyldig } from '@utils/dato';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';

import { AvtaleDatoInput } from './AvtaleDatoInput';
import type { DokumentutsendingAvtaleDato, DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

interface Props {
    barn: IBarnMedOpplysninger;
}

export function DeltBostedAvtaler({ barn }: Props) {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: `${DokumentutsendingFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN}.${barn.ident}`,
        rules: {
            validate: (avtaler: unknown) => {
                const avtaledatoer = avtaler as DokumentutsendingAvtaleDato[];
                return !barn.merket || avtaledatoer.some(avtale => erIsoStringGyldig(avtale.dato))
                    ? undefined
                    : 'Du må fylle inn en gyldig dato for avtale';
            },
        },
    });

    // Avtaledatoer for et barn må kun oppdateres via feltarrayets egne metoder (replace/append/remove).
    // React Hook Form synkroniserer ikke feltarrayets interne tilstand dersom man i stedet bruker
    // setValue på arrayet (eller et foreldreobjekt som inneholder det) fra en annen komponent.
    useEffect(() => {
        if (barn.merket && fields.length === 0) {
            replace([{ dato: '' }]);
        } else if (!barn.merket && fields.length > 0) {
            replace([]);
        }
    }, [barn.merket, fields.length, replace]);

    return (
        <HStack marginInline={'space-32 space-0'} gap={'space-16'}>
            {fields.map((field, index) => (
                <HStack key={field.id} gap={'space-16'} align={'end'}>
                    <AvtaleDatoInput
                        name={`${DokumentutsendingFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN}.${barn.ident}.${index}.dato`}
                        merket={barn.merket}
                        minDatoAvgrensning={barn.fødselsdato ? new Date(barn.fødselsdato) : undefined}
                    />
                    {index !== 0 && (
                        <Button
                            variant={'tertiary'}
                            id={`fjern_avtale__${barn.ident}`}
                            size={'small'}
                            type={'button'}
                            onClick={() => remove(index)}
                            icon={<TrashIcon />}
                        >
                            {'Fjern'}
                        </Button>
                    )}
                </HStack>
            ))}

            {barn.merket && (
                <Box marginBlock={'space-0 space-16'}>
                    <Button
                        variant={'tertiary'}
                        id={`legg_til_avtale__${barn.ident}`}
                        size={'small'}
                        type={'button'}
                        onClick={() => append({ dato: '' })}
                        icon={<PlusCircleIcon />}
                    >
                        {'Legg til dato for avtale'}
                    </Button>
                </Box>
            )}
        </HStack>
    );
}
