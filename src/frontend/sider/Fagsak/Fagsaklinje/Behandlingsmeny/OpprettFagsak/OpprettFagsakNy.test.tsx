import React, { type PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { OpprettFagsakNy } from './OpprettFagsakNy';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { OpprettFagsakModal } from '../../../../../komponenter/Modal/fagsak/OpprettFagsakModal';
import { FagsakTestdata } from '../../../../../testutils/testdata/fagsakTestdata';
import { PersonTestdata } from '../../../../../testutils/testdata/personTestdata';
import { render, TestProviders } from '../../../../../testutils/testrender';
import { BrukerProvider } from '../../../BrukerContext';
import { FagsakProvider } from '../../../FagsakContext';

function OpprettFagsakModalWrapper() {
    const { erModalÅpen } = useModal(ModalType.OPPRETT_FAGSAK);
    if (!erModalÅpen) {
        return null;
    }
    return <OpprettFagsakModal />;
}

function Wrapper({ children }: PropsWithChildren) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={FagsakTestdata.lagFagsak()}>
                <BrukerProvider bruker={PersonTestdata.lagPerson()}>
                    <OpprettFagsakModalWrapper />
                    <ActionMenu open={true}>
                        <ActionMenu.Content>{children}</ActionMenu.Content>
                    </ActionMenu>
                </BrukerProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('OpprettFagsakNy', () => {
    test('skal rendre komponenten som forventet', () => {
        const { screen } = render(<OpprettFagsakNy />, { wrapper: Wrapper });

        expect(screen.getByRole('menuitem', { name: 'Opprett ny fagsak' })).toBeInTheDocument();
    });

    test('skal kunne åpne opprett fagsak modal', async () => {
        const { screen, user } = render(<OpprettFagsakNy />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'Opprett ny fagsak' });
        await user.click(knapp);

        expect(screen.getByRole('dialog', { name: 'Opprett fagsak' })).toBeInTheDocument();
    });
});
