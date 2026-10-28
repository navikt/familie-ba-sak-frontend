import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { lagBrevmottakerFagsak } from '@testutils/testdata/brevmottakerTestdata';
import { render } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerDetaljerFagsak } from './BrevmottakerDetaljerFagsak';

vi.mock('@hooks/useErLesevisningFagsak');
vi.mock('@sider/Fagsak/BrevmottakereFagsakContext');

const brevmottaker = lagBrevmottakerFagsak({ type: Brevmottakertype.VERGE, navn: 'Vera Verge' });
const slettBrevmottaker = vi.fn();

describe('BrevmottakerDetaljerFagsak', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useErLesevisningFagsak).mockReturnValue(false);
        vi.mocked(useBrevmottakereFagsakContext).mockReturnValue({
            brevmottakere: [brevmottaker],
            leggTilBrevmottaker: vi.fn(),
            slettBrevmottaker,
            slettAlleBrevmottakere: vi.fn(),
        });
    });

    test('skal vise brevmottakeren med fjern-knapp når man ikke er i lesevisning', () => {
        const { screen } = render(<BrevmottakerDetaljerFagsak brevmottaker={brevmottaker} />);

        expect(screen.getByRole('heading', { name: 'Verge' })).toBeInTheDocument();
        expect(screen.getByText('Vera Verge')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fjern verge' })).toBeInTheDocument();
    });

    test('skal ikke vise fjern-knapp i lesevisning', () => {
        vi.mocked(useErLesevisningFagsak).mockReturnValue(true);

        const { screen } = render(<BrevmottakerDetaljerFagsak brevmottaker={brevmottaker} />);

        expect(screen.getByText('Vera Verge')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Fjern verge' })).not.toBeInTheDocument();
    });

    test('skal slette brevmottakeren når man klikker på fjern-knappen', async () => {
        const { screen, user } = render(<BrevmottakerDetaljerFagsak brevmottaker={brevmottaker} />);

        await user.click(screen.getByRole('button', { name: 'Fjern verge' }));

        expect(slettBrevmottaker).toHaveBeenCalledExactlyOnceWith(brevmottaker);
    });
});
