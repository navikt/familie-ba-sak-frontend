import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { Select } from '@navikt/ds-react';
import { saksbehandlerFilter } from '@typer/oppgave';
import type { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { useOppdaterLocalStorage } from '../useOppdaterLocalStorage';
import { useOppdaterURL } from '../useOppdaterURL';
import { OppgavefilterField, type OppgavefilterFormValues } from '../useOppgavefilterForm';

export function SaksbehandlerField() {
    const saksbehandler = useSaksbehandler();

    const { field, fieldState } = useController<OppgavefilterFormValues>({ name: OppgavefilterField.SAKSBEHANDLER });

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        field.onChange(event);
        oppdaterLocalStorage({ [OppgavefilterField.SAKSBEHANDLER]: event.target.value });
        oppdaterURL({ [OppgavefilterField.SAKSBEHANDLER]: event.target.value });
    }

    return (
        <Select {...field} label={'Saksbehandler'} error={fieldState.error?.message} onChange={onChange}>
            {Object.values(saksbehandlerFilter(saksbehandler)).map(par => (
                <option key={par.id} value={par.id}>
                    {par.navn}
                </option>
            ))}
        </Select>
    );
}
