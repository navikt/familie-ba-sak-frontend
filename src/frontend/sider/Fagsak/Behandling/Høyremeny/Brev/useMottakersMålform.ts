import { useBehandling } from '@hooks/useBehandling';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { IGrunnlagPerson } from '@typer/person';
import type { Målform } from '@typer/søknad';
import { mottakersMålformImplementering } from '@utils/brevmal';
import { useFormContext } from 'react-hook-form';

import { SendManueltBrevFeltnavn, type SendManueltBrevFormValues } from './useSendManueltBrevForm';

export const hentMottakersMålform = (personer: IGrunnlagPerson[], mottakerIdent: string): Målform =>
    mottakersMålformImplementering(
        personer,
        mottakerIdent.length >= 1 ? Valideringsstatus.OK : Valideringsstatus.IKKE_VALIDERT,
        mottakerIdent
    );

export function useMottakersMålform(): Målform {
    const behandling = useBehandling();
    const { watch } = useFormContext<SendManueltBrevFormValues>();
    const mottakerIdent = watch(SendManueltBrevFeltnavn.MOTTAKER_IDENT);
    return hentMottakersMålform(behandling.personer, mottakerIdent);
}
