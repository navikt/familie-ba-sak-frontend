import { CheckboxGroup } from '@navikt/ds-react';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';

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
    const sorterteBarn = sorterBarnEtterFødselsdato(barnMedDeltBosted);

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
