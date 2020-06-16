import * as React from 'react';
import {
    BehandlingKategori,
    BehandlingUnderkategori,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { FamilieSelect } from '@navikt/familie-form-elements';

interface IProps {
    kategori: BehandlingKategori;
    kategoriOnChange: (behandlingKategori: BehandlingKategori) => void;
    underkategori: BehandlingUnderkategori;
    underkategoriOnChange: (value: BehandlingUnderkategori) => void;
    erLesevisning?: boolean;
}
const Sakstype: React.FunctionComponent<IProps> = ({
    kategori,
    kategoriOnChange,
    underkategori,
    underkategoriOnChange,
    erLesevisning = false,
}) => {
    return (
        <>
            <FamilieSelect
                bredde={'l'}
                label="Kategori"
                onChange={event => kategoriOnChange(event.target.value as BehandlingKategori)}
                value={kategori}
                erLesevisning={erLesevisning}
            >
                {Object.keys(kategorier).map((key: string) => {
                    return (
                        <option aria-selected={kategori === key} key={key} value={key}>
                            {kategorier[key].navn}
                        </option>
                    );
                })}
            </FamilieSelect>

            <br />
            <FamilieSelect
                bredde={'l'}
                label="Underkategori"
                onChange={event =>
                    underkategoriOnChange(event.target.value as BehandlingUnderkategori)
                }
                value={underkategori}
                erLesevisning={erLesevisning}
            >
                {Object.keys(underkategorier).map((key: string) => {
                    return (
                        <option aria-selected={underkategori === key} key={key} value={key}>
                            {underkategorier[key].navn}
                        </option>
                    );
                })}
            </FamilieSelect>
        </>
    );
};

export default Sakstype;
