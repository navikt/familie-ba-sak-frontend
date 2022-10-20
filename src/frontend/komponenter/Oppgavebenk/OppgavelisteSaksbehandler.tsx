import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button } from '@navikt/ds-react';
import type { ISaksbehandler } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import type { IOppgave } from '../../typer/oppgave';
import { OppgavetypeFilter } from '../../typer/oppgave';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
}

const StyledBodyShort = styled(BodyShort)`
    width: 5rem;
    margin-right: 2.5rem;
    text-align: left;
`;

const StyledButton = styled(Button)`
    text-align: center;
    min-width: fit-content;
`;

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave } = useOppgaver();
    const { sjekkTilgang } = useApp();
    const oppgaveRef = useRef<IOppgave | null>(null);

    useEffect(() => {
        if (oppgaveRef.current === null) {
            oppgaveRef.current = oppgave;
        }
        oppgaveRef.current = oppgave;
    }, [oppgave]);

    if (innloggetSaksbehandler == null) {
        return <Alert variant="error">Klarte ikke hente innlogget saksbehandler</Alert>;
    }

    const oppgaveTypeErStøttet =
        [
            OppgavetypeFilter.JFR,
            OppgavetypeFilter.BEH_SAK,
            OppgavetypeFilter.BEH_UND_VED,
            OppgavetypeFilter.GOD_VED,
            OppgavetypeFilter.VURD_LIVS,
            OppgavetypeFilter.BEH_SED,
        ].find(
            (type: OppgavetypeFilter) =>
                OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
        ) !== undefined;

    return oppgave.tilordnetRessurs ? (
        <div className={'kolonne'}>
            <StyledBodyShort>{oppgave.tilordnetRessurs}</StyledBodyShort>
            {oppgaveTypeErStøttet && (
                <StyledButton
                    variant="tertiary"
                    size="small"
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave);
                    }}
                    children={'Tilbakestill'}
                />
            )}
        </div>
    ) : (
        <div className={'kolonne'}>
            <StyledBodyShort>Ikke tildelt</StyledBodyShort>
            {oppgaveTypeErStøttet && (
                <StyledButton
                    variant="secondary"
                    size="small"
                    key={'plukk'}
                    onClick={async () => {
                        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);

                        if (!brukerident || (brukerident && (await sjekkTilgang(brukerident)))) {
                            fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent);
                        }
                    }}
                    children={'Tildel meg'}
                />
            )}
        </div>
    );
};

export default OppgavelisteSaksbehandler;
