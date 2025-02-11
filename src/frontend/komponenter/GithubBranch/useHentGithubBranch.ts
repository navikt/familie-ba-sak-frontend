import { useEffect, useState } from 'react';

import { byggTomRessurs, type Ressurs } from '@navikt/familie-typer';

type GithubBranch = {
    branch?: string;
    sha?: string;
};

export function useHentGithubBranch() {
    const [frontendResponse, setFrontendResponse] =
        useState<Ressurs<GithubBranch>>(byggTomRessurs());
    const [backendResponse, setBackendResponse] = useState<Ressurs<GithubBranch>>(byggTomRessurs());

    useEffect(() => {
        fetch('/hent-branch')
            .then(response => response.json())
            .then(json => {
                setFrontendResponse(json);
            });

        fetch('/familie-ba-sak/api/hent-branch')
            .then(response => response.json())
            .then(json => {
                setBackendResponse(json);
            });
    }, []);

    return { frontendResponse, backendResponse };
}
