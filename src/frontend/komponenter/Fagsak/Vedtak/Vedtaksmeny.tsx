import * as React from 'react';

import styled from 'styled-components';

import { Calender, ExpandFilled, Notes } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { NavdsSpacing10 } from '@navikt/ds-tokens/dist/tokens';

import type { IBehandling } from '../../../typer/behandling';

interface IVedtakmenyProps {
    åpenBehandling: IBehandling;
}

const KnappHøyreHjørne = styled(Button)`
    position: absolute;
    top: ${NavdsSpacing10};
    right: ${NavdsSpacing10};
`;

const StyledDropdownMeny = styled(Dropdown.Menu)`
    width: 36ch;
`;

const Vedtaksmeny: React.FunctionComponent<IVedtakmenyProps> = ({ åpenBehandling }) => {
    console.log(åpenBehandling);
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
            <StyledDropdownMeny>
                <Dropdown.Menu.List>
                    <Dropdown.Menu.List.Item>
                        <Calender />
                        Legg til trekk i løpende utbetaling
                    </Dropdown.Menu.List.Item>
                    <Dropdown.Menu.List.Item>
                        <Notes />
                        Korriger etterbetaling i vedtak
                    </Dropdown.Menu.List.Item>
                    {åpenBehandling.endringstidspunkt && (
                        <Dropdown.Menu.List.Item>
                            <Calender />
                            Oppdater endringstidspunkt
                        </Dropdown.Menu.List.Item>
                    )}
                </Dropdown.Menu.List>
            </StyledDropdownMeny>
        </Dropdown>
    );
};

export default Vedtaksmeny;