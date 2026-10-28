import { settAktivBrukerIModiaContext } from '@api/settAktivBrukerIModiaContext';
import { useToastContext } from '@context/ToastContext';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { useMutation } from '@tanstack/react-query';

export function useSettAktivBrukerIModiaContext() {
    const { settToast } = useToastContext();
    return useMutation({
        mutationFn: (personIdent: string) => settAktivBrukerIModiaContext(personIdent),
        onError: () => {
            settToast(ToastTyper.KLARTE_IKKE_OPPDATERE_MODIA_KONTEKST, {
                alertType: AlertType.WARNING,
                tekst: 'Klarte ikke å oppdatere bruker i Modia.',
            });
        },
    });
}
