import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';
import { Modus } from '@typer/brevmottaker';

interface Props {
    modus: Modus;
}

export function Informasjonskort({ modus }: Props) {
    const mottakere = modus === Modus.BEHANDLING ? 'fullmektig, verge eller dødsbo' : 'fullmektig eller verge';
    return (
        <InfoCard data-color={'info'}>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken kanal. Legg til mottaker dersom
                brev skal sendes til utenlandsk adresse, {mottakere}.
            </InfoCard.Message>
        </InfoCard>
    );
}
