import React from 'react';

import { AInntekt } from './AInntekt/AInntekt';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import { HenleggBehandlingNy } from './HenleggBehandling/HenleggBehandlingNy';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPåBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import { LeggTilEllerFjernBrevmottakerePåBehandling } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakerePåBehandling';
import { useAppContext } from '../../../../context/AppContext';
import type { IBehandling } from '../../../../typer/behandling';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FagsakType } from '../../../../typer/fagsak';
import { ToggleNavn } from '../../../../typer/toggles';
import { useBehandlingContext } from '../../Behandling/context/BehandlingContext';

interface IProps {
    minimalFagsak: IMinimalFagsak;
    åpenBehandling: IBehandling;
}

const MenyvalgBehandling = ({ minimalFagsak, åpenBehandling }: IProps) => {
    const { toggles } = useAppContext();
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    return (
        <>
            {toggles[ToggleNavn.brukNyHenleggModal] && <HenleggBehandlingNy />}
            {!toggles[ToggleNavn.brukNyHenleggModal] && <HenleggBehandling fagsakId={minimalFagsak.id} />}
            <EndreBehandlendeEnhet />
            {minimalFagsak.fagsakType !== FagsakType.INSTITUSJON && <EndreBehandlingstema />}
            {!vurderErLesevisning() &&
                (åpenBehandling.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                    åpenBehandling.årsak === BehandlingÅrsak.KLAGE ||
                    åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                    åpenBehandling.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
                    åpenBehandling.årsak === BehandlingÅrsak.IVERKSETTE_KA_VEDTAK ||
                    åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) && <LeggTilBarnPåBehandling />}
            {åpenBehandling.status === BehandlingStatus.UTREDES && <SettEllerOppdaterVenting />}
            {åpenBehandling.aktivSettPåVent && <TaBehandlingAvVent />}
            {minimalFagsak.fagsakType !== FagsakType.INSTITUSJON &&
                (!erLesevisning || åpenBehandling.brevmottakere.length > 0) &&
                (åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING ||
                    åpenBehandling.type === Behandlingstype.REVURDERING) && (
                    <LeggTilEllerFjernBrevmottakerePåBehandling
                        behandling={åpenBehandling}
                        erLesevisning={erLesevisning}
                    />
                )}
            <AInntekt minimalFagsak={minimalFagsak} />
        </>
    );
};

export default MenyvalgBehandling;
