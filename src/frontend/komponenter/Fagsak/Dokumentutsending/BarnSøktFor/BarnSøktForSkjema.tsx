import React from 'react';

import { CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import BarnCheckbox from './BarnCheckbox';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { kalenderDiff, kalenderDatoTilDate, kalenderDato } from '../../../../utils/kalender';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn';

interface IProps {
    barnSøktForFelt: Felt<IBarnMedOpplysninger[]>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
}

const BarnSøktForSkjema = (props: IProps) => {
    const { barnSøktForFelt, visFeilmeldinger, settVisFeilmeldinger } = props;

    const sorterteBarn = barnSøktForFelt.verdi.sort(
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

    const oppdaterBarnMedNyMerketStatus = (barnaSomErMerket: string[]) => {
        barnSøktForFelt.validerOgSettFelt(
            barnSøktForFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <CheckboxGroup
            {...barnSøktForFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={'Hvilke barn er søkt for?'}
            value={barnSøktForFelt.verdi
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .map((barn: IBarnMedOpplysninger) => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => {
                settVisFeilmeldinger(false);
                oppdaterBarnMedNyMerketStatus(barnaSomErMerket);
            }}
        >
            {sorterteBarn.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox
                    key={barnMedOpplysninger.ident}
                    barn={barnMedOpplysninger}
                    {...props}
                />
            ))}

            <LeggTilBarn barnaMedOpplysninger={barnSøktForFelt} />
        </CheckboxGroup>
    );
};

export default BarnSøktForSkjema;
