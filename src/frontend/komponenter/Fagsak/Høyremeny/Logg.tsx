import * as React from 'react';

import { Ressurs, RessursStatus, byggFeiletRessurs } from '../../../typer/ressurs';

import AlertStripe from 'nav-frontend-alertstriper';
import { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import { IBehandling } from '../../../typer/behandling';
import { ILogg } from '../../../typer/logg';
import { datoformat } from '../../../utils/formatter';
import { hentLoggForBehandling } from '../../../api/logg';
import moment from 'moment';

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
    }, [aktivBehandling?.steg]);

    return (
        <Hendelsesoversikt
            hendelser={
                logg.status === RessursStatus.SUKSESS
                    ? logg.data.map(
                          (loggElement: ILogg): Hendelse => {
                              return {
                                  id: loggElement.id.toString(),
                                  dato: moment(loggElement.opprettetTidspunkt).format(
                                      datoformat.DATO_TID
                                  ),
                                  utførtAv: loggElement.opprettetAv,
                                  rolle: loggElement.rolle,
                                  tittel: loggElement.tittel,
                                  beskrivelse: loggElement.tekst,
                              };
                          }
                      )
                    : []
            }
        />
    );
};

export default Logg;
