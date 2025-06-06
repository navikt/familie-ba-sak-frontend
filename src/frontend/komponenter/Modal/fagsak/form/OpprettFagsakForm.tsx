import React from 'react';

import {
    type FieldErrors,
    FormProvider,
    type SubmitHandler,
    type UseFormReturn,
} from 'react-hook-form';

import type { FagsakType } from '../../../../typer/fagsak';
import type { ISamhandlerInfo } from '../../../../typer/samhandler';
import { FagsaktypeFelt } from '../felt/FagsaktypeFelt';

export const OpprettFagsakServerErrors: Record<
    'onSubmitError',
    {
        id: `root.${string}`;
        lookup: (errors: FieldErrors<OpprettFagsakFormValues>) => string | undefined;
    }
> = {
    onSubmitError: {
        id: 'root.onSubmitError',
        lookup: errors => errors?.root?.onSubmitError?.message,
    },
};

export interface OpprettFagsakFormValues {
    [OpprettFagsakFeltnavn.FAGSAKTYPE]: FagsakType | null;
    [OpprettFagsakFeltnavn.SAMHANDLER]: ISamhandlerInfo | null;
}

export enum OpprettFagsakFeltnavn {
    FAGSAKTYPE = 'fagsaktype',
    SAMHANDLER = 'samhandler',
}

export const OPPRETT_FAGSAK_FORM = 'OPPRETT_FAGSAK_FORM_ID';

interface Props {
    form: UseFormReturn<OpprettFagsakFormValues>;
    onSubmit: SubmitHandler<OpprettFagsakFormValues>;
    readOnly: boolean;
}

export function OpprettFagsakForm({ form, onSubmit, readOnly }: Props) {
    const { handleSubmit } = form;

    return (
        <FormProvider {...form}>
            <form id={OPPRETT_FAGSAK_FORM} onSubmit={handleSubmit(onSubmit)}>
                <FagsaktypeFelt readOnly={readOnly} />
            </form>
        </FormProvider>
    );
}
