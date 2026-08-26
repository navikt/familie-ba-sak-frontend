import { Heading } from '@navikt/ds-react';

interface Props {
    label: string;
}

export function FieldLabel({ label }: Props) {
    return (
        <Heading size={'medium'} align={'start'} level={'2'}>
            {label}
        </Heading>
    );
}
