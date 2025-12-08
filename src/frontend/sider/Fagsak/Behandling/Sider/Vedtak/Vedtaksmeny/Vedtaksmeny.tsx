import * as React from 'react';

import { ArrowUndoIcon, CalculatorIcon, ChevronDownIcon, StarsEuIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { Button, Dropdown, Stack } from '@navikt/ds-react';

import Styles from './Vedtaksmeny.module.css';
import { Behandlingstype } from '../../../../../../typer/behandling';
import { BehandlingKategori } from '../../../../../../typer/behandlingstema';
import { FagsakType } from '../../../../../../typer/fagsak';
import { vedtakHarFortsattUtbetaling } from '../../../../../../utils/vedtakUtils';
import { useFagsakContext } from '../../../../FagsakContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import EndreEndringstidspunkt from '../endringstidspunkt/EndreEndringstidspunkt';
import { useFeilutbetaltValutaTabellContext } from '../FeilutbetaltValutaNy/FeilutbetaltValutaTabellContext';
import KorrigerEtterbetaling from '../KorrigerEtterbetaling/KorrigerEtterbetaling';
import KorrigerVedtak from '../KorrigerVedtakModal/KorrigerVedtak';
import { useRefusjonEøsTabellContext } from '../RefusjonEøs/RefusjonEøsTabellContext';
import { useSammensattKontrollsakContext } from '../SammensattKontrollsak/SammensattKontrollsakContext';

export function Vedtaksmeny() {
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { erFeilutbetaltValutaTabellSynlig, visFeilutbetaltValutaTabell } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig, visRefusjonEøsTabell } = useRefusjonEøsTabellContext();

    const {
        erSammensattKontrollsak,
        settErSammensattKontrollsak,
        skalViseSammensattKontrollsakMenyValg,
        slettSammensattKontrollsak,
        sammensattKontrollsak,
    } = useSammensattKontrollsakContext();

    const erLesevisning = vurderErLesevisning();

    const visSammensattKontrollsakMenyValg = skalViseSammensattKontrollsakMenyValg();

    const fagsakType = fagsak.fagsakType;

    return (
        <Stack width={'100%'} justify={'end'} align={'center'}>
            <Dropdown>
                <Button
                    as={Dropdown.Toggle}
                    size={'small'}
                    variant={'secondary'}
                    icon={<ChevronDownIcon />}
                    iconPosition={'right'}
                >
                    Vedtaksmeny
                </Button>
                <Dropdown.Menu className={Styles.menu}>
                    <Dropdown.Menu.List>
                        <KorrigerEtterbetaling
                            erLesevisning={erLesevisning}
                            korrigertEtterbetaling={behandling.korrigertEtterbetaling}
                            behandlingId={behandling.behandlingId}
                        />
                        <KorrigerVedtak
                            erLesevisning={erLesevisning}
                            korrigertVedtak={behandling.korrigertVedtak}
                            behandlingId={behandling.behandlingId}
                        />
                        <EndreEndringstidspunkt åpenBehandling={behandling} />
                        {behandling.type === Behandlingstype.REVURDERING &&
                            behandling.kategori === BehandlingKategori.EØS &&
                            !erLesevisning &&
                            !erFeilutbetaltValutaTabellSynlig && (
                                <Dropdown.Menu.List.Item onClick={visFeilutbetaltValutaTabell}>
                                    <CalculatorIcon fontSize={'1.4rem'} />
                                    Legg til feilutbetalt valuta og sats
                                </Dropdown.Menu.List.Item>
                            )}
                        {fagsakType === FagsakType.NORMAL &&
                            vedtakHarFortsattUtbetaling(behandling.resultat) &&
                            !erRefusjonEøsTabellSynlig && (
                                <Dropdown.Menu.List.Item onClick={visRefusjonEøsTabell}>
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
                                <Dropdown.Menu.List.Item onClick={() => settErSammensattKontrollsak(true)}>
                                    <TasklistStartIcon fontSize={'1.4rem'} />
                                    Sammensatt kontrollsak
                                </Dropdown.Menu.List.Item>
                            ))}
                    </Dropdown.Menu.List>
                </Dropdown.Menu>
            </Dropdown>
        </Stack>
    );
}
