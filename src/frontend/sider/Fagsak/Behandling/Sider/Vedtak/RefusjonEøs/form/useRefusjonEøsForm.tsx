import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useConfirmBrowserRefresh } from '../../../../../../../hooks/useConfirmBrowserRefresh';
import { useOppdaterRefusjonEøs } from '../../../../../../../hooks/useOppdaterRefusjonEøs';
import { useOpprettRefusjonEøs } from '../../../../../../../hooks/useOpprettRefusjonEøs';
import type { IRestRefusjonEøs } from '../../../../../../../typer/refusjon-eøs';
import { dateTilIsoDatoString, type IsoDatoString } from '../../../../../../../utils/dato';
import { useBehandlingContext } from '../../../../context/BehandlingContext';

export enum Fields {
    LANDKODE = 'LANDKODE',
    REFUSJON_AVKLART = 'REFUSJON_AVKLART',
    FOM_DATO = 'FOM_DATO',
    TOM_DATO = 'TOM_DATO',
    BELOEP = 'BELOEP',
}

export interface FormValues {
    [Fields.LANDKODE]: string;
    [Fields.REFUSJON_AVKLART]: boolean | null;
    [Fields.FOM_DATO]: IsoDatoString | null;
    [Fields.TOM_DATO]: IsoDatoString | null;
    [Fields.BELOEP]: string;
}

interface TransformedFormValues {
    [Fields.LANDKODE]: string;
    [Fields.REFUSJON_AVKLART]: boolean;
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
    refusjonEøs?: IRestRefusjonEøs;
    skjulForm: () => void;
}

export function useRefusjonEøsForm({ type, refusjonEøs, skjulForm }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const form = useForm<FormValues, never, TransformedFormValues>({
        values: {
            [Fields.LANDKODE]: refusjonEøs?.land ?? '',
            [Fields.REFUSJON_AVKLART]: refusjonEøs?.refusjonAvklart ?? null,
            [Fields.FOM_DATO]: refusjonEøs?.fom ? dateTilIsoDatoString(new Date(refusjonEøs.fom)) : null,
            [Fields.TOM_DATO]: refusjonEøs?.tom ? dateTilIsoDatoString(new Date(refusjonEøs.tom)) : null,
            [Fields.BELOEP]: `${refusjonEøs?.refusjonsbeløp ?? ''}`,
        },
    });

    const {
        setError,
        formState: { isDirty },
    } = form;

    const { mutateAsync: opprettRefusjonEøs } = useOpprettRefusjonEøs();
    const { mutateAsync: oppdaterRefusjonEøs } = useOppdaterRefusjonEøs();

    useConfirmBrowserRefresh({ enabled: isDirty });

    async function onSubmit(values: TransformedFormValues) {
        if (type === Type.OPPRETT) {
            return opprettRefusjonEøs({
                behandlingId: behandling.behandlingId,
                payload: {
                    fom: values[Fields.FOM_DATO],
                    tom: values[Fields.TOM_DATO],
                    refusjonsbeløp: Number(values[Fields.BELOEP]),
                    land: values[Fields.LANDKODE],
                    refusjonAvklart: values[Fields.REFUSJON_AVKLART],
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
            if (!refusjonEøs) {
                setError('root', { message: 'Klarte ikke oppdatere refusjon EØS.' });
                return;
            }
            return oppdaterRefusjonEøs({
                behandlingId: behandling.behandlingId,
                refusjonEøsId: refusjonEøs.id,
                payload: {
                    fom: values[Fields.FOM_DATO],
                    tom: values[Fields.TOM_DATO],
                    refusjonsbeløp: Number(values[Fields.BELOEP]),
                    land: values[Fields.LANDKODE],
                    refusjonAvklart: values[Fields.REFUSJON_AVKLART],
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
