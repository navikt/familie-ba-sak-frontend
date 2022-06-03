import * as React from 'react';

import styled from 'styled-components';

import { Collapse, Expand } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import {
    useValutakursSkjema,
    valutakursFeilmeldingId,
} from '../../../../context/Valutakurs/ValutakursSkjemaContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestValutakurs } from '../../../../typer/eøsPerioder';
import { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import { datoformat, formaterIsoDato, lagPersonLabel } from '../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../utils/kalender';
import ValutakursTabellRadEndre from './ValutakursTabellRadEndre';

interface IEkspanderbarTrProps {
    ekspandert?: boolean;
}

const EkspanderbarTr = styled.tr`
    td {
        border-bottom: ${(props: IEkspanderbarTrProps) =>
            props.ekspandert
                ? 'none'
                : '1px solid rgba(0, 0, 0, 0.15)'} !important; // Denne !important er nødvendig
        vertical-align: top;
    }

    & td:last-child {
        text-align: right;
        padding-right: 0;
    }
`;

const ValutakursVurdertCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const BarnDiv = styled.div`
    display: inline-block;
    margin-top: 1px;
`;

const EkspandertTd = styled.td`
    padding: 0 1rem 1rem 1.6rem;
`;

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
        ekspandertValutakurs,
        settEkspandertValutakurs,
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
        if (ekspandertValutakurs && visAlert && erValutakursSkjemaEndret()) {
            alert('Valutakurs har endringer som ikke er lagret!');
        } else {
            settEkspandertValutakurs(!ekspandertValutakurs);
            nullstillSkjema();
        }
    };

    const formatterPeriode = (periode: IYearMonthPeriode): string => {
        return `${formaterIsoDato(periode.fom, datoformat.MÅNED_ÅR_KORTNAVN)} - ${
            periode.tom ? formaterIsoDato(periode.tom, datoformat.MÅNED_ÅR_KORTNAVN) : ''
        }`;
    };

    return (
        <>
            <EkspanderbarTr ekspandert={ekspandertValutakurs}>
                <td>
                    <ValutakursVurdertCelle>
                        <div>
                            <StatusIkon
                                status={mapEøsPeriodeStatusTilStatus[valutakurs.status]}
                                width={20}
                                heigth={20}
                            />
                        </div>
                        <BarnDiv>
                            {valutakurs.barnIdenter.map(barn => (
                                <BodyShort size="small" key={barn}>
                                    {lagPersonLabel(barn, åpenBehandling.personer)}
                                </BodyShort>
                            ))}
                        </BarnDiv>
                    </ValutakursVurdertCelle>
                </td>
                <td>
                    <BodyShort size="small">
                        {formatterPeriode({
                            fom: valutakurs.fom,
                            tom: valutakurs.tom,
                        })}
                    </BodyShort>
                </td>
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
                            {!ekspandertValutakurs
                                ? valutakurs.status === EøsPeriodeStatus.OK
                                    ? 'Endre'
                                    : 'Registrer valutakurs'
                                : `Lukk`}
                        </BodyShort>
                        {ekspandertValutakurs ? (
                            <Collapse width="22" height="22" />
                        ) : (
                            <Expand width="22" height="22" />
                        )}
                    </Button>
                </td>
            </EkspanderbarTr>
            {ekspandertValutakurs && (
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
