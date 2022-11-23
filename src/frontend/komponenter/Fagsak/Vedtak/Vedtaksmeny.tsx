import * as React from 'react';

import styled from 'styled-components';

import { Calender, ExpandFilled, Notes } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { NavdsSpacing10 } from '@navikt/ds-tokens/dist/tokens';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../typer/behandling';
import KorrigerEtterbetalingModal from './KorrigerEtterbetalingModal/KorrigerEtterbetalingModal';
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

    const [visKorrigerEtterbetalingModal, setVisKorrigerEtterbetalingModal] =
        React.useState<boolean>(false);

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
                        <>
                            <Dropdown.Menu.List.Item
                                onClick={() => {
                                    setVisKorrigerEtterbetalingModal(true);
                                }}
                            >
                                <Notes />
                                {åpenBehandling.korrigertEtterbetaling ? (
                                    <>Vis korrigert etterbetaling</>
                                ) : (
                                    <>Korriger etterbetaling</>
                                )}
                            </Dropdown.Menu.List.Item>
                            <KorrigerEtterbetalingModal
                                erLesevisning={vurderErLesevisning()}
                                korrigertEtterbetaling={åpenBehandling.korrigertEtterbetaling}
                                behandlingId={åpenBehandling.behandlingId}
                                visModal={visKorrigerEtterbetalingModal}
                                onClose={() =>
                                    setVisKorrigerEtterbetalingModal(!visKorrigerEtterbetalingModal)
                                }
                            />
                        </>
                    )}
                    {åpenBehandling.endringstidspunkt && (
                        <EndreEndringstidspunkt åpenBehandling={åpenBehandling} />
                    )}
                </Dropdown.Menu.List>
            </StyledDropdownMeny>
        </Dropdown>
    );
};

export default Vedtaksmeny;
