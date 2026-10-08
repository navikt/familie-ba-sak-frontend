import { InformationSquareIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, InfoCard, VStack } from '@navikt/ds-react';
import { useManuelleBrevmottakerePåFagsakContext } from '@sider/Fagsak/ManuelleBrevmottakerePåFagsakContext';
import { useState } from 'react';
import { LeggTilBrevmottakerModalFagsak } from '../Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalFagsak';
import { BrevmottakerListe } from './BrevmottakerListe';

export function BrevmottakereFagsakAdvarsel() {
    const { manuelleBrevmottakerePåFagsak } = useManuelleBrevmottakerePåFagsakContext();

    const [visManuelleMottakereModal, settVisManuelleMottakereModal] = useState(false);

    return (
        <>
            {manuelleBrevmottakerePåFagsak.length !== 0 && (
                <VStack marginBlock={'space-40 space-24'}>
                    <InfoCard data-color={'info'}>
                        <InfoCard.Header icon={<InformationSquareIcon aria-hidden={true} />}>
                            <InfoCard.Title>Brevmottaker(e) er endret</InfoCard.Title>
                        </InfoCard.Header>
                        <InfoCard.Content>
                            <BodyShort> Informasjonsbrev sendes til: </BodyShort>
                            <BrevmottakerListe brevmottakere={manuelleBrevmottakerePåFagsak} />
                            <Button
                                variant={'tertiary'}
                                type={'button'}
                                onClick={() => settVisManuelleMottakereModal(true)}
                                icon={<MagnifyingGlassIcon aria-hidden={true} />}
                                size={'xsmall'}
                            >
                                Se detaljer
                            </Button>
                        </InfoCard.Content>
                    </InfoCard>
                </VStack>
            )}
            {visManuelleMottakereModal && (
                <LeggTilBrevmottakerModalFagsak lukkModal={() => settVisManuelleMottakereModal(false)} />
            )}
        </>
    );
}
