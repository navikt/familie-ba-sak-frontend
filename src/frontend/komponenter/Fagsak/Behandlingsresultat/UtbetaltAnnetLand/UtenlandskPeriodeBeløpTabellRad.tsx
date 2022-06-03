import * as React from 'react';

import styled from 'styled-components';

import { Collapse, Expand } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import { mapEøsPeriodeStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import {
    useUtenlandskPeriodeBeløpSkjema,
    utenlandskPeriodeBeløpFeilmeldingId,
} from '../../../../context/UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpSkjemaContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import type { IBehandling } from '../../../../typer/behandling';
import { EøsPeriodeStatus } from '../../../../typer/eøsPerioder';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../typer/eøsPerioder';
import { datoformat, formaterIsoDato, lagPersonLabel } from '../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../utils/kalender';
import UtenlandskPeriodeBeløpTabellRadEndre from './UtenlandskPeriodeBeløpTabellRadEndre';

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

const UtenlandskPeriodeBeløpVurdertCelle = styled.div`
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
        ekspandertUtenlandskPeriodeBeløp,
        settEkspandertUtenlandskPeriodeBeløp,
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
            settEkspandertUtenlandskPeriodeBeløp(false);
        }
    }, [åpenBehandling]);

    React.useEffect(() => {
        if (visFeilmeldinger) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger]);

    const toggleForm = (visAlert: boolean) => {
        if (
            ekspandertUtenlandskPeriodeBeløp &&
            visAlert &&
            erUtenlandskPeriodeBeløpSkjemaEndret()
        ) {
            alert('Utenlandsk beløp har endringer som ikke er lagret!');
        } else {
            settEkspandertUtenlandskPeriodeBeløp(!ekspandertUtenlandskPeriodeBeløp);
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
            <EkspanderbarTr ekspandert={ekspandertUtenlandskPeriodeBeløp}>
                <td>
                    <UtenlandskPeriodeBeløpVurdertCelle>
                        <div>
                            <StatusIkon
                                status={mapEøsPeriodeStatusTilStatus[utenlandskPeriodeBeløp.status]}
                                width={20}
                                heigth={20}
                            />
                        </div>
                        <BarnDiv>
                            {utenlandskPeriodeBeløp.barnIdenter.map(barn => (
                                <BodyShort size="small" key={barn}>
                                    {lagPersonLabel(barn, åpenBehandling.personer)}
                                </BodyShort>
                            ))}
                        </BarnDiv>
                    </UtenlandskPeriodeBeløpVurdertCelle>
                </td>
                <td>
                    <BodyShort size="small">
                        {formatterPeriode({
                            fom: utenlandskPeriodeBeløp.fom,
                            tom: utenlandskPeriodeBeløp.tom,
                        })}
                    </BodyShort>
                </td>
                <td>-</td>
                <td>
                    {utenlandskPeriodeBeløp.valutakode ? utenlandskPeriodeBeløp.valutakode : '-'}
                </td>
                <td>
                    <Button
                        id={utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp)}
                        variant="tertiary"
                        onClick={() => toggleForm(true)}
                        size="xsmall"
                    >
                        <BodyShort>
                            {!ekspandertUtenlandskPeriodeBeløp
                                ? utenlandskPeriodeBeløp.status === EøsPeriodeStatus.OK
                                    ? 'Endre'
                                    : 'Registrer beløp'
                                : `Lukk`}
                        </BodyShort>
                        {ekspandertUtenlandskPeriodeBeløp ? (
                            <Collapse width="22" height="22" />
                        ) : (
                            <Expand width="22" height="22" />
                        )}
                    </Button>
                </td>
            </EkspanderbarTr>
            {ekspandertUtenlandskPeriodeBeløp && (
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
