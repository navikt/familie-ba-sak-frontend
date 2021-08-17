import React, { useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Hjelpetekst, { HjelpetekstProps } from 'nav-frontend-hjelpetekst';

interface IHjelpetekst44pxProps extends HjelpetekstProps {
    innhold: string | JSX.Element;
}

const HjepetekstWrapper = styled.div`
    padding: 0;
    margin-left: 0.625rem;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${navFarger.navLysGra};
        cursor: pointer;

        .hjelpetekst {
            .hjelpetekst__apneknapp {
                outline: 0;
                color: white;
                background: ${navFarger.navBla};

                .hjelpetekst__ikon {
                    fill: white;
                }

                box-shadow: 0 0 0 2px ${navFarger.navBla};
            }
        }
    }
`;

const Hjelpetekst44px: React.FC<IHjelpetekst44pxProps> = ({ innhold, ...props }) => {
    const [hjelpetekstRef, settHjelpetekstRef] = useState<Hjelpetekst | null>(null);

    const overrideHjelpetekstOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hjelpetekstRef) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            hjelpetekstRef.togglePopover(event as HTMLButtonElement);
        }
        event.stopPropagation();
    };

    return (
        <HjepetekstWrapper tabIndex={-1} onClick={overrideHjelpetekstOnClick}>
            <Hjelpetekst {...props} ref={element => settHjelpetekstRef(element)}>
                {innhold}
            </Hjelpetekst>
        </HjepetekstWrapper>
    );
};

export default Hjelpetekst44px;
