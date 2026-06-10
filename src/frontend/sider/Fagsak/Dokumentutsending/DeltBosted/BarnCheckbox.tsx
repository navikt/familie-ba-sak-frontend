import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import DeltBostedAvtaler from './DeltBostedAvtaler';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { lagBarnLabel } from '../../../../utils/formatter';

interface IProps {
    barn: IBarnMedOpplysninger;
    barnMedDeltBostedFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
}

const BarnCheckbox = ({ barn, barnMedDeltBostedFelt, avtalerOmDeltBostedPerBarnFelt, visFeilmeldinger }: IProps) => {
    const navnOgIdentTekst = lagBarnLabel(barn);

    return (
        <Box marginInline="space-16 space-0">
            <HStack gap="space-16" wrap={false}>
                <Checkbox value={barn.ident}>
                    <BodyShort truncate>{navnOgIdentTekst}</BodyShort>
                </Checkbox>
                {barn.manueltRegistrert && (
                    <Button
                        variant={'tertiary'}
                        id={`fjern__${barn.ident}`}
                        size={'small'}
                        onClick={() => {
                            barnMedDeltBostedFelt.validerOgSettFelt([
                                ...barnMedDeltBostedFelt.verdi.filter(
                                    barnMedDeltBosted =>
                                        barnMedDeltBosted.ident !== barn.ident ||
                                        barnMedDeltBosted.navn !== barn.navn ||
                                        barnMedDeltBosted.fødselsdato !== barn.fødselsdato
                                ),
                            ]);
                        }}
                        icon={<TrashIcon />}
                    >
                        {'Fjern barn'}
                    </Button>
                )}
            </HStack>

            <DeltBostedAvtaler
                barn={barn}
                avtalerOmDeltBostedPerBarnFelt={avtalerOmDeltBostedPerBarnFelt}
                visFeilmeldinger={visFeilmeldinger}
            />
        </Box>
    );
};

export default BarnCheckbox;
