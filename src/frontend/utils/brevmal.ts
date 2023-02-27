import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { Brevmal } from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import type { IBehandling } from '../typer/behandling';
import { Behandlingstype, BehandlingÅrsak } from '../typer/behandling';
import { BehandlingKategori } from '../typer/behandlingstema';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { erOrgNr } from './formatter';

export const hentMuligeBrevmalerImplementering = (
    åpenBehandling: Ressurs<IBehandling>,
    tilpassetInstitusjon = false
): Brevmal[] => {
    if (åpenBehandling.status !== RessursStatus.SUKSESS) {
        return [];
    }

    const brevmaler: Brevmal[] = (Object.keys(Brevmal) as Brevmal[]).filter(
        brevmal => tilpassetInstitusjon === brevmal.endsWith('INSTITUSJON')
    );
    return brevmaler.filter(brevmal => brevmalKanVelgesForBehandling(brevmal, åpenBehandling.data));
};

const brevmalKanVelgesForBehandling = (brevmal: Brevmal, åpenBehandling: IBehandling): boolean => {
    switch (brevmal) {
        case Brevmal.INNHENTE_OPPLYSNINGER:
            return åpenBehandling.årsak === BehandlingÅrsak.SØKNAD;
        case Brevmal.VARSEL_OM_REVURDERING:
        case Brevmal.VARSEL_OM_REVURDERING_INSTITUSJON:
            return (
                åpenBehandling.type === Behandlingstype.REVURDERING &&
                åpenBehandling.årsak !== BehandlingÅrsak.SØKNAD
            );
        case Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14:
            return (
                åpenBehandling.type === Behandlingstype.REVURDERING &&
                [
                    BehandlingÅrsak.NYE_OPPLYSNINGER,
                    BehandlingÅrsak.SØKNAD,
                    BehandlingÅrsak.ÅRLIG_KONTROLL,
                ].includes(åpenBehandling.årsak)
            );
        case Brevmal.VARSEL_OM_REVURDERING_SAMBOER:
            return åpenBehandling.type === Behandlingstype.REVURDERING;
        case Brevmal.SVARTIDSBREV:
        case Brevmal.SVARTIDSBREV_INSTITUSJON:
            return åpenBehandling.årsak === BehandlingÅrsak.SØKNAD;
        case Brevmal.FORLENGET_SVARTIDSBREV:
        case Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON:
            return [Behandlingstype.FØRSTEGANGSBEHANDLING, Behandlingstype.REVURDERING].includes(
                åpenBehandling.type
            );
        case Brevmal.HENLEGGE_TRUKKET_SØKNAD:
            return false;
        case Brevmal.VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS:
            return (
                åpenBehandling.type === Behandlingstype.REVURDERING &&
                åpenBehandling.kategori === BehandlingKategori.EØS &&
                [BehandlingÅrsak.NYE_OPPLYSNINGER, BehandlingÅrsak.SØKNAD].includes(
                    åpenBehandling.årsak
                )
            );
        case Brevmal.INNHENTE_OPPLYSNINGER_ETTER_SØKNAD_I_SED:
            return (
                åpenBehandling.årsak === BehandlingÅrsak.SØKNAD &&
                åpenBehandling.kategori === BehandlingKategori.EØS &&
                [Behandlingstype.FØRSTEGANGSBEHANDLING, Behandlingstype.REVURDERING].includes(
                    åpenBehandling.type
                )
            );
        case Brevmal.VARSEL_OM_VEDTAK_ETTER_SØKNAD_I_SED:
            return (
                åpenBehandling.årsak === BehandlingÅrsak.SØKNAD &&
                åpenBehandling.kategori === BehandlingKategori.EØS &&
                [Behandlingstype.FØRSTEGANGSBEHANDLING, Behandlingstype.REVURDERING].includes(
                    åpenBehandling.type
                )
            );
        case Brevmal.INNHENTE_OPPLYSNINGER_INSTITUSJON:
            return åpenBehandling.årsak === BehandlingÅrsak.SØKNAD;
        case Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS:
        case Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER:
            return åpenBehandling.årsak === BehandlingÅrsak.ÅRLIG_KONTROLL;
    }
};

export const mottakersMålformImplementering = (
    personer: IGrunnlagPerson[],
    skjemaValideringsStatus: Valideringsstatus,
    mottakerIdent: string | readonly string[] | number
) =>
    (erOrgNr(mottakerIdent.toString())
        ? personer[0]?.målform
        : personer.find((person: IGrunnlagPerson) => {
              if (skjemaValideringsStatus === Valideringsstatus.OK) {
                  return person.personIdent === mottakerIdent;
              } else {
                  return person.type === PersonType.SØKER;
              }
          })?.målform) ?? Målform.NB;