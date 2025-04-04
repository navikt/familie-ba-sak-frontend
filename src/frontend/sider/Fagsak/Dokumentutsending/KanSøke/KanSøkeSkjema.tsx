import React from 'react';

import { Dokumentvelger } from './Dokumentvelger';
import KanSøkeFritekst from './KanSøkeFritekst';
import { useDokumentutsendingContext } from '../../../../context/DokumentutsendingContext';

const KanSøkeSkjema = () => {
    const { skjema } = useDokumentutsendingContext();

    const maksAntallKulepunkter = 20;
    const makslengdeFritekst = 220;

    const antallKulepunkter =
        skjema.felter.fritekster.verdi.length + skjema.felter.dokumenter.verdi.length;
    const erMaksAntallKulepunkter = antallKulepunkter >= maksAntallKulepunkter;

    return (
        <>
            <Dokumentvelger />
            <KanSøkeFritekst
                erMaksAntallKulepunkter={erMaksAntallKulepunkter}
                makslengdeFritekst={makslengdeFritekst}
            />
        </>
    );
};

export default KanSøkeSkjema;
