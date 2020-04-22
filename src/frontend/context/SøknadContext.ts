import createUseContext from 'constate';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import React, { useState } from 'react';

import { BehandlingKategori, BehandlingUnderkategori } from '../typer/behandling';
import { FamilieRelasjonRolle, IFamilieRelasjon, IPerson } from '../typer/person';
import { RessursStatus } from '../typer/ressurs';
import { IBarnMedOpplysninger, ISøknadDTO, TypeSøker } from '../typer/søknad';
import { useFagsakRessurser } from './FagsakContext';

const initalState = (bruker?: IPerson): ISøknadDTO => {
    return {
        kategori: BehandlingKategori.NASJONAL,
        underkategori: BehandlingUnderkategori.ORDINÆR,
        typeSøker: TypeSøker.ORDINÆR,
        søkerMedOpplysninger: {
            ident: bruker?.personIdent ?? '',
            oppholderSegINorge: true,
            harOppholdtSegINorgeSiste12Måneder: true,
            komTilNorge: '',
            skalOppholdeSegINorgeNeste12Måneder: true,
            tilleggsopplysninger: '',
        },
        barnaMedOpplysninger:
            bruker?.familierelasjoner
                .filter(
                    (relasjon: IFamilieRelasjon) =>
                        relasjon.relasjonRolle === FamilieRelasjonRolle.BARN
                )
                .map(
                    (relasjon: IFamilieRelasjon): IBarnMedOpplysninger => ({
                        inkludertISøknaden: true,
                        borMedSøker: true,
                        ident: relasjon.personIdent,
                        oppholderSegINorge: true,
                        harOppholdtSegINorgeSiste12Måneder: true,
                        tilleggsopplysninger: '',
                        navn: relasjon.navn,
                        fødselsdato: relasjon.fødselsdato,
                    })
                ) ?? [],
        annenPartIdent: '',
    };
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
    const { bruker } = useFagsakRessurser();
    const [søknad, settSøknad] = React.useState<ISøknadDTO>(initalState());
    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);

    React.useEffect(() => {
        if (bruker.status === RessursStatus.SUKSESS) {
            settSøknad(initalState(bruker.data));
        }
    }, [bruker.status]);

    const erSøknadGyldig = (): boolean => {
        let søknadenErGyldig = true;
        if (process.env.NODE_ENV === 'development') {
            return true;
        }

        if (
            søknad.barnaMedOpplysninger.filter(
                (barn: IBarnMedOpplysninger) => barn.inkludertISøknaden
            ).length === 0
        ) {
            søknadenErGyldig = false;
            settFeilmeldinger([
                ...feilmeldinger,
                { skjemaelementId: 'barna', feilmelding: 'Ingen av barna er valgt.' },
            ]);
        }

        return søknadenErGyldig;
    };

    const settBarn = (barn: IBarnMedOpplysninger): void => {
        settSøknad({
            ...søknad,
            barnaMedOpplysninger: søknad.barnaMedOpplysninger.map((it: IBarnMedOpplysninger) =>
                it.ident === barn.ident ? barn : it
            ),
        });
    };

    return { feilmeldinger, søknad, settBarn, settSøknad, erSøknadGyldig };
});

export { SøknadProvider, useSøknad };
