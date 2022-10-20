import type { ReactNode } from 'react';
import React from 'react';

import type { ISODateString } from 'nav-datovelger/lib/types';
import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import { FamilieDatovelger } from '@navikt/familie-form-elements';

import { StyledErrorMessage } from '../../komponenter/Fagsak/Dokumentutsending/DeltBosted/DeltBostedAvtaler';

const StyledFamilieDatovelgerForSkjema = styled(FamilieDatovelger)<{
    feil: ReactNode | undefined;
}>`
    .nav-datovelger__input {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navGra60)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};

        &:focus {
            border-color: ${navFarger.navBlaDarken60};
            box-shadow: 0 0 0 3px ${navFarger.navBlaDarken60};
        }

        &:hover {
            border-color: ${navFarger.navBla};
        }
    }

    .nav-datovelger__kalenderknapp {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navGra60)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};

        &:focus {
            border-color: ${navFarger.navBlaDarken60};
            box-shadow: 0 0 0 3px ${navFarger.navBlaDarken60};
        }

        &:hover {
            border-color: ${navFarger.navBla};
        }
    }

    margin-bottom: ${({ feil }) => (feil ? '.125rem' : '0')};
`;

interface IProps {
    className?: string;
    disabled?: boolean;
    erLesesvisning?: boolean;
    lesevisningFormat?: string;
    id: string;
    label: ReactNode;
    onChange: (dato?: ISODateString) => void;
    placeholder?: string;
    valgtDato?: string;
    description?: ReactNode;

    feil: ReactNode | undefined;
}

export const FamilieDatovelgerWrapper: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <StyledFamilieDatovelgerForSkjema {...props} />
            {!!props.feil && <StyledErrorMessage>{props.feil}</StyledErrorMessage>}
        </>
    );
};
