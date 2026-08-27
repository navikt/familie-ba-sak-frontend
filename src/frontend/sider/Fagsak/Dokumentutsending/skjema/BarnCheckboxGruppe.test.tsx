import { BarnIBrevÅrsak } from '@sider/Fagsak/Dokumentutsending/barnIBrevÅrsak';
import { DokumentÅrsak } from '@sider/Fagsak/Dokumentutsending/dokumentÅrsakTyper';
import { renderMedSkjema } from '@sider/Fagsak/Dokumentutsending/testutils/renderMedSkjema';
import type {
    DokumentutsendingBarn,
    DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { useFormContext } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import { BarnCheckboxGruppe } from './BarnCheckboxGruppe';
import { ValgteBarnFieldArrayProvider } from './ValgteBarnFieldArrayContext';

function BarnCheckboxGruppeMedFieldArray({ barnIBrevÅrsak }: { barnIBrevÅrsak: BarnIBrevÅrsak }) {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    return (
        <ValgteBarnFieldArrayProvider control={control}>
            <BarnCheckboxGruppe barnIBrevÅrsak={barnIBrevÅrsak} />
        </ValgteBarnFieldArrayProvider>
    );
}

const barn1: DokumentutsendingBarn = {
    ident: '01011012345',
    navn: 'Eldst Barnesen',
    fødselsdato: '2010-01-01',
    merket: false,
    manueltRegistrert: false,
    erFolkeregistrert: true,
    avtalerOmDeltBosted: [],
};

const barn2: DokumentutsendingBarn = {
    ident: '01011512345',
    navn: 'Yngst Barnesen',
    fødselsdato: '2015-01-01',
    merket: false,
    manueltRegistrert: false,
    erFolkeregistrert: true,
    avtalerOmDeltBosted: [],
};

const manueltRegistrertBarn: DokumentutsendingBarn = {
    ident: '01012012345',
    navn: 'Manuelt Barnesen',
    fødselsdato: '2020-01-01',
    merket: false,
    manueltRegistrert: true,
    erFolkeregistrert: false,
    avtalerOmDeltBosted: [],
};

describe('BarnCheckboxGruppe', () => {
    test('viser feilmelding når skjemaet sendes inn uten at noen barn er merket', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.BARN_SØKT_FOR} />,
            {
                defaultValues: {
                    årsak: DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                    valgteBarn: [barn1],
                },
            }
        );

        await sendInnSkjema();

        expect(await screen.findByText('Du må velge minst ett barn')).toBeInTheDocument();
    });

    test('viser ikke feilmelding når årsaken ikke har barn i brevet', async () => {
        const { sendInnSkjema, screen } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.BARN_SØKT_FOR} />,
            { defaultValues: { årsak: DokumentÅrsak.FØDSEL_GENERELL, valgteBarn: [barn1] } }
        );

        await sendInnSkjema();

        expect(screen.queryByText('Du må velge minst ett barn')).not.toBeInTheDocument();
    });

    test('merking av et barn oppdaterer skjemaverdiene og fjerner feilmeldingen', async () => {
        const { sendInnSkjema, screen, user } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.BARN_SØKT_FOR} />,
            {
                defaultValues: {
                    årsak: DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                    valgteBarn: [barn1],
                },
            }
        );

        await sendInnSkjema();
        expect(await screen.findByText('Du må velge minst ett barn')).toBeInTheDocument();

        await user.click(screen.getByRole('checkbox', { name: /Eldst Barnesen/ }));

        expect(screen.getByRole('checkbox', { name: /Eldst Barnesen/ })).toBeChecked();
        expect(screen.queryByText('Du må velge minst ett barn')).not.toBeInTheDocument();
    });

    test('sorterer barna etter fødselsdato, yngst barn øverst', () => {
        const { screen } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.BARN_SØKT_FOR} />,
            {
                defaultValues: {
                    årsak: DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                    valgteBarn: [barn1, barn2],
                },
            }
        );

        const checkboxer = screen.getAllByRole('checkbox');
        expect(checkboxer[0]).toHaveAccessibleName(/Yngst Barnesen/);
        expect(checkboxer[1]).toHaveAccessibleName(/Eldst Barnesen/);
    });

    test('viser fjern-knapp kun for manuelt registrerte barn, og fjerner barnet ved klikk', async () => {
        const { screen, user } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.BARN_SØKT_FOR} />,
            {
                defaultValues: {
                    årsak: DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
                    valgteBarn: [barn1, manueltRegistrertBarn],
                },
            }
        );

        expect(screen.queryByRole('button', { name: 'Fjern barn' })).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: 'Fjern barn' })).toHaveLength(1);

        await user.click(screen.getByRole('button', { name: 'Fjern barn' }));

        expect(screen.queryByRole('checkbox', { name: /Manuelt Barnesen/ })).not.toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /Eldst Barnesen/ })).toBeInTheDocument();
    });

    test('rendrer DeltBostedAvtaler for barn når barnIBrevÅrsak er DELT_BOSTED', () => {
        const { screen } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.DELT_BOSTED} />,
            {
                defaultValues: {
                    årsak: DokumentÅrsak.DELT_BOSTED,
                    valgteBarn: [{ ...barn1, merket: true, avtalerOmDeltBosted: [{ dato: '' }] }],
                },
            }
        );

        expect(screen.getByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toBeInTheDocument();
    });

    test('seeder og tømmer avtalerOmDeltBosted når barnet merkes og avmerkes', async () => {
        const { screen, user } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.DELT_BOSTED} />,
            {
                defaultValues: { årsak: DokumentÅrsak.DELT_BOSTED, valgteBarn: [barn1] },
            }
        );

        expect(screen.queryByRole('textbox', { name: 'Dato for avtale om delt bosted' })).not.toBeInTheDocument();

        await user.click(screen.getByRole('checkbox', { name: /Eldst Barnesen/ }));
        expect(screen.getByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toBeInTheDocument();

        await user.click(screen.getByRole('checkbox', { name: /Eldst Barnesen/ }));
        expect(screen.queryByRole('textbox', { name: 'Dato for avtale om delt bosted' })).not.toBeInTheDocument();
    });

    test('viser ikke valideringsfeil for avtaledato når barnet markeres', async () => {
        const { screen, user } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.DELT_BOSTED} />,
            { defaultValues: { årsak: DokumentÅrsak.DELT_BOSTED, valgteBarn: [barn1] } }
        );

        await user.click(screen.getByRole('checkbox', { name: /Eldst Barnesen/ }));

        expect(screen.getByRole('textbox', { name: 'Dato for avtale om delt bosted' })).toBeInTheDocument();
        expect(screen.queryByText('Du må fylle inn dato for avtale')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må fylle inn en gyldig dato for avtale')).not.toBeInTheDocument();
    });

    test('trigger() (slik Forhåndsvis-knappen bruker) validerer at minst ett barn er merket', async () => {
        const { klikkForhåndsvis, screen } = renderMedSkjema(
            <BarnCheckboxGruppeMedFieldArray barnIBrevÅrsak={BarnIBrevÅrsak.DELT_BOSTED} />,
            {
                defaultValues: { årsak: DokumentÅrsak.DELT_BOSTED, valgteBarn: [barn1] },
            }
        );

        await klikkForhåndsvis();

        expect(await screen.findByText('Du må velge minst ett barn')).toBeInTheDocument();
    });
});
