import * as React from 'react';

import { Table } from '@navikt/ds-react';

import {
    useUtenlandskPeriodeBeløpSkjema,
    utenlandskPeriodeBeløpFeilmeldingId,
} from './useUtenlandskPeriodeBeløpSkjema';
import UtenlandskPeriodeBeløpTabellRadEndre from './UtenlandskPeriodeBeløpTabellRadEndre';
import type { IBehandling } from '../../../../../typer/behandling';
import type { OptionType } from '../../../../../typer/common';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../../utils/formatter';
import { StatusBarnCelleOgPeriodeCelle } from '../EøsKomponenter/EøsSkjemaKomponenter';

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
        barnIUtenlandskPeriodeBeløp: barn,
    });

    React.useEffect(() => {
        if (åpenBehandling) {
            nullstillSkjema();
            settErUtenlandskPeriodeBeløpEkspandert(false);
        }
    }, [åpenBehandling]);

    React.useEffect(() => {
        if (visFeilmeldinger && erUtenlandskPeriodeBeløpEkspandert) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger, erUtenlandskPeriodeBeløpEkspandert]);

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

    const formatterKalkulertBeløp = () => {
        const beløp = Number(utenlandskPeriodeBeløp.kalkulertMånedligBeløp);
        const formatter = Intl.NumberFormat('no-NB', {
            maximumFractionDigits: 2,
        });
        return formatter.format(beløp);
    };

    return (
        <Table.ExpandableRow
            open={erUtenlandskPeriodeBeløpEkspandert}
            togglePlacement="right"
            onOpenChange={() => toggleForm(true)}
            id={utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp)}
            content={
                erUtenlandskPeriodeBeløpEkspandert && (
                    <UtenlandskPeriodeBeløpTabellRadEndre
                        skjema={skjema}
                        tilgjengeligeBarn={barn}
                        valideringErOk={valideringErOk}
                        sendInnSkjema={sendInnSkjema}
                        toggleForm={toggleForm}
                        slettUtenlandskPeriodeBeløp={slettUtenlandskPeriodeBeløp}
                        status={utenlandskPeriodeBeløp.status}
                    />
                )
            }
        >
            <StatusBarnCelleOgPeriodeCelle
                status={utenlandskPeriodeBeløp.status}
                barnIdenter={utenlandskPeriodeBeløp.barnIdenter}
                personer={åpenBehandling.personer}
                periode={{
                    fom: utenlandskPeriodeBeløp.fom,
                    tom: utenlandskPeriodeBeløp.tom,
                }}
            />
            <Table.DataCell>
                {utenlandskPeriodeBeløp.kalkulertMånedligBeløp ? formatterKalkulertBeløp() : '-'}
            </Table.DataCell>
            <Table.DataCell>
                {utenlandskPeriodeBeløp.valutakode ? utenlandskPeriodeBeløp.valutakode : '-'}
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default UtenlandskPeriodeBeløpRad;
