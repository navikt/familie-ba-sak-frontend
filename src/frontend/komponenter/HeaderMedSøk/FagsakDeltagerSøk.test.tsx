import { søkFagsakDeltagere } from '@api/søkFagsakDeltagere';
import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { render } from '@testutils/testrender';
import generator from '@testutils/testverktøy/fnr/fnr-generator';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';
import { Route, Routes } from 'react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { FagsakDeltagerSøk } from './FagsakDeltagerSøk';

vi.mock('@api/søkFagsakDeltagere');
vi.mock('@hooks/useSkalObfuskereData');

afterEach(() => {
    vi.resetAllMocks();
});

const gyldigFnr = generator(new Date('2020-02-10')).next().value as string;

function lagFagsakDeltager(fagsakDeltager: Partial<IFagsakDeltager> = {}): IFagsakDeltager {
    return {
        navn: 'Søker Søkersen',
        ident: gyldigFnr,
        rolle: FagsakDeltagerRolle.Forelder,
        harTilgang: true,
        erEgenAnsatt: false,
        fagsakId: 1,
        ...fagsakDeltager,
    };
}

function OpprettFagsakModalStatus() {
    const { erModalÅpen, args } = useModal(ModalType.OPPRETT_FAGSAK);
    return erModalÅpen ? <p>Opprett fagsak for {args?.ident}</p> : null;
}

function FagsakDeltagerSøkMedRuter() {
    return (
        <Routes>
            <Route
                path={'/'}
                element={
                    <>
                        <FagsakDeltagerSøk />
                        <OpprettFagsakModalStatus />
                    </>
                }
            />
            <Route path={'/fagsak/:fagsakId/saksoversikt'} element={<p>Saksoversikt</p>} />
        </Routes>
    );
}

describe('FagsakDeltagerSøk', () => {
    test('skal søke automatisk og vise treff når et gyldig fødselsnummer tastes inn', async () => {
        // Arrange
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([lagFagsakDeltager()]);
        const { screen, user } = render(<FagsakDeltagerSøk />);

        // Act
        await user.type(screen.getByRole('searchbox'), gyldigFnr);

        // Assert
        expect(await screen.findByText(/Søker Søkersen/)).toBeInTheDocument();
        expect(søkFagsakDeltagere).toHaveBeenCalledTimes(1);
        expect(søkFagsakDeltagere).toHaveBeenCalledWith(gyldigFnr);
    });

    test('skal vise feilmeldingen fra API-et når søket feiler', async () => {
        // Arrange
        vi.mocked(søkFagsakDeltagere).mockRejectedValue(new Error('Du har ikke tilgang.'));
        const { screen, user } = render(<FagsakDeltagerSøk />);

        // Act
        await user.type(screen.getByRole('searchbox'), gyldigFnr);

        // Assert
        expect(await screen.findByText('Du har ikke tilgang.')).toBeInTheDocument();
    });

    test('skal vise valideringsfeil og ikke søke når et ugyldig fødselsnummer sendes inn', async () => {
        // Arrange
        const { screen, user } = render(<FagsakDeltagerSøk />);

        // Act
        await user.type(screen.getByRole('searchbox'), '12345678900{Enter}');

        // Assert
        expect(await screen.findByText('Ugyldig fødsels- eller d-nummer (11 siffer)')).toBeInTheDocument();
        expect(søkFagsakDeltagere).not.toHaveBeenCalled();
    });

    test('skal skjule navn når data skal obfuskeres', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(true);
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([lagFagsakDeltager()]);
        const { screen, user } = render(<FagsakDeltagerSøk />);

        // Act
        await user.type(screen.getByRole('searchbox'), gyldigFnr);

        // Assert
        expect(await screen.findByText(/Forelder/)).toBeInTheDocument();
        expect(screen.queryByText(/Søker Søkersen/)).not.toBeInTheDocument();
    });

    test('skal navigere til saksoversikten når et treff med fagsak velges', async () => {
        // Arrange
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([lagFagsakDeltager({ fagsakId: 42 })]);
        const { screen, user } = render(<FagsakDeltagerSøkMedRuter />);
        await user.type(screen.getByRole('searchbox'), gyldigFnr);

        // Act
        await user.click(await screen.findByText(/Søker Søkersen/));

        // Assert
        expect(await screen.findByText('Saksoversikt')).toBeInTheDocument();
    });

    test('skal åpne opprett fagsak når et treff uten fagsak velges', async () => {
        // Arrange
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([lagFagsakDeltager({ fagsakId: undefined })]);
        const { screen, user } = render(<FagsakDeltagerSøkMedRuter />);
        await user.type(screen.getByRole('searchbox'), gyldigFnr);

        // Act
        await user.click(await screen.findByText(/Søker Søkersen/));

        // Assert
        expect(await screen.findByText(`Opprett fagsak for ${gyldigFnr}`)).toBeInTheDocument();
    });
});
