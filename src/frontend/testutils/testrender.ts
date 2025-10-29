import type React from 'react';

import {
    render as rtlRender,
    type RenderOptions as RtlRenderOptions,
    type RenderResult as RtlRenderResult,
    type Screen as RtlScreen,
    screen as rtlScreen,
} from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';

type RenderOptions = Omit<RtlRenderOptions, 'queries'>;

type RenderResult = RtlRenderResult & {
    user: UserEvent;
    screen: RtlScreen;
};

export function render(ui: React.ReactNode, options?: RenderOptions): RenderResult {
    return {
        user: userEvent.setup(),
        screen: rtlScreen,
        ...rtlRender(ui, options),
    };
}
