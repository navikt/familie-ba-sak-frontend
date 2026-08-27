import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, HStack, Textarea } from '@navikt/ds-react';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';

const makslengdeFritekst = 220;

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
            label={`Kulepunkt ${index + 1}`}
            hideLabel={true}
            maxLength={makslengdeFritekst}
            error={fieldState.error?.message}
            autoFocus
        />
    );
}

const maksAntallKulepunkter = 20;

export function Fritekster() {
    const erLesevisning = useErLesevisningFagsak();
    const {
        control,
        watch,
        trigger,
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: DokumentutsendingFeltnavn.FRITEKSTER,
    });

    const dokumenter = watch(DokumentutsendingFeltnavn.DOKUMENTER);
    const antallKulepunkter = fields.length + dokumenter.length;
    const erMaksAntallKulepunkter = antallKulepunkter >= maksAntallKulepunkter;

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
                            size={'small'}
                            aria-label={'Fjern fritekst'}
                            icon={<TrashIcon />}
                            disabled={erLesevisning || isSubmitting}
                        >
                            Fjern
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
                        trigger(DokumentutsendingFeltnavn.DOKUMENTER);
                    }}
                    size={'small'}
                    icon={<PlusCircleIcon />}
                    disabled={erLesevisning || isSubmitting}
                >
                    Legg til fritekst
                </Button>
            )}
        </Box>
    );
}
