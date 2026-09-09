import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { lagBarnLabel } from '@utils/formatter';

import DeltBostedAvtaler from './DeltBostedAvtaler';

interface IProps {
    barn: IBarnMedOpplysninger;
    barnMedDeltBosted: IBarnMedOpplysninger[];
    settBarnMedDeltBosted: (barn: IBarnMedOpplysninger[]) => void;
    avtalerOmDeltBostedPerBarn: Record<string, string[]>;
    settAvtalerOmDeltBostedPerBarn: (avtaler: Record<string, string[]>) => void;
    visFeilmeldinger: boolean;
}

const BarnCheckbox = ({
    barn,
    barnMedDeltBosted,
    settBarnMedDeltBosted,
    avtalerOmDeltBostedPerBarn,
    settAvtalerOmDeltBostedPerBarn,
    visFeilmeldinger,
}: IProps) => {
    const navnOgIdentTekst = lagBarnLabel(barn);

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
                        onClick={() => {
                            settBarnMedDeltBosted(
                                barnMedDeltBosted.filter(
                                    barnMedDeltBosted =>
                                        barnMedDeltBosted.ident !== barn.ident ||
                                        barnMedDeltBosted.navn !== barn.navn ||
                                        barnMedDeltBosted.fødselsdato !== barn.fødselsdato
                                )
                            );
                        }}
                        icon={<TrashIcon />}
                    >
                        {'Fjern barn'}
                    </Button>
                )}
            </HStack>

            <DeltBostedAvtaler
                barn={barn}
                avtalerOmDeltBostedPerBarn={avtalerOmDeltBostedPerBarn}
                settAvtalerOmDeltBostedPerBarn={settAvtalerOmDeltBostedPerBarn}
                visFeilmeldinger={visFeilmeldinger}
            />
        </Box>
    );
};

export default BarnCheckbox;
