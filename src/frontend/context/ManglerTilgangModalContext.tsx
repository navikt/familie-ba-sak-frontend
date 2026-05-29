import { type PropsWithChildren, useCallback, useState } from 'react';
import { createContext, useContext } from 'react';

import type { Adressebeskyttelsegradering } from '@typer/person';
import { adressebeskyttelsestyper } from '@typer/person';

import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, HStack, Modal, VStack } from '@navikt/ds-react';

interface ManglerTilgang {
    readonly begrunnelse: string;
    readonly adressebeskyttelsegradering?: Adressebeskyttelsegradering;
}

const DEFAULT_BEGRUNNELSE = 'Du har ikke tilgang til å gjennomføre denne handlingen.';

interface Context {
    visManglerTilgangModal: (manglerTilgang?: Partial<ManglerTilgang>) => void;
}

const ManglerTilgangModalContext = createContext<Context | undefined>(undefined);

export function ManglerTilgangModalProvider({ children }: PropsWithChildren) {
    const [manglerTilgang, settManglerTilgang] = useState<ManglerTilgang | undefined>(undefined);

    const visManglerTilgangModal = useCallback((manglerTilgang: Partial<ManglerTilgang> = {}) => {
        settManglerTilgang({ begrunnelse: DEFAULT_BEGRUNNELSE, ...manglerTilgang });
    }, []);

    const lukk = useCallback(() => {
        settManglerTilgang(undefined);
    }, []);

    return (
        <ManglerTilgangModalContext.Provider value={{ visManglerTilgangModal }}>
            {children}
            {manglerTilgang && (
                <Modal open={true} portal={true} header={{ heading: 'Mangler tilgang' }} onClose={lukk} width={'35rem'}>
                    <Modal.Body>
                        <VStack gap={'space-24'} marginBlock={'space-8 space-0'}>
                            <BodyShort>{manglerTilgang.begrunnelse}</BodyShort>
                            {manglerTilgang.adressebeskyttelsegradering && (
                                <HStack gap={'space-4'} align={'center'}>
                                    <XMarkOctagonFillIcon color={'var(--ax-text-danger-subtle)'} fontSize={'1.2rem'} />
                                    <ErrorMessage>
                                        {`Ident har diskresjonskode ${adressebeskyttelsestyper[manglerTilgang.adressebeskyttelsegradering] ?? manglerTilgang.adressebeskyttelsegradering}.`}
                                    </ErrorMessage>
                                </HStack>
                            )}
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'primary'} size={'small'} onClick={lukk}>
                            Lukk
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </ManglerTilgangModalContext.Provider>
    );
}

export function useVisManglerTilgangModal() {
    const context = useContext(ManglerTilgangModalContext);
    if (context === undefined) {
        throw new Error('useVisManglerTilgangModal må brukes innenfor en ManglerTilgangModalProvider');
    }
    return context.visManglerTilgangModal;
}
