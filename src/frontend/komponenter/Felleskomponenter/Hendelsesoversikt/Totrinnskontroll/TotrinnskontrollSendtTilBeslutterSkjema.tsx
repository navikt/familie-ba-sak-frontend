import * as React from 'react';

import styled from 'styled-components';

import { Normaltekst, Systemtittel, UndertekstBold } from 'nav-frontend-typografi';

import GrønnHake from '../../../../ikoner/GrønnHake';
import { IBehandling } from '../../../../typer/behandling';
import { datoformat, formaterIsoDato } from '../../../../utils/formatter';

interface IProps {
    åpenBehandling: IBehandling | undefined;
}

const StyledGrønnHake = styled(GrønnHake)`
    margin-right: 0.5rem;
`;

const TotrinnskontrollSendtTilBeslutterSkjema: React.FunctionComponent<IProps> = ({
    åpenBehandling,
}) => {
    const totrinnskontroll = åpenBehandling && åpenBehandling.totrinnskontroll;

    const saksbehandler = totrinnskontroll?.saksbehandler ?? 'UKJENT SAKSBEHANDLER';
    const opprettetTidspunkt = totrinnskontroll?.opprettetTidspunkt ?? undefined;

    return (
        <>
            <StyledGrønnHake />
            <div>
                <Systemtittel>Totrinnskontroll</Systemtittel>
                <br />
                <Normaltekst>
                    {formaterIsoDato(
                        opprettetTidspunkt,
                        datoformat.DATO_FORLENGET_MED_TID,
                        'UKJENT OPPRETTELSESTIDSPUNKT'
                    )}
                </Normaltekst>
                <Normaltekst>{saksbehandler}</Normaltekst>
                <br />
                <UndertekstBold>Vedtaket er sendt til godkjenning</UndertekstBold>
            </div>
        </>
    );
};

export default TotrinnskontrollSendtTilBeslutterSkjema;
