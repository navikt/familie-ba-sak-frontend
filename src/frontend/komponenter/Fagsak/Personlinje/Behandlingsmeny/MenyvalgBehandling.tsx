import React from 'react';

import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPåBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import { LeggTilEllerFjernBrevmottakereBehandling } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakere';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import {
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    IBehandling,
} from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FagsakType } from '../../../../typer/fagsak';
import { useLagreEllerFjernMottakerPåBehandling } from './LeggTilEllerFjernBrevmottakere/useLagreOgFjernMottakerPåBehandling';

interface IProps {
    minimalFagsak: IMinimalFagsak;
    åpenBehandling: IBehandling;
}

const MenyvalgBehandling = ({ minimalFagsak, åpenBehandling }: IProps) => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const { lagreMottaker, fjernMottaker } = useLagreEllerFjernMottakerPåBehandling({
        behandlingId: åpenBehandling.behandlingId,
    });

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
                    <LeggTilEllerFjernBrevmottakereBehandling
                        brevmottakere={åpenBehandling.brevmottakere}
                        lagreMottaker={lagreMottaker}
                        fjernMottaker={fjernMottaker}
                        erLesevisning={erLesevisning}
                    />
                )}
        </>
    );
};

export default MenyvalgBehandling;
