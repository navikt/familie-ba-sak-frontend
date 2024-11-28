import React from 'react';

import styled from 'styled-components';

import { BodyShort, Box } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useHentGithubBranch } from './useHentGithubBranch';

export const GithubBranch: React.FC = () => {
    const { frontendResponse, backendResponse } = useHentGithubBranch();

    const BranchContainer = styled.div`
        display: none;
        position: absolute;
        bottom: 1rem;
        left: 1rem;
    `;

    return (
        <BranchContainer id="vis-github-info">
            <Box
                padding="2"
                borderWidth="1"
                borderColor="border-info"
                borderRadius="medium"
                background="surface-default"
            >
                {frontendResponse.status === RessursStatus.SUKSESS && (
                    <BodyShort size="small" textColor="subtle">
                        Frontend-branch: {frontendResponse.data.branch || 'Ukjent branch'}
                        {frontendResponse.data.sha && ` (${frontendResponse.data.sha})`}
                    </BodyShort>
                )}

                {backendResponse.status === RessursStatus.SUKSESS && (
                    <BodyShort size="small" textColor="subtle">
                        Backend-branch: {backendResponse.data.branch || 'Ukjent branch'}
                        {backendResponse.data.sha && ` (${backendResponse.data.sha})`}
                    </BodyShort>
                )}
            </Box>
        </BranchContainer>
    );
};

/*
For å se informasjonen brukes denne bookmarkleten:

javascript: (() => {
var el=document.getElementById("vis-github-info");
if(el.checkVisibility()){el.style.setProperty('display','none');}
else{el.style.setProperty('display','block');}}
)();

*/
