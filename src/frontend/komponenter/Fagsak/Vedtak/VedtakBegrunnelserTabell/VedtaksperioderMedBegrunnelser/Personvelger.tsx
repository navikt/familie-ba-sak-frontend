import React from 'react';

import { BodyShort } from '@navikt/ds-react';
import { ASurfaceActionHover } from '@navikt/ds-tokens/dist/tokens';
import type { ISelectOption } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { useFelt } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { personTypeMap } from '../../../../../typer/person';
import { useVedtaksperiodeMedBegrunnelserPanel } from '../Context/VedtaksperiodeMedBegrunnelserContext';

const Personvelger: React.FC = () => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    const { skjema, åpenBehandling, id } = useVedtaksperiodeMedBegrunnelserPanel();

    const personIdenter = useFelt({
        verdi: [],
    });

    return (
        <FamilieReactSelect
            propSelectStyles={{
                container: provided => ({
                    ...provided,
                    maxWidth: '50rem',
                }),
                groupHeading: provided => ({
                    ...provided,
                    textTransform: 'none',
                }),
                multiValue: provided => {
                    return {
                        ...provided,
                        borderRadius: '0.5rem',
                    };
                },
                multiValueRemove: provided => ({
                    ...provided,
                    ':hover': {
                        backgroundColor: ASurfaceActionHover,
                        color: 'white',
                        borderRadius: '0 .4rem .4rem 0',
                    },
                }),
            }}
            id={`personvelger-${id}`}
            value={personIdenter.verdi}
            placeholder={`Velg`}
            isDisabled={erLesevisning || skjema.submitRessurs.status === RessursStatus.HENTER}
            feil={skjema.visFeilmeldinger ? personIdenter.feilmelding : undefined}
            label={`Velg de begrunnelsene gjelder for`}
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti={true}
            formatOptionLabel={(option: ISelectOption) => {
                return (
                    <BodyShort>
                        <b>{option.label}</b>: {option.value}
                    </BodyShort>
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
