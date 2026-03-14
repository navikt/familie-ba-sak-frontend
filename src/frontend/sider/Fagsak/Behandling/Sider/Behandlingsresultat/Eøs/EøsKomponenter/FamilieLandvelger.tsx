import React, { type JSX } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Label } from '@navikt/ds-react';
import {
    BgNeutralModerate,
    BgNeutralSoft,
    BorderDanger,
    BorderFocus,
    Space8,
    TextDanger,
} from '@navikt/ds-tokens/dist/tokens';
import type { Country, Currency } from '@navikt/land-verktoy';
import { CountryFilter } from '@navikt/land-verktoy';
import type { CountrySelectProps } from '@navikt/landvelger';
import CountrySelect from '@navikt/landvelger';

const Landvelger = styled(CountrySelect)`
    display: grid;
    gap: ${Space8};
    margin-bottom: ${props => (props.utenMargin ? '0rem' : '1rem')};

    p.navds-label--small {
        line-height: 1.4;
    }

    &.navds-select--disabled {
        opacity: unset;

        & div.c-countrySelect__select--is-disabled {
            .c-countrySelect__select__indicators {
                display: none;
            }

            .c-countrySelect__select__control {
                background-color: ${BgNeutralSoft};
            }
        }
    }

    & div.c-countrySelect__select {
        margin-top: 0;

        .c-countrySelect__select__indicator {
            color: initial;
        }

        .c-countrySelect__select__indicator-separator {
            width: ${props => (props.kanNullstilles ? '1px !important' : '0px')};
            background-color: ${BgNeutralModerate};
        }

        .c-countrySelect__select__control {
            border: 1px solid ${props => (props.feil ? BorderDanger : BorderFocus)};
            box-shadow: ${props => (props.feil ? `0 0 0 1px ${BorderDanger}` : 'none')};
        }

        .c-countrySelect__select__value-container {
            min-height: 38px;
        }
    }

    .navds-error-message {
        color: ${TextDanger};
        font-size: 1rem;
        font-weight: bold;

        &::before {
            display: none;
        }
    }

    .navds-body-long {
        margin-top: 2px;
        margin-bottom: 2px;
    }
`;

interface IBaseLandvelgerProps {
    countrySelectProps: CountrySelectProps<Country | Currency>;
    label: string | JSX.Element;
    className?: string;
    utenMargin: boolean;
    kanNullstilles: boolean;
    feil?: string;
    size?: 'small' | 'medium';
}

const BaseFamilieLandvelger: React.FC<IBaseLandvelgerProps> = ({
    countrySelectProps,
    label,
    className,
    utenMargin,
    kanNullstilles,
    feil,
    size,
}) => {
    return (
        <div className={classNames('skjemaelement', className)}>
            <Landvelger
                utenMargin={utenMargin}
                kanNullstilles={kanNullstilles}
                feil={feil}
                {...countrySelectProps}
                place
                label={<Label size={size}>{label}</Label>}
            />
        </div>
    );
};

interface IBaseFamilieLandvelgerProps {
    id: string;
    className?: string;
    value?: string | string[] | undefined;
    feil?: string;
    label: string | JSX.Element;
    placeholder?: string | undefined;
    kunEøs?: boolean;
    medFlag?: boolean;
    medWave?: boolean;
    sirkulær?: boolean;
    size?: 'small' | 'medium';
    erLesevisning?: boolean;
    utenMargin?: boolean;
    kanNullstilles?: boolean;
}

interface IFamilieLandvelgerProps extends IBaseFamilieLandvelgerProps {
    onChange: (value: Country) => void;
    eksluderLand?: string[];
}

const FamilieLandvelger: React.FC<IFamilieLandvelgerProps> = ({
    className,
    value,
    feil,
    label,
    placeholder,
    kunEøs = false,
    sirkulær = false,
    size = 'small',
    medFlag = false,
    medWave = false,
    erLesevisning = false,
    onChange,
    utenMargin = false,
    kanNullstilles = false,
    eksluderLand = undefined,
}) => {
    const id = `country-select-${label}`;

    const landvelgerProps: CountrySelectProps<Country | Currency> = {
        id,
        values: value,
        placeholder,
        error: feil ? feil : undefined,
        isMulti: false,
        type: 'country',
        flags: medFlag,
        flagWave: medFlag && medWave,
        flagType: sirkulær ? 'circle' : 'original',
        closeMenuOnSelect: true,
        size,
        isDisabled: erLesevisning,
        onOptionSelected: onChange,
        isClearable: kanNullstilles,
        includeList: kunEøs ? CountryFilter.EEA({}) : undefined,
        excludeList: eksluderLand,
    };
    return (
        <BaseFamilieLandvelger
            countrySelectProps={landvelgerProps}
            label={label}
            className={className}
            utenMargin={utenMargin}
            kanNullstilles={kanNullstilles}
            feil={feil}
            size={size}
        />
    );
};

interface IFamilieMultiLandvelgerProps extends IBaseFamilieLandvelgerProps {
    onChange: (value: Country[]) => void;
    eksluderLand?: string[];
}

const FamilieMultiLandvelger: React.FC<IFamilieMultiLandvelgerProps> = ({
    className,
    value,
    feil,
    label,
    placeholder,
    kunEøs = false,
    sirkulær = false,
    size = 'small',
    medFlag = false,
    medWave = false,
    erLesevisning = false,
    onChange,
    utenMargin = false,
    kanNullstilles = false,
    eksluderLand = undefined,
}) => {
    const id = `country-select-${label}`;

    const landvelgerProps: CountrySelectProps<Country | Currency> = {
        id,
        values: value,
        placeholder,
        error: feil ? feil : undefined,
        isMulti: true,
        type: 'country',
        flags: medFlag,
        flagWave: medFlag && medWave,
        flagType: sirkulær ? 'circle' : 'original',
        closeMenuOnSelect: true,
        size,
        isDisabled: erLesevisning,
        onOptionSelected: onChange,
        isClearable: kanNullstilles,
        includeList: kunEøs ? CountryFilter.EEA({}) : undefined,
        excludeList: eksluderLand,
    };

    return (
        <BaseFamilieLandvelger
            countrySelectProps={landvelgerProps}
            label={label}
            className={className}
            utenMargin={utenMargin}
            kanNullstilles={kanNullstilles}
            feil={feil}
            size={size}
        />
    );
};

export { FamilieLandvelger, FamilieMultiLandvelger };
