import { useErLesevisning } from '@hooks/useErLesevisning';
import type { IVilkårResultat } from '@typer/vilkår';
import { Resultat } from '@typer/vilkår';
import type { IsoDatoString } from '@utils/dato';
import { dagensDato, nyIsoDatoPeriode } from '@utils/dato';
import { endOfMonth } from 'date-fns';

import { Fieldset, HelpText, HStack, Label } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { vilkårPeriodeFeilmeldingId } from './VilkårTabell';
import DatovelgerForGammelSkjemaløsning from '../../../../../../komponenter/Datovelger/DatovelgerForGammelSkjemaløsning';

interface IProps {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
}

const VelgPeriode = ({ redigerbartVilkår, validerOgSettRedigerbartVilkår, visFeilmeldinger }: IProps) => {
    const erLesevisning = useErLesevisning();

    return (
        <Fieldset
            errorId={vilkårPeriodeFeilmeldingId(redigerbartVilkår.verdi)}
            error={
                redigerbartVilkår.verdi.periode.valideringsstatus === Valideringsstatus.FEIL && visFeilmeldinger
                    ? redigerbartVilkår.verdi.periode.feilmelding
                    : ''
            }
            legend="Periode for vurderingen"
            hideLegend
        >
            {!erLesevisning && (
                <HStack gap={'space-8'} marginBlock={'space-0'} asChild>
                    <legend>
                        <Label>Velg periode</Label>
                        <HelpText title="Hvordan fastsette periode">
                            Oppgi startdato/periode hvor vilkåret er oppfylt/ikke oppfylt. Virkningstidspunktet vil bli
                            beregnet ut fra dette. Dersom vurderingen gjelder et avslag er ikke periode påkrevd.
                        </HelpText>
                    </legend>
                </HStack>
            )}
            <HStack gap={'space-20'}>
                <DatovelgerForGammelSkjemaløsning
                    label={
                        redigerbartVilkår.verdi.resultat.verdi === Resultat.IKKE_OPPFYLT &&
                        redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad
                            ? 'F.o.m (valgfri)'
                            : 'F.o.m'
                    }
                    value={redigerbartVilkår.verdi.periode.verdi.fom}
                    onDateChange={(dato?: IsoDatoString) => {
                        validerOgSettRedigerbartVilkår({
                            ...redigerbartVilkår,
                            verdi: {
                                ...redigerbartVilkår.verdi,
                                periode: {
                                    ...redigerbartVilkår.verdi.periode,
                                    verdi: nyIsoDatoPeriode(dato, redigerbartVilkår.verdi.periode.verdi.tom),
                                },
                            },
                        });
                    }}
                    visFeilmeldinger={false}
                    readOnly={erLesevisning}
                    maksDatoAvgrensning={endOfMonth(dagensDato)}
                />
                <DatovelgerForGammelSkjemaløsning
                    label={'T.o.m (valgfri)'}
                    value={redigerbartVilkår.verdi.periode.verdi.tom}
                    onDateChange={(dato?: IsoDatoString) => {
                        validerOgSettRedigerbartVilkår({
                            ...redigerbartVilkår,
                            verdi: {
                                ...redigerbartVilkår.verdi,
                                periode: {
                                    ...redigerbartVilkår.verdi.periode,
                                    verdi: nyIsoDatoPeriode(redigerbartVilkår.verdi.periode.verdi.fom, dato),
                                },
                            },
                        });
                    }}
                    visFeilmeldinger={false}
                    readOnly={erLesevisning}
                />
            </HStack>
        </Fieldset>
    );
};

export default VelgPeriode;
