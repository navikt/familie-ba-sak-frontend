import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { CheckboxGroup } from '@navikt/ds-react';
import { BarnIBrevÅrsak, barnIBrevÅrsakTilTittel } from '@sider/Fagsak/Dokumentutsending/barnIBrevÅrsak';
import { DeltBostedAvtaler } from '@sider/Fagsak/Dokumentutsending/skjema/DeltBostedAvtaler';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';
import { type FieldPath, useFormContext } from 'react-hook-form';
import { BarnCheckbox } from './BarnCheckbox';
import { useValgteBarnFieldArray } from './ValgteBarnFieldArrayContext';

interface Props {
    barnIBrevÅrsak: BarnIBrevÅrsak;
}

export function BarnCheckboxGruppe({ barnIBrevÅrsak }: Props) {
    const erLesevisning = useErLesevisningFagsak();
    const {
        clearErrors,
        formState: { isSubmitting, errors },
    } = useFormContext<DokumentutsendingFormValues>();

    const { valgteBarn, oppdaterBarn, fjernBarn } = useValgteBarnFieldArray();

    const sorterteBarn = sorterBarnEtterFødselsdato(valgteBarn);
    const merkedeBarn = valgteBarn.filter(barn => barn.merket).map(barn => barn.ident);

    function oppdaterBarnMedNyMerketStatus(identerSomErMerket: string[]) {
        valgteBarn.forEach((barn, index) => {
            const merket = identerSomErMerket.includes(barn.ident);
            if (merket !== barn.merket) {
                oppdaterBarn(index, { ...barn, merket, avtalerOmDeltBosted: merket ? [{ dato: '' }] : [] });
            }
        });
        clearErrors(`${DokumentutsendingFeltnavn.VALGTE_BARN}.root` as FieldPath<DokumentutsendingFormValues>);
    }

    return (
        <CheckboxGroup
            legend={barnIBrevÅrsakTilTittel[barnIBrevÅrsak]}
            error={errors[DokumentutsendingFeltnavn.VALGTE_BARN]?.root?.message}
            value={merkedeBarn}
            onChange={oppdaterBarnMedNyMerketStatus}
            readOnly={erLesevisning || isSubmitting}
        >
            {sorterteBarn.map(barn => {
                const index = valgteBarn.indexOf(barn);
                return (
                    <BarnCheckbox key={barn.id} barn={barn} onFjern={() => fjernBarn(index)}>
                        {barnIBrevÅrsak == BarnIBrevÅrsak.DELT_BOSTED && (
                            <DeltBostedAvtaler barn={barn} index={index} />
                        )}
                    </BarnCheckbox>
                );
            })}
        </CheckboxGroup>
    );
}
