import { Button } from '@navikt/ds-react';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import type { DokumentutsendingFormValues } from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IMinimalFagsak } from '@typer/fagsak';
import type { FeatureToggles } from '@typer/featureToggles';
import type { IPersonInfo } from '@typer/person';
import type { Saksbehandler } from '@typer/saksbehandler';
import type { PropsWithChildren, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const standardDefaultValues: DokumentutsendingFormValues = {
    årsak: '',
    målform: null,
    fritekster: [],
    fritekstAvsnitt: '',
    dokumenter: [],
    valgteBarn: [],
};

interface RenderMedSkjemaOptions {
    defaultValues?: Partial<DokumentutsendingFormValues>;
    bruker?: IPersonInfo;
    fagsak?: IMinimalFagsak;
    featureToggles?: FeatureToggles;
    saksbehandler?: Saksbehandler;
}

interface WrapperProps extends PropsWithChildren {
    defaultValues: DokumentutsendingFormValues;
    bruker: IPersonInfo;
    fagsak: IMinimalFagsak;
    featureToggles?: FeatureToggles;
    saksbehandler?: Saksbehandler;
}

function Wrapper({ defaultValues, bruker, fagsak, featureToggles, saksbehandler, children }: WrapperProps) {
    const form = useForm<DokumentutsendingFormValues>({ defaultValues });

    return (
        <TestProviders featureToggles={featureToggles} saksbehandler={saksbehandler}>
            <FagsakProvider fagsak={fagsak}>
                <BrukerProvider bruker={bruker}>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(() => {})}>
                            {children}
                            <Button type={'submit'}>Send inn</Button>
                            <Button type={'button'} onClick={() => form.trigger()}>
                                Forhåndsvis
                            </Button>
                        </form>
                    </FormProvider>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

export function renderMedSkjema(ui: ReactNode, options: RenderMedSkjemaOptions = {}) {
    const defaultValues: DokumentutsendingFormValues = { ...standardDefaultValues, ...options.defaultValues };
    const bruker = options.bruker ?? lagPerson();
    const fagsak = options.fagsak ?? lagFagsak();

    const rendered = render(ui, {
        wrapper: props => (
            <Wrapper
                {...props}
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
        klikkForhåndsvis: () => rendered.user.click(rendered.screen.getByRole('button', { name: 'Forhåndsvis' })),
    };
}
