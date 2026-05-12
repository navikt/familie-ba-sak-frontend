import { render } from '@testutils/testrender';
import { describe, test, expect, vi } from 'vitest';

import {
    EkspanderVilkårsvurderingProvider,
    useEkspanderVilkårsvurderingContext,
} from './EkspanderVilkårsvurderingContext';

function TestComponent() {
    const { ekspandert, ekspander } = useEkspanderVilkårsvurderingContext();
    return (
        <div>
            <div>{String(ekspandert)}</div>
            <button onClick={ekspander}>toggle</button>
        </div>
    );
}

function RenderPropConsumer() {
    return (
        <EkspanderVilkårsvurderingProvider starterEkspandert>
            {value => <div>{String(value.ekspandert)}</div>}
        </EkspanderVilkårsvurderingProvider>
    );
}

describe('EkspanderVilkårsvurderingProvider', () => {
    test('starter med false som standard', () => {
        const { screen } = render(
            <EkspanderVilkårsvurderingProvider>
                <TestComponent />
            </EkspanderVilkårsvurderingProvider>
        );

        expect(screen.getByText('false')).toBeInTheDocument();
    });

    test('starter som ekspandert når starterEkspandert er true', () => {
        const { screen } = render(
            <EkspanderVilkårsvurderingProvider starterEkspandert>
                <TestComponent />
            </EkspanderVilkårsvurderingProvider>
        );

        expect(screen.getByText('true')).toBeInTheDocument();
    });

    test('kan toggle ekspandert state med user-event', async () => {
        const { screen, user } = render(
            <EkspanderVilkårsvurderingProvider>
                <TestComponent />
            </EkspanderVilkårsvurderingProvider>
        );

        const button = screen.getByRole('button', { name: 'toggle' });

        expect(screen.getByText('false')).toBeInTheDocument();

        await user.click(button);

        expect(screen.getByText('true')).toBeInTheDocument();

        await user.click(button);

        expect(screen.getByText('false')).toBeInTheDocument();
    });

    test('fungerer med render-prop children', () => {
        const { screen } = render(<RenderPropConsumer />);

        expect(screen.getByText('true')).toBeInTheDocument();
    });

    test('kaster feil hvis context brukes uten provider', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        function BrokenComponent() {
            useEkspanderVilkårsvurderingContext();
            return null;
        }

        expect(() => render(<BrokenComponent />)).toThrow(
            'useEkspanderVilkårsvurderingContext må brukes innenfor en EkspanderVilkårsvurderingProvider.'
        );

        spy.mockRestore();
    });
});
