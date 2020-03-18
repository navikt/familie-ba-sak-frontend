import React, { useState } from 'react';
import createUseContext from 'constate';
import { ISøknadDTO, TypeSøker, IPartMedOpplysninger } from '../typer/søknad';
import { BehandlingKategori, BehandlingUnderkategori } from '../typer/behandling';
import { useBruker } from './BrukerContext';
import { IPerson, PersonType, IFamilieRelasjon, FamilieRelasjonRolle } from '../typer/person';
import { RessursStatus } from '../typer/ressurs';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

const initalState = (bruker?: IPerson): ISøknadDTO => {
    return {
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        typeSøker: TypeSøker.ORDINÆR,
        søkerMedOpplysninger: initellOpplysninger(bruker?.personIdent ?? '', PersonType.SØKER),
        barnaMedOpplysninger:
            bruker?.familierelasjoner
                .filter(
                    (relasjon: IFamilieRelasjon) =>
                        relasjon.relasjonsrolle !== FamilieRelasjonRolle.BARN
                )
                .map((relasjon: IFamilieRelasjon) => {
                    return initellOpplysninger(relasjon.personIdent, PersonType.BARN);
                }) ?? [],
        annenPartIdent: '',
    };
};

const initellOpplysninger = (ident: string, personType: PersonType): IPartMedOpplysninger => {
    return {
        checked: true,
        ident,
        personType,
        opphold: {
            oppholderSegINorge: true,
            harOppholdtSegINorgeSiste12Måneder: true,
            komTilNorge: '',
            skalOppholdeSegINorgeNeste12Måneder: true,
            tilleggsopplysninger: '',
        },
    };
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
    const { bruker } = useBruker();
    const [søknad, settSøknad] = React.useState<ISøknadDTO>(initalState());
    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);

    React.useEffect(() => {
        if (bruker.status === RessursStatus.SUKSESS) {
            settSøknad(initalState(bruker.data));
        }
    }, [bruker.status]);

    const erSøknadGyldig = (): boolean => {
        let søknadenErGyldig = true;
        if (process.env.NODE_ENV === 'developmen') {
            return true;
        }

        if (søknad.annenPartIdent === '') {
            søknadenErGyldig = false;
            settFeilmeldinger([
                ...feilmeldinger,
                { skjemaelementId: 'hent-person', feilmelding: 'Annen part er ikke utfylt' },
            ]);
        }

        return søknadenErGyldig;
    };

    return { feilmeldinger, søknad, settSøknad, erSøknadGyldig };
});

export { SøknadProvider, useSøknad };
