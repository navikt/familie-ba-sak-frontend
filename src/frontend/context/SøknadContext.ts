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

    const validerSøknad = (validerSøknad: ISøknadDTO): boolean => {
        const søknadFeilmeldinger: FeiloppsummeringFeil[] = [];

        if (
            !validerSøknad.søkerMedOpplysninger.harOppholdtSegINorgeSiste12Måneder &&
            (validerSøknad.søkerMedOpplysninger.komTilNorge === '' ||
                !validerSøknad.søkerMedOpplysninger.komTilNorge)
        ) {
            søknadFeilmeldinger.push({
                skjemaelementId: 'søker-kom-til-norge',
                feilmelding: 'Dato for når søker kom til Norge må settes',
            });
        }

        if (
            validerSøknad.barnaMedOpplysninger.filter(
                (barn: IBarnMedOpplysninger) => barn.inkludertISøknaden
            ).length === 0
        ) {
            søknadFeilmeldinger.push({
                skjemaelementId: 'barna',
                feilmelding: 'Ingen av barna er valgt.',
            });
        }

        console.log('søknadFeilmeldinger', søknadFeilmeldinger);
        settFeilmeldinger(søknadFeilmeldinger);

        return søknadFeilmeldinger.length === 0;
    };

    const settBarn = (barn: IBarnMedOpplysninger): void => {
        const nySøknad = {
            ...søknad,
            barnaMedOpplysninger: søknad.barnaMedOpplysninger.map((it: IBarnMedOpplysninger) =>
                it.ident === barn.ident ? barn : it
            ),
        };

        settSøknad(nySøknad);
        validerSøknad(nySøknad);
    };

    const settSøknadOgValider = (søknad: ISøknadDTO) => {
        settSøknad(søknad);
        validerSøknad(søknad);
    };

    return { feilmeldinger, søknad, settBarn, settSøknadOgValider, erSøknadGyldig: validerSøknad };
});

export { SøknadProvider, useSøknad };
