import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Stack } from '@navikt/ds-react';
import { EndreEndringstidspunkt } from '@sider/Fagsak/Behandling/Sider/Vedtak/Endringstidspunkt/EndreEndringstidspunkt';
import { OppdaterEndringstidspunktModal } from '@sider/Fagsak/Behandling/Sider/Vedtak/Endringstidspunkt/OppdaterEndringstidspunktModal';
import { FeilutbetaltValuta } from '@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValuta';
import { useSkalViseFeilutbetaltValutaMenyvalg } from '@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/useSkalViseFeilutbetaltValutaMenyvalg';
import { KorrigerVedtak } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigerVedtak';
import { KorrigerVedtakModal } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigerVedtakModal';
import { RefusjonEøs } from '@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/RefusjonEøs';
import { useSkalViseRefusjonEøsMenyvalg } from '@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/useSkalViseRefusjonEøsMenyvalg';
import { AngreSammensattKontrollsak } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/AngreSammensattKontrollsak';
import { OpprettSammensattKontrollsak } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/OpprettSammensattKontrollsak';
import { useSkalViseSammensattKontrollsakMenyvalg } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/useSkalViseSammensattKontrollsakMenyvalg';
import { useState } from 'react';
import { KorrigerEtterbetaling } from '../KorrigerEtterbetaling/KorrigerEtterbetaling';
import { useSammensattKontrollsakContext } from '../SammensattKontrollsak/SammensattKontrollsakContext';
import Styles from './Vedtaksmeny.module.css';

export function Vedtaksmeny() {
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();

    const visFeilutbetaltValutaMenyvalg = useSkalViseFeilutbetaltValutaMenyvalg();
    const visRefusjonEøsMenyvalg = useSkalViseRefusjonEøsMenyvalg();
    const visSammensattKontrollsakMenyvalg = useSkalViseSammensattKontrollsakMenyvalg();

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
                    <KorrigerEtterbetaling />
                    <KorrigerVedtak åpneModal={() => settVisKorrigerVedtakModal(true)} />
                    <EndreEndringstidspunkt åpneModal={() => settVisEndreEndringstidspunktModal(true)} />
                    {visFeilutbetaltValutaMenyvalg && <FeilutbetaltValuta />}
                    {visRefusjonEøsMenyvalg && <RefusjonEøs />}
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
