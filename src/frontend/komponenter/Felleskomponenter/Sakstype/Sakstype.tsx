import * as React from 'react';
import {
    BehandlingKategori,
    kategorier,
    underkategorier,
    BehandlingUnderkategori,
} from '../../../typer/behandling';
import SelectLesbar from '../InputMedLesevisning/SelectLesbar';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    kategori: BehandlingKategori;
    kategoriOnChange: (behandlingKategori: BehandlingKategori) => void;
    underkategori: BehandlingUnderkategori;
    underkategoriOnChange: (value: BehandlingUnderkategori) => void;
}
const Sakstype: React.FunctionComponent<IProps> = ({
    kategori,
    kategoriOnChange,
    underkategori,
    underkategoriOnChange,
}) => {
    const { erLesevisning } = useFagsakRessurser();
    return (
        <>
            <SelectLesbar
                visLeseversjon={erLesevisning()}
                bredde={'l'}
                label="Kategori"
                onChange={event => kategoriOnChange(event.target.value as BehandlingKategori)}
                value={kategori}
            >
                {Object.keys(kategorier).map((key: string) => {
                    return (
                        <option aria-selected={kategori === key} key={key} value={key}>
                            {kategorier[key].navn}
                        </option>
                    );
                })}
            </SelectLesbar>

            <br />
            <SelectLesbar
                visLeseversjon={erLesevisning()}
                bredde={'l'}
                label="Underkategori"
                onChange={event =>
                    underkategoriOnChange(event.target.value as BehandlingUnderkategori)
                }
                value={underkategori}
            >
                {Object.keys(underkategorier).map((key: string) => {
                    return (
                        <option aria-selected={underkategori === key} key={key} value={key}>
                            {underkategorier[key].navn}
                        </option>
                    );
                })}
            </SelectLesbar>
        </>
    );
};

export default Sakstype;
