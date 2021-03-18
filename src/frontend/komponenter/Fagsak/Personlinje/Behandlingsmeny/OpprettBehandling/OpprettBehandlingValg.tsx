import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { ISkjema } from '@navikt/familie-skjema';

import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    behandlingÅrsak,
} from '../../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../../typer/fagsak';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';

interface IProps {
    fagsak: IFagsak;
    opprettBehandlingSkjema: ISkjema<
        {
            behandlingstype: Behandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
        },
        IFagsak
    >;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
}

const OpprettBehandlingValg: React.FC<IProps> = ({ fagsak, opprettBehandlingSkjema }) => {
    const { toggles } = useApp();
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    const behandlingstypeFelt = opprettBehandlingSkjema.felter.behandlingstype;
    const behandlingsårsakFelt = opprettBehandlingSkjema.felter.behandlingsårsak;

    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const førstegangsbehandlingEnabled =
        fagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const revurderingEnabled = fagsak.behandlinger.length > 0 && kanOppretteBehandling;
    const visTekniskOpphør = revurderingEnabled && toggles[ToggleNavn.visTekniskOpphør];

    return (
        <>
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
                    aria-selected={behandlingstypeFelt.verdi === Behandlingstype.REVURDERING}
                    disabled={!revurderingEnabled}
                    value={Behandlingstype.REVURDERING}
                >
                    Revurdering
                </option>

                {visTekniskOpphør && (
                    <option
                        aria-selected={behandlingstypeFelt.verdi === Behandlingstype.TEKNISK_OPPHØR}
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
        </>
    );
};

export default OpprettBehandlingValg;
