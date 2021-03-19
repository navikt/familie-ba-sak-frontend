import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { Felt } from '@navikt/familie-skjema';

import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    behandlingÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../../../typer/fagsak';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';

interface IProps {
    behandlingstype: Felt<Behandlingstype | ''>;
    behandlingsårsak: Felt<BehandlingÅrsak | ''>;
    fagsak?: IFagsak;
    visFeilmeldinger: boolean;
    erLesevisning?: boolean;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
}

const OpprettBehandlingValg: React.FC<IProps> = ({
    behandlingstype,
    behandlingsårsak,
    fagsak,
    visFeilmeldinger,
    erLesevisning = false,
}) => {
    const { toggles } = useApp();
    const aktivBehandling: IBehandling | undefined = fagsak
        ? hentAktivBehandlingPåFagsak(fagsak)
        : undefined;

    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const førstegangsbehandlingEnabled = !fagsak
        ? true
        : fagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const revurderingEnabled = !fagsak
        ? false
        : fagsak.behandlinger.length > 0 && kanOppretteBehandling;
    const visTekniskOpphør = revurderingEnabled && toggles[ToggleNavn.visTekniskOpphør];

    return (
        <>
            <FamilieSelect
                {...behandlingstype.hentNavBaseSkjemaProps(visFeilmeldinger)}
                erLesevisning={erLesevisning}
                name={'Behandling'}
                label={'Velg type behandling'}
                onChange={(event: React.ChangeEvent<BehandlingstypeSelect>): void => {
                    behandlingstype.onChange(event.target.value);
                }}
            >
                <option disabled={true} value={''}>
                    Velg
                </option>
                <option
                    aria-selected={behandlingstype.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING}
                    disabled={!førstegangsbehandlingEnabled}
                    value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                >
                    Førstegangsbehandling
                </option>
                <option
                    aria-selected={behandlingstype.verdi === Behandlingstype.REVURDERING}
                    disabled={!revurderingEnabled}
                    value={Behandlingstype.REVURDERING}
                >
                    Revurdering
                </option>

                {visTekniskOpphør && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.TEKNISK_OPPHØR}
                        disabled={!revurderingEnabled}
                        value={Behandlingstype.TEKNISK_OPPHØR}
                    >
                        Teknisk opphør
                    </option>
                )}
            </FamilieSelect>

            {behandlingsårsak.erSynlig && (
                <FamilieSelect
                    {...behandlingsårsak.hentNavBaseSkjemaProps(visFeilmeldinger)}
                    erLesevisning={erLesevisning}
                    name={'Behandlingsårsak'}
                    label={'Velg årsak'}
                    onChange={(event: React.ChangeEvent<BehandlingÅrsakSelect>): void => {
                        behandlingsårsak.onChange(event.target.value);
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
                                    aria-selected={behandlingsårsak.verdi === årsak}
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
