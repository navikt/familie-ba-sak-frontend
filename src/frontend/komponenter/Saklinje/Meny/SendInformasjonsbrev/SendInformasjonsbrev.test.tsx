import type { PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { SendInformasjonsbrev } from './SendInformasjonsbrev';
import { FagsakProvider } from '../../../../sider/Fagsak/FagsakContext';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { lagSaksbehandler } from '../../../../testutils/testdata/saksbehandlerTestdata';
import { render, TestProviders } from '../../../../testutils/testrender';
import type { Saksbehandler } from '../../../../typer/saksbehandler';

interface WrapperProps extends PropsWithChildren {
    initialEntries?: [{ pathname: string }];
    saksbehandler?: Saksbehandler;
}

function Wrapper({
    initialEntries = [{ pathname: '/fagsak/1' }],
    saksbehandler = lagSaksbehandler(),
    children,
}: WrapperProps) {
    return (
        <TestProviders initialEntries={initialEntries} saksbehandler={saksbehandler}>
            <FagsakProvider fagsak={lagFagsak()}>
                <ActionMenu open={true}>
                    <ActionMenu.Content>{children}</ActionMenu.Content>
                </ActionMenu>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('SendInformasjonsbrev', () => {
    test('skal ikke vise komponenten hvis man befinner seg på dokumentutsending siden', () => {
        const { screen } = render(<SendInformasjonsbrev />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1/dokumentutsending' }]} />,
        });

        expect(screen.queryByRole('menuitem', { name: 'Send informasjonsbrev' })).not.toBeInTheDocument();
    });

    test('skal ikke vise komponenten om saksbehandler ikke har høy nok rolle', () => {
        const { screen } = render(<SendInformasjonsbrev />, {
            wrapper: props => (
                <Wrapper
                    {...props}
                    initialEntries={[{ pathname: '/fagsak/1' }]}
                    saksbehandler={lagSaksbehandler({ groups: ['93a26831-9866-4410-927b-74ff51a9107c'] })}
                />
            ),
        });

        expect(screen.queryByRole('menuitem', { name: 'Send informasjonsbrev' })).not.toBeInTheDocument();
    });

    test('skal vise komponenten som forventet', () => {
        const { screen } = render(<SendInformasjonsbrev />, {
            wrapper: props => <Wrapper {...props} initialEntries={[{ pathname: '/fagsak/1' }]} />,
        });

        expect(screen.getByRole('menuitem', { name: 'Send informasjonsbrev' })).toBeInTheDocument();
    });
});
