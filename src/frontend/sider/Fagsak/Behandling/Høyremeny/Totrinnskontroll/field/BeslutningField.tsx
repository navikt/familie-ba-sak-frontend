import { useBehandling } from '@hooks/useBehandling';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import {
    TotrinnskontrollFormField,
    type TotrinnskontrollFormValues,
} from '@sider/Fagsak/Behandling/Høyremeny/Totrinnskontroll/useTotrinnskontrollForm';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';
import { useController, useFormContext } from 'react-hook-form';

import { Radio, RadioGroup, Stack } from '@navikt/ds-react';

export function BeslutningField() {
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();

    const { control } = useFormContext<TotrinnskontrollFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: TotrinnskontrollFormField.BESLUTNING,
        control,
        rules: {
            required: 'Beslutning er påkrevd.',
            validate: value => {
                if (value === TotrinnskontrollBeslutning.IKKE_VURDERT) {
                    return 'Beslutning er påkrevd.';
                }
                return true;
            },
        },
    });

    const totrinnskontroll = behandling.totrinnskontroll;
    const egetVedtak = totrinnskontroll?.saksbehandlerId === saksbehandler.navIdent;

    return (
        <RadioGroup
            id={name}
            name={name}
            legend={'Beslutning'}
            hideLegend={true}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={isSubmitting}
            error={error?.message}
        >
            <Stack gap={'space-0 space-24'} direction={{ xs: 'column', sm: 'row' }} wrap={false}>
                <Radio value={TotrinnskontrollBeslutning.GODKJENT} readOnly={isSubmitting || egetVedtak}>
                    Godkjent
                </Radio>
                <Radio value={TotrinnskontrollBeslutning.UNDERKJENT} readOnly={isSubmitting}>
                    Vurdér på nytt
                </Radio>
            </Stack>
        </RadioGroup>
    );
}
