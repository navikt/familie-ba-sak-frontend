import {
    BrevmottakerDialogProvider,
    useBrevmottakerDialogContext,
} from '@komponenter/Brevmottaker/Behandling/Dialog/BrevmottakerDialogContext';
import { ActionMenu } from '@navikt/ds-react';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { BehandlingStatus, Behandlingstype, type IBehandling } from '@typer/behandling';
import { FagsakType, type IMinimalFagsak } from '@typer/fagsak';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';
import { LeggTilEllerFjernBrevmottakerPåBehandling } from './LeggTilEllerFjernBrevmottakerPåBehandling';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
    behandling?: IBehandling;
}

function DialogStatus() {
    const { erDialogÅpen } = useBrevmottakerDialogContext();
    return <output aria-label={'Dialogstatus'}>{erDialogÅpen ? 'Åpen' : 'Lukket'}</output>;
}

function Wrapper({ fagsak = lagFagsak(), behandling = lagBehandling(), children }: WrapperProps) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
                        <BrevmottakerDialogProvider>
                            <DialogStatus />
                            <ActionMenu open={true}>
                                <ActionMenu.Content>{children}</ActionMenu.Content>
                            </ActionMenu>
                        </BrevmottakerDialogProvider>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('LeggTilEllerFjernBrevmottakerPåBehandling', () => {
    test('skal rendre komponent', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponent med en brevmottaker allerede lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, {
            wrapper: props => (
                <Wrapper {...props} behandling={lagBehandling({ brevmottakere: [lagBrevmottakerBehandling()] })} />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Legg til eller fjern brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponent med flere brevmottakere allerede lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        brevmottakere: [lagBrevmottakerBehandling({ id: 1 }), lagBrevmottakerBehandling({ id: 2 })],
                    })}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Se eller fjern brevmottakere' })).toBeInTheDocument();
    });

    test('skal ikke rendre komponent hvis man er i lesevisning og ingen brevmottakere er lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, {
            wrapper: props => (
                <Wrapper {...props} behandling={lagBehandling({ status: BehandlingStatus.SATT_PÅ_VENT })} />
            ),
        });
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    test('skal ikke rendre komponent hvis fagsaktypen er institusjon', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, {
            wrapper: props => <Wrapper {...props} fagsak={lagFagsak({ fagsakType: FagsakType.INSTITUSJON })} />,
        });
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    test('skal ikke rendre komponent hvis behandlingen ikke har en relevant behandlingstype', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, {
            wrapper: props => (
                <Wrapper {...props} behandling={lagBehandling({ type: Behandlingstype.TEKNISK_ENDRING })} />
            ),
        });
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    test('skal rendre komponent hvis man er i lesevisning men behandlingen har brevmottakere lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    behandling={lagBehandling({
                        status: BehandlingStatus.SATT_PÅ_VENT,
                        brevmottakere: [lagBrevmottakerBehandling()],
                    })}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Se brevmottaker' })).toBeInTheDocument();
    });

    test('skal åpne dialog ved klikk', async () => {
        const { screen, user } = render(<LeggTilEllerFjernBrevmottakerPåBehandling />, { wrapper: Wrapper });

        expect(screen.getByRole('status', { name: 'Dialogstatus' })).toHaveTextContent('Lukket');

        await user.click(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' }));

        expect(screen.getByRole('status', { name: 'Dialogstatus' })).toHaveTextContent('Åpen');
    });
});
