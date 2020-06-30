import classNames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { BehandlingResultat } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';

interface IBehandlingskortProps {
    fagsak: IFagsak;
}

const Behandlingskort: React.FC<IBehandlingskortProps> = ({ fagsak }) => {
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    console.log(aktivBehandling);

    const behandlingsresultat = () => {
        if (aktivBehandling) {
            if (aktivBehandling.samletResultat === BehandlingResultat.INNVILGET) {
                return 'innvilget';
            } else if (
                aktivBehandling.samletResultat === BehandlingResultat.AVSLÅTT ||
                aktivBehandling.samletResultat === BehandlingResultat.OPPHØRT
            ) {
                return 'avslått';
            }
            return 'ikkeVurdert';
        }
        return '';
    };

    const antallBehandlinger = fagsak.behandlinger.length;
    const aktivBehandlingIndex = fagsak.behandlinger.findIndex(() => aktivBehandling) + 1;
    const headerText =
        aktivBehandling?.type + ' (' + aktivBehandlingIndex + '/' + antallBehandlinger + ')';

    return (
        <div className={'behandlingskort'}>
            <div className={classNames('behandlingskort__box', behandlingsresultat())}>
                <div className={'behandlingskort__box--header'}>
                    <Normaltekst>{headerText}</Normaltekst>
                </div>
            </div>
        </div>
    );
};

export default Behandlingskort;
