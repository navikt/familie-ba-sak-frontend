import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import BrevmottakerListe from '@komponenter/Brevmottaker/BrevmottakerListe';
import { LeggTilBrevmottakerModalBehandling } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/LeggTilBrevmottakerModalBehandling';
import { InformationSquareIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Button, InfoCard } from '@navikt/ds-react';
import { useState } from 'react';

type Kilde = 'vedtak' | 'simulering';

function hentBrevtypetekst(kilde: Kilde) {
    if (kilde === 'simulering') {
        return 'Varsel';
    }
    return 'Vedtak';
}

interface Props {
    kilde: Kilde;
}

export function BrevmottakereBehandlingAdvarsel({ kilde }: Props) {
    const bruker = useBruker();
    const behandling = useBehandling();

    const brevmottakere = behandling.brevmottakere || [];

    const [visBrevmottakereModal, settVisBrevmottakereModal] = useState(false);

    return (
        <>
            {brevmottakere.length !== 0 && (
                <InfoCard data-color={'info'}>
                    <InfoCard.Header icon={<InformationSquareIcon aria-hidden={true} />}>
                        <InfoCard.Title>Brevmottaker(e) er endret</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        {hentBrevtypetekst(kilde)} sendes til:
                        <BrevmottakerListe brevmottakere={brevmottakere} bruker={bruker} />
                        <Button
                            variant={'tertiary'}
                            onClick={() => settVisBrevmottakereModal(true)}
                            icon={<MagnifyingGlassIcon aria-hidden={true} />}
                            size={'xsmall'}
                        >
                            Se detaljer
                        </Button>
                    </InfoCard.Content>
                </InfoCard>
            )}
            {visBrevmottakereModal && (
                <LeggTilBrevmottakerModalBehandling lukkModal={() => settVisBrevmottakereModal(false)} />
            )}
        </>
    );
}
