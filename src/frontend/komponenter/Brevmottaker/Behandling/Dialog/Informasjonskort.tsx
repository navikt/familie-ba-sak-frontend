import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';

export function Informasjonskort() {
    return (
        <InfoCard data-color={'info'}>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                Brev sendes til brukers folkeregistrerte adresse eller annen foretrukken kanal. Legg til mottaker dersom
                brev skal sendes til utenlandsk adresse, fullmektig, verge eller dødsbo.
            </InfoCard.Message>
        </InfoCard>
    );
}
