import {
    BrevmottakerDialogProvider,
    useBrevmottakerDialogContext,
} from '@komponenter/Brevmottaker/Felles/BrevmottakerDialogContext';
import { ActionMenu } from '@navikt/ds-react';
import { BrevmottakereFagsakProvider } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { lagBrevmottakerFagsak } from '@testutils/testdata/brevmottakerTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { BrevmottakerFagsak } from '@typer/brevmottaker';
import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';
import { LeggTilEllerFjernBrevmottakerPåFagsak } from './LeggTilEllerFjernBrevmottakerPåFagsak';

interface WrapperProps extends PropsWithChildren {
    pathname?: string;
    fagsak?: IMinimalFagsak;
    brevmottakere?: BrevmottakerFagsak[];
}

function DialogStatus() {
    const { erDialogÅpen } = useBrevmottakerDialogContext();
    return <output aria-label={'Dialogstatus'}>{erDialogÅpen ? 'Åpen' : 'Lukket'}</output>;
}

function Wrapper({
    pathname = '/fagsak/1/dokumentutsending',
    fagsak = lagFagsak(),
    brevmottakere = [],
    children,
}: WrapperProps) {
    return (
        <TestProviders initialEntries={[{ pathname }]}>
            <FagsakProvider fagsak={fagsak}>
                <BrevmottakereFagsakProvider initielleBrevmottakere={brevmottakere}>
                    <BrevmottakerDialogProvider>
                        <DialogStatus />
                        <ActionMenu open={true}>
                            <ActionMenu.Content>{children}</ActionMenu.Content>
                        </ActionMenu>
                    </BrevmottakerDialogProvider>
                </BrevmottakereFagsakProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('LeggTilEllerFjernBrevmottakerPåFagsak', () => {
    test('skal rendre komponent', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponent med en brevmottaker allerede lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, {
            wrapper: props => <Wrapper {...props} brevmottakere={[lagBrevmottakerFagsak()]} />,
        });
        expect(screen.getByRole('menuitem', { name: 'Legg til eller fjern brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponent med flere brevmottakere allerede lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, {
            wrapper: props => <Wrapper {...props} brevmottakere={[lagBrevmottakerFagsak(), lagBrevmottakerFagsak()]} />,
        });
        expect(screen.getByRole('menuitem', { name: 'Se eller fjern brevmottakere' })).toBeInTheDocument();
    });

    test('skal ikke rendre komponent hvis man ikke er på dokumentutsending', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, {
            wrapper: props => <Wrapper {...props} pathname={'/fagsak/1/saksoversikt'} />,
        });
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    test('skal ikke rendre komponent hvis man er i lesevisning og ingen brevmottakere er lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, {
            wrapper: props => <Wrapper {...props} fagsak={lagFagsak({ status: FagsakStatus.LÅST })} />,
        });
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    test('skal rendre komponent hvis man er i lesevisning men fagsaken har en brevmottaker lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    fagsak={lagFagsak({ status: FagsakStatus.LÅST })}
                    brevmottakere={[lagBrevmottakerFagsak()]}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Se brevmottaker' })).toBeInTheDocument();
    });

    test('skal rendre komponent hvis man er i lesevisning men fagsaken har flere brevmottakere lagt til', () => {
        const { screen } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    fagsak={lagFagsak({ status: FagsakStatus.LÅST })}
                    brevmottakere={[lagBrevmottakerFagsak(), lagBrevmottakerFagsak()]}
                />
            ),
        });
        expect(screen.getByRole('menuitem', { name: 'Se brevmottakere' })).toBeInTheDocument();
    });

    test('skal åpne dialog ved klikk', async () => {
        const { screen, user } = render(<LeggTilEllerFjernBrevmottakerPåFagsak />, { wrapper: Wrapper });

        expect(screen.getByRole('status', { name: 'Dialogstatus' })).toHaveTextContent('Lukket');

        await user.click(screen.getByRole('menuitem', { name: 'Legg til brevmottaker' }));

        expect(screen.getByRole('status', { name: 'Dialogstatus' })).toHaveTextContent('Åpen');
    });
});
