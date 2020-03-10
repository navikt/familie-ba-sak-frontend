import * as React from 'react';
import Hendelsesoversikt, {
    Hendelse,
    Hendelsetype,
} from '@navikt/helse-frontend-hendelsesoversikt';
import { RessursStatus, Ressurs, byggFeiletRessurs } from '../../../typer/ressurs';
import { ILogg } from '../../../typer/logg';
import AlertStripe from 'nav-frontend-alertstriper';
import moment from 'moment';
import { datoformat } from '../../../utils/formatter';
import { hentLoggForBehandling } from '../../../api/logg';
import { IBehandling } from '../../../typer/behandling';

interface IProps {
    aktivBehandling: IBehandling | undefined;
}

const Logg: React.FunctionComponent<IProps> = ({ aktivBehandling }) => {
    const [logg, settLogg] = React.useState<Ressurs<ILogg[]>>({
        status: RessursStatus.IKKE_HENTET,
    });

    React.useEffect(() => {
        if (aktivBehandling) {
            hentLoggForBehandling(aktivBehandling?.behandlingId)
                .then((hentetLogg: Ressurs<ILogg[]>) => {
                    settLogg(hentetLogg);
                })
                .catch(() => {
                    settLogg(byggFeiletRessurs('Ukjent feil ved lasting av logg'));
                });
        }
    }, [aktivBehandling?.behandlingId]);

    const hendelser =
        logg.status === RessursStatus.SUKSESS
            ? logg.data.map(
                  (loggElement: ILogg): Hendelse => {
                      return {
                          id: loggElement.id.toString(),
                          dato: moment(loggElement.opprettetTidspunkt).format(datoformat.DATO_TID),
                          navn: loggElement.tittel,
                          type: 0,
                          beskrivelse: loggElement.tekst,
                      };
                  }
              )
            : [];

    switch (logg.status) {
        case RessursStatus.SUKSESS:
            return (
                <div className={'logg'}>
                    <Hendelsesoversikt hendelser={hendelser} />
                </div>
            );
        case RessursStatus.HENTER:
            return <div />;
        case RessursStatus.FEILET:
            return <AlertStripe children={logg.melding} type={'feil'} />;
        default:
            return <div />;
    }
};

export default Logg;
