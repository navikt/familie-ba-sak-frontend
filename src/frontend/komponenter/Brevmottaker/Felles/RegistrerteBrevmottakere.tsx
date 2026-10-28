import { InformationSquareIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, InfoCard } from '@navikt/ds-react';
import type { Brevmottaker } from '@typer/brevmottaker';
import type { ReactNode } from 'react';
import { BrevmottakerDialogProvider } from './BrevmottakerDialogContext';
import { BrevmottakerListe } from './BrevmottakerListe';

interface Props {
    brevmottakere: Brevmottaker[];
    beskrivelse: string;
    dialog: (lukkDialog: () => void) => ReactNode;
    className?: string;
}

export function RegistrerteBrevmottakere({ brevmottakere, beskrivelse, dialog, className }: Props) {
    return (
        <BrevmottakerDialogProvider>
            {({ erDialogÅpen, åpneDialog, lukkDialog }) => (
                <>
                    {brevmottakere.length !== 0 && (
                        <InfoCard data-color={'info'} className={className}>
                            <InfoCard.Header icon={<InformationSquareIcon aria-hidden={true} />}>
                                <InfoCard.Title>Brevmottaker(e) er endret</InfoCard.Title>
                            </InfoCard.Header>
                            <InfoCard.Content>
                                <BodyShort>{beskrivelse}</BodyShort>
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
                    {erDialogÅpen && dialog(lukkDialog)}
                </>
            )}
        </BrevmottakerDialogProvider>
    );
}
