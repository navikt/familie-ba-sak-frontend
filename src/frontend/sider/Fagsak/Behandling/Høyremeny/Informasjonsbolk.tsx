import * as React from 'react';

import { BodyShort, HGrid } from '@navikt/ds-react';
import { ATextDefault } from '@navikt/ds-tokens/dist/tokens';

interface IProps {
    label: string;
    tekst: string;
    tekstHover?: string;
    tekstFarge?: string;
}

const Informasjonsbolk: React.FC<IProps> = ({ label, tekst, tekstHover, tekstFarge }) => {
    return (
        <HGrid columns={2}>
            <BodyShort>{label}</BodyShort>
            <BodyShort
                weight="semibold"
                style={{ color: tekstFarge ?? ATextDefault }}
                title={tekstHover}
            >
                {tekst}
            </BodyShort>
        </HGrid>
    );
};

export default Informasjonsbolk;
