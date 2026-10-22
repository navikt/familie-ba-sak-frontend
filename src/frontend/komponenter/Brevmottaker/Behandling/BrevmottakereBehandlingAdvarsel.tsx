import { useBehandling } from '@hooks/useBehandling';
import { InformationSquareIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, InfoCard } from '@navikt/ds-react';
import { BrevmottakerDialogProvider } from '../Felles/BrevmottakerDialogContext';
import { BrevmottakerListe } from '../Felles/BrevmottakerListe';
import { BrevmottakerDialog } from './BrevmottakerDialog';

type Kilde = 'vedtak' | 'simulering';

function hentBrevtypetekst(kilde: Kilde) {
    if (kilde === 'simulering') {
        return 'Varsel';
    }
    return 'Vedtak';
}

interface Props {
    kilde: Kilde;
    className?: string;
}

export function BrevmottakereBehandlingAdvarsel({ kilde, className }: Props) {
    const { brevmottakere } = useBehandling();

    return (
        <BrevmottakerDialogProvider>
            {({ erDialogÅpen, åpneDialog }) => (
                <>
                    {brevmottakere.length !== 0 && (
                        <InfoCard data-color={'info'} className={className}>
                            <InfoCard.Header icon={<InformationSquareIcon aria-hidden={true} />}>
                                <InfoCard.Title>Brevmottaker(e) er endret</InfoCard.Title>
                            </InfoCard.Header>
                            <InfoCard.Content>
                                <BodyShort>{hentBrevtypetekst(kilde)} sendes til:</BodyShort>
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
                    )}
                    {erDialogÅpen && <BrevmottakerDialog />}
                </>
            )}
        </BrevmottakerDialogProvider>
    );
}
