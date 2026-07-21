import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import type { DokumentutsendingFormValues } from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { lagBarnLabel } from '@utils/formatter';
import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
    barn: IBarnMedOpplysninger;
    onFjern: () => void;
    children?: ReactNode;
}

export function BarnCheckbox({ barn, onFjern, children }: Props) {
    const erLesevisning = useErLesevisningFagsak();
    const {
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();

    return (
        <Box marginInline="space-16 space-0">
            <HStack gap="space-16" wrap={false}>
                <Checkbox value={barn.ident}>
                    <BodyShort truncate>{lagBarnLabel(barn)}</BodyShort>
                </Checkbox>
                {barn.manueltRegistrert && !erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        size={'small'}
                        type={'button'}
                        onClick={onFjern}
                        icon={<TrashIcon />}
                        disabled={isSubmitting}
                    >
                        Fjern barn
                    </Button>
                )}
            </HStack>
            {children}
        </Box>
    );
}
