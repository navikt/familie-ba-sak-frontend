import fs from 'fs';
import path from 'path';

import { Request, Response, Router } from 'express';

const lesMockFil = (filnavn: string) => {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'utf-8');
};

/*
const lesMockFilBase64 = (filnavn: string) => {
    const filRaw = fs.readFileSync(path.join(__dirname, '/mock-server/mock/' + filnavn));
    return filRaw.toString('base64');
};
*/

export default (router: Router) => {
    router.get('/api/mock/oppgave/:oppgaveId', (_: Request, res: Response) => {
        const journalpostRes = JSON.parse(lesMockFil(`journalpost.json.mock`));
        setTimeout(() => res.send(journalpostRes), 500);
    });

    router.get('/api/mock/vilkaarsvurdering/vilkaarsbegrunnelser', (_: Request, res: Response) => {
        const journalpostRes = JSON.parse(lesMockFil(`vilkaarsbegrunnelser.json.mock`));
        setTimeout(() => res.send(journalpostRes), 500);
    });

    return router;
};
