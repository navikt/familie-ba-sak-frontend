import * as React from 'react';

import styled from 'styled-components';

import {
    ArrowUndoIcon,
    CalculatorIcon,
    ChevronDownIcon,
    StarsEuIcon,
    TasklistStartIcon,
} from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import { ASpacing10 } from '@navikt/ds-tokens/dist/tokens';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import KorrigerEtterbetaling from './KorrigerEtterbetaling/KorrigerEtterbetaling';
import KorrigerVedtak from './KorrigerVedtakModal/KorrigerVedtak';
import { useSammensattKontrollsak } from './SammensattKontrollsak/useSammensattKontrollsak';
import EndreEndringstidspunkt from './VedtakBegrunnelserTabell/endringstidspunkt/EndreEndringstidspunkt';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { Behandlingstype, type IBehandling } from '../../../../../typer/behandling';
import { BehandlingKategori } from '../../../../../typer/behandlingstema';
import { FagsakType } from '../../../../../typer/fagsak';
import { vedtakHarFortsattUtbetaling } from '../../../../../utils/vedtakUtils';
import { useFagsakContext } from '../../../FagsakContext';

interface IVedtakmenyProps {
    åpenBehandling: IBehandling;
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
    visFeilutbetaltValuta,
    visRefusjonEøs,
}) => {
    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();
    const { vurderErLesevisning } = useBehandling();
    const {
        erSammensattKontrollsak,
        settErSammensattKontrollsak,
        skalViseSammensattKontrollsakMenyValg,
        slettSammensattKontrollsak,
        sammensattKontrollsak,
    } = useSammensattKontrollsak();

    const erLesevisning = vurderErLesevisning();

    const visSammensattKontrollsakMenyValg = skalViseSammensattKontrollsakMenyValg();

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
                        vedtakHarFortsattUtbetaling(åpenBehandling.resultat) && (
                            <Dropdown.Menu.List.Item onClick={visRefusjonEøs}>
                                <StarsEuIcon fontSize={'1.4rem'} />
                                Legg til refusjon EØS
                            </Dropdown.Menu.List.Item>
                        )}
                    {visSammensattKontrollsakMenyValg &&
                        (sammensattKontrollsak || erSammensattKontrollsak ? (
                            <Dropdown.Menu.List.Item onClick={slettSammensattKontrollsak}>
                                <ArrowUndoIcon fontSize={'1.4rem'} />
                                Angre sammensatt kontrollsak
                            </Dropdown.Menu.List.Item>
                        ) : (
                            <Dropdown.Menu.List.Item
                                onClick={() => settErSammensattKontrollsak(true)}
                            >
                                <TasklistStartIcon fontSize={'1.4rem'} />
                                Sammensatt kontrollsak
                            </Dropdown.Menu.List.Item>
                        ))}
                </Dropdown.Menu.List>
            </StyledDropdownMeny>
        </Dropdown>
    );
};

export default Vedtaksmeny;
