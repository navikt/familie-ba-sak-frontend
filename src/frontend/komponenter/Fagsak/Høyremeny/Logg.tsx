import * as React from 'react';

import { RessursStatus } from '../../../typer/ressurs';

import { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import { IBehandling } from '../../../typer/behandling';
import { ILogg } from '../../../typer/logg';
import { datoformat } from '../../../utils/formatter';
import moment from 'moment';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    aktivBehandling: IBehandling | undefined;
}

const Logg: React.FunctionComponent<IProps> = ({ aktivBehandling }) => {
    const { logg, hentLogg } = useFagsakRessurser();

    React.useEffect(() => {
        if (aktivBehandling) {
            hentLogg(aktivBehandling?.behandlingId);
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
