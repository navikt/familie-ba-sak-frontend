import React, { type PropsWithChildren } from 'react';

import { delay, http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, type MockInstance, vi } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { AInntektNy } from './AInntektNy';
import { FeilmeldingModal } from '../../../../../komponenter/Modal/fagsak/FeilmeldingModal';
import { server } from '../../../../../testutils/mocks/node';
import { lagFagsak } from '../../../../../testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '../../../../../testutils/testrender';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakProvider } from '../../../FagsakContext';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
}

function Wrapper({ fagsak = lagFagsak(), children }: WrapperProps) {
    return (
        <TestProviders>
            <FeilmeldingModal />
            <FagsakProvider fagsak={fagsak}>
                <ActionMenu open={true}>
                    <ActionMenu.Content>{children}</ActionMenu.Content>
                </ActionMenu>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('AInntektNy', () => {
    let windowOpenSpy: MockInstance;

    beforeEach(() => {
        windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
        windowOpenSpy.mockRestore();
    });

    test('skal rendre komponent', () => {
        const { screen } = render(<AInntektNy />, { wrapper: Wrapper });

        expect(screen.getByRole('menuitem', { name: 'A-Inntekt' })).toBeInTheDocument();
    });

    test('skal vise loader når man trykker på a-inntekt', async () => {
        server.use(
            http.post('/familie-ba-sak/api/a-inntekt/hent-url', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs('url'));
            })
        );

        const { screen, user } = render(<AInntektNy />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        const loader = await screen.findByTestId('loader');
        expect(loader).toBeInTheDocument();

        expect(windowOpenSpy).not.toHaveBeenCalledOnce();
    });

    test('skal kunne åpne a-inntekt', async () => {
        const { screen, user } = render(<AInntektNy />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        expect(windowOpenSpy).toHaveBeenCalledOnce();
    });

    test('skal vise feilmeldingsmodal hvis kallet mot a-inntekt feiler', async () => {
        server.use(
            http.post('/familie-ba-sak/api/a-inntekt/hent-url', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { screen, user } = render(<AInntektNy />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        expect(screen.getByRole('dialog', { name: 'Det har oppstått en feil' })).toBeInTheDocument();
        expect(screen.getByText('Vi får ikke hentet informasjon fra A-inntekt akkurat nå.')).toBeInTheDocument();

        expect(windowOpenSpy).not.toHaveBeenCalledOnce();
    });
});
