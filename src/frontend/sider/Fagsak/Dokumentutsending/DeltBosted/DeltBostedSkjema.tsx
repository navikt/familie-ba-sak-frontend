import React from 'react';

import { differenceInMilliseconds } from 'date-fns';

import { CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import BarnCheckbox from './BarnCheckbox';
import type {
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from '../../../../komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { isoStringTilDate } from '../../../../utils/dato';

interface IProps {
    barnMedDeltBostedFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    manuelleBrevmottakere: SkjemaBrevmottaker[] | IRestBrevmottaker[];
    vurderErLesevisning: () => boolean;
}

const DeltBostedSkjema = (props: IProps) => {
    const { barnMedDeltBostedFelt, avtalerOmDeltBostedPerBarnFelt, visFeilmeldinger, settVisFeilmeldinger } = props;

    const sorterteBarn = barnMedDeltBostedFelt.verdi.sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
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
        barnMedDeltBostedFelt.validerOgSettFelt(
            barnMedDeltBostedFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    const oppdaterAvtalerOmDeltBostedPerBarn = (barnaSomErMerket: string[]) => {
        const barnHvorMerkingErFjernet = barnMedDeltBostedFelt.verdi
            .filter((barn: IBarnMedOpplysninger) => barn.merket && !barnaSomErMerket.includes(barn.ident))
            .map((barn: IBarnMedOpplysninger) => barn.ident);
        const barnHvorMerkingErLagtTil = barnMedDeltBostedFelt.verdi
            .filter((barn: IBarnMedOpplysninger) => !barn.merket && barnaSomErMerket.includes(barn.ident))
            .map((barn: IBarnMedOpplysninger) => barn.ident);

        barnHvorMerkingErFjernet.forEach((ident: string) =>
            avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                ...avtalerOmDeltBostedPerBarnFelt.verdi,
                [ident]: [],
            })
        );

        barnHvorMerkingErLagtTil.forEach((ident: string) =>
            avtalerOmDeltBostedPerBarnFelt.validerOgSettFelt({
                ...avtalerOmDeltBostedPerBarnFelt.verdi,
                [ident]: [''],
            })
        );
    };

    return (
        <CheckboxGroup
            {...barnMedDeltBostedFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={'Hvilke barn har delt bosted?'}
            value={barnMedDeltBostedFelt.verdi
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .map((barn: IBarnMedOpplysninger) => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => {
                oppdaterAvtalerOmDeltBostedPerBarn(barnaSomErMerket);
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

export default DeltBostedSkjema;
