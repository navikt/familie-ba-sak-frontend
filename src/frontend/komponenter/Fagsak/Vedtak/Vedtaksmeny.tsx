import * as React from 'react';

import styled from 'styled-components';

import { Calculator, ExpandFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { NavdsSpacing10 } from '@navikt/ds-tokens/dist/tokens';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../typer/behandling';
import { ToggleNavn } from '../../../typer/toggles';
import KorrigerEtterbetaling from './KorrigerEtterbetaling/KorrigerEtterbetaling';
import EndreEndringstidspunkt from './VedtakBegrunnelserTabell/EndreEndringstidspunkt';

interface IVedtakmenyProps {
    åpenBehandling: IBehandling;
    erBehandlingMedVedtaksbrevutsending: boolean;
}

const KnappHøyreHjørne = styled(Button)`
    position: absolute;
    top: ${NavdsSpacing10};
    right: ${NavdsSpacing10};
`;

const StyledDropdownMeny = styled(Dropdown.Menu)`
    width: 36ch;
`;

const Vedtaksmeny: React.FunctionComponent<IVedtakmenyProps> = ({
    åpenBehandling,
    erBehandlingMedVedtaksbrevutsending,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const { toggles } = useApp();
    return (
        <Dropdown>
            <KnappHøyreHjørne
                forwardedAs={Dropdown.Toggle}
                size="small"
                variant="secondary"
                icon={<ExpandFilled />}
                iconPosition="right"
            >
                Vedtaksmeny
            </KnappHøyreHjørne>
            <StyledDropdownMeny>
                <Dropdown.Menu.List>
                    {erBehandlingMedVedtaksbrevutsending && (
                        <KorrigerEtterbetaling
                            erLesevisning={vurderErLesevisning()}
                            korrigertEtterbetaling={åpenBehandling.korrigertEtterbetaling}
                            behandlingId={åpenBehandling.behandlingId}
                        />
                    )}
                    {åpenBehandling.endringstidspunkt && (
                        <EndreEndringstidspunkt åpenBehandling={åpenBehandling} />
                    )}
                    {toggles[ToggleNavn.trekkILøpendeUtbetaling].valueOf() && (
                        <Dropdown.Menu.List.Item>
                            <Calculator />
                            Legg til trekk i løpende utbetaling
                        </Dropdown.Menu.List.Item>
                    )}
                </Dropdown.Menu.List>
            </StyledDropdownMeny>
        </Dropdown>
    );
};

export default Vedtaksmeny;
