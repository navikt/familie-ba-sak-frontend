import React, { useState } from 'react';

import { describe, expect, test } from 'vitest';

import { EØS_CURRENCY, Valutavelger } from './Valutavelger';
import { render } from '../../testutils/testrender';

function WrappedValutavelger({ onChange }: { onChange: (currency: string) => void }) {
    const [value, setValue] = useState('DKK');
    return (
        <Valutavelger
            label={'Valuta'}
            value={value}
            options={EØS_CURRENCY}
            onChange={currency => {
                setValue(currency.value);
                onChange(currency.value);
            }}
        />
    );
}

describe('Valutavelger', () => {
    test('skal kunne velge valuta', async () => {
        const onChange = vi.fn();

        const { screen, user } = render(<WrappedValutavelger onChange={onChange} />);

        const valutavelger = screen.getByRole('combobox', { name: 'Valuta' });

        expect(screen.getByRole('img', { name: 'DKK - Dansk krone' })).toBeInTheDocument();

        await user.click(valutavelger);
        await user.click(screen.getByRole('img', { name: 'SEK - Svensk krone' }));

        expect(valutavelger).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'SEK - Svensk krone' })).toBeInTheDocument();
        expect(screen.queryByRole('img', { name: 'DKK - Dansk krone' })).not.toBeInTheDocument();
        expect(onChange).toHaveBeenCalledWith('SEK');
    });
});
