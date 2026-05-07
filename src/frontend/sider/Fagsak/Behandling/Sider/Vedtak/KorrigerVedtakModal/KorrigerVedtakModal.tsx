import { BegrunnelseFelt } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtakModal/BegrunnelseFelt';
import { VedtaksdatoFelt } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtakModal/VedtaksdatoFelt';
import type { IRestKorrigertVedtak } from '@typer/vedtak';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';

import { ArrowUndoIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Fieldset, Modal } from '@navikt/ds-react';

import { useKorrigerVedtakSkjema } from './useKorrigerVedtakSkjema';

const AngreKnapp = styled(Button)`
    margin: 0.5rem 0;
`; //TODO: fix

interface IProps {
    lukkModal: () => void;
    korrigertVedtak?: IRestKorrigertVedtak;
    behandlingId: number;
    erLesevisning: boolean;
}

export function KorrigerVedtakModal({ lukkModal, korrigertVedtak, behandlingId, erLesevisning }: IProps) {
    const { form, onKorrigerVedtak, onAngreKorrigertVedtak } = useKorrigerVedtakSkjema({
        lukkModal,
        korrigertVedtak,
        behandlingId,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form;

    const visAngreKnapp = korrigertVedtak != null;

    return (
        <Modal open onClose={lukkModal} header={{ heading: 'Korriger vedtak', size: 'medium' }} width={'35rem'} portal>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onKorrigerVedtak)}>
                    <Modal.Body>
                        <BodyLong>
                            Dersom det har blitt gjort feil tidligere vedtak, kan denne teksten legges til i
                            vedtaksbrevet:
                        </BodyLong>
                        <ul>
                            <li>
                                Vi har oppdaget en feil i vedtaket vi gjorde [DATO]. Derfor har vi vurdert saken din på
                                nytt.
                            </li>
                        </ul>
                        <Fieldset
                            legend="Korriger vedtak"
                            hideLegend
                            errorPropagation={false}
                            error={errors.root?.message}
                        >
                            <VedtaksdatoFelt erLesevisning={erLesevisning} />
                            <BegrunnelseFelt erLesevisning={erLesevisning} />
                        </Fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        {!erLesevisning && (
                            <>
                                <Button
                                    type={'submit'}
                                    variant={'primary'}
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    {korrigertVedtak ? 'Oppdater' : 'Legg til'}
                                </Button>
                                <Button onClick={lukkModal} variant={'tertiary'}>
                                    Avbryt
                                </Button>
                                {visAngreKnapp && (
                                    <AngreKnapp
                                        size={'small'}
                                        onClick={handleSubmit(onAngreKorrigertVedtak)}
                                        variant={'tertiary'}
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        icon={<ArrowUndoIcon />}
                                    >
                                        Fjern korrigering
                                    </AngreKnapp>
                                )}
                            </>
                        )}
                        {erLesevisning && <Button onClick={lukkModal}>Lukk</Button>}
                    </Modal.Footer>
                </form>
            </FormProvider>
        </Modal>
    );
}
