import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { Felt } from '@navikt/familie-skjema';

import { useApp } from '../../../../../context/AppContext';
import {
    BehandlingStatus,
    Behandlingstype,
    behandlingUnderkategori,
    BehandlingUnderkategori,
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
    underkategori?: Felt<BehandlingUnderkategori | ''>;
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

interface BehandlingUnderkategoriSelect extends HTMLSelectElement {
    value: BehandlingUnderkategori | '';
}

const OpprettBehandlingValg: React.FC<IProps> = ({
    behandlingstype,
    behandlingsårsak,
    underkategori,
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

            {underkategori &&
                behandlingsårsak.verdi === BehandlingÅrsak.SØKNAD &&
                toggles[ToggleNavn.kanBehandleUtvidet] && (
                    <FamilieSelect
                        {...underkategori.hentNavBaseSkjemaProps(visFeilmeldinger)}
                        erLesevisning={erLesevisning}
                        name={'Behandlingsårsak'}
                        label={'Velg underkategori'}
                        onChange={(
                            event: React.ChangeEvent<BehandlingUnderkategoriSelect>
                        ): void => {
                            underkategori.onChange(event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        {Object.values(BehandlingUnderkategori).map(mapUnderkategori => {
                            return (
                                <option
                                    key={mapUnderkategori}
                                    aria-selected={underkategori.verdi === mapUnderkategori}
                                    value={mapUnderkategori}
                                >
                                    {behandlingUnderkategori[mapUnderkategori]}
                                </option>
                            );
                        })}
                    </FamilieSelect>
                )}
        </>
    );
};

export default OpprettBehandlingValg;
