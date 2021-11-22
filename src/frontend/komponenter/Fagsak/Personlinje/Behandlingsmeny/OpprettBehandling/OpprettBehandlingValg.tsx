import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieDatovelger, FamilieSelect } from '@navikt/familie-form-elements';
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
import { FamilieIsoDate } from '../../../../../utils/kalender';
import { BehandlingstemaSelect } from '../../../../Felleskomponenter/BehandlingstemaSelect';
import { VisningBehandling } from '../../../Saksoversikt/visningBehandling';

const FixedDatoVelger = styled(FamilieDatovelger)`
    .nav-datovelger__kalenderPortal__content {
        position: fixed;
    }
`;

const FeltFeilmelding = styled(Normaltekst)`
    margin-top: 0.5rem;
    font-weight: 600;
    color: ${navFarger.redError};
`;

interface IProps {
    behandlingstype: Felt<Behandlingstype | Tilbakekrevingsbehandlingstype | ''>;
    behandlingsårsak: Felt<BehandlingÅrsak | ''>;
    behandlingstema: Felt<IBehandlingstema | undefined>;
    migreringsdato?: Felt<FamilieIsoDate | undefined>;
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
    migreringsdato = undefined,
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
    const kanOppretteFørstegangsbehandling = !minimalFagsak
        ? true
        : minimalFagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const kanOppretteRevurdering = !minimalFagsak
        ? false
        : minimalFagsak.behandlinger.length > 0 && kanOppretteBehandling;
    const kanOppretteTekniskEndring =
        kanOppretteRevurdering &&
        (toggles[ToggleNavn.visTekniskOpphør] || toggles[ToggleNavn.kanBehandleTekniskEndring]);
    const kanOppretteTilbakekreving = !manuellJournalfør && !kanOppretteFørstegangsbehandling;
    const kanOppretteSmåbarnstillegg = toggles[ToggleNavn.kanBehandleSmåbarnstillegg];
    const kanOppretteMigreringFraInfotrygd =
        kanOppretteRevurdering && toggles[ToggleNavn.kanManueltMigrereTilbakeITid];
    const erMigreringFraInfotrygd =
        !manuellJournalfør && behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

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
                    disabled={!kanOppretteFørstegangsbehandling}
                    value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                >
                    Førstegangsbehandling
                </option>
                <option
                    aria-selected={behandlingstype.verdi === Behandlingstype.REVURDERING}
                    disabled={!kanOppretteRevurdering}
                    value={Behandlingstype.REVURDERING}
                >
                    Revurdering
                </option>

                {kanOppretteTekniskEndring && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.TEKNISK_ENDRING}
                        disabled={!kanOppretteRevurdering}
                        value={Behandlingstype.TEKNISK_ENDRING}
                    >
                        Teknisk endring
                    </option>
                )}

                <option
                    aria-selected={
                        behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING
                    }
                    disabled={!kanOppretteTilbakekreving}
                    value={Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                >
                    Tilbakekreving
                </option>

                {kanOppretteMigreringFraInfotrygd && (
                    <option
                        aria-selected={
                            behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD
                        }
                        disabled={!kanOppretteRevurdering}
                        value={Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                    >
                        Migrering fra infotrygd
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
                    {erMigreringFraInfotrygd
                        ? Object.values(BehandlingÅrsak)
                              .filter(årsak => årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO)
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
                              })
                        : Object.values(BehandlingÅrsak)
                              .filter(
                                  årsak =>
                                      årsak !== BehandlingÅrsak.TEKNISK_OPPHØR &&
                                      årsak !== BehandlingÅrsak.TEKNISK_ENDRING &&
                                      årsak !== BehandlingÅrsak.FØDSELSHENDELSE &&
                                      årsak !== BehandlingÅrsak.SATSENDRING &&
                                      årsak !== BehandlingÅrsak.MIGRERING &&
                                      årsak !== BehandlingÅrsak.OMREGNING_6ÅR &&
                                      årsak !== BehandlingÅrsak.OMREGNING_18ÅR &&
                                      (årsak !== BehandlingÅrsak.SMÅBARNSTILLEGG ||
                                          kanOppretteSmåbarnstillegg) &&
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

            {erMigreringFraInfotrygd && migreringsdato?.erSynlig && (
                <>
                    <FixedDatoVelger
                        {...migreringsdato.hentNavInputProps(visFeilmeldinger)}
                        valgtDato={migreringsdato.verdi}
                        label={'Ny migreringsdato'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                    />
                    {migreringsdato.feilmelding && visFeilmeldinger && (
                        <FeltFeilmelding>{migreringsdato.feilmelding}</FeltFeilmelding>
                    )}
                </>
            )}
        </>
    );
};

export default OpprettBehandlingValg;
