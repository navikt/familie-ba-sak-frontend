import { CheckboxGroup } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { isoStringTilDate } from '@utils/dato';
import { differenceInMilliseconds } from 'date-fns';

import BarnCheckbox from './BarnCheckbox';

interface IProps {
    barnMedDeltBosted: IBarnMedOpplysninger[];
    settBarnMedDeltBosted: (barn: IBarnMedOpplysninger[]) => void;
    avtalerOmDeltBostedPerBarn: Record<string, string[]>;
    settAvtalerOmDeltBostedPerBarn: (avtaler: Record<string, string[]>) => void;
    visFeilmeldinger: boolean;
    error?: string;
}

const DeltBostedSkjema = ({
    barnMedDeltBosted,
    settBarnMedDeltBosted,
    avtalerOmDeltBostedPerBarn,
    settAvtalerOmDeltBostedPerBarn,
    visFeilmeldinger,
    error,
}: IProps) => {
    const sorterteBarn = [...barnMedDeltBosted].sort((a: IBarnMedOpplysninger, b: IBarnMedOpplysninger) => {
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
        settBarnMedDeltBosted(
            barnMedDeltBosted.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    const oppdaterAvtalerOmDeltBostedPerBarn = (barnaSomErMerket: string[]) => {
        const barnHvorMerkingErFjernet = barnMedDeltBosted
            .filter((barn: IBarnMedOpplysninger) => barn.merket && !barnaSomErMerket.includes(barn.ident))
            .map((barn: IBarnMedOpplysninger) => barn.ident);
        const barnHvorMerkingErLagtTil = barnMedDeltBosted
            .filter((barn: IBarnMedOpplysninger) => !barn.merket && barnaSomErMerket.includes(barn.ident))
            .map((barn: IBarnMedOpplysninger) => barn.ident);

        const nyeAvtaler = { ...avtalerOmDeltBostedPerBarn };
        barnHvorMerkingErFjernet.forEach((ident: string) => {
            nyeAvtaler[ident] = [];
        });
        barnHvorMerkingErLagtTil.forEach((ident: string) => {
            nyeAvtaler[ident] = [''];
        });
        settAvtalerOmDeltBostedPerBarn(nyeAvtaler);
    };

    return (
        <CheckboxGroup
            legend={'Hvilke barn har delt bosted?'}
            error={error}
            value={barnMedDeltBosted
                .filter((barn: IBarnMedOpplysninger) => barn.merket)
                .map((barn: IBarnMedOpplysninger) => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => {
                oppdaterAvtalerOmDeltBostedPerBarn(barnaSomErMerket);
                oppdaterBarnMedNyMerketStatus(barnaSomErMerket);
            }}
        >
            {sorterteBarn.map((barnMedOpplysninger: IBarnMedOpplysninger) => (
                <BarnCheckbox
                    key={barnMedOpplysninger.ident}
                    barn={barnMedOpplysninger}
                    barnMedDeltBosted={barnMedDeltBosted}
                    settBarnMedDeltBosted={settBarnMedDeltBosted}
                    avtalerOmDeltBostedPerBarn={avtalerOmDeltBostedPerBarn}
                    settAvtalerOmDeltBostedPerBarn={settAvtalerOmDeltBostedPerBarn}
                    visFeilmeldinger={visFeilmeldinger}
                />
            ))}
        </CheckboxGroup>
    );
};

export default DeltBostedSkjema;
