import React from 'react';

import { describe, test, expect } from 'vitest';

import { ExternalLink } from './ExternalLink';
import { render } from '../testutils/testrender';

describe('ExternalLink', () => {
    test('skal rendre komponenten som forventent', () => {
        const onClick = vi.fn();

        const { screen } = render(<ExternalLink label={'MyLabel'} onClick={onClick} />);

        const label = screen.getByTitle('MyLabel');
        const link = screen.getByRole('link');

        expect(label).toBeInTheDocument();
        expect(link).toBeInTheDocument();
    });

    test('skal kunne klikke på onClick', async () => {
        const onClick = vi.fn();

        const { screen, user } = render(<ExternalLink label={'MyLabel'} onClick={onClick} />);

        const link = screen.getByRole('link');

        expect(onClick).not.toHaveBeenCalled();

        await user.click(link);

        expect(onClick).toHaveBeenCalledOnce();
    });
});
