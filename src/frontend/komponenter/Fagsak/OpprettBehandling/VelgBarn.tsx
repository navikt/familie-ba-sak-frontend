import { FamilieCheckbox } from '@navikt/familie-form-element';
import moment from 'moment';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import {
    IOpprettBehandlingBarn,
    useOpprettBehandling,
} from '../../../context/OpprettBehandlingContext';

const VelgBarn: React.FC = () => {
    const { barna, settBarna } = useOpprettBehandling();
    const { erLesevisning } = useBehandling();

    return (
        <>
            {barna.map((opprettBehandlingBarn: IOpprettBehandlingBarn) => {
                const barn = opprettBehandlingBarn.barn;
                const alder = barn.fødselsdato
                    ? moment().diff(moment(barn.fødselsdato, 'YYYY-MM-DD'), 'years') + 'år'
                    : 'Alder ukjent';

                return (
                    <FamilieCheckbox
                        erLesevisning={erLesevisning()}
                        key={barn.personIdent}
                        id={`opprettbehandling__barn-${barn.personIdent}`}
                        label={`${barn.navn ?? 'Navn ukjent'} (${alder}) ${barn.personIdent}`}
                        checked={opprettBehandlingBarn.checked}
                        onChange={() => {
                            settBarna(
                                barna.map((mapOpprettBehandlingBarn: IOpprettBehandlingBarn) => {
                                    if (
                                        mapOpprettBehandlingBarn.barn.personIdent ===
                                        barn.personIdent
                                    ) {
                                        return {
                                            ...opprettBehandlingBarn,
                                            checked: !opprettBehandlingBarn.checked,
                                        };
                                    } else {
                                        return mapOpprettBehandlingBarn;
                                    }
                                })
                            );
                        }}
                    />
                );
            })}
        </>
    );
};

export default VelgBarn;
