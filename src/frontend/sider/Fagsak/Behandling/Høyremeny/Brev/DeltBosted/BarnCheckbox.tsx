import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Checkbox, HStack } from '@navikt/ds-react';
import { lagBarnLabel } from '@utils/formatter';

import type { BarnMedDeltBosted } from '../useBrevModul';
import { useSkjemaErLåst } from '../useSkjemaErLåst';
import DeltBostedAvtaler from './DeltBostedAvtaler';

interface IProps {
    barn: BarnMedDeltBosted;
    index: number;
    onFjern: () => void;
}

const BarnCheckbox = ({ barn, index, onFjern }: IProps) => {
    const skjemaErLåst = useSkjemaErLåst();

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
                        onClick={onFjern}
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
