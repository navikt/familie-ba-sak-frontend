import { render } from '@testutils/testrender';
import { describe, expect, test, vi } from 'vitest';
import { ValutaCombobox } from './ValutaCombobox';

describe('ValutaCombobox', () => {
    test('skal vise kode og navn for valgt valuta', () => {
        const { screen } = render(
            <ValutaCombobox label={'Velg valuta'} options={['EUR', 'SEK']} value={'EUR'} onChange={vi.fn()} />
        );

        expect(screen.getByRole('combobox', { name: 'Velg valuta' })).toHaveValue('EUR - Euro');
    });

    test('skal gi valutakoder til onChange ved flervalg', async () => {
        const onChange = vi.fn();

        const { user, screen } = render(
            <ValutaCombobox
                label={'Velg valuta'}
                options={['EUR', 'SEK']}
                value={['EUR', 'SEK']}
                onChange={onChange}
                isMulti={true}
            />
        );

        await user.click(screen.getByRole('button', { name: 'Fjern EUR - Euro' }));

        expect(onChange).toHaveBeenCalledWith(['SEK']);
    });
});
