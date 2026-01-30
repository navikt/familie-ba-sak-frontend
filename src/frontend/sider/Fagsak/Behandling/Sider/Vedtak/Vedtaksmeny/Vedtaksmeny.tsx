import * as React from 'react';
import { useState } from 'react';

import { ArrowUndoIcon, CalculatorIcon, ChevronDownIcon, StarsEuIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Stack } from '@navikt/ds-react';

import Styles from './Vedtaksmeny.module.css';
import { Behandlingstype } from '../../../../../../typer/behandling';
import { BehandlingKategori } from '../../../../../../typer/behandlingstema';
import { FagsakType } from '../../../../../../typer/fagsak';
import { vedtakHarFortsattUtbetaling } from '../../../../../../utils/vedtakUtils';
import { useFagsakContext } from '../../../../FagsakContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import EndreEndringstidspunkt from '../endringstidspunkt/EndreEndringstidspunkt';
import { OppdaterEndringstidspunktModal } from '../endringstidspunkt/OppdaterEndringstidspunktModal';
import { useFeilutbetaltValutaTabellContext } from '../FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import KorrigerEtterbetaling from '../KorrigerEtterbetaling/KorrigerEtterbetaling';
import KorrigerVedtak from '../KorrigerVedtakModal/KorrigerVedtak';
import KorrigerVedtakModal from '../KorrigerVedtakModal/KorrigerVedtakModal';
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

    const [visKorrigerVedtakModal, settVisKorrigerVedtakModal] = React.useState<boolean>(false);
    const [visEndreEndringstidspunktModal, settVisEndreEndringstidspunktModal] = useState(false);

    return (
        <Stack width={'100%'} justify={'end'} align={'center'}>
            {visKorrigerVedtakModal && (
                <KorrigerVedtakModal
                    behandlingId={behandling.behandlingId}
                    korrigertVedtak={behandling.korrigertVedtak}
                    erLesevisning={erLesevisning}
                    lukkModal={() => settVisKorrigerVedtakModal(false)}
                />
            )}
            {visEndreEndringstidspunktModal && (
                <OppdaterEndringstidspunktModal
                    lukkModal={() => settVisEndreEndringstidspunktModal(false)}
                    behandlingId={behandling.behandlingId}
                />
            )}
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button size={'small'} variant={'secondary'} icon={<ChevronDownIcon />} iconPosition={'right'}>
                        Vedtaksmeny
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content className={Styles.menu}>
                    <KorrigerEtterbetaling
                        erLesevisning={erLesevisning}
                        korrigertEtterbetaling={behandling.korrigertEtterbetaling}
                        behandlingId={behandling.behandlingId}
                    />
                    <KorrigerVedtak
                        åpneModal={() => settVisKorrigerVedtakModal(true)}
                        korrigertVedtak={behandling.korrigertVedtak}
                    />
                    <EndreEndringstidspunkt åpneModal={() => settVisEndreEndringstidspunktModal(true)} />
                    {behandling.type === Behandlingstype.REVURDERING &&
                        behandling.kategori === BehandlingKategori.EØS &&
                        !erLesevisning &&
                        !erFeilutbetaltValutaTabellSynlig && (
                            <ActionMenu.Item onSelect={visFeilutbetaltValutaTabell}>
                                <CalculatorIcon fontSize={'1.4rem'} />
                                Legg til feilutbetalt valuta og sats
                            </ActionMenu.Item>
                        )}
                    {fagsakType === FagsakType.NORMAL &&
                        vedtakHarFortsattUtbetaling(behandling.resultat) &&
                        !erRefusjonEøsTabellSynlig && (
                            <ActionMenu.Item onSelect={visRefusjonEøsTabell}>
                                <StarsEuIcon fontSize={'1.4rem'} />
                                Legg til refusjon EØS
                            </ActionMenu.Item>
                        )}
                    {visSammensattKontrollsakMenyValg &&
                        (sammensattKontrollsak || erSammensattKontrollsak ? (
                            <ActionMenu.Item onSelect={slettSammensattKontrollsak}>
                                <ArrowUndoIcon fontSize={'1.4rem'} />
                                Angre sammensatt kontrollsak
                            </ActionMenu.Item>
                        ) : (
                            <ActionMenu.Item onSelect={() => settErSammensattKontrollsak(true)}>
                                <TasklistStartIcon fontSize={'1.4rem'} />
                                Sammensatt kontrollsak
                            </ActionMenu.Item>
                        ))}
                </ActionMenu.Content>
            </ActionMenu>
        </Stack>
    );
}
