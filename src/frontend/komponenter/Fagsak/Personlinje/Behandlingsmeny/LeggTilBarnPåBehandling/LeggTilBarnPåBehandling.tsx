import React from 'react';

import KnappBase from 'nav-frontend-knapper';

import { ok, useFelt } from '@navikt/familie-skjema';

import { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import LeggTilBarn from '../../../../Felleskomponenter/LeggTilBarn';

interface IProps {
    onListElementClick: () => void;
}

const LeggTiLBarnPåBehandling: React.FC<IProps> = ({ onListElementClick }) => {
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
            />
        </>
    );
};

export default LeggTiLBarnPåBehandling;
