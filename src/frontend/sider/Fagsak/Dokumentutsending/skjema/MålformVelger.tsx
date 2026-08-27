import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { Box, Radio, RadioGroup } from '@navikt/ds-react';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { Målform, målform } from '@typer/søknad';
import { useController, useFormContext } from 'react-hook-form';

export function MålformVelger() {
    const erLesevisning = useErLesevisningFagsak();
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.MÅLFORM,
        control,
        rules: { required: 'Du må velge målform' },
    });

    return (
        <RadioGroup
            value={field.value}
            name={field.name}
            error={fieldState.error?.message}
            legend={'Målform'}
            readOnly={isSubmitting || erLesevisning}
            onChange={field.onChange}
        >
            <Box paddingInline={'space-16 space-0'}>
                <Radio value={Målform.NB}>{målform[Målform.NB]}</Radio>
                <Radio value={Målform.NN}>{målform[Målform.NN]}</Radio>
            </Box>
        </RadioGroup>
    );
}
