import { useErNyttOppsett } from '@hooks/useKonsept';
import { BodyLong, BodyShort, Box, HGrid } from '@navikt/ds-react';
import { TextNeutral } from '@navikt/ds-tokens/dist/tokens';

interface Props {
    label: string;
    tekst: string;
    tekstHover?: string;
    tekstFarge?: string;
}

export function Informasjonsbolk({ label, tekst, tekstHover, tekstFarge }: Props) {
    const erNyttOppsett = useErNyttOppsett();

    if (erNyttOppsett) {
        return (
            // To like kolonner som i Figma. På smale skjermer får etiketten minst plass til «Behandlingsstatus».
            <HGrid columns={'minmax(8.25rem, 1fr) 1fr'} align={'center'}>
                <Box paddingInline={'space-0 space-8'}>
                    <BodyLong size={'small'}>{label}</BodyLong>
                </Box>
                <BodyLong
                    size={'small'}
                    weight={'semibold'}
                    style={{ color: tekstFarge ?? TextNeutral }}
                    title={tekstHover}
                >
                    {tekst}
                </BodyLong>
            </HGrid>
        );
    }

    return (
        <HGrid columns={'1.25fr 1fr'} gap={'space-8'} align={'center'}>
            <BodyShort>{label}</BodyShort>
            <BodyShort weight={'semibold'} style={{ color: tekstFarge ?? TextNeutral }} title={tekstHover}>
                {tekst}
            </BodyShort>
        </HGrid>
    );
}
