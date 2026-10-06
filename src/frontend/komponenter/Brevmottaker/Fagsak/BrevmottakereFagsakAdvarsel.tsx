import { InformationSquareIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, InfoCard, VStack } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { BrevmottakerListe } from '../BrevmottakerListe';
import { BrevmottakerDialog } from './Dialog/BrevmottakerDialog';
import { BrevmottakerDialogProvider } from './Dialog/BrevmottakerDialogContext';

export function BrevmottakereFagsakAdvarsel() {
    const { brevmottakere } = useBrevmottakereFagsakContext();

    return (
        <BrevmottakerDialogProvider>
            {({ erDialogÅpen, åpneDialog }) => (
                <>
                    {brevmottakere.length !== 0 && (
                        <VStack marginBlock={'space-40 space-24'}>
                            <InfoCard data-color={'info'}>
                                <InfoCard.Header icon={<InformationSquareIcon aria-hidden={true} />}>
                                    <InfoCard.Title>Brevmottaker(e) er endret</InfoCard.Title>
                                </InfoCard.Header>
                                <InfoCard.Content>
                                    <BodyShort> Informasjonsbrev sendes til: </BodyShort>
                                    <BrevmottakerListe brevmottakere={brevmottakere} />
                                    <Button
                                        variant={'tertiary'}
                                        type={'button'}
                                        onClick={åpneDialog}
                                        icon={<MagnifyingGlassIcon aria-hidden={true} />}
                                        size={'xsmall'}
                                    >
                                        Se detaljer
                                    </Button>
                                </InfoCard.Content>
                            </InfoCard>
                        </VStack>
                    )}
                    {erDialogÅpen && <BrevmottakerDialog />}
                </>
            )}
        </BrevmottakerDialogProvider>
    );
}
