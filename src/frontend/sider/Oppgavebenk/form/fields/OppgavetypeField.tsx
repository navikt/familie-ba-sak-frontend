import { Select } from '@navikt/ds-react';
import { oppgaveTypeFilter } from '@typer/oppgave';
import type { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { useOppdaterLocalStorage } from '../useOppdaterLocalStorage';
import { useOppdaterURL } from '../useOppdaterURL';
import { OppgavefilterField, type OppgavefilterFormValues } from '../useOppgavefilterForm';

export function OppgavetypeField() {
    const { field, fieldState } = useController<OppgavefilterFormValues>({ name: OppgavefilterField.OPPGAVETYPE });

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        field.onChange(event);
        oppdaterLocalStorage({ [OppgavefilterField.OPPGAVETYPE]: event.target.value });
        oppdaterURL({ [OppgavefilterField.OPPGAVETYPE]: event.target.value });
    }

    return (
        <Select {...field} label={'Oppgavetype'} error={fieldState.error?.message} onChange={onChange}>
            {Object.values(oppgaveTypeFilter).map(par => (
                <option key={par.id} value={par.id}>
                    {par.navn}
                </option>
            ))}
        </Select>
    );
}
