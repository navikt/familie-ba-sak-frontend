import { lagBrevmottaker } from '@testutils/testdata/brevmottakerTestdata';
import { render } from '@testutils/testrender';
import { Brevmottakertype } from '@typer/brevmottaker';
import { describe, expect, test, vi } from 'vitest';
import { BrevmottakerDetaljer } from './BrevmottakerDetaljer';

describe('BrevmottakerDetaljer', () => {
    test('skal vise brevmottakertype som overskrift', () => {
        const { screen } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker({ type: Brevmottakertype.DØDSBO })}
                erLesevisning={false}
                onSlett={vi.fn()}
            />
        );

        expect(screen.getByRole('heading', { name: 'Dødsbo' })).toBeInTheDocument();
    });

    test('skal vise alle detaljene til brevmottakeren', () => {
        const brevmottaker = lagBrevmottaker({
            navn: 'Ola Nordmann',
            adresselinje1: 'Gate 1',
            adresselinje2: 'Leilighet 2',
            postnummer: '1234',
            poststed: 'Bygda',
            landkode: 'NO',
        });

        const { screen } = render(
            <BrevmottakerDetaljer brevmottaker={brevmottaker} erLesevisning={false} onSlett={vi.fn()} />
        );

        const definisjoner = screen.getAllByRole('definition').map(dd => dd.textContent);
        expect(screen.getAllByRole('term').map(dt => dt.textContent)).toEqual([
            'Navn',
            'Land',
            'Adresselinje 1',
            'Adresselinje 2',
            'Postnummer',
            'Poststed',
        ]);
        expect(definisjoner).toEqual(['Ola Nordmann', 'Norge', 'Gate 1', 'Leilighet 2', '1234', 'Bygda']);
    });

    test('skal vise bindestrek for valgfrie felter uten verdi', () => {
        const brevmottaker = lagBrevmottaker({
            adresselinje2: undefined,
            postnummer: '',
            poststed: undefined,
        });

        const { screen } = render(
            <BrevmottakerDetaljer brevmottaker={brevmottaker} erLesevisning={false} onSlett={vi.fn()} />
        );

        const definisjoner = screen.getAllByRole('definition').map(dd => dd.textContent);
        expect(definisjoner.slice(3)).toEqual(['-', '-', '-']);
    });

    test('skal vise informasjon om utenlandsk adresse når landet ikke er Norge', () => {
        const { screen } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker({ landkode: 'SE' })}
                erLesevisning={false}
                onSlett={vi.fn()}
            />
        );

        expect(screen.getByText('Sverige')).toBeInTheDocument();
        expect(
            screen.getByText('Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.')
        ).toBeInTheDocument();
    });

    test('skal ikke vise informasjon om utenlandsk adresse når landet er Norge', () => {
        const { screen } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker({ landkode: 'NO' })}
                erLesevisning={false}
                onSlett={vi.fn()}
            />
        );

        expect(
            screen.queryByText('Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.')
        ).not.toBeInTheDocument();
    });

    test('skal kalle onSlett når man klikker på fjern-knappen', async () => {
        const onSlett = vi.fn();

        const { screen, user } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker({ type: Brevmottakertype.FULLMEKTIG })}
                erLesevisning={false}
                onSlett={onSlett}
            />
        );

        await user.click(screen.getByRole('button', { name: 'Fjern fullmektig' }));

        expect(onSlett).toHaveBeenCalledOnce();
    });

    test('skal ikke vise fjern-knapp i lesevisning', () => {
        const { screen } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker({ type: Brevmottakertype.FULLMEKTIG })}
                erLesevisning={true}
                onSlett={vi.fn()}
            />
        );

        expect(screen.queryByRole('button', { name: 'Fjern fullmektig' })).not.toBeInTheDocument();
    });

    test('skal deaktivere fjern-knappen mens brevmottakeren slettes', () => {
        const { screen } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker({ type: Brevmottakertype.FULLMEKTIG })}
                erLesevisning={false}
                onSlett={vi.fn()}
                sletter={true}
            />
        );

        expect(screen.getByRole('button', { name: 'Fjern fullmektig' })).toBeDisabled();
    });

    test('skal vise feilmelding når sletting har feilet', () => {
        const { screen } = render(
            <BrevmottakerDetaljer
                brevmottaker={lagBrevmottaker()}
                erLesevisning={false}
                onSlett={vi.fn()}
                slettFeilmelding={'Noe gikk galt'}
            />
        );

        expect(screen.getByText('Noe gikk galt')).toBeInTheDocument();
    });
});
