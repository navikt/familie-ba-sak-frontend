import * as React from 'react';

import { hentDataFraRessursMedFallback, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { IFagsak } from '../../../typer/fagsak';
import { ILogg } from '../../../typer/logg';
import { formaterIsoDato, datoformat } from '../../../utils/formatter';
import Hendelsesoversikt from '../../Felleskomponenter/Hendelsesoversikt/Hendelsesoversikt';
import { Hendelse } from '../../Felleskomponenter/Hendelsesoversikt/typer';
import Behandlingskort from '../Behandlingskort/Behandlingskort';

interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();
    const { logg, hentLogg } = useFagsakRessurser();

    React.useEffect(() => {
        if (åpenBehandling && åpenBehandling.status === RessursStatus.SUKSESS) {
            hentLogg(åpenBehandling.data.behandlingId);
        }
    }, [åpenBehandling]);

    return åpenBehandling.status === RessursStatus.SUKSESS ? (
        <div className={'høyremeny'}>
            <Behandlingskort fagsak={fagsak} åpenBehandling={åpenBehandling.data} />
            <Hendelsesoversikt
                hendelser={hentDataFraRessursMedFallback(logg, []).map(
                    (loggElement: ILogg): Hendelse => {
                        return {
                            id: loggElement.id.toString(),
                            dato: formaterIsoDato(
                                loggElement.opprettetTidspunkt,
                                datoformat.DATO_TID
                            ),
                            utførtAv: loggElement.opprettetAv,
                            rolle: loggElement.rolle,
                            tittel: loggElement.tittel,
                            beskrivelse: loggElement.tekst,
                        };
                    }
                )}
                fagsak={fagsak}
                åpenBehandling={åpenBehandling.data}
            />
        </div>
    ) : null;
};

export default Høyremeny;
