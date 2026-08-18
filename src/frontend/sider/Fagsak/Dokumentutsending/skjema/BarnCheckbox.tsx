import type { ReactNode } from 'react';

import type { IBarnMedOpplysninger } from '@typer/søknad';
import { lagBarnLabel } from '@utils/formatter';
import { useFormContext } from 'react-hook-form';

import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';

import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

interface Props {
    barn: IBarnMedOpplysninger;
    children?: ReactNode;
}

export function BarnCheckbox({ barn, children }: Props) {
    const { getValues, setValue } = useFormContext<DokumentutsendingFormValues>();

    const fjernBarn = () => {
        setValue(
            DokumentutsendingFeltnavn.VALGTE_BARN,
            getValues(DokumentutsendingFeltnavn.VALGTE_BARN).filter(
                (barnMedOpplysninger: IBarnMedOpplysninger) => barnMedOpplysninger.ident !== barn.ident
            ),
            { shouldValidate: true }
        );
    };

    return (
        <Box marginInline="space-16 space-0">
            <HStack gap="space-16" wrap={false}>
                <Checkbox value={barn.ident}>
                    <BodyShort truncate>{lagBarnLabel(barn)}</BodyShort>
                </Checkbox>
                {barn.manueltRegistrert && (
                    <Button
                        variant={'tertiary'}
                        id={`fjern__${barn.ident}`}
                        size={'small'}
                        type={'button'}
                        onClick={fjernBarn}
                        icon={<TrashIcon />}
                    >
                        {'Fjern barn'}
                    </Button>
                )}
            </HStack>
            {children}
        </Box>
    );
}
