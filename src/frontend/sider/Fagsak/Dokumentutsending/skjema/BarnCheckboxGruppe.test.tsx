import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/skjema/testutils/renderMedSkjema';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { describe, expect, test } from 'vitest';

import { BarnCheckboxGruppe } from './BarnCheckboxGruppe';

const barn1: IBarnMedOpplysninger = {
    ident: '01011012345',
    navn: 'Eldst Barnesen',
    fødselsdato: '2010-01-01',
    merket: false,
    manueltRegistrert: false,
    erFolkeregistrert: true,
};

const barn2: IBarnMedOpplysninger = {
    ident: '01011512345',
    navn: 'Yngst Barnesen',
    fødselsdato: '2015-01-01',
    merket: false,
    manueltRegistrert: false,
    erFolkeregistrert: true,
};

const manueltRegistrertBarn: IBarnMedOpplysninger = {
    ident: '01012012345',
    navn: 'Manuelt Barnesen',
    fødselsdato: '2020-01-01',
    merket: false,
    manueltRegistrert: true,
    erFolkeregistrert: false,
};

describe('BarnCheckboxGruppe', () => {
    test('viser feilmelding når skjemaet sendes inn uten at noen barn er merket', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(<BarnCheckboxGruppe legend={'Hvilke barn?'} />, {
            defaultValues: { valgteBarn: [barn1] },
        });

        await sendInnSkjema();

        expect(await screen.findByText('Du må velge minst ett barn')).toBeInTheDocument();
    });

    test('merking av et barn oppdaterer skjemaverdiene og fjerner feilmeldingen', async () => {
        const { sendInnSkjema, screen, user, hentForm } = renderMedSkjema(
            <BarnCheckboxGruppe legend={'Hvilke barn?'} />,
            { defaultValues: { valgteBarn: [barn1] } }
        );

        await sendInnSkjema();
        expect(await screen.findByText('Du må velge minst ett barn')).toBeInTheDocument();

        await user.click(screen.getByRole('checkbox', { name: /Eldst Barnesen/ }));

        const valgteBarn = hentForm().getValues('valgteBarn') as IBarnMedOpplysninger[];
        expect(valgteBarn[0].merket).toBe(true);
        expect(screen.queryByText('Du må velge minst ett barn')).not.toBeInTheDocument();
    });

    test('sorterer barna etter fødselsdato, yngst barn øverst', () => {
        const { screen } = renderMedSkjema(<BarnCheckboxGruppe legend={'Hvilke barn?'} />, {
            defaultValues: { valgteBarn: [barn1, barn2] },
        });

        const checkboxer = screen.getAllByRole('checkbox');
        expect(checkboxer[0]).toHaveAccessibleName(/Yngst Barnesen/);
        expect(checkboxer[1]).toHaveAccessibleName(/Eldst Barnesen/);
    });

    test('viser fjern-knapp kun for manuelt registrerte barn, og fjerner barnet ved klikk', async () => {
        const { screen, user, hentForm } = renderMedSkjema(<BarnCheckboxGruppe legend={'Hvilke barn?'} />, {
            defaultValues: { valgteBarn: [barn1, manueltRegistrertBarn] },
        });

        expect(screen.queryByRole('button', { name: 'Fjern barn' })).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: 'Fjern barn' })).toHaveLength(1);

        await user.click(screen.getByRole('button', { name: 'Fjern barn' }));

        const valgteBarn = hentForm().getValues('valgteBarn') as IBarnMedOpplysninger[];
        expect(valgteBarn).toHaveLength(1);
        expect(valgteBarn[0].ident).toBe(barn1.ident);
    });

    test('rendrer barnInnhold per barn', () => {
        const { screen } = renderMedSkjema(
            <BarnCheckboxGruppe
                legend={'Hvilke barn?'}
                barnInnhold={barn => <span>{`Ekstra innhold for ${barn.navn}`}</span>}
            />,
            { defaultValues: { valgteBarn: [barn1] } }
        );

        expect(screen.getByText('Ekstra innhold for Eldst Barnesen')).toBeInTheDocument();
    });
});
