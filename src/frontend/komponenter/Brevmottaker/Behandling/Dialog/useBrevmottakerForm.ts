import { useToastContext } from '@context/ToastContext';
import { useBehandling } from '@hooks/useBehandling';
import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOpprettBrevmottaker } from '@hooks/useOpprettBrevmottaker';
import type { Regionkode } from '@komponenter/FlaggCombobox';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
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
    const behandling = useBehandling();
    const { settÅpenBehandling } = useBehandlingContext();
    const { settToast } = useToastContext();

    const { mutateAsync: opprettBrevmottaker } = useOpprettBrevmottaker();

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
        const erNorge = values[BrevmottakerField.LAND] === 'NO';
        try {
            const oppdatertBehandling = await opprettBrevmottaker({
                behandlingId: behandling.behandlingId,
                type: values[BrevmottakerField.BREVMOTTAKERTYPE],
                navn: values[BrevmottakerField.NAVN],
                adresselinje1: values[BrevmottakerField.ADRESSELINJE_1],
                adresselinje2: values[BrevmottakerField.ADRESSELINJE_2] || undefined,
                postnummer: erNorge ? values[BrevmottakerField.POSTNUMMER] : '',
                poststed: erNorge ? values[BrevmottakerField.POSTSTED] : '',
                landkode: values[BrevmottakerField.LAND],
            });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            settToast(ToastTyper.BREVMOTTAKER_LAGRET, { alertType: AlertType.SUCCESS, tekst: 'Mottaker ble lagret' });
            onSubmitSuccess();
        } catch (error: unknown) {
            setError('root', {
                message: error instanceof Error ? error.message : 'Teknisk feil ved lagring av brevmottaker.',
            });
        }
    }

    return { form, onSubmit };
}
