import React from 'react';

import { CheckboxGruppe } from 'nav-frontend-skjema';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import { IPersonInfo } from '../../../../typer/person';
import { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn';
import BarnCheckbox from './BarnCheckbox';

const DeltBostedSkjema = () => {
    const { skjema } = useDokumentutsending();

    const sorterteBarnMedOpplysninger = skjema.felter.barnaMedOpplysninger.verdi.sort(
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
            {...skjema.felter.barnaMedOpplysninger.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
            legend={'Hvilke barn har delt bosted?'}
        >
            {sorterteBarnMedOpplysninger.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox key={barnMedOpplysninger.ident} barn={barnMedOpplysninger} />
            ))}

            <LeggTilBarn
                barnaMedOpplysninger={skjema.felter.barnaMedOpplysninger}
                onSuccess={(barn: IPersonInfo) => {
                    skjema.felter.avtalerOmDeltBostedPerBarn.validerOgSettFelt({
                        ...skjema.felter.avtalerOmDeltBostedPerBarn.verdi,
                        [barn.personIdent]: [''],
                    });
                }}
            />
        </CheckboxGruppe>
    );
};

export default DeltBostedSkjema;
