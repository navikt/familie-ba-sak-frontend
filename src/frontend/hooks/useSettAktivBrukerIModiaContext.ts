import { useMutation } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { settAktivBrukerIModiaContext } from '../api/settAktivBrukerIModiaContext';
import { useAppContext } from '../context/AppContext';
import { AlertType, ToastTyper } from '../komponenter/Toast/typer';

export function useSettAktivBrukerIModiaContext() {
    const { request } = useHttp();
    const { settToast } = useAppContext();
    return useMutation({
        mutationFn: (personIdent: string) => settAktivBrukerIModiaContext(request, personIdent),
        onError: () => {
            settToast(ToastTyper.KLARTE_IKKE_OPPDATERE_MODIA_KONTEKST, {
                alertType: AlertType.WARNING,
                tekst: 'Klarte ikke å oppdatere bruker i Modia.',
            });
        },
    });
}
