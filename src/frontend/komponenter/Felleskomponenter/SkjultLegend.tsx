import React from 'react';

import styled from 'styled-components';

const StyledLegend = styled.legend`
    position: absolute;
    clip: rect(0 0 0 0);
`;

const SkjultLegend: React.FC = ({ children }) => <StyledLegend>{children}</StyledLegend>;

export default SkjultLegend;
