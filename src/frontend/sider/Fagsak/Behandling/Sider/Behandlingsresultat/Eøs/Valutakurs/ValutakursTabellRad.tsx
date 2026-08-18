import { Table } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import type { IBehandling } from '../../../../../../../typer/behandling';
import type { OptionType } from '../../../../../../../typer/common';
import type { IRestValutakurs } from '../../../../../../../typer/eøsPerioder';
import { Datoformat, isoStringTilFormatertString } from '../../../../../../../utils/dato';
import { lagPersonLabel } from '../../../../../../../utils/formatter';
import { PeriodeValutakurs } from './PeriodeValutakurs';
import { StatusOgBarnValutakurs } from './StatusOgBarnValutakurs';
import { useValutakursSkjema, valutakursFeilmeldingId } from './useValutakursSkjema';
import ValutakursTabellRadEndre from './ValutakursTabellRadEndre';

interface IProps {
    valutakurs: IRestValutakurs;
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const ValutakursTabellRad = ({ valutakurs, åpenBehandling, visFeilmeldinger }: IProps) => {
    const [erValutakursEkspandert, settErValutakursEkspandert] = useState(false);
    const [skalRendreContentIEkspanderbartPanel, settSkalRendreContentIEkspanderbartPanel] = useState(false);

    const barn: OptionType[] = valutakurs.barnIdenter.map(barn => ({
        value: barn,
        label: lagPersonLabel(barn, åpenBehandling.personer),
    }));

    const { form, onSubmit, slettValutakurs, sletterValutakurs, erManuellInputAvKurs, initiellFom } =
        useValutakursSkjema({
            valutakurs,
            barnIValutakurs: barn,
            lukkSkjema: () => settErValutakursEkspandert(false),
        });

    if (erValutakursEkspandert && !skalRendreContentIEkspanderbartPanel) {
        settSkalRendreContentIEkspanderbartPanel(true);
    }

    useEffect(() => {
        if (visFeilmeldinger && erValutakursEkspandert) {
            form.trigger();
        }
    }, [visFeilmeldinger, erValutakursEkspandert]);

    const toggleForm = (visAlert: boolean) => {
        if (erValutakursEkspandert && visAlert && form.formState.isDirty) {
            alert('Valutakurs har endringer som ikke er lagret!');
        } else {
            settErValutakursEkspandert(!erValutakursEkspandert);
            form.reset();
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
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <ValutakursTabellRadEndre
                                valutakurs={valutakurs}
                                tilgjengeligeBarn={barn}
                                initiellFom={initiellFom}
                                erManuellInputAvKurs={erManuellInputAvKurs}
                                vurderingsform={valutakurs.vurderingsform}
                                inneholderBarnSomSkalSkjermes={valutakurs.inneholderBarnSomSkalSkjermes}
                                onAvbryt={() => toggleForm(false)}
                                slettValutakurs={slettValutakurs}
                                sletterValutakurs={sletterValutakurs}
                            />
                        </form>
                    </FormProvider>
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
