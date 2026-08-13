import { useController, useFieldArray, useFormContext } from 'react-hook-form';

import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, HStack, Textarea } from '@navikt/ds-react';

import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

const makslengdeFritekst = 220;

interface Props {
    erMaksAntallKulepunkter: boolean;
}

function FritekstFelt({ index, id }: { index: number; id: string }) {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        name: `${DokumentutsendingFeltnavn.FRITEKSTER}.${index}.tekst`,
        control,
        rules: {
            validate: (tekst: string) =>
                tekst.trim().length > 0
                    ? undefined
                    : 'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.',
        },
    });

    return (
        <Textarea
            {...field}
            id={id}
            className={'fritekst-textarea'}
            label={`Kulepunkt ${index + 1}`}
            hideLabel={true}
            maxLength={makslengdeFritekst}
            error={fieldState.error?.message}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
        />
    );
}

export function KanSøkeFritekst({ erMaksAntallKulepunkter }: Props) {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: DokumentutsendingFeltnavn.FRITEKSTER,
    });

    return (
        <Box>
            <Fieldset legend="Fritekst til kulepunkt i brev">
                {fields.map((field, index) => (
                    <HStack key={field.id} align={'start'} gap={'space-8'}>
                        <Box width={'80%'}>
                            <FritekstFelt index={index} id={`${field.id}`} />
                        </Box>
                        <Button
                            variant={'tertiary'}
                            type={'button'}
                            onClick={() => remove(index)}
                            id={`fjern_fritekst-${field.id}`}
                            size={'small'}
                            aria-label={'Fjern fritekst'}
                            icon={<TrashIcon />}
                        >
                            {'Fjern'}
                        </Button>
                    </HStack>
                ))}
            </Fieldset>
            {!erMaksAntallKulepunkter && (
                <Button
                    variant={'tertiary'}
                    type={'button'}
                    onClick={() => {
                        append({ tekst: '' });
                    }}
                    id={`legg-til-fritekst`}
                    size={'small'}
                    icon={<PlusCircleIcon />}
                >
                    {'Legg til fritekst'}
                </Button>
            )}
        </Box>
    );
}
