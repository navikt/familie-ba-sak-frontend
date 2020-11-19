import * as React from 'react';

import { hentDataFraRessursMedFallback } from '@navikt/familie-typer';

import { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import { IBehandling } from '../../../typer/behandling';
import { ILogg } from '../../../typer/logg';
import { datoformat } from '../../../utils/formatter';
import dayjs from 'dayjs';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    åpenBehandling: IBehandling | undefined;
}

const Logg = ({ åpenBehandling }: IProps) => {
    const { logg, hentLogg } = useFagsakRessurser();

    React.useEffect(() => {
        if (åpenBehandling) {
            hentLogg(åpenBehandling?.behandlingId);
        }
    }, [åpenBehandling]);

    return (
        <Hendelsesoversikt
            hendelser={hentDataFraRessursMedFallback(logg, []).map(
                (loggElement: ILogg): Hendelse => {
                    return {
                        id: loggElement.id.toString(),
                        dato: dayjs(loggElement.opprettetTidspunkt).format(datoformat.DATO_TID),
                        utførtAv: loggElement.opprettetAv,
                        rolle: loggElement.rolle,
                        tittel: loggElement.tittel,
                        beskrivelse: loggElement.tekst,
                    };
                }
            )}
        />
    );
};

export default Logg;
