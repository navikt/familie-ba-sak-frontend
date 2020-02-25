import * as React from 'react';
import Header from '@navikt/nap-header';
import BoxedListWithLinks from '@navikt/boxed-list-with-links';
import Popover from '@navikt/nap-popover';
import UserPanel from '@navikt/nap-user-panel';
import { ISaksbehandler } from '../typer/saksbehandler';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const TempHeader: React.SFC<IProps> = ({ innloggetSaksbehandler }) => {
    const [linkWindowOpen, setLinkWindowOpen] = React.useState(false);
    const [unitWindowOpen, setUnitWindowOpen] = React.useState(false);

    return (
        <Header title="Barnetrygd" titleHref="">
            <Popover
                popperIsVisible={unitWindowOpen}
                customPopperStyles={{ top: '12px', zIndex: 1 }}
                renderArrowElement={true}
                popperProps={{
                    children: () => (
                        <BoxedListWithLinks
                            items={[{ name: 'Logg ut', href: `${window.origin}/auth/logout` }]}
                        />
                    ),
                    placement: 'bottom-start',
                    positionFixed: true,
                }}
                referenceProps={{
                    children: ({ ref }) => (
                        <div ref={ref}>
                            <UserPanel
                                name={innloggetSaksbehandler?.displayName ?? 'Ukjent bruker'}
                                unit={`Enhet: ${innloggetSaksbehandler?.enhet}`}
                                onClick={() => {
                                    if (linkWindowOpen) {
                                        setLinkWindowOpen(false);
                                    }
                                    setUnitWindowOpen(!unitWindowOpen);
                                }}
                            />
                        </div>
                    ),
                }}
                arrowProps={{ style: { left: '140px' } }}
            />
        </Header>
    );
};

export default TempHeader;
