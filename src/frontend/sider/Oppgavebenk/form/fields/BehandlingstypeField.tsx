import { Select } from '@navikt/ds-react';
import { behandlingstypeFilter } from '@typer/oppgave';
import type { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { useOppdaterLocalStorage } from '../useOppdaterLocalStorage';
import { useOppdaterURL } from '../useOppdaterURL';
import { OppgavefilterField, type OppgavefilterFormValues } from '../useOppgavefilterForm';

export function BehandlingstypeField() {
    const { field, fieldState } = useController<OppgavefilterFormValues>({ name: OppgavefilterField.BEHANDLINGSTYPE });

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        field.onChange(event);
        oppdaterLocalStorage({ [OppgavefilterField.BEHANDLINGSTYPE]: event.target.value });
        oppdaterURL({ [OppgavefilterField.BEHANDLINGSTYPE]: event.target.value });
    }

    return (
        <Select {...field} label={'Behandlingstype'} error={fieldState.error?.message} onChange={onChange}>
            {Object.values(behandlingstypeFilter).map(par => (
                <option key={par.id} value={par.id}>
                    {par.navn}
                </option>
            ))}
        </Select>
    );
}
