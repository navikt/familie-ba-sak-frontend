import * as React from 'react';

import styled from 'styled-components';

import { ExpandFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { NavdsSpacing10 } from '@navikt/ds-tokens/dist/tokens';

const KnappHøyreHjørne = styled(Button)`
    position: absolute;
    top: ${NavdsSpacing10};
    right: ${NavdsSpacing10};
`;

const Vedtaksmeny: React.FunctionComponent = () => {
    return (
        <Dropdown>
            <KnappHøyreHjørne
                forwardedAs={Dropdown.Toggle}
                size="small"
                variant="secondary"
                icon={<ExpandFilled />}
                iconPosition="right"
            >
                Vedtak
            </KnappHøyreHjørne>
            <Dropdown.Menu>
                <Dropdown.Menu.List>
                    <Dropdown.Menu.List.Item>Test</Dropdown.Menu.List.Item>
                    <Dropdown.Menu.List.Item>Test</Dropdown.Menu.List.Item>
                </Dropdown.Menu.List>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Vedtaksmeny;
