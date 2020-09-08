import createUseContext from 'constate';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import React, { useState } from 'react';

import { BehandlingUnderkategori } from '../typer/behandling';
import { FamilieRelasjonRolle, IFamilieRelasjon, IPerson } from '../typer/person';
import { RessursStatus } from '@navikt/familie-typer';
import { IBarnMedOpplysninger, ISøknadDTO } from '../typer/søknad';
import { useFagsakRessurser } from './FagsakContext';

const initalState = (bruker?: IPerson): ISøknadDTO => {
    return {
        underkategori: BehandlingUnderkategori.ORDINÆR,
        søkerMedOpplysninger: {
            ident: bruker?.personIdent ?? '',
            målform: undefined,
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
                        ident: relasjon.personIdent,
                        navn: relasjon.navn,
                        fødselsdato: relasjon.fødselsdato,
                        manueltRegistrert: false,
                    })
                ) ?? [],
        endringAvOpplysningerBegrunnelse: '',
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

        if (validerSøknad.søkerMedOpplysninger.målform === undefined) {
            søknadFeilmeldinger.push({
                skjemaelementId: 'målform',
                feilmelding: 'Målform er ikke valgt.',
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
