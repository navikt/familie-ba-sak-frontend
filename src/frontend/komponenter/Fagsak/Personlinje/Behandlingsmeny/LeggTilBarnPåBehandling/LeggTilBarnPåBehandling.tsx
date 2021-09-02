import React from 'react';

import KnappBase from 'nav-frontend-knapper';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import LeggTilBarn from '../../../../Felleskomponenter/LeggTilBarn';
import { IPersonInfo } from '../../../../../typer/person';

interface IProps {
    onListElementClick: () => void;
}

const LeggTiLBarnPåBehandling: React.FC<IProps> = ({ onListElementClick }) => {
    const barnaMedOpplysninger = useFelt<IBarnMedOpplysninger[]>({
        verdi: [],
        valideringsfunksjon: felt => {
            return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket)
                ? ok(felt)
                : feil(felt, 'Du må velge barn');
        },
    });

    const {
        skjema: leggTilBarnPåBehandlingSkjema,
        nullstillSkjema,
        onSubmit: onleggTilBarnPåBehandlingSubmit,
        settVisfeilmeldinger: settVisfeilmeldingerLeggTilBarnPåBehandling,
    } = useSkjema<
        {
            barnaMedOpplysninger: IBarnMedOpplysninger[];
        },
        string
    >({
        felter: {
            barnaMedOpplysninger,
        },
        skjemanavn: 'Legg til barn på behandling',
    });
    return (
        <>
            <LeggTilBarn
                åpneModalKnapp={(leggTilonClick: () => void) => (
                    <KnappBase
                        mini={true}
                        onClick={() => {
                            leggTilonClick();
                            onListElementClick();
                        }}
                    >
                        Legg til barn
                    </KnappBase>
                )}
                barnaMedOpplysninger={useFelt<IBarnMedOpplysninger[]>({
                    verdi: [],
                    valideringsfunksjon: felt => {
                        return ok(felt);
                    },
                })}
                onSuccess={(barn: IPersonInfo) => {
                    console.log('Trigg logg her');
                }} // TODO: Trigg logg
            />
        </>
    );
};

export default LeggTiLBarnPåBehandling;
