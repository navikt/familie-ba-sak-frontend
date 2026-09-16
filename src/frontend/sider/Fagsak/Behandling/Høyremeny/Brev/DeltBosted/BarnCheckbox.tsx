import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import { lagBarnLabel } from '@utils/formatter';

import type { BarnMedDeltBosted } from '../useSendManueltBrevForm';
import { useSkjemaErLåst } from '../useSkjemaErLåst';
import { useBarnMedDeltBostedFieldArray } from './BarnMedDeltBostedFieldArrayContext';
import DeltBostedAvtaler from './DeltBostedAvtaler';

interface IProps {
    barn: BarnMedDeltBosted;
    index: number;
}

const BarnCheckbox = ({ barn, index }: IProps) => {
    const skjemaErLåst = useSkjemaErLåst();
    const { fjernBarn } = useBarnMedDeltBostedFieldArray();

    return (
        <Box marginInline="space-16 space-0">
            <HStack gap="space-16" wrap={false}>
                <Checkbox value={barn.ident}>
                    <BodyShort truncate>{lagBarnLabel(barn)}</BodyShort>
                </Checkbox>
                {barn.manueltRegistrert && (
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        size={'small'}
                        disabled={skjemaErLåst}
                        onClick={() => fjernBarn(index)}
                        icon={<TrashIcon />}
                    >
                        Fjern barn
                    </Button>
                )}
            </HStack>

            <DeltBostedAvtaler barn={barn} index={index} />
        </Box>
    );
};

export default BarnCheckbox;
