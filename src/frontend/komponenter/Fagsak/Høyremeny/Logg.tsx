import * as React from 'react';

import { RessursStatus } from '../../../typer/ressurs';

import { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import { useHistory } from 'react-router-dom';
import { IBehandling } from '../../../typer/behandling';
import { ILogg } from '../../../typer/logg';
import { datoformat } from '../../../utils/formatter';
import moment from 'moment';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    åpenBehandling: IBehandling | undefined;
}

const Logg = ({ åpenBehandling }: IProps) => {
    const history = useHistory();
    const { logg, hentLogg } = useFagsakRessurser();

    React.useEffect(() => {
        if (åpenBehandling) {
            hentLogg(åpenBehandling?.behandlingId);
        }
    }, [history.location]);

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
