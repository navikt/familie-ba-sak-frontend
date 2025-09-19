import { feil, ok, useFelt } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema/dist/typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakContext } from '../sider/Fagsak/FagsakContext';
import type { IForelderBarnRelasjon } from '../typer/person';
import { ForelderBarnRelasjonRolle } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';

interface IProps {
    avhengigheter?: Avhengigheter;
    skalFeltetVises?: (avhengigheter: Avhengigheter) => boolean;
}

export const useBarnIBrevFelter = ({ avhengigheter, skalFeltetVises }: IProps) => {
    const { bruker: brukerRessurs } = useFagsakContext();

    const barnIBrev = useFelt<IBarnMedOpplysninger[]>({
        verdi: [],
        valideringsfunksjon: felt => {
            return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                ? ok(felt)
                : feil(felt, 'Du må velge barn');
        },
        avhengigheter: avhengigheter,
        skalFeltetVises: skalFeltetVises,
        nullstillVedAvhengighetEndring: false,
    });

    const hentBarnMedOpplysningerFraBruker = () => {
        if (brukerRessurs.status === RessursStatus.SUKSESS)
            return (
                brukerRessurs.data.forelderBarnRelasjon
                    .filter(
                        (relasjon: IForelderBarnRelasjon) => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                    )
                    .map(
                        (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                            merket: false,
                            ident: relasjon.personIdent,
                            navn: relasjon.navn,
                            fødselsdato: relasjon.fødselsdato,
                            manueltRegistrert: false,
                            erFolkeregistrert: true,
                        })
                    ) ?? []
            );
        else return [];
    };

    const nullstillBarnIBrev = () => {
        barnIBrev.validerOgSettFelt(hentBarnMedOpplysningerFraBruker());
    };

    return {
        barnIBrev,
        nullstillBarnIBrev,
    };
};
