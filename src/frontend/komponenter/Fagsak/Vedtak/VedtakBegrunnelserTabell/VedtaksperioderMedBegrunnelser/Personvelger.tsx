import type { CSSProperties } from 'react';
import React from 'react';

import navFarger from 'nav-frontend-core';
import { Normaltekst } from 'nav-frontend-typografi';

import type { ISelectOption } from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { useFelt } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { personTypeMap } from '../../../../../typer/person';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

const Personvelger: React.FC = () => {
    const { erLesevisning } = useBehandling();
    const { skjema, åpenBehandling, id } = useVedtaksperiodeMedBegrunnelser();

    const personIdenter = useFelt({
        verdi: [],
    });

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
