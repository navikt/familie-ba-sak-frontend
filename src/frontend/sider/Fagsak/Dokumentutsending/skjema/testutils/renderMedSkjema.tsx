import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';

import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IMinimalFagsak } from '@typer/fagsak';
import type { FeatureToggles } from '@typer/featureToggles';
import type { IPersonInfo } from '@typer/person';
import type { Saksbehandler } from '@typer/saksbehandler';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';

import { Button } from '@navikt/ds-react';

import { BrukerProvider } from '../../../BrukerContext';
import { FagsakProvider } from '../../../FagsakContext';
import type { DokumentutsendingFormValues } from '../useDokumentutsendingSkjema';

const standardDefaultValues: DokumentutsendingFormValues = {
    årsak: '',
    målform: undefined,
    fritekster: [],
    fritekstAvsnitt: '',
    dokumenter: [],
    valgteBarn: [],
    avtalerOmDeltBostedPerBarn: {},
};

interface RenderMedSkjemaOptions {
    defaultValues?: Partial<DokumentutsendingFormValues>;
    bruker?: IPersonInfo;
    fagsak?: IMinimalFagsak;
    featureToggles?: FeatureToggles;
    saksbehandler?: Saksbehandler;
}

interface FormRef {
    current: UseFormReturn<DokumentutsendingFormValues> | undefined;
}

interface WrapperProps extends PropsWithChildren {
    formRef: FormRef;
    defaultValues: DokumentutsendingFormValues;
    bruker: IPersonInfo;
    fagsak: IMinimalFagsak;
    featureToggles?: FeatureToggles;
    saksbehandler?: Saksbehandler;
}

function Wrapper({ formRef, defaultValues, bruker, fagsak, featureToggles, saksbehandler, children }: WrapperProps) {
    const form = useForm<DokumentutsendingFormValues>({ defaultValues });

    useEffect(() => {
        formRef.current = form;
    });

    return (
        <TestProviders featureToggles={featureToggles} saksbehandler={saksbehandler}>
            <FagsakProvider fagsak={fagsak}>
                <BrukerProvider bruker={bruker}>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(() => {})}>
                            {children}
                            <Button type={'submit'}>Send inn</Button>
                        </form>
                    </FormProvider>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

export function renderMedSkjema(ui: ReactNode, options: RenderMedSkjemaOptions = {}) {
    const formRef: FormRef = { current: undefined };
    const defaultValues: DokumentutsendingFormValues = { ...standardDefaultValues, ...options.defaultValues };
    const bruker = options.bruker ?? lagPerson();
    const fagsak = options.fagsak ?? lagFagsak();

    const rendered = render(ui, {
        wrapper: props => (
            <Wrapper
                {...props}
                formRef={formRef}
                defaultValues={defaultValues}
                bruker={bruker}
                fagsak={fagsak}
                featureToggles={options.featureToggles}
                saksbehandler={options.saksbehandler}
            />
        ),
    });

    return {
        ...rendered,
        sendInnSkjema: () => rendered.user.click(rendered.screen.getByRole('button', { name: 'Send inn' })),
        hentForm: () => formRef.current as UseFormReturn<DokumentutsendingFormValues>,
    };
}
