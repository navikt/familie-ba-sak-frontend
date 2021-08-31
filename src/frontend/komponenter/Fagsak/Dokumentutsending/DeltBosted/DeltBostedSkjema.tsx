import React from 'react';

import { CheckboxGruppe } from 'nav-frontend-skjema';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import { IPersonInfo } from '../../../../typer/person';
import { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn';
import BarnCheckbox from './BarnCheckbox';

const DeltBostedSkjema = () => {
    const { deltBostedSkjema } = useDokumentutsending();

    const sorterteBarnMedOpplysninger = deltBostedSkjema.felter.barnaMedOpplysninger.verdi.sort(
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
            {...deltBostedSkjema.felter.barnaMedOpplysninger.hentNavBaseSkjemaProps(
                deltBostedSkjema.visFeilmeldinger
            )}
            legend={'Hvilke barn har delt bosted?'}
        >
            {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox key={barnMedOpplysninger.ident} barn={barnMedOpplysninger} />
            ))}

            <LeggTilBarn
                barnaMedOpplysninger={deltBostedSkjema.felter.barnaMedOpplysninger}
                onSuccess={(barn: IPersonInfo) => {
                    deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt({
                        ...deltBostedSkjema.felter.avtalerOmDeltBostedPerBarn.verdi,
                        [barn.personIdent]: [''],
                    });
                }}
            />
        </CheckboxGruppe>
    );
};

export default DeltBostedSkjema;
