import moment from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';

import Hendelsesoversikt, { Hendelse } from '@navikt/helse-frontend-hendelsesoversikt';

import { hentLoggForBehandling } from '../../../api/logg';
import { IBehandling } from '../../../typer/behandling';
import { ILogg } from '../../../typer/logg';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '../../../typer/ressurs';
import { datoformat } from '../../../utils/formatter';

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
