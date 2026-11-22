import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOppdaterFeilutbetaltValuta } from '@hooks/useOppdaterFeilutbetaltValuta';
import { useOpprettFeilutbetaltValuta } from '@hooks/useOpprettFeilutbetaltValuta';
import { useQueryClient } from '@tanstack/react-query';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import { dateTilIsoDatoString, type IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

export enum Fields {
    FOM_DATO = 'FOM_DATO',
    TOM_DATO = 'TOM_DATO',
    BELOEP = 'BELOEP',
}

export interface FormValues {
    [Fields.FOM_DATO]: IsoDatoString | null;
    [Fields.TOM_DATO]: IsoDatoString | null;
    [Fields.BELOEP]: string;
}

interface TransformedFormValues {
    [Fields.FOM_DATO]: IsoDatoString;
    [Fields.TOM_DATO]: IsoDatoString;
    [Fields.BELOEP]: string;
}

export enum Type {
    OPPRETT = 'OPPRETT',
    OPPDATER = 'OPPDATER',
}

interface Props {
    type: Type;
    feilutbetaltValuta?: IRestFeilutbetaltValuta;
    skjulForm: () => void;
}

export function useFeilutbetaltValutaForm({ type, feilutbetaltValuta, skjulForm }: Props) {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();

    const form = useForm<FormValues, never, TransformedFormValues>({
        values: {
            [Fields.FOM_DATO]: feilutbetaltValuta?.fom ? dateTilIsoDatoString(new Date(feilutbetaltValuta.fom)) : null,
            [Fields.TOM_DATO]: feilutbetaltValuta?.tom ? dateTilIsoDatoString(new Date(feilutbetaltValuta.tom)) : null,
            [Fields.BELOEP]: `${feilutbetaltValuta?.feilutbetaltBeløp ?? ''}`,
        },
    });

    const {
        setError,
        formState: { isDirty },
    } = form;

    async function onSuccess() {
        await queryClient.invalidateQueries({ queryKey: queryKeys.feilutbetaltValuta(behandlingId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
    }

    const { mutateAsync: opprettFeilutbetaltValuta } = useOpprettFeilutbetaltValuta({ onSuccess });
    const { mutateAsync: oppdaterFeilutbetaltValuta } = useOppdaterFeilutbetaltValuta({ onSuccess });

    useConfirmBrowserRefresh({ enabled: isDirty });

    async function onSubmit(values: TransformedFormValues) {
        if (type === Type.OPPRETT) {
            return opprettFeilutbetaltValuta({
                behandlingId,
                payload: {
                    fom: values[Fields.FOM_DATO],
                    tom: values[Fields.TOM_DATO],
                    feilutbetaltBeløp: Number(values[Fields.BELOEP]),
                },
            })
                .then(() => skjulForm())
                .catch(e => {
                    const message = e instanceof Error ? e.message : 'En ukjent feil oppstod.';
                    setError('root', { message });
                });
        } else {
            if (!feilutbetaltValuta) {
                setError('root', { message: 'Klarte ikke oppdatere feilutbetalt valuta.' });
                return;
            }
            return oppdaterFeilutbetaltValuta({
                behandlingId,
                feilutbetaltValutaId: feilutbetaltValuta.id,
                payload: {
                    fom: values[Fields.FOM_DATO],
                    tom: values[Fields.TOM_DATO],
                    feilutbetaltBeløp: Number(values[Fields.BELOEP]),
                },
            })
                .then(() => skjulForm())
                .catch(e => {
                    const message = e instanceof Error ? e.message : 'En ukjent feil oppstod.';
                    setError('root', { message });
                });
        }
    }

    return { form, onSubmit };
}
