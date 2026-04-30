import { describe, test, expect } from 'vitest';

import { kjønnType } from '@navikt/familie-typer';

import { PersonIkon } from './PersonIkon';
import { render } from '../testutils/testrender';
import { FagsakType } from '../typer/fagsak';

describe('PersonIkon', () => {
    test('Voksen kvinne skal få kvinne-ikon, ikke jente-ikon', () => {
        const { screen } = render(
            <PersonIkon
                fagsakType={FagsakType.SKJERMET_BARN}
                kjønn={kjønnType.KVINNE}
                erBarn={false}
                erAdresseBeskyttet={false}
            />
        );

        expect(screen.getByTitle('Kvinne')).toBeInTheDocument();
        expect(screen.queryByTitle('Jente')).not.toBeInTheDocument();
    });

    test('Voksen mann skal få mann-ikon, ikke gutt-ikon', () => {
        const { screen } = render(
            <PersonIkon
                fagsakType={FagsakType.SKJERMET_BARN}
                kjønn={kjønnType.MANN}
                erBarn={false}
                erAdresseBeskyttet={false}
            />
        );

        expect(screen.getByTitle('Mann')).toBeInTheDocument();
        expect(screen.queryByTitle('Gutt')).not.toBeInTheDocument();
    });

    test('Gutt skal få gutt ikon', () => {
        const { screen } = render(
            <PersonIkon
                fagsakType={FagsakType.SKJERMET_BARN}
                kjønn={kjønnType.MANN}
                erBarn={true}
                erAdresseBeskyttet={true}
            />
        );

        expect(screen.getByTitle('Gutt')).toBeInTheDocument();
    });

    test('Jente skal få jente ikon', () => {
        const { screen } = render(
            <PersonIkon
                fagsakType={FagsakType.SKJERMET_BARN}
                kjønn={kjønnType.KVINNE}
                erBarn={true}
                erAdresseBeskyttet={true}
            />
        );

        expect(screen.getByTitle('Jente')).toBeInTheDocument();
    });
});
