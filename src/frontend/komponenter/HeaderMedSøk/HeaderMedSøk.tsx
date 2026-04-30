import { Header } from '@navikt/familie-header';

import FagsakDeltagerSøk from './FagsakDeltagerSøk';
import { useSaksbehandler } from '../../hooks/useSaksbehandler';

export function HeaderMedSøk() {
    const saksbehandler = useSaksbehandler();

    return (
        <Header
            tittel={'Nav Barnetrygd'}
            brukerinfo={{ navn: saksbehandler.displayName, enhet: saksbehandler.enhet }}
            brukerPopoverItems={[{ name: 'Logg ut', href: `${window.origin}/auth/logout` }]}
            eksterneLenker={[
                {
                    name: 'Rekvirer D-nr i DREK',
                    href: `${window.origin}/redirect/drek`,
                    isExternal: true,
                },
                {
                    name: 'nEESSI',
                    href: `${window.origin}/redirect/neessi`,
                    isExternal: true,
                },
            ]}
        >
            <FagsakDeltagerSøk />
        </Header>
    );
}
