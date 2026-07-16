import { sendInformasjonsbrev } from '@api/sendInformasjonsbrev';
import { BrukerProvider } from '@sider/Fagsak/BrukerContext';
import { DokumentÅrsak } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { ManuelleBrevmottakerePåFagsakProvider } from '@sider/Fagsak/ManuelleBrevmottakerePåFagsakContext';
import { act, renderHook, waitFor } from '@testing-library/react';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPerson } from '@testutils/testdata/personTestdata';
import { TestProviders } from '@testutils/testrender';
import { Adressebeskyttelsegradering, ForelderBarnRelasjonRolle } from '@typer/person';
import { Målform } from '@typer/søknad';
import { describe, expect, test, vi } from 'vitest';
import {
    DokumentutsendingFeltnavn,
    dokumentutsendingSkjemaStandardverdier,
    useDokumentutsendingSkjema,
} from './useDokumentutsendingSkjema';

vi.mock('@api/sendInformasjonsbrev');

const barnRelasjon = {
    adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
    fødselsdato: '2015-05-17',
    navn: 'Barn Barnesen',
    personIdent: '17051512345',
    relasjonRolle: ForelderBarnRelasjonRolle.BARN,
};

const morRelasjon = {
    ...barnRelasjon,
    navn: 'Mor Barnesen',
    personIdent: '11111111111',
    relasjonRolle: ForelderBarnRelasjonRolle.MOR,
};

describe('dokumentutsendingSkjemaStandardverdier', () => {
    test('bygger standardverdier med barn fra brukerens forelderBarnRelasjon', () => {
        const bruker = lagPerson({ forelderBarnRelasjon: [barnRelasjon, morRelasjon] });

        const defaultValues = dokumentutsendingSkjemaStandardverdier(bruker);

        expect(defaultValues.valgteBarn).toHaveLength(1);
        expect(defaultValues.valgteBarn[0]).toEqual({
            merket: false,
            ident: barnRelasjon.personIdent,
            navn: barnRelasjon.navn,
            fødselsdato: barnRelasjon.fødselsdato,
            manueltRegistrert: false,
            erFolkeregistrert: true,
            avtalerOmDeltBosted: [],
        });
    });

    test('øvrige standardverdier er tomme', () => {
        const bruker = lagPerson({ forelderBarnRelasjon: [] });

        const defaultValues = dokumentutsendingSkjemaStandardverdier(bruker);

        expect(defaultValues.årsak).toBe('');
        expect(defaultValues.målform).toBe(Målform.NB);
        expect(defaultValues.fritekster).toEqual([]);
        expect(defaultValues.fritekstAvsnitt).toBe('');
        expect(defaultValues.dokumenter).toEqual([]);
    });
});

describe('useDokumentutsendingSkjema', () => {
    test('resetter skjemaet etter vellykket innsending', async () => {
        vi.mocked(sendInformasjonsbrev).mockResolvedValue(undefined);
        const bruker = lagPerson();
        const fagsak = lagFagsak();
        const åpneBrevSendtDialog = vi.fn();
        const settForhåndsvisningUrl = vi.fn();

        const { result } = renderHook(
            () => useDokumentutsendingSkjema({ åpneBrevSendtDialog, settForhåndsvisningUrl }),
            {
                wrapper: ({ children }) => (
                    <TestProviders>
                        <FagsakProvider fagsak={fagsak}>
                            <BrukerProvider bruker={bruker}>
                                <ManuelleBrevmottakerePåFagsakProvider>
                                    {children}
                                </ManuelleBrevmottakerePåFagsakProvider>
                            </BrukerProvider>
                        </FagsakProvider>
                    </TestProviders>
                ),
            }
        );

        act(() => {
            result.current.form.setValue(DokumentutsendingFeltnavn.ÅRSAK, DokumentÅrsak.FØDSEL_GENERELL);
        });
        await act(async () => {
            await result.current.form.handleSubmit(result.current.onSubmit)();
        });

        await waitFor(() => expect(åpneBrevSendtDialog).toHaveBeenCalledOnce());
        await waitFor(() =>
            expect(result.current.form.getValues()).toEqual(dokumentutsendingSkjemaStandardverdier(bruker))
        );
    });
});
