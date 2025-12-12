import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useConfirmBrowserRefresh } from '../../../../../../../hooks/useConfirmBrowserRefresh';
import { useOppdaterFeilutbetaltValuta } from '../../../../../../../hooks/useOppdaterFeilutbetaltValuta';
import { useOpprettFeilutbetaltValuta } from '../../../../../../../hooks/useOpprettFeilutbetaltValuta';
import type { IRestFeilutbetaltValuta } from '../../../../../../../typer/eøs-feilutbetalt-valuta';
import { dateTilIsoDatoString, type IsoDatoString } from '../../../../../../../utils/dato';
import { useBehandlingContext } from '../../../../context/BehandlingContext';

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
    const { behandling, settÅpenBehandling } = useBehandlingContext();

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

    const { mutateAsync: opprettFeilutbetaltValuta } = useOpprettFeilutbetaltValuta();
    const { mutateAsync: oppdaterFeilutbetaltValuta } = useOppdaterFeilutbetaltValuta();

    useConfirmBrowserRefresh({ enabled: isDirty });

    async function onSubmit(values: TransformedFormValues) {
        if (type === Type.OPPRETT) {
            return opprettFeilutbetaltValuta({
                behandlingId: behandling.behandlingId,
                payload: {
                    fom: values[Fields.FOM_DATO],
                    tom: values[Fields.TOM_DATO],
                    feilutbetaltBeløp: Number(values[Fields.BELOEP]),
                },
            })
                .then(behandling => {
                    settÅpenBehandling(byggSuksessRessurs(behandling));
                    skjulForm();
                })
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
                behandlingId: behandling.behandlingId,
                feilutbetaltValutaId: feilutbetaltValuta.id,
                payload: {
                    fom: values[Fields.FOM_DATO],
                    tom: values[Fields.TOM_DATO],
                    feilutbetaltBeløp: Number(values[Fields.BELOEP]),
                },
            })
                .then(behandling => {
                    settÅpenBehandling(byggSuksessRessurs(behandling));
                    skjulForm();
                })
                .catch(e => {
                    const message = e instanceof Error ? e.message : 'En ukjent feil oppstod.';
                    setError('root', { message });
                });
        }
    }

    return { form, onSubmit };
}
