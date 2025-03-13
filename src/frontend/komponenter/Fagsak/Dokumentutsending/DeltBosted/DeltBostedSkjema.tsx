import React from 'react';

import { differenceInMilliseconds } from 'date-fns';

import { CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import BarnCheckbox from './BarnCheckbox';
import type { IPersonInfo } from '../../../../typer/person';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { isoStringTilDate } from '../../../../utils/dato';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn/LeggTilBarn';
import type {
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from '../../Personlinje/Behandlingsmeny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

interface IProps {
    barnMedDeltBostedFelt: Felt<IBarnMedOpplysninger[]>;
    avtalerOmDeltBostedPerBarnFelt: Felt<Record<string, string[]>>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    manuelleBrevmottakere: SkjemaBrevmottaker[] | IRestBrevmottaker[];
    vurderErLesevisning: () => boolean;
}

const DeltBostedSkjema = (props: IProps) => {
    const {
        barnMedDeltBostedFelt,
        avtalerOmDeltBostedPerBarnFelt,
        visFeilmeldinger,
        settVisFeilmeldinger,
        manuelleBrevmottakere,
        vurderErLesevisning,
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
                : differenceInMilliseconds(
                      isoStringTilDate(b.fødselsdato),
                      isoStringTilDate(a.fødselsdato)
                  );
        }
    );

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
                manuelleBrevmottakere={manuelleBrevmottakere}
                vurderErLesevisning={vurderErLesevisning}
            />
        </CheckboxGroup>
    );
};

export default DeltBostedSkjema;
