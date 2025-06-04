/* OBS: hele denne komponenten er hentet fra @navikt/ds-react v1.3.3 for å justere `children` til å håndtere rik tekst */

import React, { forwardRef, useMemo, useRef, useState } from 'react';

import cl from 'clsx';

import { QuestionmarkDiamondIcon, QuestionmarkDiamondFillIcon } from '@navikt/aksel-icons';
import type { PopoverProps } from '@navikt/ds-react';
import { Popover } from '@navikt/ds-react';

// https://github.com/gregberge/react-merge-refs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeRefs<T = any>(
    refs: Array<React.MutableRefObject<T> | React.Ref<T>>
): React.RefCallback<T> {
    return value => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(value);
            } else if (ref !== null && ref !== undefined) {
                (ref as React.MutableRefObject<T | null>).current = value;
            }
        });
    };
}

interface HelpTextProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        Pick<PopoverProps, 'strategy' | 'placement'> {
    /**
     * Helptext-dialog content
     */
    children: React.ReactNode;
    /**
     * Adds a title-tooltip with the given text
     * @default "hjelp"
     */
    title?: string;
    /**
     * Default dialog-placement on open
     * @default "top"
     */
    placement?:
        | 'top'
        | 'bottom'
        | 'right'
        | 'left'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'right-start'
        | 'right-end'
        | 'left-start'
        | 'left-end';
}

const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
    (
        {
            className,
            children,
            placement = 'top',
            strategy = 'absolute',
            title = 'hjelp',
            onClick,
            ...rest
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const mergedRef = useMemo(() => mergeRefs([buttonRef, ref]), [ref]);
        const [open, setOpen] = useState(false);

        return (
            <div className="navds-help-text">
                <button
                    {...rest}
                    ref={mergedRef}
                    onClick={e => {
                        setOpen(x => !x);
                        onClick?.(e);
                    }}
                    className={cl(className, 'navds-help-text__button')}
                    type="button"
                    aria-expanded={open}
                >
                    <QuestionmarkDiamondIcon className="navds-help-text__icon" title={title} />
                    <QuestionmarkDiamondFillIcon
                        className="navds-help-text__icon navds-help-text__icon--filled"
                        title={title}
                    />
                </button>
                <Popover
                    onClose={() => setOpen(false)}
                    className="navds-help-text__popover"
                    open={open}
                    anchorEl={buttonRef.current}
                    placement={placement}
                    strategy={strategy}
                >
                    <Popover.Content className="navds-body-short">{children}</Popover.Content>
                </Popover>
            </div>
        );
    }
);

export default HelpText;
