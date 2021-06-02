import { Valideringsstatus } from '@navikt/familie-skjema';
import { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { Brevmal } from '../../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { BehandlingÅrsak, IBehandling, Behandlingstype } from '../../typer/behandling';
import { Målform } from '../../typer/søknad';
import { mockBehandling } from '../../utils/test/behandling/behandling.mock';
import { mockBarn, mockSøker } from '../../utils/test/person/person.mock';
import {
    hentMuligeBrevmalerImplementering,
    mottakersMålformImplementering,
} from '../BrevModulContext';

describe('BrevmodulContext', () => {
    describe('hentMuligeBrevmalerImplementering', () => {
        const lagBehandlignRessursSuksess = (behandling: IBehandling): Ressurs<IBehandling> => ({
            status: RessursStatus.SUKSESS,
            data: behandling,
        });

        const behandlingSøknad = mockBehandling({ årsak: BehandlingÅrsak.SØKNAD });
        test('Skal returnere liste med INNHENTE_OPPLYSNINGER når behandlingsårsaken er SØKNAD', () => {
            expect(
                hentMuligeBrevmalerImplementering(lagBehandlignRessursSuksess(behandlingSøknad))
            ).toEqual([Brevmal.INNHENTE_OPPLYSNINGER]);
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
            `Skal returnere liste med VARSEL_OM_REVURDERING når behandlingstypen er REVURDERING` +
                ` og årsaken er ikke er SØKNAD`,
            () => {
                behandlingsårsaker
                    .filter(årsak => årsak !== BehandlingÅrsak.SØKNAD)
                    .map(årsak =>
                        expect(
                            hentMuligeBrevmalerImplementering(
                                lagBehandlignRessursSuksess(
                                    mockBehandling({
                                        årsak: årsak,
                                        type: Behandlingstype.REVURDERING,
                                    })
                                )
                            )
                        ).toEqual([Brevmal.VARSEL_OM_REVURDERING])
                    );
            }
        );
    });

    describe('mottakersMålformImplementering', () => {
        const personIdent = '12345678930';
        const personerNB = [mockBarn, mockSøker({ målform: Målform.NB, personIdent })];
        const personerNN = [mockBarn, mockSøker({ målform: Målform.NN, personIdent })];
        test('Skal returnere NB når søkers målform er NB', () => {
            expect(
                mottakersMålformImplementering(personerNB, Valideringsstatus.OK, personIdent)
            ).toEqual(Målform.NB);
        });

        test('Skal returnere NN når søkers målform er NN', () => {
            expect(
                mottakersMålformImplementering(personerNN, Valideringsstatus.OK, personIdent)
            ).toEqual(Målform.NN);
        });
    });
});
