import * as React from 'react';
import { ISøknadDTO, søknadstyper, TypeSøker } from '../../../typer/søknad';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import Sakstype from '../../Felleskomponenter/Sakstype/Sakstype';
import { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandling';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { IPar } from '../../../typer/common';
import classNames from 'classnames';

interface IProps {
    settSøknad: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøknadType: React.FunctionComponent<IProps> = ({ settSøknad, søknad }) => {
    return (
        <PanelBase className={classNames('søknad__panel', 'panel--gra')}>
            <Undertittel children={'1 Hva har bruker søkt om?'} />
            <br />
            <Sakstype
                kategori={søknad.kategori}
                kategoriOnChange={(behandlingKategori: BehandlingKategori) =>
                    settSøknad({
                        ...søknad,
                        kategori: behandlingKategori,
                    })
                }
                underkategori={søknad.underkategori}
                underkategoriOnChange={(behandlingUnderkategori: BehandlingUnderkategori) =>
                    settSøknad({
                        ...søknad,
                        underkategori: behandlingUnderkategori,
                    })
                }
            />

            <br />
            <RadioPanelGruppe
                name="behandlingresultat"
                legend="Søknadstype"
                radios={Object.values(søknadstyper).map((type: IPar) => {
                    return {
                        label: type.navn,
                        value: type.id,
                        id: type.id,
                        checked: søknad.typeSøker === type.id,
                    };
                })}
                onChange={(event: any) => {
                    settSøknad({
                        ...søknad,
                        typeSøker: event.target.value as TypeSøker,
                    });
                }}
            />
        </PanelBase>
    );
};

export default SøknadType;
