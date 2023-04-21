import React from 'react';

import { CheckboxGroup } from '@navikt/ds-react';
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
    const {
        barnMedDeltBostedFelt,
        avtalerOmDeltBostedPerBarnFelt,
        // visFeilmeldinger,
        settVisFeilmeldinger,
    } = props;

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
        <CheckboxGroup
            /* {...barnMedDeltBostedFelt.hentNavBaseSkjemaProps(visFeilmeldinger)} */
            legend={'Hvilke barn har delt bosted?'}
            onChange={(identList: string[]) => {
                const oppdatertBarnMedDeltBostedFelt: IBarnMedOpplysninger[] =
                    barnMedDeltBostedFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => {
                        const nyMerketStatus = !!identList.find(
                            (ident: string) => barnMedOpplysninger.ident === ident
                        );
                        return {
                            ...barnMedOpplysninger,
                            merket: nyMerketStatus,
                        };
                    });
                barnMedDeltBostedFelt.validerOgSettFelt(oppdatertBarnMedDeltBostedFelt);
                settVisFeilmeldinger(false);
                oppdatertBarnMedDeltBostedFelt.forEach(barnMedOpplysninger =>
                    avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                        ...avtalerOmDeltBostedPerBarnFelt.verdi,
                        [barnMedOpplysninger.ident]: identList.find(
                            (ident: string) => barnMedOpplysninger.ident === ident
                        )
                            ? ['']
                            : [],
                    })
                );
            }}
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
        </CheckboxGroup>
    );
};

export default DeltBostedSkjema;
