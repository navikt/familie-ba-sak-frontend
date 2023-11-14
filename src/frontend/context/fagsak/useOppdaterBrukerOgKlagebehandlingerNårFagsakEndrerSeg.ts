import { useEffect } from 'react';

import type { Ressurs } from '@navikt/familie-typer';
import { byggTomRessurs, hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import type { SkjemaBrevmottaker } from '../../komponenter/Fagsak/Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IMinimalFagsak } from '../../typer/fagsak';
import type { IPersonInfo } from '../../typer/person';

interface Props {
    minimalFagsak: Ressurs<IMinimalFagsak>;
    settBruker: (ressurs: Ressurs<IPersonInfo>) => void;
    oppdaterBrukerHvisFagsakEndres: (
        bruker: Ressurs<IPersonInfo>,
        søkerFødselsnummer?: string
    ) => void;
    bruker: Ressurs<IPersonInfo>;
    oppdaterKlagebehandlingerPåFagsak: () => void;
    settManuelleInfoBrevmottakere: (skjemaBrevmottakere: SkjemaBrevmottaker[]) => void;
}

export const useOppdaterBrukerOgKlagebehandlingerNårFagsakEndrerSeg = ({
    minimalFagsak,
    settBruker,
    oppdaterBrukerHvisFagsakEndres,
    bruker,
    oppdaterKlagebehandlingerPåFagsak,
    settManuelleInfoBrevmottakere,
}: Props) =>
    useEffect(() => {
        if (
            minimalFagsak.status !== RessursStatus.SUKSESS &&
            minimalFagsak.status !== RessursStatus.HENTER
        ) {
            settBruker(byggTomRessurs());
        } else {
            oppdaterBrukerHvisFagsakEndres(
                bruker,
                hentDataFraRessurs(minimalFagsak)?.søkerFødselsnummer
            );
        }
        oppdaterKlagebehandlingerPåFagsak();
        settManuelleInfoBrevmottakere([]);
    }, [minimalFagsak]);
