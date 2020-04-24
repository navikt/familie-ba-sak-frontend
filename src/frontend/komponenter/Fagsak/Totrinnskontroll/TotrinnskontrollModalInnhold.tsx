import * as React from 'react';
import { TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';
import IkkeOppfylt from '../../../ikoner/IkkeOppfylt';
import Oppfylt from '../../../ikoner/Oppfylt';

interface IProps {
    beslutning: TotrinnskontrollBeslutning;
}

const TotrinnskontrollModalInnhold: React.FunctionComponent<IProps> = ({ beslutning }) => {
    if (beslutning === TotrinnskontrollBeslutning.UNDERKJENT) {
        return (
            <p className={'totrinnsvurdering-modal-innhold'}>
                <IkkeOppfylt />
                <p className={'totrinnsvurdering-modal-tekst'}>
                    Behandlingen er ikke godkjent og er sendt tilbake til beslutter
                </p>
            </p>
        );
    } else if (beslutning === TotrinnskontrollBeslutning.GODKJENT) {
        return (
            <p className={'totrinnsvurdering-modal-innhold'}>
                <Oppfylt />
                <p className={'totrinnsvurdering-modal-tekst'}>
                    Behandlingen er godkjent, og vedtaket iverksatt
                </p>
            </p>
        );
    } else {
        return <p />;
    }
};

export default TotrinnskontrollModalInnhold;
