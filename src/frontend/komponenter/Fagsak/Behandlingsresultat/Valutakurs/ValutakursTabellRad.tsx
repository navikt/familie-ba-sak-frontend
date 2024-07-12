import * as React from 'react';

import { Table } from '@navikt/ds-react';

import { PeriodeValutakurs } from './PeriodeValutakurs';
import { StatusOgBarnValutakurs } from './StatusOgBarnValutakurs';
import ValutakursTabellRadEndre from './ValutakursTabellRadEndre';
import {
    useValutakursSkjema,
    valutakursFeilmeldingId,
} from '../../../../context/Valutakurs/ValutakursSkjemaContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { OptionType } from '../../../../typer/common';
import type { IRestValutakurs } from '../../../../typer/eøsPerioder';
import { Datoformat, isoStringTilFormatertString } from '../../../../utils/dato';
import { lagPersonLabel } from '../../../../utils/formatter';

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
    const [skalRendreContentIEkspanderbartPanel, settSkalRendreContentIEkspanderbartPanel] =
        React.useState(false);

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
        tilbakestillFelterTilDefault,
        kanSendeSkjema,
        erValutakursSkjemaEndret,
        slettValutakurs,
        sletterValutakurs,
        erManuellInputAvKurs,
    } = useValutakursSkjema({
        valutakurs,
        barnIValutakurs: barn,
    });

    if (erValutakursEkspandert && !skalRendreContentIEkspanderbartPanel) {
        settSkalRendreContentIEkspanderbartPanel(true);
    }

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
            tilbakestillFelterTilDefault();
        }
    };

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            open={erValutakursEkspandert}
            onOpenChange={() => toggleForm(true)}
            id={valutakursFeilmeldingId(valutakurs)}
            content={
                skalRendreContentIEkspanderbartPanel ? (
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
                        key={`${valutakurs.id}-${erValutakursEkspandert ? 'ekspandert' : 'lukket'}`}
                        vurderingsform={valutakurs.vurderingsform}
                        åpenBehandling={åpenBehandling}
                    />
                ) : null
            }
        >
            <Table.DataCell>
                <StatusOgBarnValutakurs valutakurs={valutakurs} åpenBehandling={åpenBehandling} />
            </Table.DataCell>
            <Table.DataCell>
                <PeriodeValutakurs valutakurs={valutakurs} />
            </Table.DataCell>
            <Table.DataCell>
                {valutakurs.valutakursdato
                    ? isoStringTilFormatertString({
                          isoString: valutakurs.valutakursdato,
                          tilFormat: Datoformat.DATO,
                      })
                    : '-'}
            </Table.DataCell>
            <Table.DataCell>{valutakurs.valutakode ? valutakurs.valutakode : '-'}</Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default ValutakursTabellRad;
