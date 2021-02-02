import React from 'react';

import styled from 'styled-components';

const StyledLabel = styled.label`
    position: absolute;
    clip: rect(0 0 0 0);
`;

const SkjultLabel: React.FC = ({ children }) => <StyledLabel>{children}</StyledLabel>;

export default SkjultLabel;
