import * as React from 'react';

import { hentDataFraRessursMedFallback } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../context/FagsakContext';
import { IBehandling } from '../../../typer/behandling';
import { ILogg } from '../../../typer/logg';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';

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
                        dato: formaterIsoDato(loggElement.opprettetTidspunkt, datoformat.DATO_TID),
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
