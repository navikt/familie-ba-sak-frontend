import { queryKeys } from '@hooks/keys/queryKeys';
import { useAngreKorrigertVedtak } from '@hooks/useAngreKorrigertVedtak';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Fieldset, Modal, VStack } from '@navikt/ds-react';
import { BegrunnelseFelt } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/BegrunnelseFelt';
import { useKorrigertVedtakContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigertVedtakContext';
import {
    KORRIGER_VEDTAK_FORM_ID,
    useKorrigerVedtakSkjema,
} from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/useKorrigerVedtakSkjema';
import { VedtaksdatoFelt } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/VedtaksdatoFelt';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider } from 'react-hook-form';

interface Props {
    lukkModal: () => void;
}

export function KorrigerVedtakModal({ lukkModal }: Props) {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();
    const erLesevisning = useErLesevisning();
    const { korrigertVedtak } = useKorrigertVedtakContext();

    const {
        mutate: angreKorrigertVedtak,
        isPending: angreKorrigertVedtakIsPending,
        error: angreKorrigertVedtakError,
    } = useAngreKorrigertVedtak({
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.korrigertVedtak(behandlingId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
            lukkModal();
        },
    });

    const { form, onSubmit } = useKorrigerVedtakSkjema({ lukkModal });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const visAngreKnapp = korrigertVedtak != null;

    return (
        <Modal open={true} onClose={lukkModal} header={{ heading: 'Korriger vedtak' }} width={'35rem'} portal={true}>
            <Modal.Body>
                <BodyLong>
                    Dersom det har blitt gjort feil tidligere vedtak, kan denne teksten legges til i vedtaksbrevet:
                </BodyLong>
                <ul>
                    <li>
                        Vi har oppdaget en feil i vedtaket vi gjorde [DATO]. Derfor har vi vurdert saken din på nytt.
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
            </Modal.Body>
            <Modal.Footer>
                {!erLesevisning && (
                    <>
                        <Button
                            form={KORRIGER_VEDTAK_FORM_ID}
                            type={'submit'}
                            variant={'primary'}
                            loading={isSubmitting}
                            disabled={isSubmitting || angreKorrigertVedtakIsPending}
                        >
                            {korrigertVedtak ? 'Oppdater' : 'Legg til'}
                        </Button>
                        <Button onClick={lukkModal} variant={'tertiary'}>
                            Avbryt
                        </Button>
                        {visAngreKnapp && (
                            <Button
                                size={'small'}
                                onClick={() => angreKorrigertVedtak(behandlingId)}
                                variant={'tertiary'}
                                loading={angreKorrigertVedtakIsPending}
                                disabled={isSubmitting || angreKorrigertVedtakIsPending}
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
            </Modal.Footer>
        </Modal>
    );
}
