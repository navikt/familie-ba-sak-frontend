import React from 'react';

import { hentDataFraRessurs } from '@navikt/familie-typer';

import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPåBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import LeggTilEllerFjernBrevmottakere from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakere';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FagsakType } from '../../../../typer/fagsak';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}
const MenyvalgBehandling = ({ minimalFagsak }: IProps) => {
    const { åpenBehandling: åpenBehandlingRessurs, vurderErLesevisning } = useBehandling();
    const åpenBehandling = hentDataFraRessurs(åpenBehandlingRessurs);

    const erLesevisning = vurderErLesevisning();

    if (åpenBehandling === undefined) {
        return null;
    }

    return (
        <>
            <HenleggBehandling fagsakId={minimalFagsak.id} behandling={åpenBehandling} />
            <EndreBehandlendeEnhet />
            {åpenBehandling.årsak !== BehandlingÅrsak.SØKNAD &&
                minimalFagsak.fagsakType !== FagsakType.INSTITUSJON && <EndreBehandlingstema />}
            {!vurderErLesevisning() &&
                (åpenBehandling.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                    åpenBehandling.årsak === BehandlingÅrsak.KLAGE ||
                    åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                    åpenBehandling.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
                    åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) && (
                    <LeggTilBarnPåBehandling behandling={åpenBehandling} />
                )}
            {åpenBehandling.status === BehandlingStatus.UTREDES && (
                <SettEllerOppdaterVenting behandling={åpenBehandling} />
            )}
            {åpenBehandling.aktivSettPåVent && <TaBehandlingAvVent behandling={åpenBehandling} />}
            {minimalFagsak.fagsakType !== FagsakType.INSTITUSJON &&
                (!erLesevisning || åpenBehandling.brevmottakere.length > 0) &&
                (åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING ||
                    åpenBehandling.type === Behandlingstype.REVURDERING) && (
                    <LeggTilEllerFjernBrevmottakere åpenBehandling={åpenBehandling} />
                )}
        </>
    );
};

export default MenyvalgBehandling;
