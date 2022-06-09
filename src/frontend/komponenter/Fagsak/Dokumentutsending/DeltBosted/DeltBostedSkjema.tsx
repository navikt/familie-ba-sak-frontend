import React from 'react';

import { CheckboxGruppe } from 'nav-frontend-skjema';

import type { Felt } from '@navikt/familie-skjema';

import type { IPersonInfo } from '../../../../typer/person';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn';
import BarnCheckbox from './BarnCheckbox';

interface IProps {
    barnMedDeltBostedFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
}

const DeltBostedSkjema = (props: IProps) => {
    const { barnMedDeltBostedFelt, avtalerOmDeltBostedPerBarnFelt, visFeilmeldinger } = props;

    const sorterteBarn = barnMedDeltBostedFelt.verdi.sort(
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
            {...barnMedDeltBostedFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={'Hvilke barn har delt bosted?'}
        >
            {sorterteBarn.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox
                    key={barnMedOpplysninger.ident}
                    barn={barnMedOpplysninger}
                    {...props}
                />
            ))}

            <LeggTilBarn
                barnaMedOpplysninger={barnMedDeltBostedFelt}
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
