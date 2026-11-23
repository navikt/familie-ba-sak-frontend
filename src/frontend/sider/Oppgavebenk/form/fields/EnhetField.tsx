import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { Select } from '@navikt/ds-react';
import { harTilgangTilEnhet } from '@typer/enhet';
import { enhetFilter } from '@typer/oppgave';
import type { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';
import { useOppdaterLocalStorage } from '../useOppdaterLocalStorage';
import { useOppdaterURL } from '../useOppdaterURL';
import { OppgavefilterField, type OppgavefilterFormValues } from '../useOppgavefilterForm';
import { validerEnhet } from '../validering';

export function EnhetField() {
    const saksbehandler = useSaksbehandler();

    const { field, fieldState } = useController<OppgavefilterFormValues>({
        name: OppgavefilterField.ENHET,
        rules: { validate: value => validerEnhet(value) },
    });

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        field.onChange(event);
        oppdaterLocalStorage({ [OppgavefilterField.ENHET]: event.target.value });
        oppdaterURL({ [OppgavefilterField.ENHET]: event.target.value });
    }

    return (
        <Select {...field} label={'Enhet'} error={fieldState.error?.message} onChange={onChange}>
            {Object.values(enhetFilter)
                .filter(par => harTilgangTilEnhet(par.id.replace('E', ''), saksbehandler.groups))
                .map(par => (
                    <option key={par.id} value={par.id}>
                        {par.navn}
                    </option>
                ))}
        </Select>
    );
}
