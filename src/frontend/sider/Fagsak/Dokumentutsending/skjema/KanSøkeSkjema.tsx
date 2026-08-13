import { useFormContext, useWatch } from 'react-hook-form';

import { Dokumentvelger } from './Dokumentvelger';
import { KanSøkeFritekst } from './KanSøkeFritekst';
import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

const maksAntallKulepunkter = 20;

export function KanSøkeSkjema() {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const fritekster = useWatch({ control, name: DokumentutsendingFeltnavn.FRITEKSTER });
    const dokumenter = useWatch({ control, name: DokumentutsendingFeltnavn.DOKUMENTER });

    const antallKulepunkter = fritekster.length + dokumenter.length;
    const erMaksAntallKulepunkter = antallKulepunkter >= maksAntallKulepunkter;

    return (
        <>
            <Dokumentvelger />
            <KanSøkeFritekst erMaksAntallKulepunkter={erMaksAntallKulepunkter} />
        </>
    );
}
