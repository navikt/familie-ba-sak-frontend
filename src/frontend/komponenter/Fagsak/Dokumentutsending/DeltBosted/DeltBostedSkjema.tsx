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
        visFeilmeldinger,
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

    const oppdaterBarnMedMerketStatus = (barnaSomErMerket: string[]) => {
        barnMedDeltBostedFelt.validerOgSettFelt(
            barnMedDeltBostedFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
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
                const barnHvorMerkingErFjernet = barnMedDeltBostedFelt.verdi
                    .filter(
                        (barn: IBarnMedOpplysninger) =>
                            barn.merket && !barnaSomErMerket.includes(barn.ident)
                    )
                    .map((barn: IBarnMedOpplysninger) => barn.ident);
                const barnHvorMerkingErLagtTil = barnMedDeltBostedFelt.verdi
                    .filter(
                        (barn: IBarnMedOpplysninger) =>
                            !barn.merket && barnaSomErMerket.includes(barn.ident)
                    )
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

                settVisFeilmeldinger(false);

                oppdaterBarnMedMerketStatus(barnaSomErMerket);
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
