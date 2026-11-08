import { useToastContext } from '@context/ToastContext';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOppdaterRegisteropplysninger } from '@hooks/useOppdaterRegisteropplysninger';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import type { IBehandling } from '@typer/behandling';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { OppdaterRegisteropplysninger } from './OppdaterRegisteropplysninger';
import { useVilkårsvurderingContext } from './VilkårsvurderingContext';

vi.mock('@context/ToastContext');
vi.mock('@hooks/useErLesevisning');
vi.mock('@hooks/useOppdaterRegisteropplysninger');
vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext');
vi.mock('./VilkårsvurderingContext');

const settToast = vi.fn();
const settÅpenBehandling = vi.fn();
const behandling = lagBehandling();

function mockOppdatering(oppdatertBehandling: IBehandling) {
    vi.mocked(useOppdaterRegisteropplysninger).mockImplementation(
        options =>
            ({
                mutate: (variables: { behandlingId: number }) =>
                    options?.onSuccess?.(oppdatertBehandling, variables, undefined, {} as never),
                isPending: false,
                error: null,
            }) as never
    );
}

describe('OppdaterRegisteropplysninger', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useErLesevisning).mockReturnValue(false);
        vi.mocked(useToastContext).mockReturnValue({ settToast } as never);
        vi.mocked(useBehandlingContext).mockReturnValue({ behandling, settÅpenBehandling } as never);
        vi.mocked(useVilkårsvurderingContext).mockReturnValue({ vilkårsvurdering: [] } as never);
    });

    test.each([
        [true, 'Registeropplysningene er oppdatert. Behandlingen er tilbakestilt til vilkårsvurdering.'],
        [false, 'Ingen endringer i registeropplysningene.'],
    ])('skal oppdatere behandlingen og gi beskjed når endret er %s', async (registeropplysningerErEndret, tekst) => {
        const oppdatertBehandling = lagBehandling({ registeropplysningerErEndret });
        mockOppdatering(oppdatertBehandling);

        render(<OppdaterRegisteropplysninger />);
        await userEvent.click(screen.getByRole('button', { name: 'Oppdater registeropplysninger' }));

        expect(settÅpenBehandling).toHaveBeenCalledWith(byggSuksessRessurs(oppdatertBehandling));
        expect(settToast).toHaveBeenCalledWith(ToastTyper.REGISTEROPPLYSNINGER_OPPDATERT, {
            alertType: AlertType.SUCCESS,
            tekst,
        });
    });
});
