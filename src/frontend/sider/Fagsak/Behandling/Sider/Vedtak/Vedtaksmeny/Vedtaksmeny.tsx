import { useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { AngreSammensattKontrollsak } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/AngreSammensattKontrollsak';
import { OpprettSammensattKontrollsak } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/OpprettSammensattKontrollsak';
import { useSkalViseSammensattKontrollsakMenyvalg } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/useSkalViseSammensattKontrollsakMenyvalg';
import { Behandlingstype } from '@typer/behandling';
import { BehandlingKategori } from '@typer/behandlingstema';
import { FagsakType } from '@typer/fagsak';
import { vedtakHarFortsattUtbetaling } from '@utils/vedtakUtils';

import { CalculatorIcon, ChevronDownIcon, StarsEuIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Stack } from '@navikt/ds-react';

import Styles from './Vedtaksmeny.module.css';
import EndreEndringstidspunkt from '../endringstidspunkt/EndreEndringstidspunkt';
import { OppdaterEndringstidspunktModal } from '../endringstidspunkt/OppdaterEndringstidspunktModal';
import { useFeilutbetaltValutaTabellContext } from '../FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import KorrigerEtterbetaling from '../KorrigerEtterbetaling/KorrigerEtterbetaling';
import { KorrigerVedtak } from '../KorrigerVedtakModal/KorrigerVedtak';
import { KorrigerVedtakModal } from '../KorrigerVedtakModal/KorrigerVedtakModal';
import { useRefusjonEøsTabellContext } from '../RefusjonEøs/RefusjonEøsTabellContext';
import { useSammensattKontrollsakContext } from '../SammensattKontrollsak/SammensattKontrollsakContext';

export function Vedtaksmeny() {
    const { erFeilutbetaltValutaTabellSynlig, visFeilutbetaltValutaTabell } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig, visRefusjonEøsTabell } = useRefusjonEøsTabellContext();
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();

    const fagsak = useFagsak();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const visSammensattKontrollsakMenyvalg = useSkalViseSammensattKontrollsakMenyvalg();

    const fagsakType = fagsak.fagsakType;

    const [visKorrigerVedtakModal, settVisKorrigerVedtakModal] = useState<boolean>(false);
    const [visEndreEndringstidspunktModal, settVisEndreEndringstidspunktModal] = useState(false);

    return (
        <Stack width={'100%'} justify={'end'} align={'center'}>
            {visKorrigerVedtakModal && <KorrigerVedtakModal lukkModal={() => settVisKorrigerVedtakModal(false)} />}
            {visEndreEndringstidspunktModal && (
                <OppdaterEndringstidspunktModal lukkModal={() => settVisEndreEndringstidspunktModal(false)} />
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
                    <KorrigerVedtak åpneModal={() => settVisKorrigerVedtakModal(true)} />
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
                    {visSammensattKontrollsakMenyvalg &&
                        (sammensattKontrollsak ? (
                            <AngreSammensattKontrollsak sammensattKontrollsak={sammensattKontrollsak} />
                        ) : (
                            <OpprettSammensattKontrollsak />
                        ))}
                </ActionMenu.Content>
            </ActionMenu>
        </Stack>
    );
}
