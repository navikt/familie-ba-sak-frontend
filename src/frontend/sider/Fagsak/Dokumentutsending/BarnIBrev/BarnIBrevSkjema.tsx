import React from 'react';

import { differenceInMilliseconds } from 'date-fns';

import { CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import BarnCheckbox from './BarnCheckbox';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { isoStringTilDate } from '../../../../utils/dato';

interface IProps {
    barnIBrevFelt: Felt<IBarnMedOpplysninger[]>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    tittel: string;
}

const BarnIBrevSkjema = (props: IProps) => {
    const { barnIBrevFelt, visFeilmeldinger, settVisFeilmeldinger } = props;

    const sorterteBarn = barnIBrevFelt.verdi.sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
        if (!a.fødselsdato) {
            return 1;
        }

        if (!b.fødselsdato) {
            return -1;
        }

        return !a.ident
            ? 1
            : differenceInMilliseconds(isoStringTilDate(b.fødselsdato), isoStringTilDate(a.fødselsdato));
    });

    const oppdaterBarnMedNyMerketStatus = (barnaSomErMerket: string[]) => {
        barnIBrevFelt.validerOgSettFelt(
            barnIBrevFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <CheckboxGroup
            {...barnIBrevFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={props.tittel}
            value={barnIBrevFelt.verdi
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .map((barn: IBarnMedOpplysninger) => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => {
                settVisFeilmeldinger(false);
                oppdaterBarnMedNyMerketStatus(barnaSomErMerket);
            }}
        >
            {sorterteBarn.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox key={barnMedOpplysninger.ident} barn={barnMedOpplysninger} {...props} />
            ))}
        </CheckboxGroup>
    );
};

export default BarnIBrevSkjema;
