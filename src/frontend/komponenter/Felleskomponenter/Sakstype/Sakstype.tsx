import * as React from 'react';
import { BehandlingUnderkategori, underkategorier } from '../../../typer/behandling';
import { FamilieSelect } from '@navikt/familie-form-elements';

interface IProps {
    underkategori: BehandlingUnderkategori;
    underkategoriOnChange: (value: BehandlingUnderkategori) => void;
    erLesevisning?: boolean;
}
const Sakstype: React.FunctionComponent<IProps> = ({
    underkategori,
    underkategoriOnChange,
    erLesevisning = false,
}) => {
    return (
        <>
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
