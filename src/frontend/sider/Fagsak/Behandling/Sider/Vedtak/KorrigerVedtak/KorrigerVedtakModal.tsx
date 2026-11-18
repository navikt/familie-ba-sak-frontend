import { useAngreKorrigertVedtak } from '@hooks/useAngreKorrigertVedtak';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Fieldset, Dialog, VStack } from '@navikt/ds-react';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/BehandlingContext';
import { BegrunnelseFelt } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/BegrunnelseFelt';
import { VedtaksdatoFelt } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/VedtaksdatoFelt';
import { FormProvider } from 'react-hook-form';

import { KORRIGER_VEDTAK_FORM_ID, useKorrigerVedtakSkjema } from './useKorrigerVedtakSkjema';

interface Props {
    lukkModal: () => void;
}

export function KorrigerVedtakModal({ lukkModal }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const erLesevisning = useErLesevisning();

    const {
        mutate: angreKorrigertVedtak,
        isPending: angreKorrigertVedtakIsPending,
        error: angreKorrigertVedtakError,
    } = useAngreKorrigertVedtak({
        onSuccess: behandling => {
            settÅpenBehandling(behandling);
            lukkModal();
        },
    });

    const { form, onSubmit } = useKorrigerVedtakSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const korrigertVedtak = behandling.korrigertVedtak;
    const visAngreKnapp = korrigertVedtak != null;

    return (
        <Dialog open={true} onOpenChange={lukkModal}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Korriger vedtak</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                    <BodyLong>
                        Dersom det har blitt gjort feil tidligere vedtak, kan denne teksten legges til i vedtaksbrevet:
                    </BodyLong>
                    <ul>
                        <li>
                            Vi har oppdaget en feil i vedtaket vi gjorde [DATO]. Derfor har vi vurdert saken din på
                            nytt.
                        </li>
                    </ul>
                    <Fieldset
                        legend={'Korriger vedtak'}
                        hideLegend={true}
                        errorPropagation={false}
                        error={errors.root?.message ?? angreKorrigertVedtakError?.message}
                    >
                        <FormProvider {...form}>
                            <form id={KORRIGER_VEDTAK_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                                <VStack gap={'space-16'}>
                                    <VedtaksdatoFelt erLesevisning={erLesevisning || angreKorrigertVedtakIsPending} />
                                    <BegrunnelseFelt erLesevisning={erLesevisning || angreKorrigertVedtakIsPending} />
                                </VStack>
                            </form>
                        </FormProvider>
                    </Fieldset>
                </Dialog.Body>
                <Dialog.Footer>
                    {!erLesevisning && (
                        <>
                            <Button
                                form={KORRIGER_VEDTAK_FORM_ID}
                                type={'submit'}
                                variant={'primary'}
                                loading={isSubmitting}
                                disabled={angreKorrigertVedtakIsPending}
                            >
                                {korrigertVedtak ? 'Oppdater' : 'Legg til'}
                            </Button>
                            <Button onClick={lukkModal} variant={'tertiary'}>
                                Avbryt
                            </Button>
                            {visAngreKnapp && (
                                <Button
                                    size={'small'}
                                    onClick={() => angreKorrigertVedtak(behandling.behandlingId)}
                                    variant={'tertiary'}
                                    loading={angreKorrigertVedtakIsPending}
                                    icon={<ArrowUndoIcon />}
                                >
                                    Fjern korrigering
                                </Button>
                            )}
                        </>
                    )}
                    {erLesevisning && (
                        <Button variant={'primary'} onClick={lukkModal}>
                            Lukk
                        </Button>
                    )}
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
