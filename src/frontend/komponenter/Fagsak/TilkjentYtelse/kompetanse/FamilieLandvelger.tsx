import * as React from 'react';

import { Country, CountryFilter } from 'land-verktoy';
import CountrySelect, { CountrySelectProps } from 'landvelger';
import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Element } from 'nav-frontend-typografi';

const Landvelger = styled(CountrySelect)`
    margin-bottom: 1rem;

    & div.c-countrySelect__select {
        margin-top: 0px;

        .c-countrySelect__select__indicator {
            color: initial;
        }

        .c-countrySelect__select__indicator-separator {
            width: 0px;
        }

        .c-countrySelect__select--is-disabled {
            background-color: ${navFarger.navGraBakgrunn};

            .c-countrySelect__select__indicators {
                display: none;
            }
        }
    }

    .navds-error-message {
        color: ${navFarger.redError};
        font-weight: bold;
    }

    .navds-body-long {
        margin-top: 2px;
        margin-bottom: 2px;
    }
`;

interface IProps {
    id: string;
    value?: string | string[] | undefined;
    feil?: string;
    label: string | JSX.Element;
    placeholder?: string | undefined;
    isMulti?: boolean;
    eøs?: boolean;
    medFlag?: boolean;
    medWave?: boolean;
    sirkulær?: boolean;
    size?: 'small' | 'medium';
    erLesevisning?: boolean;
    onChange: (value: Country) => void;
}

const FamilieLandvelger: React.FC<IProps> = ({
    id,
    value,
    feil,
    label,
    placeholder,
    isMulti = false,
    eøs = false,
    sirkulær = false,
    size = 'small',
    medFlag = false,
    medWave = false,
    erLesevisning = false,
    onChange,
}) => {
    let landvelgerProps: CountrySelectProps<Country> = {
        id,
        values: value,
        placeholder,
        error: feil ? feil : undefined,
        isMulti,
        flags: medFlag,
        flagWave: medFlag && medWave,
        flagType: sirkulær ? 'circle' : 'original',
        closeMenuOnSelect: true,
        size: medFlag ? 'medium' : size,
        isDisabled: erLesevisning,
        onOptionSelected: onChange,
    };
    if (eøs) {
        landvelgerProps = { ...landvelgerProps, includeList: CountryFilter.EEA({}) };
    }
    return (
        <>
            <Landvelger {...landvelgerProps} place label={<Element>{label}</Element>} />
        </>
    );
};

export default FamilieLandvelger;
