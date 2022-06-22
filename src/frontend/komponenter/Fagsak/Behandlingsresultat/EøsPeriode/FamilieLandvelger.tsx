import * as React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Label } from '@navikt/ds-react';
import { CountryFilter } from '@navikt/land-verktoy';
import type { Country, Currency } from '@navikt/land-verktoy';
import CountrySelect, { type CountrySelectProps } from '@navikt/landvelger';

const EØS_CURRENCY: Array<string> = [
    'DKK',
    'SEK',
    'ISK',
    'EUR',
    'PLN',
    'BGN',
    'CZK',
    'HUF',
    'HRK',
    'RON',
    'GBP',
    'CHF',
];

const Landvelger = styled(CountrySelect)`
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
                background-color: var(--navds-global-color-gray-100);
            }
        }
    }

    & div.c-countrySelect__select {
        margin-top: 0px;

        .c-countrySelect__select__indicator {
            color: initial;
        }

        .c-countrySelect__select__indicator-separator {
            width: ${props => (props.kanNullstilles ? '1px !important' : '0px')};
            background-color: var(--navds-global-color-gray-300);
        }

        .c-countrySelect__select__control {
            border: 1px solid
                ${props =>
                    props.feil
                        ? 'var(--navds-semantic-color-feedback-danger-border)'
                        : 'var(--navds-semantic-color-border)'};
            box-shadow: ${props =>
                props.feil
                    ? `0 0 0 1px var(--navds-semantic-color-feedback-danger-border)`
                    : 'none'};
        }

        .c-countrySelect__select__value-container {
            min-height: 38px;
        }
    }

    .navds-error-message {
        color: var(--navds-semantic-color-feedback-danger-text);
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
}

const BaseFamilieLandvelger: React.FC<IBaseLandvelgerProps> = ({
    countrySelectProps,
    label,
    className,
    utenMargin,
    kanNullstilles,
    feil,
}) => {
    return (
        <div className={classNames('skjemaelement', className)}>
            <Landvelger
                utenMargin={utenMargin}
                kanNullstilles={kanNullstilles}
                feil={feil}
                {...countrySelectProps}
                place
                label={<Label size="small">{label}</Label>}
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
    isMulti?: boolean;
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
}

const FamilieLandvelger: React.FC<IFamilieLandvelgerProps> = ({
    className,
    value,
    feil,
    label,
    placeholder,
    isMulti = false,
    kunEøs = false,
    sirkulær = false,
    size = 'small',
    medFlag = false,
    medWave = false,
    erLesevisning = false,
    onChange,
    utenMargin = false,
    kanNullstilles = false,
}) => {
    const id = `country-select-${label}`;

    let landvelgerProps: CountrySelectProps<Country | Currency> = {
        id,
        values: value,
        placeholder,
        error: feil ? feil : undefined,
        isMulti,
        type: 'country',
        flags: medFlag,
        flagWave: medFlag && medWave,
        flagType: sirkulær ? 'circle' : 'original',
        closeMenuOnSelect: true,
        size,
        isDisabled: erLesevisning,
        onOptionSelected: onChange,
        isClearable: kanNullstilles,
    };
    if (kunEøs) {
        landvelgerProps = { ...landvelgerProps, includeList: CountryFilter.EEA({}) };
    }
    return (
        <BaseFamilieLandvelger
            countrySelectProps={landvelgerProps}
            label={label}
            className={className}
            utenMargin={utenMargin}
            kanNullstilles={kanNullstilles}
            feil={feil}
        />
    );
};

interface IFamilieValutavelgerProps extends IBaseFamilieLandvelgerProps {
    onChange: (value: Currency) => void;
}

const FamilieValutavelger: React.FC<IFamilieValutavelgerProps> = ({
    className,
    value,
    feil,
    label,
    placeholder,
    isMulti = false,
    kunEøs = false,
    sirkulær = false,
    size = 'small',
    medFlag = false,
    medWave = false,
    erLesevisning = false,
    onChange,
    utenMargin = false,
    kanNullstilles = false,
}) => {
    const id = `currency-select-${label}`;

    let landvelgerProps: CountrySelectProps<Country | Currency> = {
        id,
        values: value,
        placeholder,
        error: feil ? feil : undefined,
        isMulti,
        type: 'currency',
        flags: medFlag,
        flagWave: medFlag && medWave,
        flagType: sirkulær ? 'circle' : 'original',
        closeMenuOnSelect: true,
        size,
        isDisabled: erLesevisning,
        onOptionSelected: onChange,
        isClearable: kanNullstilles,
    };

    if (kunEøs) {
        landvelgerProps = {
            ...landvelgerProps,
            includeList: EØS_CURRENCY,
        };
    }

    return (
        <div className={classNames('skjemaelement', className)}>
            <Landvelger
                utenMargin={utenMargin}
                feil={feil}
                {...landvelgerProps}
                place
                label={<Label size="small">{label}</Label>}
            />
        </div>
    );
};

export { FamilieLandvelger, FamilieValutavelger };
