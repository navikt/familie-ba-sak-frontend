import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import '@navikt/ds-css-internal';
import { ExpandFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { hentDataFraRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import { BehandlingStatus, Behandlingstype, BehandlingÅrsak } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FagsakType } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';
import EndreBehandlendeEnhet from './EndreBehandlendeEnhet/EndreBehandlendeEnhet';
import EndreBehandlingstema from './EndreBehandling/EndreBehandlingstema';
import HenleggBehandling from './HenleggBehandling/HenleggBehandling';
import SettEllerOppdaterVenting from './LeggBehandlingPåVent/SettEllerOppdaterVenting';
import TaBehandlingAvVent from './LeggBehandlingPåVent/TaBehandlingAvVent';
import LeggTilBarnPåBehandling from './LeggTilBarnPåBehandling/LeggTilBarnPåBehandling';
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
    const { åpenBehandling: åpenBehandlingRessurs, vurderErLesevisning } = useBehandling();
    const navigate = useNavigate();
    const { behandlingId: behandlingIdFraURL } = useSakOgBehandlingParams();

    const erLesevisning = vurderErLesevisning();
    const åpenBehandling = hentDataFraRessurs(åpenBehandlingRessurs);
    const erPåBehandling = !!behandlingIdFraURL && !!åpenBehandling;

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
                    {erPåBehandling && <Dropdown.Menu.Divider />}
                    {erPåBehandling && (
                        <HenleggBehandling
                            fagsakId={minimalFagsak.id}
                            behandling={åpenBehandling}
                        />
                    )}
                    {erPåBehandling && <EndreBehandlendeEnhet />}
                    {erPåBehandling &&
                        åpenBehandling.årsak !== BehandlingÅrsak.SØKNAD &&
                        minimalFagsak.fagsakType !== FagsakType.INSTITUSJON && (
                            <EndreBehandlingstema />
                        )}
                    {erPåBehandling &&
                        !vurderErLesevisning() &&
                        (åpenBehandling.årsak === BehandlingÅrsak.NYE_OPPLYSNINGER ||
                            åpenBehandling.årsak === BehandlingÅrsak.KLAGE ||
                            åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                            åpenBehandling.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
                            åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD) && (
                            <LeggTilBarnPåBehandling behandling={åpenBehandling} />
                        )}
                    {erPåBehandling && åpenBehandling.status === BehandlingStatus.UTREDES && (
                        <SettEllerOppdaterVenting behandling={åpenBehandling} />
                    )}
                    {erPåBehandling && åpenBehandling.aktivSettPåVent && (
                        <TaBehandlingAvVent behandling={åpenBehandling} />
                    )}
                    {erPåBehandling &&
                        minimalFagsak.fagsakType !== FagsakType.INSTITUSJON &&
                        (!erLesevisning || åpenBehandling.brevmottakere.length > 0) &&
                        (åpenBehandling.type === Behandlingstype.FØRSTEGANGSBEHANDLING ||
                            åpenBehandling.type === Behandlingstype.REVURDERING) && (
                            <LeggTilEllerFjernBrevmottakere åpenBehandling={åpenBehandling} />
                        )}
                </Dropdown.Menu.List>
            </StyletDropdownMenu>
        </Dropdown>
    );
};

export default Behandlingsmeny;
