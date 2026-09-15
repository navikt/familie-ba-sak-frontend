import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { type BarnMedDeltBosted, type BrevModulFormValues, BrevmodulFeltnavn } from '../useBrevModul';
import { useSkjemaErLåst } from '../useSkjemaErLåst';
import { AvtaleDatoInput } from './AvtaleDatoInput';

interface IProps {
    barn: BarnMedDeltBosted;
    index: number;
}

const DeltBostedAvtaler = ({ barn, index }: IProps) => {
    const { control } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const { fields, append, remove } = useFieldArray({
        control,
        name: `${BrevmodulFeltnavn.BARN_MED_DELT_BOSTED}.${index}.avtalerOmDeltBosted`,
    });

    return (
        <HStack marginInline={'space-32 space-0'} gap={'space-16'}>
            {fields.map((field, avtaleIndex) => (
                <HStack key={field.id} gap={'space-16'} align={'end'}>
                    <AvtaleDatoInput
                        name={`${BrevmodulFeltnavn.BARN_MED_DELT_BOSTED}.${index}.avtalerOmDeltBosted.${avtaleIndex}.dato`}
                        avtaleDatoErPåkrevd={barn.merket}
                        minDatoAvgrensning={barn.fødselsdato ? new Date(barn.fødselsdato) : undefined}
                    />
                    {avtaleIndex !== 0 && (
                        <Button
                            type={'button'}
                            variant={'tertiary'}
                            size={'small'}
                            disabled={skjemaErLåst}
                            onClick={() => remove(avtaleIndex)}
                            icon={<TrashIcon />}
                        >
                            Fjern
                        </Button>
                    )}
                </HStack>
            ))}

            {barn.merket && (
                <Box marginBlock={'space-0 space-16'}>
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        size={'small'}
                        disabled={skjemaErLåst}
                        onClick={() => append({ dato: '' })}
                        icon={<PlusCircleIcon />}
                    >
                        Legg til dato for avtale
                    </Button>
                </Box>
            )}
        </HStack>
    );
};

export default DeltBostedAvtaler;
