import { Normaltekst, Systemtittel, UndertekstBold } from 'nav-frontend-typografi';
import * as React from 'react';
import GrønnHake from '../../../ikoner/GrønnHake';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';

interface IProps {
    ansvarligSaksbehandler: string | undefined;
    opprettetTidspunkt: string | undefined;
}
const TotrinnskontrollSendtTilBeslutterSkjema: React.FunctionComponent<IProps> = ({
    ansvarligSaksbehandler,
    opprettetTidspunkt,
}) => {
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
                        {formaterIsoDato(opprettetTidspunkt, datoformat.DATO_FORLENGET_MED_TID)}
                    </Normaltekst>
                    <Normaltekst>{ansvarligSaksbehandler}</Normaltekst>
                </div>
                <UndertekstBold>Vedtaket er sendt til godkjenning</UndertekstBold>
            </div>
        </div>
    );
};

export default TotrinnskontrollSendtTilBeslutterSkjema;
