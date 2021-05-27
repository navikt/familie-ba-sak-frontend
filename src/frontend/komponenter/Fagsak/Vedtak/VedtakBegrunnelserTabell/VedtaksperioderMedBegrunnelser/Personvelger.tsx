import React, { CSSProperties, useEffect, useState } from 'react';

import navFarger from 'nav-frontend-core';
import { Normaltekst } from 'nav-frontend-typografi';

import { ActionMeta, FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { personTypeMap } from '../../../../../typer/person';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

const Personvelger: React.FC = () => {
    const { erLesevisning } = useBehandling();
    const {
        skjema,
        onChangePersonerTilhørendeBegrunnelser,
        åpenBehandling,
        id,
    } = useVedtaksperiodeMedBegrunnelser();

    // React-hack for å rerende komponent som ligger i et ekspanderbart panel
    const [personIdenter, settPersonIdenter] = useState(skjema.felter.personIdenter);
    useEffect(() => {
        settPersonIdenter(skjema.felter.personIdenter);
    }, [skjema.felter.personIdenter]);

    return (
        <FamilieReactSelect
            propSelectStyles={{
                container: (provided: CSSProperties) => ({
                    ...provided,
                    maxWidth: '50rem',
                }),
                groupHeading: (provided: CSSProperties) => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: (provided: CSSProperties) => {
                    return {
                        ...provided,
                        borderRadius: '0.5rem',
                    };
                },
                multiValueRemove: (provided: CSSProperties) => ({
                    ...provided,
                    ':hover': {
                        backgroundColor: navFarger.navBla,
                        color: 'white',
                        borderRadius: '0 .4rem .4rem 0',
                    },
                }),
            }}
            id={`personvelger-${id}`}
            value={personIdenter.verdi}
            placeholder={`Velg`}
            isDisabled={erLesevisning() || skjema.submitRessurs.status === RessursStatus.HENTER}
            feil={skjema.visFeilmeldinger ? personIdenter.feilmelding : undefined}
            label={`Velg de begrunnelsene gjelder for`}
            creatable={false}
            erLesevisning={erLesevisning()}
            isMulti={true}
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                onChangePersonerTilhørendeBegrunnelser(action);
            }}
            formatOptionLabel={(option: ISelectOption) => {
                return (
                    <Normaltekst>
                        <b>{option.label}</b>: {option.value}
                    </Normaltekst>
                );
            }}
            options={åpenBehandling.personer.map(person => ({
                value: person.personIdent,
                label: personTypeMap[person.type],
            }))}
        />
    );
};

export default Personvelger;
