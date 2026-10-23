import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import { JournalpostTittel } from '@typer/manuell-journalføring';

export function JournalpostTittelFelt() {
    const { skjema, erLesevisning } = useManuellJournalføringContext();
    const navInputProps = skjema.felter.journalpostTittel.hentNavInputProps(skjema.visFeilmeldinger);

    return (
        <UNSAFE_Combobox
            error={navInputProps.feil}
            id={navInputProps.id}
            allowNewValues
            readOnly={erLesevisning()}
            label={'Endre journalposttittel'}
            placeholder={'Skriv fritekst for å endre tittel...'}
            isMultiSelect={false}
            options={Object.values(JournalpostTittel)}
            selectedOptions={
                skjema.felter.journalpostTittel.verdi === '' ? [] : [skjema.felter.journalpostTittel.verdi]
            }
            onToggleSelected={(value, isSelected) => {
                if (isSelected) {
                    skjema.felter.journalpostTittel.validerOgSettFelt(value);
                } else {
                    skjema.felter.journalpostTittel.nullstill();
                }
            }}
        />
    );
}
