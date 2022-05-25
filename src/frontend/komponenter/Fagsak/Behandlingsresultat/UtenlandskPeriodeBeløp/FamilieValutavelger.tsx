import * as React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Label } from '@navikt/ds-react';
import type { Currency } from '@navikt/land-verktoy';
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
];

const Landvelger = styled(CountrySelect)`
    margin-bottom: ${props => (props.utenMargin ? '0rem' : '1rem')};

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
            width: 0px;
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

interface IProps {
    id: string;
    className?: string;
    value?: string | string[] | undefined;
    feil?: string;
    label: string | JSX.Element;
    placeholder?: string | undefined;
    isMulti?: boolean;
    kunEøs?: boolean;
    medFlag?: boolean;
    size?: 'small' | 'medium';
    erLesevisning?: boolean;
    onChange: (value: Currency) => void;
    utenMargin?: boolean;
    kanNullstilles?: boolean;
}

const FamilieValutavelger: React.FC<IProps> = ({
    className,
    value,
    feil,
    label,
    placeholder,
    isMulti = false,
    kunEøs = false,
    size = 'small',
    medFlag = false,
    erLesevisning = false,
    onChange,
    utenMargin = false,
    kanNullstilles = false,
}) => {
    const id = `country-select-${label}`;

    let landvelgerProps: CountrySelectProps<Currency> = {
        id,
        values: value,
        placeholder,
        error: feil ? feil : undefined,
        isMulti,
        type: 'currency',
        flags: medFlag,
        flagType: 'original',
        closeMenuOnSelect: true,
        size: size,
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

export default FamilieValutavelger;
