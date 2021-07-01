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
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentAktivBehandlingPåFagsak } from '../../../../../utils/fagsak';

interface IProps {
    behandlingstype: Felt<Behandlingstype | Tilbakekrevingsbehandlingstype | ''>;
    behandlingsårsak: Felt<BehandlingÅrsak | ''>;
    fagsak?: IFagsak;
    visFeilmeldinger: boolean;
    erLesevisning?: boolean;
    manuellJournalfør?: boolean;
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
    manuellJournalfør = false,
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
    const visManuellSatsendring = revurderingEnabled && toggles[ToggleNavn.manuellSatsendring];
    const kanOppretteTilbakekreving = !manuellJournalfør && toggles[ToggleNavn.tilbakekreving];

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

                {kanOppretteTilbakekreving && (
                    <option
                        aria-selected={
                            behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
                        }
                        disabled={!revurderingEnabled}
                        value={Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                    >
                        Tilbakekreving
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
                                årsak !== BehandlingÅrsak.FØDSELSHENDELSE &&
                                (visManuellSatsendring || årsak !== BehandlingÅrsak.SATSENDRING)
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
