import React from 'react';
import ReactSelect, { NamedProps, StylesConfig } from 'react-select';
import { Label } from 'nav-frontend-skjema';
import styled from 'styled-components';
import { Feilmelding } from 'nav-frontend-typografi';
import navFarger from 'nav-frontend-core';

interface IProps extends NamedProps {
    erLesevisning: boolean;
    label: string;
    lesevisningVerdi?: string;
    feil?: string;
    propSelectStyles?: StylesConfig;
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
        maxWidth: '12.5rem',
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
    label,
    lesevisningVerdi,
    value,
    feil,
    propSelectStyles,
    ...props
}) => {
    const id = `react-select-${label}`;
    return (
        <Container>
            <Label htmlFor={id}>{label} </Label>
            <ReactSelect
                styles={{
                    ...propSelectStyles,
                    ...navSelectStyles(feil),
                }}
                id={id}
                isDisabled={erLesevisning}
                value={value}
                {...props}
            />
            {feil && <StyledFeilmelding>{feil}</StyledFeilmelding>}
        </Container>
    );
};

export default FamilieReactSelect;
