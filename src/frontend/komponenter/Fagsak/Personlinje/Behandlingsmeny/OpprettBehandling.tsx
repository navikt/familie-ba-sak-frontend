import { FamilieSelect } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../Felleskomponenter/Modal/UIModalWrapper';
import {
    BehandlingKategori,
    BehandlingStatus,
    Behandlingstype,
    BehandlingUnderkategori,
} from '../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../typer/fagsak';
import useFagsakApi from '../../useFagsakApi';
import { hentAktivBehandlingPåFagsak } from '../../../../utils/fagsak';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

const OpprettBehandling: React.FC<IProps> = ({ onListElementClick, fagsak }) => {
    const [visModal, settVisModal] = useState(false);
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [behandlingstype, settBehandlingstype] = useState<Behandlingstype | undefined>(undefined);

    const { opprettBehandling } = useFagsakApi(settVisFeilmeldinger, settOpprettelseFeilmelding);

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const førstegangsbehandlingEnabled =
        fagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const revurderingEnabled = fagsak.behandlinger.length > 0 && kanOppretteBehandling;

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
                    kategori: BehandlingKategori.NASJONAL,
                    underkategori: BehandlingUnderkategori.ORDINÆR,
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
                        name={'Behandling'}
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
                            aria-selected={
                                behandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
                            }
                            disabled={!førstegangsbehandlingEnabled}
                            value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                        >
                            Førstegangsbehandling
                        </option>
                        <option
                            aria-selected={behandlingstype === Behandlingstype.REVURDERING}
                            disabled={!revurderingEnabled}
                            value={Behandlingstype.REVURDERING}
                        >
                            Revurdering
                        </option>
                    </FamilieSelect>
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default OpprettBehandling;
