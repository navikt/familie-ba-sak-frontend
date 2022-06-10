import * as React from 'react';

import type { OptionType } from '@navikt/familie-form-elements';

import {
    useUtenlandskPeriodeBeløpSkjema,
    utenlandskPeriodeBeløpFeilmeldingId,
} from '../../../../context/UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpSkjemaContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../utils/formatter';
import {
    EkspanderbarTr,
    EkspandertTd,
    EøsPeriodeEkspanderKnapp,
    StatusBarnCelleOgPeriodeCelle,
} from '../EøsPeriode/fellesKomponenter';
import UtenlandskPeriodeBeløpTabellRadEndre from './UtenlandskPeriodeBeløpTabellRadEndre';

interface IProps {
    utenlandskPeriodeBeløp: IRestUtenlandskPeriodeBeløp;
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const UtenlandskPeriodeBeløpRad: React.FC<IProps> = ({
    utenlandskPeriodeBeløp,
    åpenBehandling,
    visFeilmeldinger,
}) => {
    const barn: OptionType[] = utenlandskPeriodeBeløp.barnIdenter.map(barn => ({
        value: barn,
        label: lagPersonLabel(barn, åpenBehandling.personer),
    }));

    const {
        erUtenlandskPeriodeBeløpEkspandert,
        settErUtenlandskPeriodeBeløpEkspandert,
        skjema,
        valideringErOk,
        sendInnSkjema,
        slettUtenlandskPeriodeBeløp,
        nullstillSkjema,
        kanSendeSkjema,
        erUtenlandskPeriodeBeløpSkjemaEndret,
    } = useUtenlandskPeriodeBeløpSkjema({
        utenlandskPeriodeBeløp,
        tilgjengeligeBarn: barn,
    });

    React.useEffect(() => {
        if (åpenBehandling) {
            nullstillSkjema();
            settErUtenlandskPeriodeBeløpEkspandert(false);
        }
    }, [åpenBehandling]);

    React.useEffect(() => {
        if (visFeilmeldinger) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger]);

    const toggleForm = (visAlert: boolean) => {
        if (
            erUtenlandskPeriodeBeløpEkspandert &&
            visAlert &&
            erUtenlandskPeriodeBeløpSkjemaEndret()
        ) {
            alert('Utenlandsk beløp har endringer som ikke er lagret!');
        } else {
            settErUtenlandskPeriodeBeløpEkspandert(!erUtenlandskPeriodeBeløpEkspandert);
            nullstillSkjema();
        }
    };

    return (
        <>
            <EkspanderbarTr ekspandert={erUtenlandskPeriodeBeløpEkspandert}>
                <StatusBarnCelleOgPeriodeCelle
                    status={utenlandskPeriodeBeløp.status}
                    barnIdenter={utenlandskPeriodeBeløp.barnIdenter}
                    personer={åpenBehandling.personer}
                    periode={{
                        fom: utenlandskPeriodeBeløp.fom,
                        tom: utenlandskPeriodeBeløp.tom,
                    }}
                />
                <td>-</td>
                <td>
                    {utenlandskPeriodeBeløp.valutakode ? utenlandskPeriodeBeløp.valutakode : '-'}
                </td>
                <td>
                    <EøsPeriodeEkspanderKnapp
                        feilmeldingId={utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp)}
                        toggleForm={toggleForm}
                        erEkspandert={erUtenlandskPeriodeBeløpEkspandert}
                        periodeStatus={utenlandskPeriodeBeløp.status}
                        ikkeUtfyltLabel={'Registrer beløp'}
                    />
                </td>
            </EkspanderbarTr>
            {erUtenlandskPeriodeBeløpEkspandert && (
                <tr>
                    <EkspandertTd colSpan={5}>
                        <UtenlandskPeriodeBeløpTabellRadEndre
                            skjema={skjema}
                            tilgjengeligeBarn={barn}
                            valideringErOk={valideringErOk}
                            sendInnSkjema={sendInnSkjema}
                            toggleForm={toggleForm}
                            slettUtenlandskPeriodeBeløp={slettUtenlandskPeriodeBeløp}
                        />
                    </EkspandertTd>
                </tr>
            )}
        </>
    );
};

export default UtenlandskPeriodeBeløpRad;
