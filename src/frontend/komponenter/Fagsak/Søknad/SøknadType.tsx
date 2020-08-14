import classNames from 'classnames';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandling';
import { ISøknadDTO } from '../../../typer/søknad';
import Sakstype from '../../Felleskomponenter/Sakstype/Sakstype';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøknadType: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();
    return (
        <PanelBase className={classNames('søknad__panel', 'panel--gra')}>
            <Undertittel children={'Hva har bruker søkt om?'} />
            <br />
            <Sakstype
                kategori={søknad.kategori}
                kategoriOnChange={(behandlingKategori: BehandlingKategori): void =>
                    settSøknadOgValider({
                        ...søknad,
                        kategori: behandlingKategori,
                    })
                }
                underkategori={søknad.underkategori}
                underkategoriOnChange={(behandlingUnderkategori: BehandlingUnderkategori): void =>
                    settSøknadOgValider({
                        ...søknad,
                        underkategori: behandlingUnderkategori,
                    })
                }
                erLesevisning={lesevisning}
            />
        </PanelBase>
    );
};

export default SøknadType;
