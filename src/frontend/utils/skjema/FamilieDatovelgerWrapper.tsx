import React, { ReactNode } from 'react';

import { ISODateString } from 'nav-datovelger/lib/types';
import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import { FamilieDatovelger } from '@navikt/familie-form-elements';

import { StyledFeilmelding } from '../../komponenter/Fagsak/Dokumentutsending/DeltBosted/DeltBostedAvtaler';

const StyledFamilieDatovelgerForSkjema = styled(FamilieDatovelger)<{
    feil: ReactNode | undefined;
}>`
    .nav-datovelger__input {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navBla)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};
    }

    .nav-datovelger__kalenderknapp {
        border-color: ${({ feil }) => (feil ? navFarger.redError : navFarger.navBla)};
        box-shadow: ${({ feil }) => (feil ? '0 0 0 1px #ba3a26' : '0 0 0 0')};
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
            {!!props.feil && <StyledFeilmelding>{props.feil}</StyledFeilmelding>}
        </>
    );
};
