import React from 'react';

import { Header } from '@navikt/familie-header';

import FagsakDeltagerSøk from './FagsakDeltagerSøk';

interface IHeaderMedSøkProps {
    brukerNavn?: string;
    brukerEnhet?: string;
}

export const HeaderMedSøk: React.FunctionComponent<IHeaderMedSøkProps> = ({
    brukerNavn,
    brukerEnhet,
}) => {
    return (
        <Header
            tittel="NAV Barnetrygd"
            brukerinfo={{ navn: brukerNavn ?? 'Ukjent', enhet: brukerEnhet ?? 'Ukjent' }}
            brukerPopoverItems={[{ name: 'Logg ut', href: `${window.origin}/auth/logout` }]}
            eksterneLenker={[
                {
                    name: 'Rekvirer D-nr i DREK',
                    href: `${window.origin}/redirect/drek`,
                    isExternal: true,
                },
            ]}
        >
            <FagsakDeltagerSøk />
        </Header>
    );
};
