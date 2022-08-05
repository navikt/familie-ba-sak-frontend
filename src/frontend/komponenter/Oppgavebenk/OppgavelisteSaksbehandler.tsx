import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { Alert, Button } from '@navikt/ds-react';
import type { ISaksbehandler } from '@navikt/familie-typer';

import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import type { IOppgave } from '../../typer/oppgave';
import { OppgavetypeFilter } from '../../typer/oppgave';
import { ToggleNavn } from '../../typer/toggles';
import { hentFnrFraOppgaveIdenter } from '../../utils/oppgave';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
}

const StyledNormaltekst = styled(Normaltekst)`
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
    const { sjekkTilgang, toggles } = useApp();
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

    let oppgaveTypeErStøttet =
        [
            OppgavetypeFilter.JFR,
            OppgavetypeFilter.BEH_SAK,
            OppgavetypeFilter.BEH_UND_VED,
            OppgavetypeFilter.GOD_VED,
            OppgavetypeFilter.VURD_LIVS,
        ].find(
            (type: OppgavetypeFilter) =>
                OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
        ) !== undefined;
    oppgaveTypeErStøttet =
        oppgaveTypeErStøttet ||
        (toggles[ToggleNavn.brukEøs] && oppgave.oppgavetype === OppgavetypeFilter.BEH_SED);

    return oppgave.tilordnetRessurs ? (
        <div className={'kolonne'}>
            <StyledNormaltekst>{oppgave.tilordnetRessurs}</StyledNormaltekst>
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
            <StyledNormaltekst>Ikke tildelt</StyledNormaltekst>
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
