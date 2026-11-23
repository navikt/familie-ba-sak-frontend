import { Select } from '@navikt/ds-react';
import { gjelderFilter } from '@typer/oppgave';
import type { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { useOppdaterLocalStorage } from '../useOppdaterLocalStorage';
import { useOppdaterURL } from '../useOppdaterURL';
import { OppgavefilterField, type OppgavefilterFormValues } from '../useOppgavefilterForm';

export function BehandlingstemaField() {
    const { field, fieldState } = useController<OppgavefilterFormValues>({ name: OppgavefilterField.BEHANDLINGSTEMA });

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        field.onChange(event);
        oppdaterLocalStorage({ [OppgavefilterField.BEHANDLINGSTEMA]: event.target.value });
        oppdaterURL({ [OppgavefilterField.BEHANDLINGSTEMA]: event.target.value });
    }

    return (
        <Select {...field} label={'Gjelder'} error={fieldState.error?.message} onChange={onChange}>
            {Object.values(gjelderFilter).map(par => (
                <option key={par.id} value={par.id}>
                    {par.navn}
                </option>
            ))}
        </Select>
    );
}
