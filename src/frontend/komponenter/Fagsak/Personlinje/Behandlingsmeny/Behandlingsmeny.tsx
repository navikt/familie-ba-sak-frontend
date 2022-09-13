import React from 'react';

import { useNavigate } from 'react-router-dom';

import '@navikt/ds-css-internal';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const Behandlingsmeny: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const { åpenBehandling, erLesevisning } = useBehandling();
    const navigate = useNavigate();
    const { toggles } = useApp();

    return (
        <Dropdown>
            <Button as={Dropdown.Toggle} id={'behandlingsmeny-arialabel-knapp'}>
                Meny
            </Button>
            <Dropdown.Menu>
                <Dropdown.Menu.List>
                    {åpenBehandling.status === RessursStatus.SUKSESS && <EndreBehandlendeEnhet />}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD && (
                            <EndreBehandlingstema />
                        )}
                    <OpprettBehandling minimalFagsak={minimalFagsak} />
                    {toggles[ToggleNavn.støtterInstitusjon].valueOf() && !!bruker && (
                        <OpprettFagsak personInfo={bruker} />
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <HenleggBehandling
                            fagsakId={minimalFagsak.id}
                            behandling={åpenBehandling.data}
                        />
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        !erLesevisning() &&
                        (åpenBehandling.data.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KLAGE ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
                            åpenBehandling.data.type ===
                                Behandlingstype.MIGRERING_FRA_INFOTRYGD) && (
                            <LeggTilBarnPBehandling behandling={åpenBehandling.data} />
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.aktivSettPåVent && (
                            <TaBehandlingAvVent behandling={åpenBehandling.data} />
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <SettEllerOppdaterVenting behandling={åpenBehandling.data} />
                    )}
                    <Dropdown.Menu.List.Item
                        onClick={() => navigate(`/fagsak/${minimalFagsak.id}/dokumentutsending`)}
                    >
                        Send informasjonsbrev
                    </Dropdown.Menu.List.Item>
                </Dropdown.Menu.List>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Behandlingsmeny;
