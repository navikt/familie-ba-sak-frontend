import { Valideringsstatus } from '@navikt/familie-skjema';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';

import { hentMuligeBrevmalerImplementering, mottakersMålformImplementering } from './brevmal';

describe('hentMuligeBrevmalerImplementering', () => {
    const behandlingSøknad = lagBehandling({
        årsak: BehandlingÅrsak.SØKNAD,
        type: Behandlingstype.FØRSTEGANGSBEHANDLING,
    });
    test('Skal returnere liste med gyldige brev for når behandlingsårsaken er SØKNAD og behandlingstypen er FØRSTEGANGSBEHANDLING', () => {
        expect(hentMuligeBrevmalerImplementering(behandlingSøknad).sort()).toEqual(
            [
                Brevmal.INNHENTE_OPPLYSNINGER,
                Brevmal.FORLENGET_SVARTIDSBREV,
                Brevmal.INNHENTE_OPPLYSNINGER_OG_INFORMASJON_OM_AT_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_HAR_SØKT,
                Brevmal.SVARTIDSBREV,
            ].sort()
        );
    });

    const behandlingsårsaker = [
        BehandlingÅrsak.DØDSFALL_BRUKER,
        BehandlingÅrsak.KLAGE,
        BehandlingÅrsak.FØDSELSHENDELSE,
        BehandlingÅrsak.SØKNAD,
        BehandlingÅrsak.NYE_OPPLYSNINGER,
        BehandlingÅrsak.OMREGNING_6ÅR,
    ];
    test(
        `Skal returnere liste som inneholder VARSEL_OM_REVURDERING når behandlingstypen er REVURDERING` +
            ` og årsaken er ikke er SØKNAD`,
        () => {
            behandlingsårsaker
                .filter(årsak => årsak !== BehandlingÅrsak.SØKNAD)
                .map(årsak =>
                    expect(
                        hentMuligeBrevmalerImplementering(
                            lagBehandling({
                                årsak: årsak,
                                type: Behandlingstype.REVURDERING,
                            })
                        )
                    ).toContain(Brevmal.VARSEL_OM_REVURDERING)
                );
        }
    );
    const hentTilpassetInstitusjon = true;
    test('Skal returnere liste med brev tilpasset institusjon', () => {
        expect(hentMuligeBrevmalerImplementering(behandlingSøknad, hentTilpassetInstitusjon).sort()).toEqual(
            [
                Brevmal.INNHENTE_OPPLYSNINGER_INSTITUSJON,
                Brevmal.SVARTIDSBREV_INSTITUSJON,
                Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
            ].sort()
        );
    });
});

describe('mottakersMålformImplementering', () => {
    const personIdent = '12345678930';
    const orgNummer = '123456789';
    const barn = lagGrunnlagPerson({ type: PersonType.BARN, målform: Målform.NN });
    const personerNB = [barn, lagGrunnlagPerson({ type: PersonType.SØKER, målform: Målform.NB, personIdent })];
    const personerNN = [barn, lagGrunnlagPerson({ type: PersonType.SØKER, målform: Målform.NN, personIdent })];
    test('Skal returnere NB når søkers målform er NB', () => {
        expect(mottakersMålformImplementering(personerNB, Valideringsstatus.OK, personIdent)).toEqual(Målform.NB);
    });

    test('Skal returnere NN når søkers målform er NN', () => {
        expect(mottakersMålformImplementering(personerNN, Valideringsstatus.OK, personIdent)).toEqual(Målform.NN);
    });
    test('Skal returnere målformen registrert på barnet når mottakeren er en institusjon', () => {
        expect(mottakersMålformImplementering([barn], Valideringsstatus.OK, orgNummer)).toEqual(barn.målform);
    });
});
