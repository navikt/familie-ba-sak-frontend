import * as React from 'react';

import styled from 'styled-components';

import { CalculatorIcon, ChevronDownIcon, StarsEuIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import { ASpacing10 } from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import KorrigerEtterbetaling from './KorrigerEtterbetaling/KorrigerEtterbetaling';
import KorrigerVedtak from './KorrigerVedtakModal/KorrigerVedtak';
import EndreEndringstidspunkt from './VedtakBegrunnelserTabell/endringstidspunkt/EndreEndringstidspunkt';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import { BehandlingStatus, type IBehandling } from '../../../typer/behandling';
import { Behandlingstype } from '../../../typer/behandling';
import { BehandlingKategori } from '../../../typer/behandlingstema';
import { FagsakType } from '../../../typer/fagsak';
import { vedtakHarFortsattUtbetaling } from '../../../utils/vedtakUtils';

interface IVedtakmenyProps {
    åpenBehandling: IBehandling;
    erBehandlingMedVedtaksbrevutsending: boolean;
    visFeilutbetaltValuta: () => void;
    visRefusjonEøs: () => void;
}

const KnappHøyreHjørne = styled(Button)`
    position: absolute;
    top: ${ASpacing10};
    right: ${ASpacing10};
`;

const StyledDropdownMeny = styled(Dropdown.Menu)`
    width: 36ch;
`;

const Vedtaksmeny: React.FunctionComponent<IVedtakmenyProps> = ({
    åpenBehandling,
    erBehandlingMedVedtaksbrevutsending,
    visFeilutbetaltValuta,
    visRefusjonEøs,
}) => {
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();
    const { vurderErLesevisning } = useBehandling();

    const erLesevisning = vurderErLesevisning();

    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);
    const fagsakType = minimalFagsak?.fagsakType;

    return (
        <Dropdown>
            <KnappHøyreHjørne
                forwardedAs={Dropdown.Toggle}
                size="small"
                variant="secondary"
                icon={<ChevronDownIcon />}
                iconPosition="right"
            >
                Vedtaksmeny
            </KnappHøyreHjørne>
            <StyledDropdownMeny>
                <Dropdown.Menu.List>
                    {erBehandlingMedVedtaksbrevutsending && (
                        <>
                            <KorrigerEtterbetaling
                                erLesevisning={erLesevisning}
                                korrigertEtterbetaling={åpenBehandling.korrigertEtterbetaling}
                                behandlingId={åpenBehandling.behandlingId}
                            />
                            <KorrigerVedtak
                                erLesevisning={erLesevisning}
                                korrigertVedtak={åpenBehandling.korrigertVedtak}
                                behandlingId={åpenBehandling.behandlingId}
                            />
                        </>
                    )}

                    <EndreEndringstidspunkt åpenBehandling={åpenBehandling} />
                    {åpenBehandling.type === Behandlingstype.REVURDERING &&
                        åpenBehandling.kategori === BehandlingKategori.EØS &&
                        !erLesevisning && (
                            <Dropdown.Menu.List.Item onClick={visFeilutbetaltValuta}>
                                <CalculatorIcon fontSize={'1.4rem'} />
                                Legg til feilutbetalt valuta og sats
                            </Dropdown.Menu.List.Item>
                        )}
                    {fagsakType === FagsakType.NORMAL &&
                        vedtakHarFortsattUtbetaling(åpenBehandling.resultat) &&
                        åpenBehandling.status != BehandlingStatus.AVSLUTTET && (
                            <Dropdown.Menu.List.Item onClick={visRefusjonEøs}>
                                <StarsEuIcon fontSize={'1.4rem'} />
                                Legg til refusjon EØS
                            </Dropdown.Menu.List.Item>
                        )}
                </Dropdown.Menu.List>
            </StyledDropdownMeny>
        </Dropdown>
    );
};

export default Vedtaksmeny;
