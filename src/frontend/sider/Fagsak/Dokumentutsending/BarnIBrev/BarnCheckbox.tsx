import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { lagBarnLabel } from '../../../../utils/formatter';

interface IProps {
    barn: IBarnMedOpplysninger;
    barnIBrevFelt: Felt<IBarnMedOpplysninger[]>;
}

const BarnCheckbox = ({ barn, barnIBrevFelt }: IProps) => {
    const navnOgIdentTekst = lagBarnLabel(barn);

    return (
        <div>
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
                                barnIBrevFelt.validerOgSettFelt([
                                    ...barnIBrevFelt.verdi.filter(
                                        barnIBrev =>
                                            barnIBrev.ident !== barn.ident ||
                                            barnIBrev.navn !== barn.navn ||
                                            barnIBrev.fødselsdato !== barn.fødselsdato
                                    ),
                                ]);
                            }}
                            icon={<TrashIcon />}
                        >
                            {'Fjern barn'}
                        </Button>
                    )}
                </HStack>
            </Box>
        </div>
    );
};

export default BarnCheckbox;
