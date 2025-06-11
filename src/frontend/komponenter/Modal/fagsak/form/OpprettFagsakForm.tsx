import React from 'react';

import {
    type FieldErrors,
    FormProvider,
    type SubmitHandler,
    type UseFormReturn,
} from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import { FagsakType } from '../../../../typer/fagsak';
import type { ISamhandlerInfo } from '../../../../typer/samhandler';
import { FagsaktypeFelt } from '../felt/FagsaktypeFelt';
import { SkjermetBarnSøkerFelt } from '../felt/SkjermetBarnSøkerFelt';

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
    [OpprettFagsakFeltnavn.FAGSAKTYPE]: FagsakType | '';
    [OpprettFagsakFeltnavn.SAMHANDLER]: ISamhandlerInfo | null;
    [OpprettFagsakFeltnavn.SKJERMET_BARN_SØKER]: string;
}

export enum OpprettFagsakFeltnavn {
    FAGSAKTYPE = 'fagsaktype',
    SAMHANDLER = 'samhandler',
    SKJERMET_BARN_SØKER = 'skjermetBarnSøker',
}

export const OPPRETT_FAGSAK_FORM = 'OPPRETT_FAGSAK_FORM_ID';

interface Props {
    form: UseFormReturn<OpprettFagsakFormValues>;
    onSubmit: SubmitHandler<OpprettFagsakFormValues>;
    readOnly: boolean;
}

export function OpprettFagsakForm({ form, onSubmit, readOnly }: Props) {
    const { handleSubmit, watch } = form;

    const fagsaktype = watch(OpprettFagsakFeltnavn.FAGSAKTYPE);

    return (
        <FormProvider {...form}>
            <form id={OPPRETT_FAGSAK_FORM} onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={'4'}>
                    <FagsaktypeFelt readOnly={readOnly} />
                    {fagsaktype === FagsakType.SKJERMET_BARN && <SkjermetBarnSøkerFelt />}
                </VStack>
            </form>
        </FormProvider>
    );
}
