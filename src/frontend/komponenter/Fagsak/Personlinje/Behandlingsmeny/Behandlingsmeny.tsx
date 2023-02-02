import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import '@navikt/ds-css-internal';
import { ExpandFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { Adressebeskyttelsegradering, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import { FagsakType, type IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
import LeggTilEllerFjernBrevmottakere from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakere';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const PosisjonertMenyknapp = styled(Button)`
    margin-left: 3rem;
`;

const StyletDropdownMenu = styled(Dropdown.Menu)`
    width: 30ch;
`;

const Behandlingsmeny: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const { åpenBehandling, vurderErLesevisning } = useBehandling();
    const navigate = useNavigate();
    const { toggles } = useApp();

    const brukerHarStrengtFortroligAdresse =
        bruker &&
        (bruker.adressebeskyttelseGradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
            bruker.adressebeskyttelseGradering ===
                Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND);

    return (
        <Dropdown>
            <PosisjonertMenyknapp
                variant="secondary"
                size="small"
                icon={<ExpandFilled />}
                iconPosition={'right'}
                forwardedAs={Dropdown.Toggle}
            >
                Meny
            </PosisjonertMenyknapp>
            <StyletDropdownMenu>
                <Dropdown.Menu.List>
                    <OpprettBehandling minimalFagsak={minimalFagsak} />
                    {!!bruker && <OpprettFagsak personInfo={bruker} />}
                    <Dropdown.Menu.List.Item
                        onClick={() => navigate(`/fagsak/${minimalFagsak.id}/dokumentutsending`)}
                    >
                        Send informasjonsbrev
                    </Dropdown.Menu.List.Item>
                    {åpenBehandling.status === RessursStatus.SUKSESS && <Dropdown.Menu.Divider />}
                    {åpenBehandling.status === RessursStatus.SUKSESS && (
                        <HenleggBehandling
                            fagsakId={minimalFagsak.id}
                            behandling={åpenBehandling.data}
                        />
                    )}
                    {åpenBehandling.status === RessursStatus.SUKSESS && <EndreBehandlendeEnhet />}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD &&
                        minimalFagsak.fagsakType !== FagsakType.INSTITUSJON && (
                            <EndreBehandlingstema />
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        !vurderErLesevisning() &&
                        (åpenBehandling.data.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KLAGE ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                            åpenBehandling.data.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
                            åpenBehandling.data.type ===
                                Behandlingstype.MIGRERING_FRA_INFOTRYGD) && (
                            <LeggTilBarnPBehandling behandling={åpenBehandling.data} />
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.status === BehandlingStatus.UTREDES && (
                            <SettEllerOppdaterVenting behandling={åpenBehandling.data} />
                        )}
                    {åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.aktivSettPåVent && (
                            <TaBehandlingAvVent behandling={åpenBehandling.data} />
                        )}
                    {toggles[ToggleNavn.leggTilMottaker] &&
                        !brukerHarStrengtFortroligAdresse &&
                        åpenBehandling.status === RessursStatus.SUKSESS &&
                        åpenBehandling.data.status === BehandlingStatus.UTREDES &&
                        (åpenBehandling.data.type === Behandlingstype.FØRSTEGANGSBEHANDLING ||
                            åpenBehandling.data.type === Behandlingstype.REVURDERING) && (
                            <LeggTilEllerFjernBrevmottakere åpenBehandling={åpenBehandling.data} />
                        )}
                </Dropdown.Menu.List>
            </StyletDropdownMenu>
        </Dropdown>
    );
};

export default Behandlingsmeny;
