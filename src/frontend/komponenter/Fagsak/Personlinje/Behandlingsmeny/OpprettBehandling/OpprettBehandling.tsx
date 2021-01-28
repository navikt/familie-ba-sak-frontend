import React, { useState } from 'react';

import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingStatus,
    Behandlingstype,
    behandlingÅrsak,
    BehandlingÅrsak,
} from '../../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../../typer/fagsak';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import useOpprettBehandling from './useOpprettBehandling';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
}

const OpprettBehandling: React.FC<IProps> = ({ onListElementClick, fagsak }) => {
    const { toggles } = useApp();
    const [visModal, settVisModal] = useState(false);

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const førstegangsbehandlingEnabled =
        fagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const revurderingEnabled = fagsak.behandlinger.length > 0 && kanOppretteBehandling;
    const visTekniskOpphør = revurderingEnabled && toggles[ToggleNavn.visTekniskOpphør];

    const { onBekreft, opprettBehandlingSkjema, nullstillSkjema } = useOpprettBehandling(() =>
        settVisModal(false)
    );

    const lukkOpprettBehandlingModal = () => {
        nullstillSkjema();
        settVisModal(false);
    };

    const behandlingstypeFelt = opprettBehandlingSkjema.felter.behandlingstype;
    const behandlingsårsakFelt = opprettBehandlingSkjema.felter.behandlingsårsak;

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
                            onClick={() => onBekreft(fagsak.søkerFødselsnummer)}
                            children={'Bekreft'}
                            spinner={
                                opprettBehandlingSkjema.submitRessurs.status ===
                                RessursStatus.HENTER
                            }
                            disabled={
                                opprettBehandlingSkjema.submitRessurs.status ===
                                RessursStatus.HENTER
                            }
                        />,
                    ],
                    onClose: lukkOpprettBehandlingModal,
                    lukkKnapp: true,
                    tittel: 'Opprett ny behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe feil={hentFrontendFeilmelding(opprettBehandlingSkjema.submitRessurs)}>
                    <SkjultLegend>Opprett ny behandling</SkjultLegend>
                    <FamilieSelect
                        {...behandlingstypeFelt.hentNavBaseSkjemaProps(
                            opprettBehandlingSkjema.visFeilmeldinger
                        )}
                        erLesevisning={false}
                        name={'Behandling'}
                        label={'Velg type behandling'}
                        onChange={(event: React.ChangeEvent<BehandlingstypeSelect>): void => {
                            behandlingstypeFelt.onChange(event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        <option
                            aria-selected={
                                behandlingstypeFelt.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING
                            }
                            disabled={!førstegangsbehandlingEnabled}
                            value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                        >
                            Førstegangsbehandling
                        </option>
                        <option
                            aria-selected={
                                behandlingstypeFelt.verdi === Behandlingstype.REVURDERING
                            }
                            disabled={!revurderingEnabled}
                            value={Behandlingstype.REVURDERING}
                        >
                            Revurdering
                        </option>

                        {visTekniskOpphør && (
                            <option
                                aria-selected={
                                    behandlingstypeFelt.verdi === Behandlingstype.TEKNISK_OPPHØR
                                }
                                disabled={!revurderingEnabled}
                                value={Behandlingstype.TEKNISK_OPPHØR}
                            >
                                Teknisk opphør
                            </option>
                        )}
                    </FamilieSelect>

                    {opprettBehandlingSkjema.felter.behandlingsårsak.erSynlig && (
                        <FamilieSelect
                            {...behandlingsårsakFelt.hentNavBaseSkjemaProps(
                                opprettBehandlingSkjema.visFeilmeldinger
                            )}
                            erLesevisning={false}
                            name={'Behandlingsårsak'}
                            label={'Velg årsak'}
                            onChange={(event: React.ChangeEvent<BehandlingÅrsakSelect>): void => {
                                behandlingsårsakFelt.onChange(event.target.value);
                            }}
                        >
                            <option disabled={true} value={''}>
                                Velg
                            </option>
                            {Object.values(BehandlingÅrsak)
                                .filter(
                                    årsak =>
                                        årsak !== BehandlingÅrsak.TEKNISK_OPPHØR &&
                                        årsak !== BehandlingÅrsak.FØDSELSHENDELSE
                                )
                                .map(årsak => {
                                    return (
                                        <option
                                            key={årsak}
                                            aria-selected={behandlingsårsakFelt.verdi === årsak}
                                            value={årsak}
                                        >
                                            {behandlingÅrsak[årsak]}
                                        </option>
                                    );
                                })}
                        </FamilieSelect>
                    )}
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default OpprettBehandling;
