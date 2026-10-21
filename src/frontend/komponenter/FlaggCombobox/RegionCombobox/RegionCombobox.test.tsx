import { render } from '@testutils/testrender';
import { describe, expect, test, vi } from 'vitest';
import { RegionCombobox } from './RegionCombobox';

describe('RegionCombobox', () => {
    test('skal vise navnet på valgt land', () => {
        const { screen } = render(
            <RegionCombobox label={'Velg land'} options={['NO', 'SE']} value={'SE'} onChange={vi.fn()} />
        );

        expect(screen.getByRole('combobox', { name: 'Velg land' })).toHaveValue('Sverige');
    });

    test('skal gi regionkoder til onChange ved flervalg', async () => {
        const onChange = vi.fn();

        const { user, screen } = render(
            <RegionCombobox
                label={'Velg land'}
                options={['NO', 'SE']}
                value={['NO', 'SE']}
                onChange={onChange}
                isMulti={true}
            />
        );

        await user.click(screen.getByRole('button', { name: 'Fjern Norge' }));

        expect(onChange).toHaveBeenCalledWith(['SE']);
    });
});
