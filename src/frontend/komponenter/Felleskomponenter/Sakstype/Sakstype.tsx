import * as React from 'react';
import { Select } from 'nav-frontend-skjema';
import {
    BehandlingKategori,
    kategorier,
    Behandlingstype,
    underkategorier,
    BehandlingUnderkategori,
} from '../../../typer/behandling';

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
    return (
        <>
            <Select
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
            </Select>

            <br />
            <Select
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
            </Select>
        </>
    );
};

export default Sakstype;
