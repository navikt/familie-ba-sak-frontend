import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { Felt } from '@navikt/familie-skjema';

import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    behandlingÅrsak,
} from '../../../../../typer/behandling';
import { IBehandlingstema } from '../../../../../typer/behandlingstema';
import { FagsakStatus, IMinimalFagsak } from '../../../../../typer/fagsak';
import { Tilbakekrevingsbehandlingstype } from '../../../../../typer/tilbakekrevingsbehandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../../../utils/fagsak';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import { VisningBehandling } from '../../../Saksoversikt/visningBehandling';

interface IProps {
    behandlingstype: Felt<Behandlingstype | Tilbakekrevingsbehandlingstype | ''>;
    behandlingsårsak: Felt<BehandlingÅrsak | ''>;
    behandlingstema: Felt<IBehandlingstema | undefined>;
    minimalFagsak?: IMinimalFagsak;
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
    behandlingstema,
    minimalFagsak,
    visFeilmeldinger,
    erLesevisning = false,
    manuellJournalfør = false,
}) => {
    const { toggles } = useApp();
    const aktivBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const kanOppretteBehandling =
        !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const førstegangsbehandlingEnabled = !minimalFagsak
        ? true
        : minimalFagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const revurderingEnabled = !minimalFagsak
        ? false
        : minimalFagsak.behandlinger.length > 0 && kanOppretteBehandling;
    const visTekniskOpphør = revurderingEnabled && toggles[ToggleNavn.visTekniskOpphør];
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
                                årsak !== BehandlingÅrsak.SATSENDRING &&
                                årsak !== BehandlingÅrsak.MIGRERING &&
                                årsak !== BehandlingÅrsak.OMREGNING_6ÅR &&
                                årsak !== BehandlingÅrsak.OMREGNING_18ÅR &&
                                (årsak !== BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                                    toggles[ToggleNavn.kanManueltKorrigereMedVedtaksbrev])
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

            {behandlingstema.erSynlig && (
                <BehandlingstemaSelect
                    behandlingstema={behandlingstema}
                    erLesevisning={erLesevisning}
                    visFeilmeldinger={visFeilmeldinger}
                    name="Behandlingstema"
                    label="Velg behandlingstema"
                />
            )}
        </>
    );
};

export default OpprettBehandlingValg;
