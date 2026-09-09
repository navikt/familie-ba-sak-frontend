import type { BehandlingSteg } from '@typer/behandling';
import { useController, useFormContext } from 'react-hook-form';

import { BarnBrevetGjelder } from './BarnBrevetGjelder';
import type { BrevModulFormValues } from './useBrevModul';

interface Props {
    behandlingSteg?: BehandlingSteg;
}

export function BarnBrevetGjelderField({ behandlingSteg }: Props) {
    const { control } = useFormContext<BrevModulFormValues>();

    const {
        field,
        fieldState: { error },
    } = useController({
        name: 'barnBrevetGjelder',
        control,
        rules: {
            validate: verdi => (verdi.some(barn => barn.merket) ? true : 'Du må velge hvilke barn brevet gjelder'),
        },
    });

    return (
        <BarnBrevetGjelder
            barnBrevetGjelder={field.value}
            onChange={field.onChange}
            behandlingsSteg={behandlingSteg}
            error={error?.message}
        />
    );
}
