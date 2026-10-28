import * as ToastContext from '@context/ToastContext';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { act, renderHook } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { TestProviders } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import { HttpResponse, http } from 'msw';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerField, type BrevmottakerTransformedFormValues } from '../Felles/Form/useBrevmottakerForm';
import { useBrevmottakerFormBehandling } from './useBrevmottakerFormBehandling';

vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext');

const OPPRETT_BREVMOTTAKER_URL = '/familie-ba-sak/api/brevmottaker/:behandlingId';
const behandling = lagBehandling({ behandlingId: 42 });
const oppdatertBehandling = lagBehandling({ behandlingId: 42, brevmottakere: [lagBrevmottakerBehandling()] });
const settÅpenBehandling = vi.fn();
const settToast = vi.fn();

const values: BrevmottakerTransformedFormValues = {
    [BrevmottakerField.BREVMOTTAKERTYPE]: Brevmottakertype.VERGE,
    [BrevmottakerField.NAVN]: 'Vera Verge',
    [BrevmottakerField.LAND]: 'NO',
    [BrevmottakerField.ADRESSELINJE_1]: 'Gate 1',
    [BrevmottakerField.ADRESSELINJE_2]: '',
    [BrevmottakerField.POSTNUMMER]: '0010',
    [BrevmottakerField.POSTSTED]: 'Oslo',
};

function renderUseBrevmottakerFormBehandling(onSubmitSuccess = vi.fn()) {
    const { result } = renderHook(
        () => {
            const { form, onSubmit } = useBrevmottakerFormBehandling({ onSubmitSuccess });
            return { onSubmit, rootFeilmelding: form.formState.errors.root?.message };
        },
        { wrapper: TestProviders }
    );
    return { result, onSubmitSuccess };
}

describe('useBrevmottakerFormBehandling', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useBehandlingContext).mockReturnValue({ behandling, settÅpenBehandling });
        vi.spyOn(ToastContext, 'useToastContext').mockReturnValue({
            settToast,
            settToasts: vi.fn(),
            toasts: {},
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('skal lagre brevmottakeren på behandlingen, oppdatere behandlingen og vise en suksessmelding', async () => {
        const forespørsel = vi.fn();
        server.use(
            http.post(OPPRETT_BREVMOTTAKER_URL, async ({ params, request }) => {
                forespørsel({ params, body: await request.json() });
                return HttpResponse.json(byggSuksessRessurs(oppdatertBehandling));
            })
        );

        const { result, onSubmitSuccess } = renderUseBrevmottakerFormBehandling();

        await act(() => result.current.onSubmit(values));

        expect(forespørsel).toHaveBeenCalledExactlyOnceWith({
            params: { behandlingId: '42' },
            body: {
                type: Brevmottakertype.VERGE,
                navn: 'Vera Verge',
                adresselinje1: 'Gate 1',
                postnummer: '0010',
                poststed: 'Oslo',
                landkode: 'NO',
            },
        });
        expect(settÅpenBehandling).toHaveBeenCalledWith(byggSuksessRessurs(oppdatertBehandling));
        expect(settToast).toHaveBeenCalledWith(ToastTyper.BREVMOTTAKER_LAGRET, {
            alertType: AlertType.SUCCESS,
            tekst: 'Brevmottaker ble lagret',
        });
        expect(onSubmitSuccess).toHaveBeenCalledOnce();
        expect(result.current.rootFeilmelding).toBeUndefined();
    });

    test('skal vise feilmelding uten å oppdatere behandlingen når lagring feiler', async () => {
        server.use(
            http.post(OPPRETT_BREVMOTTAKER_URL, () =>
                HttpResponse.json({
                    status: 'FUNKSJONELL_FEIL',
                    melding: 'Kunne ikke lagre brevmottaker',
                    frontendFeilmelding: 'Brevmottakeren kunne ikke lagres.',
                })
            )
        );

        const { result, onSubmitSuccess } = renderUseBrevmottakerFormBehandling();

        await act(() => result.current.onSubmit(values));

        expect(result.current.rootFeilmelding).toBe('Brevmottakeren kunne ikke lagres.');
        expect(settÅpenBehandling).not.toHaveBeenCalled();
        expect(settToast).not.toHaveBeenCalled();
        expect(onSubmitSuccess).not.toHaveBeenCalled();
    });
});
