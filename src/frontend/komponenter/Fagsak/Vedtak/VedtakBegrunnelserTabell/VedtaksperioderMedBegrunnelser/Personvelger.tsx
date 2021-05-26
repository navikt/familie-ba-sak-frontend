/*import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { ActionMeta, FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { personTypeMap } from '../../../../../typer/person';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

const GroupLabel = styled.div`
    color: black;
`;

interface IProps {
    begrunnelse: ISelectOption;
}

const Personvelger: React.FC<IProps> = ({ begrunnelse }: IProps) => {
    const { erLesevisning } = useBehandling();
    const {
        id,
        skjema,
        onChangePersonerTilhørendeBegrunnelser,
        åpenBehandling,
    } = useVedtaksperiodeMedBegrunnelser();

    // React-hack for å rerende komponent som ligger i et ekspanderbart panel
    const [personerTilhøredeBegrunnelser, settPersonerTilhøredeBegrunnelser] = useState(
        skjema.felter.personerTilhøredeBegrunnelser
    );
    useEffect(() => {
        settPersonerTilhøredeBegrunnelser(skjema.felter.personerTilhøredeBegrunnelser);
    }, [skjema.felter.personerTilhøredeBegrunnelser]);

    console.log(begrunnelse);

    return (
        <>
            <FamilieReactSelect
                id={`personvelger-${begrunnelse}-${id}`}
                value={personerTilhøredeBegrunnelser.verdi[begrunnelse.value]}
                placeholder={`Velg personer tilhørende ${begrunnelse.label}`}
                isDisabled={erLesevisning() || skjema.submitRessurs.status === RessursStatus.HENTER}
                feil={
                    skjema.visFeilmeldinger ? personerTilhøredeBegrunnelser.feilmelding : undefined
                }
                label={`Personer tilhørende "${begrunnelse.label}"`}
                creatable={false}
                erLesevisning={erLesevisning()}
                isMulti={true}
                onChange={(_, action: ActionMeta<{ value: string }>) => {
                    onChangePersonerTilhørendeBegrunnelser(begrunnelse.value, action);
                }}
                options={åpenBehandling.personer.map(person => ({
                    value: person.personIdent,
                    label: `${personTypeMap[person.type]}: ${person.personIdent}`,
                }))}
            />
        </>
    );
    return <div></div>;
};

export default Personvelger;*/
