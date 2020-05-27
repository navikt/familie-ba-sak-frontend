import classNames from 'classnames';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandling';
import { IPar } from '../../../typer/common';
import { ISøknadDTO, søknadstyper, TypeSøker } from '../../../typer/søknad';
import FamilieSelect from '../../Felleskomponenter/InputMedLesevisning/FamilieSelect';
import Sakstype from '../../Felleskomponenter/Sakstype/Sakstype';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const SøknadType: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    return (
        <PanelBase className={classNames('søknad__panel', 'panel--gra')}>
            <Undertittel children={'1 Hva har bruker søkt om?'} />
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
                erLesevisning={erLesevisning()}
            />

            <br />

            <FamilieSelect
                name="type søker"
                label="Type søker"
                bredde={'l'}
                value={søknad.typeSøker}
                erLesevisning={erLesevisning()}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    if ((event.target.value as TypeSøker) === søknad.typeSøker) {
                        settSøknadOgValider({
                            ...søknad,
                            typeSøker: TypeSøker.ORDINÆR,
                        });
                    } else {
                        settSøknadOgValider({
                            ...søknad,
                            typeSøker: event.target.value as TypeSøker,
                        });
                    }
                }}
            >
                <option
                    aria-selected={TypeSøker.ORDINÆR === søknad.typeSøker}
                    key={TypeSøker.ORDINÆR}
                    value={TypeSøker.ORDINÆR}
                >
                    Velg type søker
                </option>
                {Object.values(søknadstyper)
                    .filter((type: IPar) => type.id !== TypeSøker.ORDINÆR)
                    .map((type: IPar) => {
                        return (
                            <option
                                aria-selected={type.id === søknad.typeSøker}
                                key={type.id}
                                value={type.id}
                            >
                                {type.navn}
                            </option>
                        );
                    })}
            </FamilieSelect>
        </PanelBase>
    );
};

export default SøknadType;
