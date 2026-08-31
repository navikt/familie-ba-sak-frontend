import { InformationSquareIcon } from '@navikt/aksel-icons';
import { InfoCard } from '@navikt/ds-react';

export function KorrigertEtterbetalingAdvarsel() {
    return (
        <InfoCard data-color={'info'}>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden={true} />}>
                Etterbetalingsbeløp i brevet er manuelt korrigert
            </InfoCard.Message>
        </InfoCard>
    );
}
