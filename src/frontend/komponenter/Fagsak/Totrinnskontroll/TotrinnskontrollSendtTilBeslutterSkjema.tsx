import * as React from 'react';

import { Normaltekst, Systemtittel, UndertekstBold } from 'nav-frontend-typografi';

import GrønnHake from '../../../ikoner/GrønnHake';
import { IBehandling } from '../../../typer/behandling';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';

interface IProps {
    åpenBehandling: IBehandling | undefined;
}

const TotrinnskontrollSendtTilBeslutterSkjema: React.FunctionComponent<IProps> = ({
    åpenBehandling,
}) => {
    const totrinnskontroll = åpenBehandling && åpenBehandling.totrinnskontroll;

    const saksbehandler = totrinnskontroll?.saksbehandler ?? 'UKJENT SAKSBEHANDLER';
    const opprettetTidspunkt = totrinnskontroll?.opprettetTidspunkt ?? undefined;

    return (
        <div className="totrinnskontroll">
            <div className="totrinnskontroll-sendt-til-beslutter-skjema">
                <div className="ikon-boks">
                    <GrønnHake className="ikon" />
                </div>
                <div className="totrinnskontroll-sendt-til-beslutter-skjema__tittel">
                    <Systemtittel>Totrinnskontroll</Systemtittel>
                </div>
                <div className="totrinnskontroll-sendt-til-beslutter-skjema__dato-og-navn ">
                    <Normaltekst>
                        {formaterIsoDato(
                            opprettetTidspunkt,
                            datoformat.DATO_FORLENGET_MED_TID,
                            'UKJENT OPPRETTELSESTIDSPUNKT'
                        )}
                    </Normaltekst>
                    <Normaltekst>{saksbehandler}</Normaltekst>
                </div>
                <UndertekstBold>Vedtaket er sendt til godkjenning</UndertekstBold>
            </div>
        </div>
    );
};

export default TotrinnskontrollSendtTilBeslutterSkjema;
