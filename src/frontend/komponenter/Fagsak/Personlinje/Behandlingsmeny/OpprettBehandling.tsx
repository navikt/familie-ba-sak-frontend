import { FamilieSelect } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../Felleskomponenter/Modal/UIModalWrapper';
import { Behandlingstype } from '../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../typer/fagsak';
import { useBehandling } from '../../../../context/BehandlingContext';
import { RessursStatus } from '@navikt/familie-typer';
import {
    IOpprettBehandlingBarn,
    useOpprettBehandling,
} from '../../../../context/OpprettBehandlingContext';
import useFagsakApi from '../../useFagsakApi';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

const OpprettBehandling: React.FC<IProps> = ({ onListElementClick, fagsak }) => {
    const [visModal, settVisModal] = useState(false);
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const åpenBehandling = useBehandling();
    const {
        barna,
        behandlingstype,
        settBehandlingstype,
        kategori,
        underkategori,
    } = useOpprettBehandling();
    const { opprettBehandling } = useFagsakApi(settVisFeilmeldinger, settOpprettelseFeilmelding);

    const harÅpenBehandling = åpenBehandling.åpenBehandling.status === RessursStatus.SUKSESS;
    const førstegangsbehandlingEnabled =
        !(fagsak.status === FagsakStatus.LØPENDE) && !harÅpenBehandling;
    const revurderingEnabled = fagsak.behandlinger.length > 0 && !harÅpenBehandling;

    const lukkOpprettBehandlingModal = () => {
        settBehandlingstype(undefined);
        settVisFeilmeldinger(false);
        settVisModal(false);
    };

    const onBekreft = () => {
        if (!behandlingstype) {
            settOpprettelseFeilmelding(
                'Velg type behandling som skal opprettes fra nedtrekkslisten'
            );
            settVisFeilmeldinger(true);
        } else {
            opprettBehandling(
                {
                    behandlingType: behandlingstype,
                    søkersIdent: fagsak.søkerFødselsnummer,
                    kategori: kategori,
                    underkategori: underkategori,
                    barnasIdenter:
                        behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD
                            ? barna
                                  .filter(
                                      (opprettBehandlingBarn: IOpprettBehandlingBarn) =>
                                          opprettBehandlingBarn.checked
                                  )
                                  .map(
                                      (opprettBehandlingBarn: IOpprettBehandlingBarn) =>
                                          opprettBehandlingBarn.barn.personIdent
                                  )
                            : [],
                },
                lukkOpprettBehandlingModal
            );
        }
    };

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settVisModal(true);
                }}
            >
                Opprett behandling
            </KnappBase>

            <UIModalWrapper
                modal={{
                    actions: [
                        <Flatknapp
                            key={'avbryt'}
                            mini={true}
                            onClick={lukkOpprettBehandlingModal}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            disabled={false}
                            onClick={() => onBekreft()}
                            children={'Bekreft'}
                        />,
                    ],
                    onClose: lukkOpprettBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Opprett ny behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe>
                    <FamilieSelect
                        erLesevisning={false}
                        value={behandlingstype}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                            settVisFeilmeldinger(false);
                            settBehandlingstype(
                                event.target.value
                                    ? (event.target.value as Behandlingstype)
                                    : undefined
                            );
                        }}
                        feil={visFeilmeldinger ? opprettelseFeilmelding : ''}
                    >
                        <option value={''}>Velg</option>
                        <option
                            disabled={!førstegangsbehandlingEnabled}
                            value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                        >
                            Førstegangsbehandling
                        </option>
                        <option disabled={!revurderingEnabled} value={Behandlingstype.REVURDERING}>
                            Revurdering
                        </option>
                    </FamilieSelect>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default OpprettBehandling;
