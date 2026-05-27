import type { PropsWithChildren } from 'react';

import { AlertType, type IToast, ToastTyper } from '@komponenter/Toast/typer';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ToastProvider, useToastContext } from './ToastContext';

const wrapper = ({ children }: PropsWithChildren) => <ToastProvider>{children}</ToastProvider>;

describe('ToastContext', () => {
    test('kaster feil når useToastContext brukes utenfor ToastProvider', () => {
        // Act & assert
        expect(() => renderHook(() => useToastContext())).toThrowError(
            'useToastContext må brukes innenfor en ToastProvider.'
        );
    });

    test('gir tilgang til toasts som er tom ved oppstart', () => {
        // Act
        const { result } = renderHook(() => useToastContext(), { wrapper });

        // Assert
        expect(result.current.toasts).toEqual({});
    });

    test('settToast legger til en toast i toasts', () => {
        // Arrange
        const toast: IToast = { tekst: 'Noe gikk galt', alertType: AlertType.ERROR };
        const { result } = renderHook(() => useToastContext(), { wrapper });

        // Act
        act(() => {
            result.current.settToast(ToastTyper.FANT_IKKE_FAGSAK, toast);
        });

        // Assert
        expect(result.current.toasts).toEqual({ [ToastTyper.FANT_IKKE_FAGSAK]: toast });
    });

    test('settToast bevarer eksisterende toasts når en ny legges til', () => {
        // Arrange
        const toast1: IToast = { tekst: 'Noe gikk galt', alertType: AlertType.ERROR };
        const toast2: IToast = { tekst: 'Ingen tilgang!', alertType: AlertType.ERROR };

        const { result } = renderHook(() => useToastContext(), { wrapper });

        act(() => {
            result.current.settToast(ToastTyper.FANT_IKKE_FAGSAK, toast1);
        });

        // Act
        act(() => {
            result.current.settToast(ToastTyper.MANGLER_TILGANG, toast2);
        });

        // Assert
        expect(result.current.toasts).toEqual({
            [ToastTyper.FANT_IKKE_FAGSAK]: toast1,
            [ToastTyper.MANGLER_TILGANG]: toast2,
        });
    });

    test('settToasts kan overskrive hele toasts-tilstanden direkte', () => {
        // Arrange
        const toast: IToast = { tekst: 'Noe gikk galt', alertType: AlertType.ERROR };
        const nyeToasts = { [ToastTyper.FANT_IKKE_FAGSAK]: toast };
        const { result } = renderHook(() => useToastContext(), { wrapper });

        // Act
        act(() => {
            result.current.settToasts(nyeToasts);
        });

        // Assert
        expect(result.current.toasts).toEqual(nyeToasts);
    });
});
