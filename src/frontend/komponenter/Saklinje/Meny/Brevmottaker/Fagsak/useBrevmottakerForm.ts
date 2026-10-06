import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import type { Regionkode } from '@komponenter/FlaggCombobox';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { Brevmottakertype } from '@typer/brevmottaker';
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

interface BrevmottakerTransformedFormValues {
    [BrevmottakerField.BREVMOTTAKERTYPE]: Brevmottakertype;
    [BrevmottakerField.NAVN]: string;
    [BrevmottakerField.LAND]: Regionkode;
    [BrevmottakerField.ADRESSELINJE_1]: string;
    [BrevmottakerField.ADRESSELINJE_2]: string;
    [BrevmottakerField.POSTNUMMER]: string;
    [BrevmottakerField.POSTSTED]: string;
}

interface Props {
    onSubmitSuccess: () => void;
}

export function useBrevmottakerForm({ onSubmitSuccess }: Props) {
    const { leggTilBrevmottaker } = useBrevmottakereFagsakContext();

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
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    function onSubmit(values: BrevmottakerTransformedFormValues) {
        const nyBrevmottaker = {
            uuid: crypto.randomUUID(),
            type: values[BrevmottakerField.BREVMOTTAKERTYPE],
            adresselinje1: values[BrevmottakerField.ADRESSELINJE_1],
            adresselinje2: values[BrevmottakerField.ADRESSELINJE_2],
            landkode: values[BrevmottakerField.LAND],
            navn: values[BrevmottakerField.NAVN],
            postnummer: values[BrevmottakerField.POSTNUMMER],
            poststed: values[BrevmottakerField.POSTSTED],
        };
        leggTilBrevmottaker(nyBrevmottaker);
        onSubmitSuccess();
    }

    return { form, onSubmit };
}
