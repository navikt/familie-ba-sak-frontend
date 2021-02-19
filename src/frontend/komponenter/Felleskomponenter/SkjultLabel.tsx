import React from 'react';

import styled from 'styled-components';

import { Label } from 'nav-frontend-skjema';

const StyledLabel = styled(Label)`
    position: absolute;
    clip: rect(0 0 0 0);
`;

interface Props {
    htmlFor: string;
}

const SkjultLabel: React.FC<Props> = ({ htmlFor, children }) => (
    <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
);

export default SkjultLabel;
