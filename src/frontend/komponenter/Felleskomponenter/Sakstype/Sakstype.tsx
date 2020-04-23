import * as React from 'react';
import {
    BehandlingKategori,
    kategorier,
    underkategorier,
    BehandlingUnderkategori,
} from '../../../typer/behandling';
import SelectFelt from '../InputMedLesevisning/SelectFelt';
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
            <SelectFelt
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
            </SelectFelt>

            <br />
            <SelectFelt
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
            </SelectFelt>
        </>
    );
};

export default Sakstype;
