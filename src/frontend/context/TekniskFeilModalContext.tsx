import { createContext, type PropsWithChildren, useCallback, useContext, useState } from 'react';

import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, ErrorMessage, HStack, Modal, VStack } from '@navikt/ds-react';

function finnFeilmeldingstekst(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
        return error.message;
    }
    return 'En ukjent feil oppstod.';
}

export interface TekniskFeil {
    readonly id: string;
    readonly tekst: string;
}

interface Context {
    visTekniskFeilModal: (error: unknown) => void;
}

const TekniskFeilModalContext = createContext<Context | undefined>(undefined);

interface Props extends PropsWithChildren {
    initielleTekniskeFeil?: TekniskFeil[];
}

export function TekniskFeilModalProvider({ initielleTekniskeFeil = [], children }: Props) {
    const [tekniskeFeil, settTekniskeFeil] = useState<TekniskFeil[]>(initielleTekniskeFeil);

    const visTekniskFeilModal = useCallback((error: unknown) => {
        const nyTekniskFeil = { id: crypto.randomUUID(), tekst: finnFeilmeldingstekst(error) };
        settTekniskeFeil(prev => [...prev, nyTekniskFeil]);
        console.error(error);
    }, []);

    const lukk = useCallback(() => {
        settTekniskeFeil([]);
    }, []);

    return (
        <TekniskFeilModalContext.Provider value={{ visTekniskFeilModal }}>
            {children}
            {tekniskeFeil.length > 0 && (
                <Modal open={true} portal={true} header={{ heading: 'Teknisk feil' }} onClose={lukk} width={'35rem'}>
                    <Modal.Body>
                        <VStack gap={'space-32'}>
                            <BodyLong>
                                {tekniskeFeil.length === 1
                                    ? 'Det har oppstått en teknisk feil i vedtaksløsningen. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.'
                                    : 'Det har oppstått tekniske feil i vedtaksløsningen. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.'}
                            </BodyLong>
                            <VStack gap={'space-8'}>
                                {tekniskeFeil.map((tf, index) => (
                                    <HStack key={tf.id} gap={'space-4'} align={'center'}>
                                        <XMarkOctagonFillIcon
                                            color={'var(--ax-text-danger-subtle)'}
                                            fontSize={'1.2rem'}
                                        />
                                        <ErrorMessage>
                                            {tekniskeFeil.length > 1 && `${index + 1}. `}
                                            {tf.tekst}
                                        </ErrorMessage>
                                    </HStack>
                                ))}
                            </VStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'primary'} size={'small'} onClick={lukk}>
                            Lukk
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </TekniskFeilModalContext.Provider>
    );
}

export function useVisTekniskFeilModal() {
    const context = useContext(TekniskFeilModalContext);
    if (context === undefined) {
        throw new Error('useVisTekniskFeilModal må brukes innenfor en TekniskFeilModalProvider.');
    }
    return context.visTekniskFeilModal;
}
