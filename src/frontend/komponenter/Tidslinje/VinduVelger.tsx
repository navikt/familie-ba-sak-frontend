import React from 'react';

import { ToggleGroup } from '@navikt/ds-react';

import { useTidslinjeContext } from './TidslinjeContext';

const Vinduvelger: React.FunctionComponent = () => {
    const { tidslinjeVinduer, endreTidslinjeVindu, aktivtTidslinjeVindu } = useTidslinjeContext();

    return (
        <ToggleGroup
            defaultValue={aktivtTidslinjeVindu.vindu.id.toString()}
            size="small"
            variant="neutral"
            onChange={vinduId => endreTidslinjeVindu(tidslinjeVinduer[Number(vinduId)])}
        >
            {tidslinjeVinduer.map(vindu => (
                <ToggleGroup.Item key={vindu.id} value={vindu.id.toString()}>
                    {vindu.label}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup>
    );
};

export default Vinduvelger;
