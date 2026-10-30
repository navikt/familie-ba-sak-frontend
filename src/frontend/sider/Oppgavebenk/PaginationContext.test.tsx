import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router';
import { describe, expect, test } from 'vitest';

import { PaginationProvider, usePaginationContext } from './PaginationContext';

function renderPagination(initialEntry = '/oppgavebenk', totalPages?: number) {
    return renderHook(
        () => ({
            ...usePaginationContext(),
            location: useLocation(),
            navigate: useNavigate(),
        }),
        {
            wrapper: ({ children }: PropsWithChildren) => (
                <MemoryRouter initialEntries={[initialEntry]}>
                    <PaginationProvider totalPages={totalPages}>{children}</PaginationProvider>
                </MemoryRouter>
            ),
        }
    );
}

describe('PaginationContext', () => {
    test('skal starte på første side', () => {
        const { result } = renderPagination();

        expect(result.current.page).toBe(1);
    });

    test('skal hente siden fra URL-en', () => {
        const { result } = renderPagination('/oppgavebenk?side=3');

        expect(result.current.page).toBe(3);
    });

    test.each(['', '0', '-1', '1.5', 'abc', 'Infinity', '9007199254740992'])(
        'skal bruke første side når sideparameteren er ugyldig: "%s"',
        page => {
            const { result } = renderPagination(`/oppgavebenk?side=${page}`);

            expect(result.current.page).toBe(1);
        }
    );

    test('skal oppdatere URL-en og bevare andre søkeparametere ved sidebytte', () => {
        const { result } = renderPagination('/oppgavebenk?oppgavetype=JFR');

        act(() => result.current.setPage(3));

        expect(result.current.page).toBe(3);
        expect(result.current.location.search).toBe('?oppgavetype=JFR&side=3');
    });

    test('skal fjerne sideparameteren ved retur til første side og bevare andre søkeparametere', () => {
        const { result } = renderPagination('/oppgavebenk?oppgavetype=JFR&side=3');

        act(() => result.current.setPage(1));

        expect(result.current.page).toBe(1);
        expect(result.current.location.search).toBe('?oppgavetype=JFR');
    });

    test('skal følge siden ved navigering tilbake og frem', () => {
        const { result } = renderPagination('/oppgavebenk?side=2');

        act(() => result.current.setPage(3));
        act(() => result.current.navigate(-1));

        expect(result.current.page).toBe(2);

        act(() => result.current.navigate(1));

        expect(result.current.page).toBe(3);
    });

    test('skal begrense siden til siste tilgjengelige side og bevare andre søkeparametere', () => {
        const { result } = renderPagination('/oppgavebenk?oppgavetype=JFR&side=999', 3);

        expect(result.current.page).toBe(3);
        expect(result.current.location.search).toBe('?oppgavetype=JFR&side=3');
    });

    test('skal bruke første side når resultatet er tomt', () => {
        const { result } = renderPagination('/oppgavebenk?side=999', 0);

        expect(result.current.page).toBe(1);
        expect(result.current.location.search).toBe('');
    });

    test('skal vente på antall sider før URL-en korrigeres', () => {
        const { result } = renderPagination('/oppgavebenk?side=999');

        expect(result.current.page).toBe(999);
        expect(result.current.location.search).toBe('?side=999');
    });

    test('skal erstatte den ugyldige siden i nettleserhistorikken', () => {
        const { result } = renderPagination('/oppgavebenk?side=2', 3);

        act(() => result.current.navigate('/oppgavebenk?side=999'));

        expect(result.current.page).toBe(3);
        expect(result.current.location.search).toBe('?side=3');

        act(() => result.current.navigate(-1));

        expect(result.current.page).toBe(2);
        expect(result.current.location.search).toBe('?side=2');
    });

    test('skal kaste feil når hooken brukes utenfor PaginationProvider', () => {
        expect(() => renderHook(() => usePaginationContext())).toThrow(
            'usePaginationContext må brukes innenfor en PaginationProvider'
        );
    });
});
