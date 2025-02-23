import React from 'react';

import { differenceInMilliseconds } from 'date-fns';

import { CheckboxGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import BarnCheckbox from './BarnCheckbox';
import { useApp } from '../../../../context/AppContext';
import { useFagsakContext } from '../../../../context/Fagsak/FagsakContext';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { isoStringTilDate } from '../../../../utils/dato';
import LeggTilBarn from '../../../Felleskomponenter/LeggTilBarn';

interface IProps {
    relevanteBarnFelt: Felt<IBarnMedOpplysninger[]>;
    visFeilmeldinger: boolean;
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void;
    tittel: string;
}

const RelevanteBarnSkjema = (props: IProps) => {
    const { manuelleBrevmottakerePåFagsak } = useFagsakContext();
    const { relevanteBarnFelt, visFeilmeldinger, settVisFeilmeldinger } = props;
    const { harInnloggetSaksbehandlerSkrivetilgang } = useApp();

    const sorterteBarn = relevanteBarnFelt.verdi.sort(
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
        relevanteBarnFelt.validerOgSettFelt(
            relevanteBarnFelt.verdi.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <CheckboxGroup
            {...relevanteBarnFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            legend={props.tittel}
            value={relevanteBarnFelt.verdi
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

            <LeggTilBarn
                barnaMedOpplysninger={relevanteBarnFelt}
                manuelleBrevmottakere={manuelleBrevmottakerePåFagsak}
                vurderErLesevisning={() => !harInnloggetSaksbehandlerSkrivetilgang()}
            />
        </CheckboxGroup>
    );
};

export default RelevanteBarnSkjema;
