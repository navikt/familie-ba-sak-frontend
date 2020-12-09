import React, { useState } from 'react';

import createUseContext from 'constate';
import { useParams } from 'react-router';

import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { BehandlingSteg, BehandlingUnderkategori, hentStegNummer } from '../typer/behandling';
import { FamilieRelasjonRolle, IFamilierelasjon, IPersonInfo } from '../typer/person';
import { IBarnMedOpplysninger, ISøknadDTO } from '../typer/søknad';
import { useApp } from './AppContext';
import { useBehandling } from './BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const initalState = (bruker?: IPersonInfo): ISøknadDTO => {
    return {
        underkategori: BehandlingUnderkategori.ORDINÆR,
        søkerMedOpplysninger: {
            ident: bruker?.personIdent ?? '',
            målform: undefined,
        },
        barnaMedOpplysninger:
            bruker?.familierelasjoner
                .filter(
                    (relasjon: IFamilierelasjon) =>
                        relasjon.relasjonRolle === FamilieRelasjonRolle.BARN
                )
                .map(
                    (relasjon: IFamilierelasjon): IBarnMedOpplysninger => ({
                        inkludertISøknaden: false,
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
    const { axiosRequest } = useApp();
    const { bruker } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();
    const { behandlingId } = useParams<{ behandlingId: string }>();

    const [søknad, settSøknad] = React.useState<ISøknadDTO>(initalState());
    const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = React.useState(false);
    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);

    const nullstillSøknad = () => {
        if (bruker.status === RessursStatus.SUKSESS) {
            settSøknad(initalState(bruker.data));
        }
        settSøknadErLastetFraBackend(false);
    };

    React.useEffect(() => {
        nullstillSøknad();
    }, [bruker.status]);

    React.useEffect(() => {
        if (
            åpenBehandling.status === RessursStatus.SUKSESS &&
            parseInt(behandlingId, 10) === åpenBehandling.data.behandlingId &&
            hentStegNummer(åpenBehandling.data.steg) >=
                hentStegNummer(BehandlingSteg.VILKÅRSVURDERING)
        ) {
            axiosRequest<ISøknadDTO, void>({
                method: 'GET',
                url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.data.behandlingId}/søknad`,
                påvirkerSystemLaster: true,
            }).then((response: Ressurs<ISøknadDTO>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settSøknadErLastetFraBackend(true);
                    settSøknadOgValider({
                        ...response.data,
                        barnaMedOpplysninger: response.data.barnaMedOpplysninger.map(
                            (barnMedOpplysninger: IBarnMedOpplysninger) => ({
                                ...barnMedOpplysninger,
                                checked: true,
                            })
                        ),
                    });
                }
            });
        } else {
            // Ny behandling er lastet som ikke har fullført søknad-steget.
            nullstillSøknad();
        }
    }, [åpenBehandling]);

    const validerSøknad = (validerSøknad: ISøknadDTO): boolean => {
        const søknadFeilmeldinger: FeiloppsummeringFeil[] = [];

        if (validerSøknad.søkerMedOpplysninger.målform === undefined) {
            søknadFeilmeldinger.push({
                skjemaelementId: 'målform-nb',
                feilmelding: 'Målform er ikke valgt.',
            });
        }

        if (
            validerSøknad.barnaMedOpplysninger.filter(
                (barn: IBarnMedOpplysninger) => barn.inkludertISøknaden
            ).length === 0
        ) {
            søknadFeilmeldinger.push({
                skjemaelementId: 'barn-0',
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

    return {
        erSøknadGyldig: validerSøknad,
        feilmeldinger,
        settBarn,
        settSøknadOgValider,
        søknad,
        søknadErLastetFraBackend,
    };
});

export { SøknadProvider, useSøknad };
