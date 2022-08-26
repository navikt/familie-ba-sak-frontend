import * as React from 'react';

import { Table } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import {
    useValutakursSkjema,
    valutakursFeilmeldingId,
} from '../../../../context/Valutakurs/ValutakursSkjemaContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestValutakurs } from '../../../../typer/eøsPerioder';
import { datoformat, formaterIsoDato, lagPersonLabel } from '../../../../utils/formatter';
import { StatusBarnCelleOgPeriodeCelle } from '../EøsPeriode/fellesKomponenter';
import ValutakursTabellRadEndre from './ValutakursTabellRadEndre';

interface IProps {
    valutakurs: IRestValutakurs;
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const ValutakursTabellRad: React.FC<IProps> = ({
    valutakurs,
    åpenBehandling,
    visFeilmeldinger,
}) => {
    const barn: OptionType[] = valutakurs.barnIdenter.map(barn => ({
        value: barn,
        label: lagPersonLabel(barn, åpenBehandling.personer),
    }));

    const {
        erValutakursEkspandert,
        settErValutakursEkspandert,
        skjema,
        valideringErOk,
        sendInnSkjema,
        nullstillSkjema,
        kanSendeSkjema,
        erValutakursSkjemaEndret,
        slettValutakurs,
        sletterValutakurs,
        erManuellInputAvKurs,
    } = useValutakursSkjema({
        valutakurs,
        barnIValutakurs: barn,
    });

    React.useEffect(() => {
        if (valutakurs.valutakode !== skjema.felter.valutakode?.verdi) {
            skjema.felter.kurs?.validerOgSettFelt('');
            skjema.felter.valutakursdato?.validerOgSettFelt('');
            skjema.felter.valutakode?.validerOgSettFelt(valutakurs.valutakode);
        }
    }, [valutakurs]);

    React.useEffect(() => {
        if (visFeilmeldinger && erValutakursEkspandert) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger, erValutakursEkspandert]);

    const toggleForm = (visAlert: boolean) => {
        if (erValutakursEkspandert && visAlert && erValutakursSkjemaEndret()) {
            alert('Valutakurs har endringer som ikke er lagret!');
        } else {
            settErValutakursEkspandert(!erValutakursEkspandert);
            nullstillSkjema();
        }
    };

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            open={erValutakursEkspandert}
            onOpenChange={() => toggleForm(true)}
            id={valutakursFeilmeldingId(valutakurs)}
            content={
                <ValutakursTabellRadEndre
                    skjema={skjema}
                    tilgjengeligeBarn={barn}
                    status={valutakurs.status}
                    valideringErOk={valideringErOk}
                    sendInnSkjema={sendInnSkjema}
                    toggleForm={toggleForm}
                    slettValutakurs={slettValutakurs}
                    sletterValutakurs={sletterValutakurs}
                    erManuellInputAvKurs={erManuellInputAvKurs}
                />
            }
        >
            <StatusBarnCelleOgPeriodeCelle
                status={valutakurs.status}
                barnIdenter={valutakurs.barnIdenter}
                personer={åpenBehandling.personer}
                periode={{
                    fom: valutakurs.fom,
                    tom: valutakurs.tom,
                }}
            />
            <Table.DataCell>
                {valutakurs.valutakursdato
                    ? formaterIsoDato(valutakurs.valutakursdato, datoformat.DATO)
                    : '-'}
            </Table.DataCell>
            <Table.DataCell>{valutakurs.valutakode ? valutakurs.valutakode : '-'}</Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default ValutakursTabellRad;
