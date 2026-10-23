import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import type { Regionkode } from '@komponenter/FlaggCombobox';
import type { Brevmottaker, Brevmottakertype } from '@typer/brevmottaker';
import { useForm } from 'react-hook-form';

export enum BrevmottakerField {
    BREVMOTTAKERTYPE = 'BREVMOTTAKERTYPE',
    NAVN = 'NAVN',
    LAND = 'LAND',
    ADRESSELINJE_1 = 'ADRESSELINJE_1',
    ADRESSELINJE_2 = 'ADRESSELINJE_2',
    POSTNUMMER = 'POSTNUMMER',
    POSTSTED = 'POSTSTED',
}

export interface BrevmottakerFormValues {
    [BrevmottakerField.BREVMOTTAKERTYPE]: Brevmottakertype | '';
    [BrevmottakerField.NAVN]: string;
    [BrevmottakerField.LAND]: Regionkode | null;
    [BrevmottakerField.ADRESSELINJE_1]: string;
    [BrevmottakerField.ADRESSELINJE_2]: string;
    [BrevmottakerField.POSTNUMMER]: string;
    [BrevmottakerField.POSTSTED]: string;
}

export interface BrevmottakerTransformedFormValues {
    [BrevmottakerField.BREVMOTTAKERTYPE]: Brevmottakertype;
    [BrevmottakerField.NAVN]: string;
    [BrevmottakerField.LAND]: Regionkode;
    [BrevmottakerField.ADRESSELINJE_1]: string;
    [BrevmottakerField.ADRESSELINJE_2]: string;
    [BrevmottakerField.POSTNUMMER]: string;
    [BrevmottakerField.POSTSTED]: string;
}

interface Props {
    lagreBrevmottaker: (brevmottaker: Brevmottaker) => Promise<void> | void;
    onSubmitSuccess: () => void;
}

export function useBrevmottakerForm({ lagreBrevmottaker, onSubmitSuccess }: Props) {
    const form = useForm<BrevmottakerFormValues, unknown, BrevmottakerTransformedFormValues>({
        defaultValues: {
            [BrevmottakerField.BREVMOTTAKERTYPE]: '',
            [BrevmottakerField.NAVN]: '',
            [BrevmottakerField.LAND]: null,
            [BrevmottakerField.ADRESSELINJE_1]: '',
            [BrevmottakerField.ADRESSELINJE_2]: '',
            [BrevmottakerField.POSTNUMMER]: '',
            [BrevmottakerField.POSTSTED]: '',
        },
    });

    const {
        control,
        formState: { isDirty },
        reset,
        setError,
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    async function onSubmit(values: BrevmottakerTransformedFormValues) {
        try {
            const erNorge = values[BrevmottakerField.LAND] === 'NO';
            await lagreBrevmottaker({
                type: values[BrevmottakerField.BREVMOTTAKERTYPE],
                navn: values[BrevmottakerField.NAVN],
                adresselinje1: values[BrevmottakerField.ADRESSELINJE_1],
                adresselinje2: values[BrevmottakerField.ADRESSELINJE_2] || undefined,
                postnummer: erNorge ? values[BrevmottakerField.POSTNUMMER] : '',
                poststed: erNorge ? values[BrevmottakerField.POSTSTED] : '',
                landkode: values[BrevmottakerField.LAND],
            });
            onSubmitSuccess();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Teknisk feil ved lagring av brevmottaker.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
