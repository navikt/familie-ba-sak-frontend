import React from 'react';

import ReactSelect, { NamedProps, StylesConfig } from 'react-select';
import Creatable from 'react-select/creatable';
import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Label } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';

interface IProps extends NamedProps {
    erLesevisning: boolean;
    creatable?: boolean;
    label: string | React.ReactNode;
    feil?: string;
    propSelectStyles?: StylesConfig;
    //TODO: legg inn lesevisningsverdi når denne dras ut i felles
}

const Container = styled.div`
    margin-bottom: 1rem;
`;

const navSelectStyles = (feil?: string): StylesConfig => ({
    control: (provided, state) => ({
        ...provided,
        border:
            feil && !state.isFocused
                ? `1px solid ${navFarger.redError}`
                : `1px solid ${navFarger.navGra60}`,
        borderRadius: '4px',
        boxShadow: state.isFocused
            ? `0 0 0 3px ${navFarger.fokusFarge}`
            : feil
            ? `0 0 0 1px ${navFarger.redError}`
            : '',
        ':hover': {
            border: `1px solid ${navFarger.navBla}`,
        },
    }),
    placeholder: provided => ({
        ...provided,
        color: 'initial',
    }),
    dropdownIndicator: provided => ({
        ...provided,
        color: 'initial',
        ':hover': {
            color: 'initial',
        },
    }),
    clearIndicator: provided => ({
        ...provided,
        color: navFarger.navGra60,
        ':hover': {
            color: navFarger.navMorkGra,
        },
    }),
    multiValue: (provided, _) => ({
        ...provided,
        backgroundColor: navFarger.navBlaLighten80,
        maxWidth: '18rem',
    }),
    multiValueRemove: provided => ({
        ...provided,
        ':hover': {
            backgroundColor: navFarger.navBla,
            color: 'white',
        },
    }),
});

const StyledFeilmelding = styled(Feilmelding)`
    margin-top: 0.5rem;
`;

const FamilieReactSelect: React.FC<IProps> = ({
    erLesevisning,
    creatable = false,
    label,
    value,
    feil,
    propSelectStyles,
    ...props
}) => {
    const id = `react-select-${label}`;

    const hentSelectProps = () => ({
        styles: {
            ...navSelectStyles(feil),
            ...propSelectStyles,
        },
        id: id,
        isDisabled: erLesevisning,
        value,
        ...props,
    });

    return (
        <Container>
            <Label htmlFor={id}>{label} </Label>
            {creatable ? (
                <Creatable
                    formatCreateLabel={value => `Opprett "${value}"`}
                    {...hentSelectProps()}
                />
            ) : (
                <ReactSelect {...hentSelectProps()} />
            )}

            {feil && <StyledFeilmelding>{feil}</StyledFeilmelding>}
        </Container>
    );
};

export default FamilieReactSelect;
