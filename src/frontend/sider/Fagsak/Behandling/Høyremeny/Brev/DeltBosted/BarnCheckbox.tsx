import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { lagBarnLabel } from '@utils/formatter';
import { useFormContext } from 'react-hook-form';

import { type BrevModulFormValues, BrevmodulFeltnavn } from '../useBrevModul';
import DeltBostedAvtaler from './DeltBostedAvtaler';

interface IProps {
    barn: IBarnMedOpplysninger;
}

const BarnCheckbox = ({ barn }: IProps) => {
    const {
        getValues,
        setValue,
        formState: { isSubmitted },
    } = useFormContext<BrevModulFormValues>();

    const navnOgIdentTekst = lagBarnLabel(barn);

    const fjernBarn = () => {
        setValue(
            BrevmodulFeltnavn.BARN_MED_DELT_BOSTED,
            getValues(BrevmodulFeltnavn.BARN_MED_DELT_BOSTED).filter(
                barnMedDeltBosted =>
                    barnMedDeltBosted.ident !== barn.ident ||
                    barnMedDeltBosted.navn !== barn.navn ||
                    barnMedDeltBosted.fødselsdato !== barn.fødselsdato
            ),
            { shouldValidate: isSubmitted }
        );
    };

    return (
        <Box marginInline="space-16 space-0">
            <HStack gap="space-16" wrap={false}>
                <Checkbox value={barn.ident}>
                    <BodyShort truncate>{navnOgIdentTekst}</BodyShort>
                </Checkbox>
                {barn.manueltRegistrert && (
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        id={`fjern__${barn.ident}`}
                        size={'small'}
                        onClick={fjernBarn}
                        icon={<TrashIcon />}
                    >
                        {'Fjern barn'}
                    </Button>
                )}
            </HStack>

            <DeltBostedAvtaler barn={barn} />
        </Box>
    );
};

export default BarnCheckbox;
