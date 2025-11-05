import { useForm } from 'react-hook-form';

import { BehandlingUnderkategori } from '../../../../../typer/behandlingstema';
import type { Målform } from '../../../../../typer/søknad';
import { useBehandlingContext } from '../../context/BehandlingContext';

export interface FormValues {
    [Fields.UNDERKATEGORI]: BehandlingUnderkategori;
    [Fields.BARN]: string[];
    [Fields.MÅLFORM]: Målform | null;
    [Fields.ANNET]: string;
}

type TransformedFormValues =
    | {
          [Fields.UNDERKATEGORI]: BehandlingUnderkategori;
          [Fields.BARN]: string[];
          [Fields.MÅLFORM]: Målform;
          [Fields.ANNET]: string;
      }
    | {
          [Fields.UNDERKATEGORI]: BehandlingUnderkategori;
          [Fields.BARN]: string[];
          [Fields.MÅLFORM]: Målform;
          [Fields.ANNET]: string;
      };

export enum Fields {
    UNDERKATEGORI = 'søknadType',
    BARN = 'barn',
    MÅLFORM = 'målform',
    ANNET = 'annet',
}

export function useRegistrerSøknadForm() {
    const { behandling } = useBehandlingContext();

    const søknadsgrunnlag = behandling.søknadsgrunnlag;

    const underkategori = søknadsgrunnlag?.underkategori ?? BehandlingUnderkategori.ORDINÆR;
    const barn = søknadsgrunnlag?.barnaMedOpplysninger.filter(b => b.inkludertISøknaden).map(b => b.ident) ?? [];
    const målform = søknadsgrunnlag?.søkerMedOpplysninger.målform ?? null;

    const form = useForm<FormValues, unknown, TransformedFormValues>({
        values: {
            [Fields.UNDERKATEGORI]: underkategori,
            [Fields.BARN]: barn,
            [Fields.MÅLFORM]: målform,
            [Fields.ANNET]: '',
        },
    });

    async function onSubmit(values: TransformedFormValues) {
        console.log(values);
    }

    return { form, onSubmit };
}
