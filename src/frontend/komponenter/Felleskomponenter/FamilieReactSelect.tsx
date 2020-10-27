import React from 'react';
import ReactSelect, { NamedProps, StylesConfig } from 'react-select';
import { Label } from 'nav-frontend-skjema';
import styled from 'styled-components';
import { Feilmelding } from 'nav-frontend-typografi';

interface IProps extends NamedProps {
    erLesevisning: boolean;
    label: string;
    lesevisningVerdi?: string;
    feil?: string;
}

const Container = styled.div`
    margin-bottom: 1rem;
`;

const SelectStyles = (feil?: string): StylesConfig => ({
    control: provided => ({
        ...provided,
        border: feil ? '1px solid #BA3A26' : '1px solid #78706A',
        borderRadius: '4px',
        boxShadow: feil ? '0 0 0 1px #BA3A26' : '',
        ':focus': {
            boxShadow: '0 0 0 3px #254b6d',
        },
        ':hover': {
            border: '1px solid #0067C5',
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
        color: 'initial',
        ':hover': {
            color: '#0067C5',
        },
    }),
    multiValue: (provided, _) => ({
        ...provided,
        backgroundColor: '#CCE1F3',
    }),
    multiValueRemove: provided => ({
        ...provided,
        ':hover': {
            backgroundColor: '#254b6d',
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
    ...props
}) => {
    const id = `react-select-${label}`;
    return (
        <Container>
            <Label htmlFor={id}>{label} </Label>
            <ReactSelect
                styles={SelectStyles(feil)}
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
