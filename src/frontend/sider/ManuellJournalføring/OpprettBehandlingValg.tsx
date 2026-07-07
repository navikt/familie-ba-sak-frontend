import type { ChangeEvent } from 'react';

import { useSaksbehandler } from '@hooks/useSaksbehandler';
import type { VisningBehandling } from '@sider/Fagsak/Saksoversikt/visningBehandling';
import { BehandlingstemaSelect } from '@sider/ManuellJournalføring/BehandlingstemaSelect';
import type { ManuellJournalføringSkjemaFelter } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import type { BehandlingÅrsak } from '@typer/behandling';
import { BehandlingStatus, Behandlingstype, behandlingÅrsak, erBehandlingHenlagt } from '@typer/behandling';
import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import type { IPersonInfo } from '@typer/person';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { forrigeBehandlingVarTekniskEndringMedOpphør, hentTilgjengeligeBehandlingsårsaker } from '@utils/behandling';
import { hentAktivBehandlingPåMinimalFagsak } from '@utils/fagsak';

import { Select } from '@navikt/ds-react';
import type { ISkjema } from '@navikt/familie-skjema';

interface IProps {
    skjema: ISkjema<ManuellJournalføringSkjemaFelter, string>;
    minimalFagsak?: IMinimalFagsak;
    erLesevisning?: boolean;
    manuellJournalfør?: boolean;
    bruker?: IPersonInfo | undefined;
}

interface BehandlingstypeSelect extends HTMLSelectElement {
    value: Behandlingstype | '';
}

interface BehandlingÅrsakSelect extends HTMLSelectElement {
    value: BehandlingÅrsak | '';
}

const OpprettBehandlingValg = ({ skjema, minimalFagsak, erLesevisning = false, manuellJournalfør = false }: IProps) => {
    const saksbehandler = useSaksbehandler();
    const aktivBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const kanOppretteBehandling = !aktivBehandling || aktivBehandling?.status === BehandlingStatus.AVSLUTTET;
    const kanOppretteFørstegangsbehandling = !minimalFagsak
        ? true
        : minimalFagsak.status !== FagsakStatus.LØPENDE && kanOppretteBehandling;
    const kanOppretteRevurdering = !minimalFagsak
        ? false
        : minimalFagsak.behandlinger.filter(behandling => !erBehandlingHenlagt(behandling.resultat)).length > 0 &&
          kanOppretteBehandling;
    const kanOppretteTekniskEndring = kanOppretteBehandling && saksbehandler.harSuperbrukertilgang;
    const kanOppretteTilbakekreving = !manuellJournalfør;
    const kanOppretteMigreringFraInfotrygd = !manuellJournalfør && kanOppretteBehandling;
    const erMigreringFraInfotrygd =
        !manuellJournalfør && skjema.felter.behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const kanOpprettMigreringsbehandlingMedHelmanuellMigrering =
        kanOppretteMigreringFraInfotrygd &&
        (forrigeBehandlingVarTekniskEndringMedOpphør(minimalFagsak) || minimalFagsak?.status !== FagsakStatus.LØPENDE);

    const kanOppretteMigreringsbehandlingMedEndreMigreringsdato =
        kanOppretteMigreringFraInfotrygd && kanOppretteRevurdering;

    const kanOppretteKlagebehandling =
        minimalFagsak !== undefined && !minimalFagsak.finnesStrengtFortroligPersonIFagsak;

    const { behandlingsårsak, behandlingstype, behandlingstema } = skjema.felter;

    return (
        <>
            <Select
                {...behandlingstype.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                readOnly={erLesevisning}
                name={'Behandling'}
                label={'Velg type behandling'}
                onChange={(event: ChangeEvent<BehandlingstypeSelect>): void => {
                    behandlingstype.onChange(event.target.value);
                }}
            >
                <option disabled={true} value={''}>
                    Velg
                </option>
                {kanOppretteFørstegangsbehandling && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.FØRSTEGANGSBEHANDLING}
                        value={Behandlingstype.FØRSTEGANGSBEHANDLING}
                    >
                        Førstegangsbehandling
                    </option>
                )}
                {kanOppretteRevurdering && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.REVURDERING}
                        value={Behandlingstype.REVURDERING}
                    >
                        Revurdering
                    </option>
                )}

                {kanOppretteTekniskEndring && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.TEKNISK_ENDRING}
                        value={Behandlingstype.TEKNISK_ENDRING}
                    >
                        Teknisk endring
                    </option>
                )}

                {kanOppretteTilbakekreving && (
                    <option
                        aria-selected={behandlingstype.verdi === Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                        value={Tilbakekrevingsbehandlingstype.TILBAKEKREVING}
                    >
                        Tilbakekreving
                    </option>
                )}
                {kanOppretteKlagebehandling && (
                    <option
                        aria-selected={behandlingstype.verdi === Klagebehandlingstype.KLAGE}
                        value={Klagebehandlingstype.KLAGE}
                    >
                        Klage
                    </option>
                )}
                {kanOppretteMigreringFraInfotrygd && (
                    <option
                        aria-selected={behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                        value={Behandlingstype.MIGRERING_FRA_INFOTRYGD}
                    >
                        Migrering fra infotrygd
                    </option>
                )}
            </Select>
            {behandlingsårsak.erSynlig && (
                <Select
                    {...behandlingsårsak.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                    readOnly={erLesevisning}
                    name={'Behandlingsårsak'}
                    label={'Velg årsak'}
                    onChange={(event: ChangeEvent<BehandlingÅrsakSelect>): void => {
                        behandlingsårsak.onChange(event.target.value);
                    }}
                >
                    <option disabled={true} value={''}>
                        Velg
                    </option>
                    {hentTilgjengeligeBehandlingsårsaker(
                        erMigreringFraInfotrygd,
                        kanOpprettMigreringsbehandlingMedHelmanuellMigrering,
                        kanOppretteMigreringsbehandlingMedEndreMigreringsdato
                    ).map(årsak => {
                        return (
                            <option key={årsak} aria-selected={behandlingsårsak.verdi === årsak} value={årsak}>
                                {behandlingÅrsak[årsak]}
                            </option>
                        );
                    })}
                </Select>
            )}
            {behandlingstema.erSynlig && (
                <BehandlingstemaSelect
                    behandlingstema={behandlingstema}
                    fagsakType={minimalFagsak?.fagsakType}
                    erLesevisning={erLesevisning}
                    visFeilmeldinger={skjema.visFeilmeldinger}
                />
            )}
        </>
    );
};

export default OpprettBehandlingValg;
