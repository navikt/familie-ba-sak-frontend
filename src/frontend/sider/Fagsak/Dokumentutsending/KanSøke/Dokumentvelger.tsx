import { UNSAFE_Combobox } from '@navikt/ds-react';

import { opplysningsdokumenter } from '../../Behandling/Høyremeny/Brev/typer';
import { useDokumentutsendingContext } from '../DokumentutsendingContext';

export const Dokumentvelger = () => {
    const { skjema } = useDokumentutsendingContext();

    const dokumenter = skjema.felter.dokumenter;
    const { error } = dokumenter.hentNavBaseSkjemaProps(skjema.visFeilmeldinger);

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            dokumenter.validerOgSettFelt([...dokumenter.verdi, option]);
        } else {
            dokumenter.validerOgSettFelt(dokumenter.verdi.filter(dokument => dokument !== option));
        }
    };

    return (
        <UNSAFE_Combobox
            label="Velg dokumenter"
            isMultiSelect
            onToggleSelected={onToggleSelected}
            selectedOptions={dokumenter.verdi}
            options={opplysningsdokumenter.map(dokument => dokument.label)}
            error={error}
        />
    );
};
