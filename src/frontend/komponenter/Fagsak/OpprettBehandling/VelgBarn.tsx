import React from 'react';
import {
    useOpprettBehandling,
    IOpprettBehandlingBarn,
} from '../../../context/OpprettBehandlingContext';
import moment from 'moment';
import FamilieCheckbox from '../../Felleskomponenter/InputMedLesevisning/FamilieCheckbox';

const VelgBarn: React.FC = () => {
    const { barna, settBarna } = useOpprettBehandling();

    return (
        <>
            {barna.map((opprettBehandlingBarn: IOpprettBehandlingBarn) => {
                const barn = opprettBehandlingBarn.barn;
                const alder = barn.fødselsdato
                    ? moment().diff(moment(barn.fødselsdato, 'YYYY-MM-DD'), 'years') + 'år'
                    : 'Alder ukjent';

                return (
                    <FamilieCheckbox
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
