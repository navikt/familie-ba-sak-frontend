import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { lagVedtaksperiodeMedBegrunnelser } from '@testutils/testdata/vedtaksperiodeTestdata';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { TilGodkjenning } from './TilGodkjenning';

const {
    useBehandlingContextMock,
    useSendtTilTotrinnskontrollModalContextMock,
    useFeilutbetaltValutaTabellContextMock,
    useRefusjonEøsTabellContextMock,
    useSammensattKontrollsakContextMock,
    useSimuleringContextMock,
    useVedtaksperioderContextMock,
    useSaksbehandlerMock,
    useSendVedtakTilBeslutterMock,
    sendVedtakTilBeslutterMock,
    invalidateQueriesMock,
} = vi.hoisted(() => ({
    useBehandlingContextMock: vi.fn(),
    useSendtTilTotrinnskontrollModalContextMock: vi.fn(),
    useFeilutbetaltValutaTabellContextMock: vi.fn(),
    useRefusjonEøsTabellContextMock: vi.fn(),
    useSammensattKontrollsakContextMock: vi.fn(),
    useSimuleringContextMock: vi.fn(),
    useVedtaksperioderContextMock: vi.fn(),
    useSaksbehandlerMock: vi.fn(),
    useSendVedtakTilBeslutterMock: vi.fn(),
    sendVedtakTilBeslutterMock: vi.fn(),
    invalidateQueriesMock: vi.fn(),
}));

vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext', () => ({
    useBehandlingContext: useBehandlingContextMock,
}));
vi.mock('@sider/Fagsak/Behandling/Sider/Vedtak/Totrinnskontroll/SendtTilTotrinnskontrollModalContext', () => ({
    useSendtTilTotrinnskontrollModalContext: useSendtTilTotrinnskontrollModalContextMock,
}));
vi.mock('@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext', () => ({
    useFeilutbetaltValutaTabellContext: useFeilutbetaltValutaTabellContextMock,
}));
vi.mock('@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext', () => ({
    useRefusjonEøsTabellContext: useRefusjonEøsTabellContextMock,
}));
vi.mock('@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext', () => ({
    useSammensattKontrollsakContext: useSammensattKontrollsakContextMock,
}));
vi.mock('@sider/Fagsak/Behandling/Sider/Simulering/SimuleringContext', () => ({
    useSimuleringContext: useSimuleringContextMock,
}));
vi.mock('@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/VedtaksperioderContext', () => ({
    useVedtaksperioderContext: useVedtaksperioderContextMock,
}));
vi.mock('@hooks/useSaksbehandler', () => ({ useSaksbehandler: useSaksbehandlerMock }));
vi.mock('@hooks/useSendVedtakTilBeslutter', () => ({ useSendVedtakTilBeslutter: useSendVedtakTilBeslutterMock }));
vi.mock('@tanstack/react-query', () => ({
    useQueryClient: () => ({ invalidateQueries: invalidateQueriesMock }),
}));

const settFeilmeldingMock = vi.fn();
const settÅpenBehandlingMock = vi.fn();
const åpneModalMock = vi.fn();

const defaultBehandling = lagBehandling({ årsak: BehandlingÅrsak.SØKNAD });
const defaultSaksbehandler = lagSaksbehandler({ enhet: '4833' });

beforeEach(() => {
    vi.clearAllMocks();

    useBehandlingContextMock.mockReturnValue({
        behandling: defaultBehandling,
        settÅpenBehandling: settÅpenBehandlingMock,
    });
    useSendtTilTotrinnskontrollModalContextMock.mockReturnValue({ åpneModal: åpneModalMock });
    useFeilutbetaltValutaTabellContextMock.mockReturnValue({ erLeggTilFeilutbetaltValutaFormÅpen: false });
    useRefusjonEøsTabellContextMock.mockReturnValue({ erLeggTilRefusjonEøsFormÅpen: false });
    useSammensattKontrollsakContextMock.mockReturnValue({ sammensattKontrollsak: undefined });
    useSimuleringContextMock.mockReturnValue({ behandlingErMigreringMedAvvikUtenforBeløpsgrenser: false });
    useVedtaksperioderContextMock.mockReturnValue({
        vedtaksperioder: [
            lagVedtaksperiodeMedBegrunnelser({ begrunnelser: [{ standardbegrunnelse: 'BEGRUNNELSE' } as never] }),
        ],
    });
    useSaksbehandlerMock.mockReturnValue(defaultSaksbehandler);
    useSendVedtakTilBeslutterMock.mockReturnValue({
        mutate: sendVedtakTilBeslutterMock,
        isPending: false,
    });
});

describe('TilGodkjenning', () => {
    test('skal sende vedtak til beslutter når alt er gyldig', async () => {
        // Arrange
        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith(undefined);
        expect(sendVedtakTilBeslutterMock).toHaveBeenCalledWith({
            behandlingId: defaultBehandling.behandlingId,
            behandlendeEnhet: defaultSaksbehandler.enhet,
        });
    });

    test('skal vise feilmelding når sammensatt kontrollsak mangler begrunnelse', async () => {
        // Arrange
        useSammensattKontrollsakContextMock.mockReturnValue({
            sammensattKontrollsak: { fritekst: '   ' },
        });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith('Sammensatt kontrollsak mangler en begrunnelse.');
        expect(sendVedtakTilBeslutterMock).not.toHaveBeenCalled();
    });

    test('skal vise feilmelding når det er lagt til en ny periode med feilutbetalt valuta som ikke er fylt ut', async () => {
        // Arrange
        useFeilutbetaltValutaTabellContextMock.mockReturnValue({ erLeggTilFeilutbetaltValutaFormÅpen: true });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith(
            'Det er lagt til en ny periode med feilutbetalt valuta. Fyll ut periode og beløp, eller fjern perioden.'
        );
        expect(sendVedtakTilBeslutterMock).not.toHaveBeenCalled();
    });

    test('skal vise feilmelding når det er lagt til en ny periode med refusjon EØS som ikke er fylt ut', async () => {
        // Arrange
        useRefusjonEøsTabellContextMock.mockReturnValue({ erLeggTilRefusjonEøsFormÅpen: true });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith(
            'Det er lagt til en ny periode med refusjon EØS. Fyll ut periode og refusjonsbeløp, eller fjern perioden.'
        );
        expect(sendVedtakTilBeslutterMock).not.toHaveBeenCalled();
    });

    test('skal vise feilmelding når vedtaksbrevet mangler begrunnelse og behandling ikke kan sendes inn uten', async () => {
        // Arrange
        useVedtaksperioderContextMock.mockReturnValue({
            vedtaksperioder: [lagVedtaksperiodeMedBegrunnelser()],
        });
        useBehandlingContextMock.mockReturnValue({
            behandling: lagBehandling({ årsak: BehandlingÅrsak.SØKNAD }),
            settÅpenBehandling: settÅpenBehandlingMock,
        });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith(
            'Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.'
        );
        expect(sendVedtakTilBeslutterMock).not.toHaveBeenCalled();
    });

    test('skal sende vedtak til beslutter uten begrunnelse når behandlingsårsak er teknisk endring', async () => {
        // Arrange
        useVedtaksperioderContextMock.mockReturnValue({ vedtaksperioder: [lagVedtaksperiodeMedBegrunnelser()] });
        useBehandlingContextMock.mockReturnValue({
            behandling: lagBehandling({ årsak: BehandlingÅrsak.TEKNISK_ENDRING }),
            settÅpenBehandling: settÅpenBehandlingMock,
        });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith(undefined);
        expect(sendVedtakTilBeslutterMock).toHaveBeenCalled();
    });

    test('skal sende vedtak til beslutter selv om begrunnelse mangler dersom sammensatt kontrollsak har fritekst', async () => {
        // Arrange
        useVedtaksperioderContextMock.mockReturnValue({ vedtaksperioder: [lagVedtaksperiodeMedBegrunnelser()] });
        useSammensattKontrollsakContextMock.mockReturnValue({
            sammensattKontrollsak: { fritekst: 'En gyldig begrunnelse' },
        });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Til godkjenning' }));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith(undefined);
        expect(sendVedtakTilBeslutterMock).toHaveBeenCalled();
    });

    test('skal vise knappen som loading når sendVedtakTilBeslutter er pending', () => {
        // Arrange
        useSendVedtakTilBeslutterMock.mockReturnValue({
            mutate: sendVedtakTilBeslutterMock,
            isPending: true,
        });

        // Act
        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Assert
        expect(screen.getByRole('button', { name: 'Venter…Til godkjenning' })).toBeDisabled();
    });

    test('skal vise "Bekreft migrering" når behandlingen er migrering fra Infotrygd og avviket ikke er utenfor beløpsgrenser', () => {
        // Arrange
        useBehandlingContextMock.mockReturnValue({
            behandling: lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD }),
            settÅpenBehandling: settÅpenBehandlingMock,
        });
        useSimuleringContextMock.mockReturnValue({ behandlingErMigreringMedAvvikUtenforBeløpsgrenser: false });

        // Act
        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Assert
        expect(screen.getByRole('button', { name: 'Bekreft migrering' })).toBeInTheDocument();
    });

    test('skal vise "Til godkjenning" for migrering fra Infotrygd når avviket er utenfor beløpsgrenser', () => {
        // Arrange
        useBehandlingContextMock.mockReturnValue({
            behandling: lagBehandling({ type: Behandlingstype.MIGRERING_FRA_INFOTRYGD }),
            settÅpenBehandling: settÅpenBehandlingMock,
        });
        useSimuleringContextMock.mockReturnValue({ behandlingErMigreringMedAvvikUtenforBeløpsgrenser: true });

        // Act
        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Assert
        expect(screen.getByRole('button', { name: 'Til godkjenning' })).toBeInTheDocument();
    });

    test('skal kalle onSuccess-callback som invaliderer query, setter behandling og åpner modal', async () => {
        // Arrange
        let onSuccessCallback: ((behandling: unknown) => Promise<void>) | undefined;
        useSendVedtakTilBeslutterMock.mockImplementation(({ onSuccess }) => {
            onSuccessCallback = onSuccess;
            return { mutate: sendVedtakTilBeslutterMock, isPending: false };
        });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);
        const oppdatertBehandling = lagBehandling({ behandlingId: 2 });

        // Act
        await onSuccessCallback?.(oppdatertBehandling);

        // Assert
        expect(invalidateQueriesMock).toHaveBeenCalled();
        expect(settÅpenBehandlingMock).toHaveBeenCalled();
        expect(åpneModalMock).toHaveBeenCalled();
    });

    test('skal kalle settFeilmelding med feilmelding fra onError-callback', () => {
        // Arrange
        let onErrorCallback: ((error: Error) => void) | undefined;
        useSendVedtakTilBeslutterMock.mockImplementation(({ onError }) => {
            onErrorCallback = onError;
            return { mutate: sendVedtakTilBeslutterMock, isPending: false };
        });

        render(<TilGodkjenning settFeilmelding={settFeilmeldingMock} />);

        // Act
        onErrorCallback?.(new Error('Noe gikk galt'));

        // Assert
        expect(settFeilmeldingMock).toHaveBeenCalledWith('Noe gikk galt');
    });
});
