import * as React from 'react';

import IkkeOppfylt from '../../../../ikoner/IkkeOppfylt';
import Oppfylt from '../../../../ikoner/Oppfylt';
import { TotrinnskontrollBeslutning } from '../../../../typer/totrinnskontroll';

interface IProps {
    beslutning: TotrinnskontrollBeslutning;
}

const TotrinnskontrollModalInnhold: React.FunctionComponent<IProps> = ({ beslutning }) => {
    if (beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
        return (
            <div className={'totrinnsvurdering-modal-innhold'}>
                <IkkeOppfylt />
                <div className={'totrinnsvurdering-modal-tekst'}>
                    Beslutning er IKKE_VURDERT. Ta kontakt med barnetrygdteamet.
                </div>
            </div>
        );
    } else {
        return (
            <div className={'totrinnsvurdering-modal-innhold'}>
                <Oppfylt />
                <div className={'totrinnsvurdering-modal-tekst'}>
                    {beslutning === TotrinnskontrollBeslutning.GODKJENT
                        ? 'Behandlingen er godkjent, og vedtaket er iverksatt'
                        : 'Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler'}
                </div>
            </div>
        );
    }
};

export default TotrinnskontrollModalInnhold;
