import React from 'react';
import createUseContext from 'constate';
import { Ressurs, RessursStatus } from '../typer/ressurs';
import { IPerson } from '../typer/person';
import { hentPerson } from '../api/person';
import { useFagsakContext } from '../komponenter/FagsakProvider';

const [BrukerProvider, useBruker] = createUseContext(() => {
    const fagsak = useFagsakContext().fagsak;
    const [bruker, settBruker] = React.useState<Ressurs<IPerson>>({
        status: RessursStatus.IKKE_HENTET,
    });

    React.useEffect(() => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            hentPerson(fagsak.data.søkerFødselsnummer).then((hentetPerson: Ressurs<IPerson>) =>
                settBruker(hentetPerson)
            );
        }
    }, [fagsak.status]);

    return { bruker };
});

export { BrukerProvider, useBruker };
