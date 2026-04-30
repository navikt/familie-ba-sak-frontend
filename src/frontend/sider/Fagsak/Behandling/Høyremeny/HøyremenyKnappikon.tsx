import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';

interface Props {
    erHøyremenyÅpen: boolean;
}

export function HøyremenyKnappikon({ erHøyremenyÅpen }: Props) {
    if (erHøyremenyÅpen) {
        return <ChevronRightIcon aria-label={'Skjul høyremeny'} />;
    }
    return <ChevronLeftIcon aria-label={'Vis høyremeny'} />;
}
