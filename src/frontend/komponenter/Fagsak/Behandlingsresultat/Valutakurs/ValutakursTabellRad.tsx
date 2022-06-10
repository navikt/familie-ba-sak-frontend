import * as React from 'react';

import { Collapse, Expand } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import {
    useValutakursSkjema,
    valutakursFeilmeldingId,
} from '../../../../context/Valutakurs/ValutakursSkjemaContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestValutakurs } from '../../../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import { datoformat, formaterIsoDato, lagPersonLabel } from '../../../../utils/formatter';
import {
    EkspanderbarTr,
    EkspandertTd,
    StatusBarnCelleOgPeriodeCelle,
} from '../EøsPeriode/fellesKomponenter';
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
    } = useValutakursSkjema({
        valutakurs,
        tilgjengeligeBarn: barn,
    });

    React.useEffect(() => {
        if (visFeilmeldinger) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger]);

    const toggleForm = (visAlert: boolean) => {
        if (erValutakursEkspandert && visAlert && erValutakursSkjemaEndret()) {
            alert('Valutakurs har endringer som ikke er lagret!');
        } else {
            settErValutakursEkspandert(!erValutakursEkspandert);
            nullstillSkjema();
        }
    };

    return (
        <>
            <EkspanderbarTr ekspandert={erValutakursEkspandert}>
                <StatusBarnCelleOgPeriodeCelle
                    status={valutakurs.status}
                    barnIdenter={valutakurs.barnIdenter}
                    personer={åpenBehandling.personer}
                    periode={{
                        fom: valutakurs.fom,
                        tom: valutakurs.tom,
                    }}
                />
                <td>
                    {valutakurs.valutakursdato
                        ? formaterIsoDato(valutakurs.valutakursdato, datoformat.DATO)
                        : '-'}
                </td>
                <td>{valutakurs.valutakode ? valutakurs.valutakode : '-'}</td>
                <td>
                    <Button
                        id={valutakursFeilmeldingId(valutakurs)}
                        variant="tertiary"
                        onClick={() => toggleForm(true)}
                        size="xsmall"
                    >
                        <BodyShort>
                            {!erValutakursEkspandert
                                ? valutakurs.status === EøsPeriodeStatus.OK
                                    ? 'Endre'
                                    : 'Registrer valutakurs'
                                : `Lukk`}
                        </BodyShort>
                        {erValutakursEkspandert ? (
                            <Collapse width="22" height="22" />
                        ) : (
                            <Expand width="22" height="22" />
                        )}
                    </Button>
                </td>
            </EkspanderbarTr>
            {erValutakursEkspandert && (
                <tr>
                    <EkspandertTd colSpan={5}>
                        <ValutakursTabellRadEndre
                            skjema={skjema}
                            tilgjengeligeBarn={barn}
                            valideringErOk={valideringErOk}
                            sendInnSkjema={sendInnSkjema}
                            toggleForm={toggleForm}
                            slettValutakurs={slettValutakurs}
                        />
                    </EkspandertTd>
                </tr>
            )}
        </>
    );
};

export default ValutakursTabellRad;
