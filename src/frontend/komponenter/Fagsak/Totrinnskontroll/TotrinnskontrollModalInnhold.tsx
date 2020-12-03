import * as React from 'react';

import IkkeOppfylt from '../../../ikoner/IkkeOppfylt';
import Oppfylt from '../../../ikoner/Oppfylt';
import { TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';

interface IProps {
    beslutning: TotrinnskontrollBeslutning;
}

const TotrinnskontrollModalInnhold: React.FunctionComponent<IProps> = ({ beslutning }) => {
    if (beslutning === TotrinnskontrollBeslutning.UNDERKJENT) {
        return (
            <div className={'totrinnsvurdering-modal-innhold'}>
                <IkkeOppfylt />
                <div className={'totrinnsvurdering-modal-tekst'}>
                    Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler
                </div>
            </div>
        );
    } else if (beslutning === TotrinnskontrollBeslutning.GODKJENT) {
        return (
            <div className={'totrinnsvurdering-modal-innhold'}>
                <Oppfylt />
                <div className={'totrinnsvurdering-modal-tekst'}>
                    Behandlingen er godkjent, og vedtaket er iverksatt
                </div>
            </div>
        );
    } else {
        return <p />;
    }
};

export default TotrinnskontrollModalInnhold;
