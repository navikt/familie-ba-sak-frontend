import { XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Dialog, ErrorMessage, HStack, VStack } from '@navikt/ds-react';

import type { Adressebeskyttelsegradering } from '@typer/person';
import { adressebeskyttelsestyper } from '@typer/person';
import { createContext, type PropsWithChildren, useCallback, useContext, useState } from 'react';

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
                <Dialog open={true} onOpenChange={lukk}>
                    <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                        <Dialog.Header>
                            <Dialog.Title>Mangler tilgang</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack gap={'space-24'} marginBlock={'space-8 space-0'}>
                                <BodyShort>{manglerTilgang.begrunnelse}</BodyShort>
                                {manglerTilgang.adressebeskyttelsegradering && (
                                    <HStack gap={'space-4'} align={'center'}>
                                        <XMarkOctagonFillIcon
                                            color={'var(--ax-text-danger-subtle)'}
                                            fontSize={'1.2rem'}
                                        />
                                        <ErrorMessage>
                                            {`Ident har diskresjonskode ${adressebeskyttelsestyper[manglerTilgang.adressebeskyttelsegradering] ?? manglerTilgang.adressebeskyttelsegradering}.`}
                                        </ErrorMessage>
                                    </HStack>
                                )}
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant={'primary'} size={'small'} onClick={lukk}>
                                Lukk
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Popup>
                </Dialog>
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
