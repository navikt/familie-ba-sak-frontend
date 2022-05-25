import * as React from 'react';

import styled from 'styled-components';

import { Collapse, Expand } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import { mapKompetanseStatusTilStatus } from '../../../../context/Eøs/EøsContext';
import {
    useUtenlandskPeriodeBeløpSkjema,
    utenlandskPeriodeBeløpFeilmeldingId,
} from '../../../../context/UtenlandskPeriodeBeløp/UtenlandskPeriodeBeløpSkjemaContext';
import StatusIkon from '../../../../ikoner/StatusIkon';
import type { IBehandling } from '../../../../typer/behandling';
import { KompetanseStatus } from '../../../../typer/kompetanse';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../typer/kompetanse';
import { datoformat, formaterIsoDato, hentAlder } from '../../../../utils/formatter';
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
    const [ekspandertUtenlandskPeriodeBeløp, settEkspandertUtenlandskPeriodeBeløp] =
        React.useState<boolean>(false);

    const lagLabelBarn = (barnetsIdent: string): string => {
        const barnet = åpenBehandling.personer.find(person => person.personIdent === barnetsIdent);
        if (barnet) {
            return `${barnet.navn} (${hentAlder(barnet.fødselsdato)} år) ${barnet.personIdent}`;
        } else {
            return barnetsIdent;
        }
    };

    const barn: OptionType[] = utenlandskPeriodeBeløp.barnIdenter.map(barn => ({
        value: barn,
        label: lagLabelBarn(barn),
    }));

    const {
        skjema,
        valideringErOk,
        sendInnSkjema,
        slettUtenlandskPeriodeBeløp,
        nullstillSkjema,
        kanSendeSkjema,
    } = useUtenlandskPeriodeBeløpSkjema({
        utenlandskPeriodeBeløp,
        tilgjengeligeBarn: barn,
    });

    React.useEffect(() => {
        if (visFeilmeldinger) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger]);

    const toggleForm = (visAlert: boolean) => {
        if (ekspandertUtenlandskPeriodeBeløp && visAlert) {
            alert('Kompetansen har endringer som ikke er lagret!');
            settEkspandertUtenlandskPeriodeBeløp(!ekspandertUtenlandskPeriodeBeløp);
            nullstillSkjema();
        } else {
            settEkspandertUtenlandskPeriodeBeløp(!ekspandertUtenlandskPeriodeBeløp);
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
                                status={mapKompetanseStatusTilStatus[utenlandskPeriodeBeløp.status]}
                                width={20}
                                heigth={20}
                            />
                        </div>
                        <BarnDiv>
                            {utenlandskPeriodeBeløp.barnIdenter.map(barn => (
                                <BodyShort size="small" key={barn}>
                                    {lagLabelBarn(barn)}
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
                <td>-</td>
                <td>
                    <Button
                        id={utenlandskPeriodeBeløpFeilmeldingId(utenlandskPeriodeBeløp)}
                        disabled={false}
                        variant="tertiary"
                        onClick={() => toggleForm(true)}
                        size="xsmall"
                    >
                        <BodyShort>
                            {!ekspandertUtenlandskPeriodeBeløp
                                ? utenlandskPeriodeBeløp.status === KompetanseStatus.OK
                                    ? 'Endre'
                                    : 'Fastsett beløp'
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
