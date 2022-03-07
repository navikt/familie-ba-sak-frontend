import React from 'react';

import { CheckboxGruppe } from 'nav-frontend-skjema';

import { Felt } from '@navikt/familie-skjema';

import { IPersonInfo } from '../../../../typer/person';
import { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn';
import BarnCheckbox from './BarnCheckbox';

interface IProps {
    barnaMedOpplysningerFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
}

const DeltBostedSkjema = (props: IProps) => {
    const { barnaMedOpplysningerFelt, avtalerOmDeltBostedPerBarnFelt, visFeilmeldinger } = props;

    const sorterteBarnMedOpplysninger = barnaMedOpplysningerFelt.verdi.sort(
        (a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
            if (!a.fødselsdato) {
                return 1;
            }

            if (!b.fødselsdato) {
                return -1;
            }

            return !a.ident
                ? 1
                : kalenderDiff(
                      kalenderDatoTilDate(kalenderDato(b.fødselsdato)),
                      kalenderDatoTilDate(kalenderDato(a.fødselsdato))
                  );
        }
    );

    return (
        <CheckboxGruppe
            {...barnaMedOpplysningerFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={'Hvilke barn har delt bosted?'}
        >
            {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox
                    key={barnMedOpplysninger.ident}
                    barn={barnMedOpplysninger}
                    {...props}
                />
            ))}

            <LeggTilBarn
                barnaMedOpplysninger={barnaMedOpplysningerFelt}
                onSuccess={(barn: IPersonInfo) => {
                    avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                        ...avtalerOmDeltBostedPerBarnFelt.verdi,
                        [barn.personIdent]: [''],
                    });
                }}
            />
        </CheckboxGruppe>
    );
};

export default DeltBostedSkjema;
