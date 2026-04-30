import { BodyShort, HGrid } from '@navikt/ds-react';
import { TextNeutral } from '@navikt/ds-tokens/dist/tokens';

interface Props {
    label: string;
    tekst: string;
    tekstHover?: string;
    tekstFarge?: string;
}

export function Informasjonsbolk({ label, tekst, tekstHover, tekstFarge }: Props) {
    return (
        <HGrid columns={'1.25fr 1fr'} gap={'space-8'} align={'center'}>
            <BodyShort>{label}</BodyShort>
            <BodyShort weight={'semibold'} style={{ color: tekstFarge ?? TextNeutral }} title={tekstHover}>
                {tekst}
            </BodyShort>
        </HGrid>
    );
}
