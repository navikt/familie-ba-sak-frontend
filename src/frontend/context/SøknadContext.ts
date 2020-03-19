import React, { useState } from 'react';
import createUseContext from 'constate';
import { ISøknadDTO, TypeSøker, IBarnMedOpplysninger } from '../typer/søknad';
import { BehandlingKategori, BehandlingUnderkategori } from '../typer/behandling';
import { useBruker } from './BrukerContext';
import { IPerson, IFamilieRelasjon, FamilieRelasjonRolle } from '../typer/person';
import { RessursStatus } from '../typer/ressurs';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

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
                        checked: true,
                        borMedSøker: true,
                        ident: relasjon.personIdent,
                        oppholderSegINorge: true,
                        harOppholdtSegINorgeSiste12Måneder: true,
                        tilleggsopplysninger: '',
                    })
                ) ?? [],
        annenPartIdent: '',
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
        if (process.env.NODE_ENV === 'development') {
            return true;
        }

        if (
            søknad.barnaMedOpplysninger.filter((barn: IBarnMedOpplysninger) => barn.checked)
                .length === 0
        ) {
            søknadenErGyldig = false;
            settFeilmeldinger([
                ...feilmeldinger,
                { skjemaelementId: 'barna', feilmelding: 'Ingen av barna er valgt.' },
            ]);
        }

        return søknadenErGyldig;
    };

    const settBarn = (barn: IBarnMedOpplysninger) => {
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
